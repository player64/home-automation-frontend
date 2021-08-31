<template>
  <div>
    <v-row v-if="items.length" align-content="center" justify="center">
      <v-col v-for="(item, key) in items" :key="key" cols="auto">
        <v-card class="mt-2" outlined :dark="(key===current)" hover ripple @click="goWorkspace(item.pk, key)">
          <v-card-title v-html="item.name" />
        </v-card>
      </v-col>
    </v-row>
    <v-alert v-else class="mt-4" type="warning">
      It looks that you haven't defined any workspaces you can add a new workspace <router-link to="/workspace/add">here</router-link>
      to group your devices
    </v-alert>
  </div>

</template>

<script>
export default {
  name: "WorkspaceList",
  props: {
    items: Array
  },
  data: () => {
    return {
      current: 0
    }
  },
  methods: {
    goWorkspace(id, key) {
      if(this.current === key) return
      this.current = key
      this.$emit('fetchWorkspaceDevices', id)
    }
  },
}
</script>

<style scoped>

</style>