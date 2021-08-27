<template>
  <v-bottom-sheet v-model="isOpen" persistent>
    <v-sheet class="text-center" height="150px">
      <div v-if="confirmedCallback">
        <v-alert
            dense
            :type="confirmedCallback.status"
        >
          {{confirmedCallback.text}}
        </v-alert>

        <v-btn
            v-if="confirmedCallback.status === 'success' &&(confirmedCallback.backLink.text && confirmedCallback.backLink.path)"
            depressed
            :to="confirmedCallback.backLink.path"
            v-html="confirmedCallback.backLink.text"
            color="primary" />
        <v-btn
            v-else
            class="ma-1"
            color="primary"
            text
            @click="$emit('cancel')">Close this window</v-btn>
      </div>

      <div v-else>
        <div class="text-body-2 pt-6 mb-4">
          Are you sure to delete this {{typeText}}?
        </div>

        <v-btn
            :disabled="deleting"
            class="ma-1"
            color="primary"
            text
            @click="$emit('cancel')"
        >
          Cancel
        </v-btn>

        <v-btn
            :loading="deleting"
            class="ma-1"
            color="error"
            text
            @click="$emit('confirm')"
        >
          Delete
        </v-btn>
      </div>
    </v-sheet>

  </v-bottom-sheet>
</template>

<script>
export default {
  name: "ConfirmationDeletion",
  props: {
    isOpen: Boolean,
    typeText: String,
    deleting: Boolean,
    confirmedCallback: {
      type: Object,
      default: null
    }
  },
}
</script>

<style scoped>

</style>