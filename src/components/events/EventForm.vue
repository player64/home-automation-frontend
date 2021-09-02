<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-progress-linear indeterminate color="blue darken-2" v-if="sending"/>
      <v-text-field v-model="event.name" :rules="nameRules" :disabled="sending" label="Event name" required/>
      <v-select v-model="event.type" :rules="typeRules" :disabled="sending" label="Event type"
                @input="changeEventType($event)" :items="eventTypes"/>
      <component :is="this.formType" :event="event" :sending="sending" @fields="updateFields"/>
      <v-switch
          :disabled="sending"
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
import util from "@/services/util";

export default {
  name: "EventForm",
  props: {
    eventData: Object || null,
    deviceId: Number,
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
      formType: null,
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
    changeEventType(value) {
        const components = {
          time: 'EventTimeForm',
          sensor: 'EventSensorForm'
        }
        if(!(value in components)) {
          throw new Error(`There is not component defined for this type: ${value}`)
        }
        this.formType = components[value]
    },
    eventForm() {
      if (!this.$refs.form.validate()) return
      this.sending = true
      // clear fields based on event type
      const fieldsToClear = {
        time: ['sensor', 'reading_type', 'rule', 'value'],
        sensor: ['time']
      }

      fieldsToClear[this.event.type].map((item) => {
        this.event[item] = null
      })

      this.event.action = (this.event.action) ? 'ON' : 'OFF'

      this.axios.post(`${util.apiUrl}/devices/event/`, this.event)
        .then(()=>{
          this.$store.commit('setMessage', {
            status: 'success',
            content: `Event has been set`
          })
          this.$router.replace({path: `/device/${this.deviceId}/event`})
        })
        .catch((e) => {
          this.$store.commit('setMessage', {
            status: 'error',
            content: util.convertDjangoErrorToString(e.response.data)
          })
        })
        .finally(() => {
          this.sending = false
        })
    },
    updateFields(fields) {
      Object.keys(fields).map((key) => {
        if (key in this.event) {
          this.event[key] = fields[key]
        }
      })
    }
  },
  beforeMount() {
    if (this.eventData) {
      this.event = this.eventData
      this.event.action = (this.event.action === 'ON')
    }
  }
}
</script>

<style scoped>

</style>