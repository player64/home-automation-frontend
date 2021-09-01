<template>
  <div class="mt-5">
    <v-btn class="mb-5" x-large color="success" to="/device/add">Add new device +</v-btn>
    <message :redirected="true"/>
    <loader v-if="loading" text="Loading devices ..."/>
    <items-list v-else-if="devices.length" :items="devices" :deleting="deleting" :callback="deleted"
                @deleteConfirmed="deleteDevice" @closeWindow="deleted=false" class="mt-10"/>
    <v-alert v-else type="warning">
      No devices found.
    </v-alert>
  </div>
</template>

<script>
import ItemsList from "@/components/ui/ItemsList"
import util from "@/services/util"
import Message from "@/components/ui/Message"
import Loader from "@/components/ui/Loader"

export default {
  name: "Devices",
  components: {
    // DialogForm,
    ItemsList,
    Loader,
    Message
  },
  data() {
    return {
      loading: true,
      deleting: false,
      deleted: false,
      devices: []
    }
  },
  methods: {
    deleteDevice(id) {
      this.deleting = true

      this.axios.delete(`${util.apiUrl}/devices/${id}`)
          .then(() => {
            this.devices = this.devices.filter((value) => {
              return value.pk !== id
            })
            this.$store.commit('setMessage', {
              status: 'success',
              content: 'The device has been deleted'
            })
          })
          .catch((e) => {
            this.$store.commit('setMessage', {
              status: 'error',
              content: util.convertDjangoErrorToString(e.response.data)
            })
          })
          .finally(() => {
            this.deleted = true
            this.deleting = false
          })
    }
  },
  mounted() {
    this.$store.commit('setTitle', "Devices")
    this.axios.get(`${util.apiUrl}/devices/details/`)
        .then((response) => {
          this.devices = response.data
        })
        .finally(() => {
          this.loading = false
        })
  }
}
</script>

<style scoped>

</style>