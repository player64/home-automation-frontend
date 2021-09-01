<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-progress-linear indeterminate color="blue darken-2" v-if="sending"/>
      <v-text-field v-model="event.name" :rules="nameRules" :disabled="sending" label="Event name" required/>
      <v-select v-model="event.type" :rules="typeRules" :disabled="sending" label="Event type"
                :items="eventTypes"/>
      <event-time-form v-if="event.type==='time'" :event="event" :sending="sending" @fields="updateFields" />
      <event-sensor-form v-if="event.type==='sensor'" :event="event" :sending="sending"  @fields="updateFields"  />
      <v-switch
          v-model="event.action"
          :label="(event.action) ? 'ON' : 'OFF'"
      ></v-switch>
      <v-btn :disabled="!valid || sending" color="success" class="mr-4" @click="eventForm" large
             v-html="((eventData) ? 'Edit' : 'Add new') + ' event'"/>
    </v-form>
  </div>
</template>

<script>
import factories from "@/services/factories"

export default {
  name: "EventForm",
  props: {
    eventData: Object || null,
    deviceId: String
  },
  components: {
    EventTimeForm: () => import('./EventTimeForm'),
    EventSensorForm: () => import('./EventSensorForm')
  },
  data() {
    return {
      sending: false,
      valid: true,
      event: {
        name: null,
        device: this.deviceId,
        type: null,
        action: null,

        time: null,

        sensor: null,
        reading_type: null,
        rule: null,
        value: null,
      },
      nameRules: [
        v => !!v || 'Event name is required'
      ],
      typeRules: [
        v => !!v || 'Event type is required'
      ],
      eventTypes: factories.getEventsType()
    }
  },
  methods: {
    eventForm() {
      if (!this.$refs.form.validate()) return
    },
    updateFields(fields) {
      Object.keys(fields).map((key) => {
        if(key in this.event) {
          this.event[key] = fields[key]
        }
      })
    }
  },
  beforeMount() {
    if(this.eventData) {
      this.event = this.eventData
      this.event.action = (this.event.action === 'ON')
    }
  }
}
</script>

<style scoped>

</style>