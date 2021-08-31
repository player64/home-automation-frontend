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
      return this.$route.params.id
    }
  },
  data() {
    return {
      workspace: null,
      loading: false,
    }
  },
  methods: {
    getWorkspace() {
      this.axios.get(`${util.apiUrl}/devices/workspace/single/${this.workspaceId}/`)
          .then((response) => {
            this.$store.commit('setTitle', `Workspace - ${response.data.name}`)
            this.workspace = response.data
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
      this.$router.push({path: '/not-found'})
      return
    }
    this.getWorkspace()
  }
}
</script>

<style scoped>

</style>