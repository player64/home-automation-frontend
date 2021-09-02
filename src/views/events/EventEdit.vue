<template>
<div class="mt-5">
  <loader v-if="loading" text="Loading event ..."/>
  <div v-else-if="event">
    <h1 class="mb-4">Edit device event</h1>
    <v-btn :to="`/device/${event.device}/event/`" class="mt-5 mb-10">
      Back to the device
    </v-btn>
    <v-row>
      <v-col cols="12" md="8" xl="5">
        <message />
        <event-form :eventData="event" :deviceId="event.device" />
      </v-col>
    </v-row>
  </div>
</div>
</template>

<script>
import util from "@/services/util"
import Loader from "@/components/ui/Loader"
import EventForm from "@/components/events/EventForm"
import Message from "@/components/ui/Message";

export default {
  name: "EventEdit",
  components: {
    Loader,
    EventForm,
    Message
  },
  data() {
    return {
      event: null,
      loading: true
    }
  },
  computed: {
    eventId() {
      const id = this.$route.params.id
      if (isNaN(id)) {
        this.$router.replace({path: '/not-found'})
        return
      }
      return parseInt(id)
    }
  },
  mounted() {
    this.$store.commit('setTitle', `Edit event`)

    const storeEvent = this.$store.getters.event
    if (storeEvent && 'id' in storeEvent && storeEvent.id === this.eventId) {
      this.event = storeEvent
      this.loading = false
      return
    }

    this.axios.get(`${util.apiUrl}/devices/event/${this.eventId}`)
        .then((response) => {
          this.event = response.data
          this.$store.commit('setEvent', this.event)
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
}
</script>

<style scoped>

</style>