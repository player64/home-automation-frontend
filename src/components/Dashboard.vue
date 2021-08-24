<template>
<div>Dashboard</div>
</template>

<script>
export default {
  name: "Dashboard",
  mounted() {
    this.$store.commit('setTitle', "Dashboard")
  },
}
</script>

<style scoped>

</style>