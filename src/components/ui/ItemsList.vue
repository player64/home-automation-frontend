<template>
  <div>
    <v-row>
      <v-col cols="12" md="8" xl="6">
        <v-row v-for="(item, key) in items" :key="item.pk" align="center" :class="{'grey lighten-3': key % 2 !== 0}">
          <v-col cols="6" md="8" lg="10">
            <v-btn :to="getItem(item).viewLink"
                   depressed x-large text color="primary" v-html="getItem(item).name"/>
          </v-col>
          <v-col cols="6" md="4" lg="2">
            <v-btn-toggle>
              <v-btn color="success" :to="getItem(item).editLink">
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
            :typeText="getItem()"
            :confirmedCallback="callback"
            @cancel="cancelDelete"
            @confirm="deleteConfirmed"/>
      </v-col>
    </v-row>
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
    getItem(item) {
      switch (this.type) {
        case 'devices':
          return (item) ? {
            name: item.name,
            viewLink: `/device/${item.pk}/info`,
            editLink: `/device/${item.pk}/edit`,
          } : 'device'
        case 'workspaces':
          return (item) ? {
            name: item.name,
            viewLink: `/workspace/edit/${item.pk}/`,
            editLink: `/workspace/edit/${item.pk}/`,
            dialogString: 'workspace'
          } : 'workspace'
        case 'users':
          return (item) ? {
            name: item.username,
            viewLink: `/user/${item.pk}`,
            editLink: `/user/${item.pk}`,
          } : 'user'
        default:
          throw new Error(`This type: ${this.type} in Item List is not supported`)
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