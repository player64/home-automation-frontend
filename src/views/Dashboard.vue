<template>
  <div>
      <loader v-if="loading" />
      <div v-else>
        <workspace-list :items="workspaces" @fetchWorkspaceDevices="getWorkspaceDevices" />
        <loader v-if="loadingDevices" />
        <div v-else>
          <v-divider class="ma-5" />
          <device-list v-if="sensors.length" :devices="sensors" />
          <v-alert v-else class="ma-4" type="warning" v-html="noDevicesWarning('sensors')" />
          <v-divider class="ma-5" />
          <device-list v-if="relays.length" :devices="relays" />
          <v-alert v-else class="ma-4" type="warning" v-html="noDevicesWarning('relays')" />
        </div>
      </div>
  </div>
</template>

<script>
import Loader from '../components/ui/Loader'
import WorkspaceList from '../components/dashboard/WorkspaceList'
import DeviceList from '../components/dashboard/DeviceList'

import util from "@/services/util";
export default {
  name: "Dashboard",
  components: {
    Loader,
    WorkspaceList,
    DeviceList,
  },
  data: () => {
    return {
      loading: true,
      loadingDevices: false,
      relays: [],
      sensors: [],
      workspaces: []
    }
  },
  methods: {
    getWorkspaceDevices(workspace_id) {
      this.loadingDevices = true
      this.axios.get(`${util.apiUrl}/devices/dashboard/?workspace=${workspace_id}`)
          .then((response) => {
            this.relays = response.data.devices.relays
            this.sensors = response.data.devices.sensors
            this.loadingDevices = false
          })
    },
    noDevicesWarning(type) {
      const base = 'It looks that you don\'t have any ' + type
      if(this.workspaces.length) {
        return `${base} attached to this workspace.`
      } else {
        return `${base} defined in the system.`
      }
    }
  },
  mounted() {
    this.$store.commit('setTitle', "Dashboard")

    this.axios.get(`${util.apiUrl}/devices/dashboard/`)
        .then((response) => {
          this.loading = false
          this.relays = response.data.devices.relays
          this.sensors = response.data.devices.sensors
          this.workspaces = response.data.workspaces
        })
  },
}
</script>

<style scoped>

</style>