<template>
  <div>
      <loader v-if="loading" />
  </div>
</template>

<script>
import Loader from '../components/ui/Loader'
import util from "@/services/util";
export default {
  name: "Dashboard",
  components: {
    Loader
  },
  data: () => {
    return {
      loading: true,
      devices: null,
      workspaces: null
    }
  },
  mounted() {
    this.$store.commit('setTitle', "Dashboard")

    this.axios.get(`${util.apiUrl}/devices/dashboard/`)
        .then((response) => {
          this.loading = false
          console.log(response)
        })
  },
}
</script>

<style scoped>

</style>