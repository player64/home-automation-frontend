<template>
  <div>
    <h1 class="mb-4">Edit workspace</h1>
    <v-btn to="/workspaces" class="mt-5 mb-10">
      Back to workspace list
    </v-btn>
    <loader v-if="loading" text="Loading workspace ..."/>
    <v-row v-else-if="workspace">
      <v-col cols="12" md="8" xl="5">
        <workspace-form :details="workspace" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Loader from "@/components/ui/Loader"
import WorkspaceForm from "@/components/workspaces/WorkspaceForm"
import util from "@/services/util";
// import Message from "@/components/ui/Message";

export default {
  name: "WorkspaceEdit",
  components: {
    Loader,
    // Message,
    WorkspaceForm
  },
  computed: {
    workspaceId() {
      const id = this.$route.params.id
      if (isNaN(id)) {
        this.$router.replace({path: '/not-found'})
        return
      }
      return parseInt(id)
    }
  },
  data() {
    return {
      workspace: null,
      loading: true,
    }
  },
  methods: {
    getWorkspace() {
      const storeWorkspace = this.$store.getters.workspace
      if (storeWorkspace && 'pk' in storeWorkspace && storeWorkspace.pk === this.workspaceId) {
        this.workspace = storeWorkspace
        this.loading = false
        return
      }
      this.axios.get(`${util.apiUrl}/devices/workspace/single/${this.workspaceId}/`)
          .then((response) => {
            this.$store.commit('setTitle', `Workspace edit - ${response.data.name}`)
            this.workspace = response.data
            this.$store.commit('setWorkspace', this.workspace)
          })
          .catch((e) => {
            if (e.response.status === 404) {
              this.$router.replace({path: '/not-found'})
              return
            }
            this.$store.commit('setMessage', {
              status: 'error',
              content: util.convertDjangoErrorToString(e.response.data)
            })
          })
          .finally(() => {
            this.loading = false
          })
    }
  },
  mounted() {
    this.$store.commit('setTitle', "Workspace")
    if (isNaN(this.workspaceId)) {
      this.$router.replace({path: '/not-found'})
      return
    }
    this.getWorkspace()
  }
}
</script>

<style scoped>

</style>