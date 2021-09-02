<template>
<div class="mt-5">
  <h1 class="mb-4">Add device event {{(device) ? ' - ' + device.name : ''}}</h1>

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
      return parseInt(this.$route.params.deviceId)
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
    getDeviceDetails() {
      this.axios.get(`${util.apiUrl}/devices/single/${this.deviceId}/`)
          .then((response) => {
            this.$store.commit('setTitle', `Device event - ${response.data.name}`)
            this.device = response.data
            if(this.device.type !== 'relay') {
              this.$store.commit('setMessage', {
                status: 'error',
                content: `You cannot set event for ${this.device.type}.`
              })
              this.valid = false
            }
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