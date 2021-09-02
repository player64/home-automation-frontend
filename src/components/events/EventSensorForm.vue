<template>
  <div>
    <v-select v-model="sensor" :rules="sensorRule" :disabled="sending" label="Sensor" :items="sensors.form"
              @input="setSensor($event)"/>


    <v-row v-if="sensor" align-content="center">
      <v-col cols="4">
        <v-select v-model="reading_type" :rules="readingRule" :disabled="sending" label="Reading type"
                  :items="getSensorReadings" @input="setFields($event, 'reading_type')" />
      </v-col>
      <v-col cols="4">
        <v-select v-model="rule" :rules="ruleRule" :disabled="sending" label="Event rule" :items="rules"
                  @input="setFields($event, 'rule')"/>
      </v-col>
      <v-col cols="4">
        <v-text-field v-model="value" :rules="valueRule" :disabled="sending" label="Value" required type="number"
                      @input="setFields($event, 'value')" :suffix="getValueSuffix"/>
      </v-col>
    </v-row>
    <v-alert v-if="sensorsLoaded && !sensors.raw.length" dense text type="error">
      You haven't got any sensors added. So the event cannot be set.
    </v-alert>

  </div>
</template>

<script>
import factories from "@/services/factories"
import util from "@/services/util"

export default {
  name: "EventSensorForm",
  props: {
    event: Object,
    sending: Boolean
  },
  data() {
    return {
      sensor: null,
      reading_type: null,
      rule: null,
      value: null,
      sensorRule: [
        v => !!v || 'Sensor is required'
      ],
      readingRule: [
        v => !!v || 'Reading type is required'
      ],
      ruleRule: [
        v => !!v || 'Rule is required'
      ],
      valueRule: [
        v => !!v || 'Reading value is required'
      ],

      rules: factories.getEventsRules(),
      sensors: {
        raw: [],
        form: []
      },
      selectedSensorType: null,
      sensorsLoaded: false,
    }
  },
  computed: {
    getSensorReadings() {
      if (!this.selectedSensorType) return
      return factories.getSensorReadingsTypesSelectForm(this.selectedSensorType)
    },
    getValueSuffix() {
      if (!this.selectedSensorType || !this.reading_type) return
      return factories.getSensorUnits(this.selectedSensorType, this.reading_type)
    }
  },
  methods: {
    setFields(value, name) {
      this.$emit('fields', {
        [name]: value
      })
    },
    setSensor(value) {
      const chosen = this.sensors.raw.filter((item) => {
        return item.pk === value
      })
      this.selectedSensorType = chosen[0].sensor_type
      this.setFields(value, 'sensor')
    },

  },
  mounted() {
    this.axios.get(`${util.apiUrl}/devices/details/?type=sensor`)
        .then((response) => {
          this.sensors = {
            form: util.convertDjangoArrayOfObjectsToSelectField(response.data),
            raw: response.data
          }
        })
        .catch((e) => {
          this.$store.commit('setMessage', {
            status: 'error',
            content: util.convertDjangoErrorToString(e.response.data)
          })
        })
        .finally(() => {
          this.sensorsLoaded = true
        })
  }
}
</script>

<style scoped>

</style>