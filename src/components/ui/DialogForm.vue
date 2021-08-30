<template>
  <v-dialog v-model="dialog" persistent :max-width="dialogWidth">
    <v-card>
      <v-card-title class="text-h5">
        {{title}}
      </v-card-title>

      <v-card-text>
        <component :is="formType" :details="objectData"
                   :shortForm="workspaceFormShort" @response="onResponse"></component>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="error" text @click="$emit('close')">
          close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
export default {
  name: "DialogForm",
  props: {
    formType: String,
    dialog: Boolean,
    title: String,
    objectData: Object || null,
    workspaceFormShort: Boolean
  },
  components: {
    WorkspaceForm: () => import('@/components/workspaces/WorkspaceForm'),
    DeviceForm: () => import('@/components/devices/DeviceForm'),
  },

  computed: {
    dialogWidth() {
      if(this.formType === 'DeviceForm') return 700
      return 320
    }
  },

  methods: {
    onResponse(data) {
      this.$emit('response', data)
    }
  }
}
</script>

<style scoped>

</style>