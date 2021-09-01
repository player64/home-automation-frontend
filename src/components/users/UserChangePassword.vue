<template>
  <div>
    <v-form v-if="!sent" ref="form" v-model="valid" lazy-validation>
      <v-progress-linear indeterminate color="blue darken-2" v-if="sending"/>
      <v-text-field
          :counter="8"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          v-model="password"
          :rules="passwordRules"
          :disabled="sending"
          @click:append="showPass = !showPass"
          :type="showPass ? 'text' : 'password'"
          label="Password"
          required
      ></v-text-field>
      <v-text-field
          :counter="8"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          v-model="repeatPassword"
          :rules="repeatPasswordRules"
          :disabled="sending"
          @click:append="showPass = !showPass"
          :type="showPass ? 'text' : 'password'"
          label="Repeat password"
          required
      ></v-text-field>

      <v-btn :disabled="!valid || sending" color="success" class="mr-4" @click="changePassword">
        Change password
      </v-btn>

    </v-form>
  </div>

</template>

<script>
import util from "@/services/util"

export default {
  name: "UserChangePassword",
  props: {
    userId: String,
  },
  data() {
    return {
      sending: false,
      valid: true,
      showPass: false,
      sent: false,
      password: '',
      repeatPassword: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'The password must contain at least 8 characters'
      ],
    }
  },
  computed: {
    repeatPasswordRules() {
      return [
        (v) => !!v || 'This field is required',
        (v) => (this.password === v) || 'The passwords must match',
      ]
    },
  },
  methods: {
    changePassword() {
      if (!this.$refs.form.validate()) return
      this.sending = true
      this.axios.put(`${util.apiUrl}/users/update-password/${this.userId}/`, {
        new_password: this.password
      })
          .then(() => {
            this.$store.commit('setMessage', {
              status: 'success',
              content: `The user password has been updated`
            })
            this.sent = true
          })
          .catch((error) => {
            this.$store.commit('setMessage', {
              status: 'error',
              content: util.convertDjangoErrorToString(error.response.data)
            })
          })
          .finally(() => {
            this.password = ''
            this.repeatPassword = ''
            this.sending = false
          })
    },
  }
}
</script>

<style scoped>

</style>