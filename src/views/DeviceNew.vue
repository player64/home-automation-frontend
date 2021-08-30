<template>
  <div>
    <h1 class="mb-4">Add new device</h1>
    <v-row>
      <v-col cols="12" md="8" xl="5">
        <device-form />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DeviceForm from "@/components/devices/DeviceForm";

export default {
  name: "DeviceNew",
  components: {
    DeviceForm
  },
  mounted() {
    this.$store.commit('setTitle', "Add new device")
  }
}
</script>

<style scoped>

</style>