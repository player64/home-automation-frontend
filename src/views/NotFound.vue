<template>
  <div class="text-center">
    <h1 class="text--primary">404</h1>
    <div class="ma-5">
      It looks that nothing was found at this location
    </div>

    <v-btn color="primary" elevation="2" x-large to="/">Go back to the dashboard</v-btn>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  mounted() {
    this.$store.commit('setTitle', "Not Found")
  }
}
</script>

<style scoped>
h1 {
  margin-top: 5rem;
  font-size: 9rem;
  line-height: 6rem;
}
</style>