<template>
  <v-card class="pa-2" outlined>
    <v-card-title align="center">
      <router-link :to="`/device/${device.pk}`" v-html="device.name"></router-link>
    </v-card-title>
    <v-card-text v-if="device.updated_at">
      Last updated at: {{convertDate(device.updated_at)}}
    </v-card-text>
    <v-divider class="pa-2" />
    <sensor-readings v-if="device.type === 'sensor'" :type="device.sensor_type" :readings="device.readings" />
    <relay-readings v-else-if="device.type === 'relay'" :readings="device.readings" />
  </v-card>
</template>

<script>
import SensorReadings from "./SensorReadings"
import RelayReadings from "./RelayReadings"
import util from "@/services/util";
export default {
  name: "DeviceCard",
  props: {
    device: Object,
  },
  data: () => {
    return {
      interval: null
    }
  },
  components: {
    SensorReadings,
    RelayReadings
  },
  methods: {
    convertDate(date) {
      return new Date(date).toLocaleDateString(
          'en-gb',
          {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'Europe/Dublin'
          }
      );
    },
    getReadings() {
      this.axios.get(`${util.apiUrl}/devices/readings/${this.device.pk}/`)
          .then((response) => {
            this.device.readings = response.data.readings
            this.device.updated_at = response.data.updated_at
          }).catch((e) => {
            console.error(e)
      })

    }
  },
  mounted() {
    const threeMinutes = 1000 * 60 * 3
    this.interval = setInterval(() => {
      this.getReadings()
    }, threeMinutes)

  },
  destroyed() {
    if(this.interval) clearInterval(this.interval)
  }
}
</script>

<style scoped>

</style>