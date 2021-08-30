<template>
<div>
  <h1 class="mb-4">Device edit - {{data.name}}</h1>
  <v-row>
    <v-col cols="12" md="8" xl="5">
      <device-form :device="data" />
    </v-col>
  </v-row>
</div>
</template>

<script>
import DeviceForm from "@/components/devices/DeviceForm";

export default {
  name: "DeviceEdit",
  props: {
    data: Object,
  },
  components: {
    DeviceForm
  }
}
</script>

<style scoped>

</style>