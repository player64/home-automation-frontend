<template>
  <div>
    <message/>
    <v-form ref="form" v-model="valid" lazy-validation>
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
import axios from "axios"
import util from "@/services/util"
import Message from "@/components/ui/Message"

export default {
  name: "WorkspaceForm",
  components: {
    Message
  },
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
        url = `${util.apiUrl}/devices/workspace/single/${this.details.pk}/`
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
        this.$store.commit('setMessage', {
          status: 'success',
          content: `The workspace has been ${statusString}`
        })

        // on new workspace creation redirect to the list
        if(!this.details && !this.shortForm) {
          this.$router.replace({path: '/workspaces'})
        }

      }).catch((error) => {
        this.$store.commit('setMessage', {
          status: 'error',
          content: util.convertDjangoErrorToString(error.response.data)
        })
      }).finally(() => {
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
    if (this.details) {
      this.name = this.details.name

      if (this.details.devices) {
        this.attachedDevices = this.details.devices.map((item) => {
          return item.pk
        })
      }
    }
  }
}
</script>

<style scoped>

</style>