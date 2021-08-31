<template>
  <div>
    <v-row v-for="item in items" :key="item.pk" align="center">
      <v-col cols="12" md="6">
        {{ getName(item) }}
      </v-col>
      <v-col cols="12" md="6">
        <v-btn-toggle>
          <v-btn color="success" :to="getEditLink(item)">
            <v-icon color="white">
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn color="error" @click="toDelete(item.pk)">
            <v-icon color="white">
              mdi-delete
            </v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <confirmation-deletion
        :isOpen="confirm"
        :deleting="deleting"
        typeText="device"
        :confirmedCallback="callback"
        @cancel="cancelDelete"
        @confirm="deleteConfirmed"/>
  </div>
</template>

<script>
import ConfirmationDeletion from "@/components/ui/ConfirmationDeletion";

export default {
  name: "ItemsList",
  props: {
    items: Array,
    type: {
      type: String,
      default: 'devices'
    },
    deleting: {
      type: Boolean,
      default: false
    },
    callback: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ConfirmationDeletion
  },
  data() {
    return {
      confirm: false,
      toDeleteItem: null,
    }
  },
  methods: {
    getName(item) {
      switch (this.type) {
        case 'users':
          return item.username
        default:
          return item.name
      }
    },
    getEditLink(item) {
      switch (this.type) {
        case 'devices':
          return `/device/${item.pk}/edit`
      }
    },
    toDelete(id) {
      this.toDeleteItem = id
      this.confirm = true
    },
    deleteConfirmed() {
      this.$emit('deleteConfirmed', this.toDeleteItem)
    },
    cancelDelete() {
      this.toDeleteItem = null
      this.confirm = false
      this.$emit('closeWindow')
    }
  }
}
</script>

<style scoped>

</style>