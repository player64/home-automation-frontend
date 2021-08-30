<template>
<div>
  <workspace-form />
</div>
</template>

<script>
import WorkspaceForm from "@/components/workspaces/WorkspaceForm";

export default {
  name: "Workspaces",
  components: {
    WorkspaceForm
  },
  beforeMount() {
    this.$store.commit('setTitle', "Workspaces")
  }
}
</script>

<style scoped>

</style>