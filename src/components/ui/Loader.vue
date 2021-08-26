<template>
  <div class="progress">
    <v-progress-circular
        indeterminate
        color="primary" />
    <div v-html="text"/>
  </div>
</template>

<script>

export default {
  name: "loader",
  props: {
    text: {
      type: String,
      default: 'Loading...'
    },
  }
}
</script>

<style scoped>
.progress {
  margin-top: 4rem;
  text-align: center;
}
</style>