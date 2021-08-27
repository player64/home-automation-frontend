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

        <v-alert v-if="!rawLogs.length && !loading"
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
      rawLogs: [],
      logs: [],
      headers: [
        {
          text: 'Time',
          value: 'time'
        },
        {

        }
      ]
    }
  },
  props: {
    data: Object
  },
  computed: {
    toIsoToday() {
      const isoDate = new Date(this.today)
      return isoDate.toISOString()
    }
  },
  methods: {
    getLogs() {
      this.menu = false
      this.loading = true
      this.logs = []
      this.axios.get(`${util.apiUrl}/devices/log/${this.data.pk}/?date=${this.date}`)
          .then((response) => {
            this.rawLogs = response.data
            this.logs = this.convertLogsToTableFormat()
            console.log(this.logs)
          }).finally(() => {
        this.loading = false
      })
    },
    convertLogsToTableFormat() {
      if(!this.rawLogs.length) return
      let keys

      // reset headers
      this.headers = [
        {
          text: 'Time',
          value: 'time'
        }
      ]

      if (this.data.type === 'sensor') {
        const factory = factories.getSensorReadings(this.data.sensor_type)

        keys = factory.map((item) => {
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
      } else if (this.data.type === 'relay') {
        // update headers for sensor
        this.headers.push({
          text: 'Action',
          value: 'state'
        })


        keys = [{
          key: 'state',
          unit: null
        }]
      }

      // convert logs
      return this.rawLogs.map((item) => {
        let out = {
          time: util.getTimeFromDate(item.time),
        }

        keys.map((k) => {
          out[k.key] = item.readings[k.key]
        })
        return out
      })
    }
  },
  mounted() {
    // this.logs = [{time: '2021-05-24T03:44:46+01:00', readings: {state: 'OFF'}}]
    // this.rawLogs = [{time: '2021-05-24T03:44:46+01:00', readings: {humidity: 99.9,temperature: 24.6}}]
    this.rawLogs = this.data.logs
    this.logs = this.convertLogsToTableFormat()
    this.date = this.today
  }
}
</script>

<style scoped>

</style>