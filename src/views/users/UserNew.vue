<template>
<div>
  <h1 class="mb-4">Add new user</h1>
  <v-btn to="/users" class="mt-5 mb-10">
    Back to user list
  </v-btn>

  <v-row>
    <v-col cols="12" md="8" xl="5">
      <message />
      <user-form />
    </v-col>
  </v-row>
</div>
</template>

<script>
import UserForm from "@/components/users/UserForm"
import Message from "@/components/ui/Message";

export default {
  name: "UserNew",
  components: {
    UserForm,
    Message
  },
  mounted() {
    this.$store.commit('setTitle', "Add new user")
  }
}
</script>

<style scoped>

</style>