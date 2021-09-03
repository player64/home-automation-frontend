<template>
  <div>
    <message/>
    <v-form v-if="!sent" ref="form" v-model="valid" lazy-validation>
      <v-progress-linear indeterminate color="blue darken-2" v-if="sending"/>
      <v-text-field v-model="form.name" :rules="nameRules" :disabled="sending" label="Device name" required/>
      <v-text-field v-model="form.device_host_id" :rules="deviceHostIdRules" :disabled="sending" label="Device host ID"
                    required/>
      <v-select v-model="form.type" :rules="typeRules" :disabled="sending" label="Device type" :items="deviceTypes"/>
      <v-select v-if="form.type === 'sensor'" v-model="form.sensor_type" :rules="sensorTypeRules"
                :disabled="sending" label="Sensor type" :items="sensorTypes"/>
      <v-text-field v-if="form.type === 'relay'" v-model="form.gpio" :rules="gpioRules" :disabled="sending"
                    label="GPIO pin number" type="number"/>

      <v-select v-model="form.firmware" :rules="firmwareRules" :disabled="sending" label="Device firmware"
                :items="firmwares"/>
      <v-row align="center">
        <v-col cols="12" md="8">
          <v-select v-model="form.workspace" :disabled="sending" label="Workspace" :items="workspaces"/>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn color="primary" text @click="openDialog = true">
            add new workspace +
          </v-btn>
        </v-col>
      </v-row>

      <dialog-form form-type="WorkspaceForm" title="Create new workspace"
                   :dialog="openDialog" :object-data="null" :workspaceFormShort="true"
                   @response="pushCreatedWorkspace"
                   @close="openDialog=false"/>

      <v-spacer/>
      <v-btn :disabled="!valid || sending" color="success" class="mr-4" @click="deviceForm" large
             v-html="((device) ? 'Edit' : 'Add') + ' device'"/>
    </v-form>
  </div>
</template>

<script>
import factories from "@/services/factories"
import axios from "axios"
import util from "@/services/util"
import DialogForm from "@/components/ui/DialogForm"
import Message from "@/components/ui/Message"

export default {
  name: "DeviceForm",
  props: {
    device: Object || null
  },
  components: {
    DialogForm,
    Message
  },
  data() {
    return {
      sending: false,
      sent: false,
      openDialog: false,
      valid: true,
      form: {
        name: '',
        device_host_id: '',
        type: '',
        firmware: '',
        gpio: 0,
        sensor_type: '',
        workspace: '',
      },

      nameRules: [
        v => !!v || 'Device name is required'
      ],
      deviceHostIdRules: [
        v => !!v || 'Device host ID is required'
      ],
      typeRules: [
        v => !!v || 'Device type is required'
      ],
      firmwareRules: [
        v => !!v || 'Device firmware is required'
      ],
      gpioRules: [
        v => (v >= 0) || 'GPIO pin number must be between 0 and 20'
      ],
      sensorTypeRules: [
        v => !!v || 'Sensor type is required'
      ],

      workspaces: this.$store.getters.workspaces,
      firmwares: [],
      sensorTypes: [],
      deviceTypes: []
    }
  },
  methods: {
    deviceForm() {
      if (!this.$refs.form.validate()) return
      // clear fields based on device type
      switch (this.form.type) {
        case 'sensor':
          this.form.gpio = null
          break
        case 'relay':
          this.form.sensor_type = null
          break
        default:
          throw new Error('Invalid device type')
      }
      let url = `${util.apiUrl}/devices`
      let method = 'post'
      let statusString = 'created'

      if (this.device) {
        url += `/${this.device.pk}/`
        method = 'put'
        statusString = 'updated'
      } else {
        url += '/details/'
      }
      this.sending = true
      this.axios({
        method: method,
        url: url,
        data: this.form
      })
          .then(() => {
            this.$store.commit('setMessage', {
              status: 'success',
              content: `The device has been ${statusString}`
            })
            // clear store
            this.$store.commit('setDevice', null)
            this.$store.commit('setDevices', [])
            // if new device redirect to devices route
            if (!this.device) {
              this.sent = true
              this.$router.replace({path: '/devices'})
            }
          })
          .catch((error) => {
            this.$store.commit('setMessage', {
              status: 'error',
              content: util.convertDjangoErrorToString(error.response.data)
            })
          })
          .finally(() => {
            this.sending = false
          })
    },
    pushCreatedWorkspace(data) {
      this.form.workspace = data.pk
      this.workspaces.push(util.convertDjangoObjectToSelectField(data))
      // close dialog after 1 second
      setTimeout(() => {
        this.openDialog = false
      }, 1000)
    }
  },
  mounted() {
    if (this.device) {
      this.form.name = this.device.name
      this.form.device_host_id = this.device.device_host_id
      this.form.type = this.device.type
      this.form.firmware = this.device.firmware
      this.form.gpio = this.device.gpio
      this.form.sensor_type = this.device.sensor_type
      this.form.workspace = this.device.workspace.pk
    }

    // add firmwares and sensor types
    this.firmwares = factories.getFirmwareList()
    this.sensorTypes = factories.sensorTypes
    this.deviceTypes = factories.getDeviceTypeList()

    if (this.workspaces.length) {
      this.workspaces = util.convertDjangoArrayOfObjectsToSelectField(this.workspaces)
      return
    }
    // get workspace list
    axios.get(`${util.apiUrl}/devices/workspaces/`)
        .then((response) => {
          this.workspaces = util.convertDjangoArrayOfObjectsToSelectField(response.data)
          this.$store.commit('setWorkspaces', response.data)
        })
  }
}
</script>

<style scoped>

</style>