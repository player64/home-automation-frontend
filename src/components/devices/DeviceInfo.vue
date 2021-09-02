<template>
  <div>
    <h1 class="mb-4">Device info</h1>
    <v-row>
      <v-col cols="12" xl="6" lg="7" md="9">
        <v-row v-for="(info, key) in infos" :key="key" :class="{'grey lighten-2': key % 2 === 0}">
          <v-col cols="6" v-html="info.name" class="pl-5"/>
          <v-col cols="6" v-html="info.data" class="font-weight-bold"/>
        </v-row>
        <v-btn class="mt-5" color="error" dark large @click="confirm = !confirm">
          Delete device
        </v-btn>
      </v-col>
    </v-row>
    <confirmation-deletion
        :isOpen="confirm"
        :deleting="deleting"
        typeText="device"
        :confirmedCallback="callBackConfirmation"
        @cancel="confirm = !confirm"
        @confirm="deleteDevice"/>
  </div>
</template>

<script>
import factories from '@/services/factories'
import util from "@/services/util"
import ConfirmationDeletion from '@/components/ui/ConfirmationDeletion'

export default {
  name: "DeviceInfo",
  props: {
    data: Object,
  },
  components: {
    ConfirmationDeletion
  },
  data() {
    return {
      confirm: false,
      deleting: false,
      callBackConfirmation: null
    }
  },
  computed: {
    infos() {
      const base = [
        {name: 'Device name', data: this.data.name},
        {name: 'Workspace', data: this.getWorkspaceNameById()},
        {name: 'Host device ID', data: this.data.device_host_id},
        {name: 'Device type', data: factories.getDeviceTypeReadableFormat(this.data.type)},
        {name: 'Last login', data: util.convertDate(this.data.updated_at)}
      ]

      switch (this.data.type) {
        case 'relay':
          base.push({
            name: 'GPIO pin', data: this.data.gpio
          })
          break
        case 'sensor':
          base.push({
            name: 'Sensor type', data: this.data.sensor_type
          })
          break
        default:
      }

      return base
    }
  },
  methods: {
    getWorkspaceNameById() {
      if (!this.data.workspace) return 'Not attached to any workspace'
      const filtered = this.data.workspaces.filter((item) => item.pk === this.data.workspace)
      return filtered[0].name
    },
    deleteDevice() {
      this.deleting = true
      this.axios.delete(`${util.apiUrl}/devices/${this.data.pk}/`)
          .then(() => {
            this.$store.commit('setMessage', {
              status: 'success',
              content: `The device ${this.data.name} has been deleted`
            })
            this.$store.commit('setDevices', [])
            this.$router.push({path: '/devices'})
          }).catch(() => {
        this.$store.commit('setMessage',  {
          text: 'An error has occurred. The device hasn\'t been deleted.',
          status: 'error',
        })
      }).finally(() => {
        this.deleting = false
      })
    }
  }
}
</script>

<style scoped>

</style>