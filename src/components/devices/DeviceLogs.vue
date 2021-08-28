<template>
  <div>
    <h1>Logs for {{ data.name }}</h1>
    <v-row>
      <v-col cols="12" xl="6" lg="7" md="9">
        <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="date"
                label="Pick the date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                max-width="320"
            ></v-text-field>
          </template>
          <v-date-picker
              first-day-of-week="1"
              locale="en-gb"
              v-model="date"
              :max="toIsoToday"
              @input="getLogs"
          ></v-date-picker>
        </v-menu>


        <loader v-if="loading" text="Getting logs"/>

        <v-alert v-if="!logs.length && !loading"
                 dense
                 type="warning"
        >
          There are no device logs on the selected day
        </v-alert>


        <v-data-table v-else-if="logs.length"
                      :headers="headers"
                      :items="logs"
                      hide-default-footer
                      class="elevation-1"
        ></v-data-table>


      </v-col>
    </v-row>
  </div>
</template>

<script>
import factories from "@/services/factories"
import util from "@/services/util"
import Loader from '@/components/ui/Loader'

export default {
  name: "DeviceLogs",
  components: {
    Loader,
  },
  data() {
    return {
      today: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date: null,
      menu: false,
      loading: false,
      logs: [],
      headers: []
    }
  },
  props: {
    data: Object
  },
  computed: {
    toIsoToday() {
      const isoDate = new Date(this.today)
      return isoDate.toISOString()
    },
  },
  methods: {
    getLogs() {
      this.menu = false
      this.loading = true
      this.logs = []
      this.axios.get(`${util.apiUrl}/devices/log/${this.data.pk}/?date=${this.date}`)
          .then((response) => {
            this.logs = this.convertLogsToTableFormat(response.data)
          }).finally(() => {
        this.loading = false
      })
    },
    sensorKeys() {
      const factory = factories.getSensorReadingsByType(this.data.sensor_type)
      return factory.map((item) => {
        // update headers for sensor
        this.headers.push({
          text: util.capitalizeFirstLetter(item.key),
          value: item.key
        })

        return {
          key: item.key,
          unit: item.units
        }
      })
    },
    relayKeys() {
      // update headers for relay
      this.headers.push({
        text: 'Action',
        value: 'state'
      })

      return [{
        key: 'state',
        unit: null
      }]
    },
    makeKeys(type) {
      const types = {
        relay: this.relayKeys,
        sensor: this.sensorKeys
      }

      if (type in types) {
        // add time to headers
        this.headers = [{
          text: 'Time',
          value: 'time'
        }]

        return types[type]()
      }
      throw new Error(`This type ${type} isn't implemented. The keys cannot be converted.`)
    },
    convertLogsToTableFormat(logs) {
      if (!logs.length) return []
      const keys = this.makeKeys(this.data.type)

      // convert logs
      return logs.map((item) => {
        const out = {
          time: util.getTimeFromDate(item.time),
        }
        keys.map((k) => {
          out[k.key] = item.readings[k.key] + ((k.unit) ? k.unit : '')
        })
        return out
      })
    }
  },
  mounted() {
    this.logs = this.convertLogsToTableFormat(this.data.logs)
    this.date = this.today
  }
}
</script>

<style scoped>

</style>