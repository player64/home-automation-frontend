<template>
<div>
  <v-select v-model="rule" :rules="ruleRule" :disabled="sending" label="Event rule" :items="rules"/>
  <v-text-field v-model="value" :rules="valueRule"  :disabled="sending" label="Value" required type="number"
                @input="setFields($event, 'value')" />
</div>
</template>

<script>
import factories from "@/services/factories"
export default {
  name: "EventSensorForm",
  props: {
    event: Object,
    sending: Boolean
  },
  data() {
    return {
      sensor: null,
      reading_type: null,
      rule: null,
      value: null,
      sensorRule: [
        v => !!v || 'Reading value is required'
      ],
      ruleRule: [
        v => !!v || 'Rule is required'
      ],
      valueRule: [
        v => !!v || 'Reading value is required'
      ],

      rules: factories.getEventsRules()
    }
  },
  methods: {
    setFields(value, name) {
      this.$emit('fields', {
        [name]: value
      })
    }
  }
}
</script>

<style scoped>

</style>