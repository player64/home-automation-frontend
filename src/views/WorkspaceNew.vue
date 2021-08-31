<template>
  <div>
    <h1 class="mb-4">Add new workspace</h1>
    <v-btn to="/workspaces" class="mt-5 mb-10">
      Back to workspace list
    </v-btn>

    <v-row>
      <v-col cols="12" md="8" xl="5">
        <workspace-form />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import WorkspaceForm from "@/components/workspaces/WorkspaceForm"

export default {
  name: "WorkspaceNew",
  components: {
    WorkspaceForm
  },
  mounted() {
    this.$store.commit('setTitle', "Add new workspace")
  }
}
</script>

<style scoped>

</style>