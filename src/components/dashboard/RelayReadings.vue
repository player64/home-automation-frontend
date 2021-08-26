<template>
  <div>
    <v-switch
        v-model="state"
        :label="(state) ? 'ON' : 'OFF'"
        :disabled="this.error"
        v-on:change="relaySwitch"
    ></v-switch>
    <v-alert v-if="!readings" type="warning">No readings found.</v-alert>
    <v-alert v-if="error" type="error" v-html="`${error}. This is permanent error.`" />
  </div>

</template>

<script>
import util from "@/services/util";

export default {
  name: "RelayReadings",
  props: {
    readings: Object || null,
    id: Number,
  },
  data: () => {
    return {
      state: false,
      error: false,
    }
  },
  methods: {
    relaySwitch() {
      this.axios.post(`${util.apiUrl}/devices/device-state/${this.id}/`, {
        state: (this.state) ? 'on' : 'off'
      }).then((response)=>{
        this.state = (response.data.state === 'on')
      }).catch((e)=>{
            if('response' in e) {
              this.error = e.response.data.error
            }
            this.state = false
      })
    },
  },
  mounted() {
    if(this.readings && 'state' in this.readings) {
      this.state = (this.readings.state === 'ON')
    }
  }
}
</script>

<style scoped>

</style>