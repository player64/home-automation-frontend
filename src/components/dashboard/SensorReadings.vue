<template>
  <div>
    <v-row v-if="readings && readingKeys" align-content="center">
      <v-col v-for="(reading, k) in readingKeys" :key="k" class="text-center">
        {{ reading.key }} <br>
        <h1 v-html="displayReading(reading)" />
      </v-col>
    </v-row>
    <v-alert v-else type="warning">No readings</v-alert>
  </div>
</template>

<script>
import factories from '@/services/factories'

export default {
  name: "SensorReadings",
  props: {
    type: String,
    readings: Object || null,
  },
  computed: {
    readingKeys() {
      return factories.getSensorReadingsByType(this.type)
    }
  },
  methods: {
    displayReading(reading) {
      const _readingValue = this.readings[reading.key]
      if(typeof _readingValue === 'undefined') {
        return null
      }
      return _readingValue + reading.units
    }
  },
}
</script>

<style scoped>

</style>