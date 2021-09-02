<template>
  <div class="mt-5">
    <v-btn class="mb-5" x-large color="success" to="/user/add">Add new user +</v-btn>
    <message :redirected="true"/>
    <loader v-if="loading" text="Loading users ..."/>
    <items-list v-else-if="users.length" :items="users" :deleting="deleting" :callback="deleted"
                type="users" @deleteConfirmed="deleteUser" @closeWindow="deleted=false" class="mt-10"/>
    <v-alert v-else type="warning">
      No users found.
    </v-alert>
  </div>
</template>

<script>
import ItemsList from "@/components/ui/ItemsList";
import Loader from "@/components/ui/Loader";
import Message from "@/components/ui/Message";
import util from "@/services/util";

export default {
  name: "Users",
  components: {
    ItemsList,
    Loader,
    Message
  },
  data() {
    return {
      loading: true,
      deleting: false,
      deleted: false,
      users: this.$store.getters.users
    }
  },
  methods: {
    deleteUser(id) {
      this.deleting = true
      this.axios.delete(`${util.apiUrl}/users/detail/${id}/`)
          .then(() => {
            this.users = this.users.filter((value) => {
              return value.pk !== id
            })
            this.$store.commit('setUsers', this.users)
            this.deleted = true
            this.$store.commit('setMessage', {
              status: 'success',
              content: 'The users has been deleted'
            })
          })
          .catch((e) => {
            this.$store.commit('setMessage', {
              status: 'error',
              content: util.convertDjangoErrorToString(e.response.data)
            })
          })
          .finally(() => {
            this.deleted = true
            this.deleting = false
          })
    }
  },
  mounted() {
    this.$store.commit('setTitle', "Users")
    if(this.users.length) {
      this.loading = false
      return
    }
    this.axios.get(`${util.apiUrl}/users/`)
        .then((response) => {
          this.users = response.data
          this.$store.commit('setUsers', this.users)
        })
        .catch((e) => {
          this.$store.commit('setMessage', {
            status: 'error',
            content: util.convertDjangoErrorToString(e.response.data)
          })
        })
        .finally(() => {
          this.loading = false
        })
  }
}
</script>

<style scoped>

</style>