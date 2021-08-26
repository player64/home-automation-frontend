<template>
    <v-row>
      <v-col v-for="device in devices" :key="device.pk" cols="12" sm="6" md="4" xl="2">
        <device-card :device="device" />
      </v-col>
    </v-row>
</template>

<script>
import DeviceCard from './DeviceCard'
export default {
  name: "DeviceList",
  props: {
    devices: Array
  },
  components: {
    DeviceCard
  },
}
</script>

<style scoped>

</style>