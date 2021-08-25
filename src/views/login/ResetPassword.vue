<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-col cols="12" sm="6" xl="4">
        <v-card v-if="sent" class="pa-2" outlined tile>
          <v-alert dense outlined prominent text type="success">
            The new password have been set.
          </v-alert>

          <v-btn color="primary" depressed elevation="2" to="/login">Login</v-btn>
        </v-card>

        <v-card v-else class="pa-2" outlined tile>
          <v-progress-linear indeterminate color="blue darken-2" v-if="sending"/>
          <v-alert v-if="msg.status" dense outlined text :type="msg.status" v-html="msg.content"/>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
                :counter="8"
                :append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
                v-model="password"
                :rules="passwordRules"
                :disabled="sending"
                @click:append="showPass1 = !showPass1"
                :type="showPass1 ? 'text' : 'password'"
                label="Password"
                required
            ></v-text-field>
            <v-text-field
                :counter="8"
                :append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
                v-model="repeatPassword"
                :rules="repeatPasswordRules"
                :disabled="sending"
                @click:append="showPass1 = !showPass1"
                :type="showPass1 ? 'text' : 'password'"
                label="Repeat password"
                required
            ></v-text-field>

            <div style="text-align: right">
              <router-link to="/login">Login</router-link>
            </div>

            <v-btn :disabled="!valid || sending" color="success" class="mr-4" @click="resetPassword">
              Reset password
            </v-btn>

          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import axios clean axios without interceptors
import axios from 'axios'
import util from '@/services/util'

export default {
  name: "ResetPassword",
  data: () => ({
    valid: true,
    sending: false,
    sent: false,
    showPass1: false,
    showPass2: false,
    msg: {
      content: null,
      status: null
    },
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'The password must contain at least 8 characters'
    ],
    repeatPassword: '',
    form: {
      password: null,
      repeat: null
    }
  }),
  computed: {
    token() {
      return this.$route.params.token
    },
    repeatPasswordRules() {
      return [
        (v) => !!v || 'This field is required',
        (v) =>  (this.password === v) || 'The passwords must match',
      ]
    },
  },
  methods: {
    resetPassword() {
      if (!this.$refs.form.validate()) return
      // /users/password-reset/confirm/
      axios.put(`${util.apiUrl}/users/password-reset/`, {
        token: this.token,
        password: this.password
      }).then(() => {
        this.sent = true
      }).catch((error) => {
        this.msg = {
          content: "The token is not valid. Password hasn't been changed. Try again.",
          status: "error"
        }
        if('password' in error && typeof error === 'object') {
          for (const property in error) {
            this.msg.content = `${property}:`
            if(Array.isArray(error[property])) {
              this.msg.content += error[property].split('<br>')
            }
          }
        }
      }).finally(() => {
        this.sending = false
      })

    }
  },
  mounted() {
    this.$store.commit('setTitle', "Reset password")
  }
}
</script>

<style scoped lang="scss">

</style>