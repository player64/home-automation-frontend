<template>
  <div>
    <h1 class="mb-4">Device events - {{ data.name }}</h1>
    <v-row>
      <v-col cols="12" xl="6" lg="10" md="11">
        <v-btn class="mb-5" x-large color="success" :to="`/event/add/${data.pk}`">Add new event +</v-btn>
        <message :redirected="true"/>
        <items-list v-if="events.length" :items="events" :deleting="deleting" :callback="deleted"
                    type="events" @deleteConfirmed="deleteEvent" @closeWindow="deleted=false" class="mt-10"/>
        <v-alert v-else type="warning">
          No device's event found.
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ItemsList from "@/components/ui/ItemsList"
import Message from "@/components/ui/Message"
import util from "@/services/util";

export default {
  name: "DeviceEvents",
  props: {
    data: Object,
  },
  components: {
    ItemsList,
    Message
  },
  data() {
    return {
      loading: true,
      deleting: false,
      deleted: false,
      events: []
    }
  },
  methods: {
    deleteEvent(id) {
      this.deleting = true
      this.axios.delete(`${util.apiUrl}/devices/event/${id}/`)
          .then(() => {
            this.events = this.events.filter((value) => {
              return value.pk !== id
            })
            this.$store.commit('setMessage', {
              status: 'success',
              content: 'The event has been deleted'
            })
          })
          .catch((e) => {
            this.$store.commit('setMessage', {
              status: 'error',
              content: util.convertDjangoErrorToString(e.response.data)
            })
          })
          .finally(() => {
            this.deleted = true
            this.deleting = false
          })
    }
  },
  mounted() {
    this.axios.get(`${util.apiUrl}/devices/events/${this.data.pk}/`)
      .then((response) => {
        this.events = response.data
      })
      .catch((e) => {
        this.$store.commit('setMessage', {
          status: 'error',
          content: util.convertDjangoErrorToString(e.response.data)
        })
      })
  }
}
</script>

<style scoped>

</style>