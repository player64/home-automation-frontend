<template>
  <div class="mt-5">
    <v-btn class="mb-5" x-large color="success" to="/workspace/add">Add new workspace +</v-btn>
    <message :redirected="true"/>
    <loader v-if="loading" text="Loading workspaces ..."/>
    <items-list v-else-if="workspaces.length" :items="workspaces" :deleting="deleting" :callback="deleted"
                type="workspaces" @deleteConfirmed="deleteWorkspace" @closeWindow="deleted=false" class="mt-10"/>
    <v-alert v-else type="warning">
      No workspaces found.
    </v-alert>
  </div>
</template>

<script>
import ItemsList from "@/components/ui/ItemsList"
import util from "@/services/util"
import Message from "@/components/ui/Message"
import Loader from "@/components/ui/Loader"

export default {
  name: "Workspaces",
  components: {
    ItemsList,
    Loader,
    Message
  },
  data() {
    return {
      loading: true,
      deleting: false,
      deleted: false,
      workspaces: []
    }
  },
  methods: {
    deleteWorkspace(id) {
      this.deleting = true

      this.axios.delete(`${util.apiUrl}/devices/workspace/${id}/`)
          .then(() => {
            this.workspaces = this.workspaces.filter((value) => {
              return value.pk !== id
            })

            this.$store.commit('setMessage', {
              status: 'success',
              content: 'The workspace has been deleted'
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
    this.$store.commit('setTitle', "Workspaces")

    this.axios.get(`${util.apiUrl}/devices/workspaces/`)
        .then((response) => {
          this.workspaces = response.data
        })
        .finally(() => {
          this.loading = false
        })
  }
}
</script>

<style scoped>

</style>