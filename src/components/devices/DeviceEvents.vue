<template>
  <div>
    <h1 class="mb-4">Device events - {{ data.name }}</h1>
    <v-row>
      <v-col cols="12" xl="6" lg="7" md="9">
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
  beforeMount() {
    if ('events' in this.data) return
    this.events = this.data.events
  },
  methods: {
    deleteEvent(id) {
      console.log(id)
    }
  }
}
</script>

<style scoped>

</style>