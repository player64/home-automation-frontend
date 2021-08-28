<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-col cols="12" sm="6" xl="4">
        <v-card class="pa-2" outlined tile>
          <v-progress-linear indeterminate color="blue darken-2" v-if="sending"/>
          <v-alert v-if="msg.status" dense outlined text :type="msg.status" v-html="msg.content"/>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="username" :rules="usernameRules" :disabled="sending" label="Username" required/>

            <v-text-field :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" v-model="password" :rules="passwordRules"
                          :disabled="sending" @click:append="showPass = !showPass"
                          :type="showPass ? 'text' : 'password'"
                          label="Password" required/>

            <div style="text-align: right">
              <router-link to="/lost-password">Lost password</router-link>
            </div>

            <v-btn :disabled="!valid || sending" color="success" class="mr-4" @click="auth">Login</v-btn>
          </v-form>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import axios clean axios without interceptors
import axios from 'axios'
import localStorageJWT from '@/services/localStorage'
import util from '@/services/util'

export default {
  name: "Login",
  data: () => ({
    sending: false,
    valid: true,
    username: '',
    showPass: false,
    usernameRules: [
      v => !!v || 'Username is required',
      v => (v && v.length >= 3) || 'Username should have at least 3 characters',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
    ],
    msg: {
      content: null,
      status: null
    },
  }),
  methods: {
    auth() {
      if (!this.$refs.form.validate()) return
      this.sending = true
      axios.post(`${util.apiUrl}/users/login/`, {
        username: this.username,
        password: this.password
      }).then((response) => {
        localStorageJWT.setAll(response.data)
        this.$store.commit('setAuthenticate', true)
        this.$router.push({path: '/'})
      }).catch(() => {
        this.msg = {
          content: "Entered credentials are invalid.",
          status: "error"
        }
      }).finally(() => {
        this.sending = false
      })
    }
  },
  mounted() {
    this.$store.commit('setTitle', "Login")
    const tokens = localStorageJWT.load()
    if (tokens) {
      axios.post(`${util.apiUrl}/users/logout/`, {
            refresh: tokens.refresh
          },
          {
            headers: {
              Authorization: `Bearer ${tokens.access}`
            }
          }).then(() => {
        this.msg = {
          content: "Securely logged out",
          status: "success"
        }
      })
    }
    this.$store.commit('setAuthenticate', false)
    localStorageJWT.deleteAll()
  }
}
</script>

<style scoped lang="scss">

</style>