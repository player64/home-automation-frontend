<template>
  <div>
    <v-alert v-if="msg.status" dense outlined text :type="msg.status">
      {{msg.content}}
    </v-alert>
    <v-form v-if="!sent" ref="form" v-model="valid" lazy-validation>
      <v-progress-linear indeterminate color="blue darken-2" v-if="sending"/>
      <v-text-field v-model="name" :rules="nameRules" :disabled="sending" label="Workspace name"
                    required/>

      <v-autocomplete
          v-if="!shortForm && devices.length"
          v-model="attachedDevices"
          :items="devices"
          dense
          chips
          label="Workspace devices"
          multiple
          solo
      ></v-autocomplete>

      <v-btn :disabled="!valid || sending" color="success" class="mr-4" @click="workspaceForm"
             v-html="((details) ? 'Edit' : 'create') + ' workspace'"/>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import util from "@/services/util";

export default {
  name: "WorkspaceForm",
  props: {
    details: Object || null,
    shortForm: Boolean
  },
  data() {
    return {
      sending: false,
      sent: false,
      valid: true,
      name: '',
      attachedDevices: [],
      devices: [],
      msg: {
        content: null,
        status: null
      },
      nameRules: [
        v => !!v || 'Workspace name is required'
      ]
    }
  },
  methods: {
    workspaceForm() {
      // axios({ method, url, data })
      if (!this.$refs.form.validate()) return
      this.sending = true
      let method = 'post'
      let url = `${util.apiUrl}/devices/workspaces/`
      let statusString = 'created'
      if (this.details) {
        method = 'put'
        url = `${url}single/${this.details.pk}/`
        statusString = 'updated'
      }

      this.axios({
        method: method,
        url: url,
        data: {
          name: this.name,
          devices: this.attachedDevices
        }
      }).then((response) => {
        this.$emit('response', response.data)
        this.sent = true
        this.msg = {
          status: 'success',
          content: `The workspace has been ${statusString}`
        }
      }).catch((error) => {
        this.msg = {
          status: 'error',
          content: util.convertDjangoErrorToString(error.response.data)
        }
      }).finally(()=>{
        this.sending = false
      })
    },
    getAllDevices() {
      axios.get(`${util.apiUrl}/devices/details/`)
          .then((response) => {
            this.devices = util.convertDjangoArrayOfObjectsToSelectField(response.data)
          })
    },
  },
  mounted() {
    this.getAllDevices()
  }
}
</script>

<style scoped>

</style>