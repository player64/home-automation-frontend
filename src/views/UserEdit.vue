<template>
  <div>
    <h1 class="mb-4">Edit user</h1>
    <v-btn to="/users" class="mt-5 mb-10">
      Back to user list
    </v-btn>
    <loader v-if="loading" text="Loading user ..."/>

    <v-row v-else-if="user">
      <v-col cols="12" md="8" xl="5">
        <message />
        <v-tabs v-model="tab">
          <v-tabs-slider/>
          <v-tab v-for="(item, key) in tabs" :key="key" v-html="item.name"/>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="(item, key) in tabs" :key="key">
            <v-card flat class="mt-5">
              <component :is="item.component" :userData="user" :userId="userId"/>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Loader from "@/components/ui/Loader";
import util from "@/services/util";
import Message from "@/components/ui/Message";

export default {
  name: "UserEdit",
  components: {
    Loader,
    Message,
    UserForm: () => import('@/components/users/UserForm'),
    UserChangePassword: () => import('@/components/users/UserChangePassword')
  },
  computed: {
    userId() {
      return this.$route.params.id
    },
    tabs() {
      return [
        {name: 'Edit', component: 'UserForm'},
        {name: 'Change password', component: 'UserChangePassword'}
      ]
    }
  },
  data() {
    return {
      user: null,
      loading: true,
      tab: 0
    }
  },
  methods: {
    getUser() {
      this.axios.get(`${util.apiUrl}/users/detail/${this.userId}/`)
          .then((response) => {
            this.$store.commit('setTitle', `User edit - ${response.data.username}`)
            this.user = response.data
          })
          .catch((e) => {
            if (e.response.status === 404) {
              this.$router.replace({path: '/not-found'})
              return
            }
            this.$store.commit('setMessage', {
              status: 'error',
              content: util.convertDjangoErrorToString(e.response.data)
            })
          })
          .finally(() => {
            this.loading = false
          })
    }
  },
  mounted() {
    this.$store.commit('setTitle', "Edit user")
    if (isNaN(this.userId)) {
      this.$router.replace({path: '/not-found'})
      return
    }
    this.getUser()
  }
}
</script>

<style scoped>

</style>