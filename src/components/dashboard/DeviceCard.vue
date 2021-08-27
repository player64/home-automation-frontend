<template>
  <v-card class="pa-2" outlined>
    <v-card-title align="center">
      <v-btn :to="`/device/${device.pk}`" depressed x-large text color="primary" v-html="device.name" />

    </v-card-title>
    <v-card-text v-if="device.updated_at">
      Last updated at: {{util.convertDate(device.updated_at)}}
    </v-card-text>
    <v-divider class="pa-2" />
    <sensor-readings v-if="device.type === 'sensor'" :type="device.sensor_type" :readings="device.readings" />
    <relay-readings v-else-if="device.type === 'relay'" :readings="device.readings" :id="device.pk" />
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
      interval: null,
      util: util
    }
  },
  components: {
    SensorReadings,
    RelayReadings
  },
  methods: {
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