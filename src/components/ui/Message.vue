<template>
  <v-alert v-if="message.status && message.content" dense outlined text :type="message.status" dismissible @close="closeMessage">
    {{message.content}}
  </v-alert>
</template>

<script>
export default {
  name: "Message",
  props: {
    redirected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    message() {
      return this.$store.getters.message
    }
  },
  methods: {
    closeMessage() {
      console.log('closed')
      this.$store.commit('clearMessage')
    }
  },
  mounted() {
    if(!this.redirected) {
      this.$store.commit('clearMessage')
    }
  },
  destroyed() {
    if(this.redirected) {
      this.$store.commit('clearMessage')
    }
  }
}
</script>

<style scoped>

</style>