<template>
<div>
    <v-text-field
        v-model="event.time"
        label="Select event time"
        prepend-icon="mdi-clock-time-four-outline"
        @focus="openPicker=true"
        @blur="openPicker=false"
        readonly
        :disabled="sending"
        @input="setTime($event)"
        required
        :rules="timeRules"
    ></v-text-field>

  <v-time-picker
      v-if="openPicker || !sending"
      v-model="event.time"
      format="24hr"
  ></v-time-picker>
</div>
</template>

<script>
export default {
  name: "EventTimeForm",
  props: {
    event: Object,
    sending: Boolean
  },
  data() {
    return {
      openPicker: false,
      attrs: null,
      timeRules: [
        v => !!v || 'Time is required'
      ]
    }
  },
  methods: {
    // :allowed-minutes="allowedStep"
    allowedStep: m => m % 10 === 0,
    setTime: value => {
      this.$emit('fields', {
        time: value
      })
    }
  }
}
</script>

<style scoped>

</style>