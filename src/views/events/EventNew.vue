<template>
<div class="mt-5">
  <h1 class="mb-4">Add device event {{(device) ? ' - ' + device.name : ''}}</h1>
  <v-btn :to="`/device/${deviceId}/event/`" class="mt-5 mb-10">
    Back to the device
  </v-btn>
  <v-row>
    <v-col cols="12" md="8" xl="5">
      <message />
      <event-form v-if="valid" :deviceId="deviceId" />
    </v-col>
  </v-row>
</div>
</template>

<script>
import util from "@/services/util"
import Message from "@/components/ui/Message"
import EventForm from "@/components/events/EventForm"

export default {
  name: "EventNew",
  components: {
    Message,
    EventForm
  },
  computed: {
    deviceId() {
      const id = this.$route.params.deviceId
      if (isNaN(id)) {
        this.$router.replace({path: '/not-found'})
        return
      }
      return parseInt(id)
    },
  },
  data() {
    return {
      device: {
        name: null
      },
      valid: true,
    }
  },
  methods: {
    warnSensorMessage() {
      if(this.device.type !== 'relay') {
        this.$store.commit('setMessage', {
          status: 'error',
          content: `You cannot set event for ${this.device.type}.`
        })
        this.valid = false
      }
    },
    getDeviceDetails() {
      // return from store if the device was set previously
      const storeDevice = this.$store.getters.device
      if (storeDevice && 'pk' in storeDevice && storeDevice.pk === this.deviceId) {
        this.device = storeDevice
        this.loading = false
        this.warnSensorMessage()
        return
      }
      this.axios.get(`${util.apiUrl}/devices/single/${this.deviceId}/`)
          .then((response) => {
            this.$store.commit('setTitle', `Device event - ${response.data.name}`)
            this.device = response.data
            this.warnSensorMessage()
          })
          .catch((e) => {
            if (e.response.status === 404) {
              this.$router.replace({path: '/not-found'})
              return
            }
            this.$store.commit('setMessage', {
              status: 'error',
              content: util.convertDjangoErrorToString(e.response.data)
            })
          })
          .finally(() => {
            this.loading = false
          })
    }
  },
  mounted() {
    this.getDeviceDetails()
  }
}
</script>

<style scoped>

</style>