<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-progress-linear indeterminate color="blue darken-2" v-if="sending"/>
    <v-text-field v-model="user.username" :rules="usernameRules" :disabled="sending" label="Username" required/>
    <v-text-field v-model="user.email" :rules="emailRules" :disabled="sending" label="Email" required/>

    <div v-if="!userData">
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
    </div>

    <v-btn :disabled="!valid || sending" color="success" class="mr-4" @click="userForm"
           v-html="((userData) ? 'edit' : 'add new' ) + ' user'" />

  </v-form>
</template>

<script>
import util from "@/services/util";

export default {
  name: "UserForm",
  props: {
    userData: Object || null,
    userId: Number || null,
  },
  data() {
    return {
      user: {
        username: '',
        email: '',
      },
      sent: false,
      sending: false,
      valid: true,
      showPass: false,
      password: '',
      repeatPassword: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      usernameRules: [
        v => !!v || 'Username is required'
      ],
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
        (v) =>  (this.password === v) || 'The passwords must match',
      ]
    },
  },
  methods: {
    userForm() {
      if (!this.$refs.form.validate()) return
      this.sending = true
      let method = 'post'
      let url = `${util.apiUrl}/users/`
      let statusString = 'created'

      if(this.userData) {
        method = 'put'
        url = `${util.apiUrl}/users/detail/${this.user.pk}/`
        statusString = 'updated'
      } else {
        // push password to created user
        this.user.password = this.password
      }


      this.axios({
        method: method,
        url: url,
        data: this.user
      }).then(() => {
        this.sent = true
        this.$store.commit('setMessage', {
          status: 'success',
          content: `The user has been ${statusString}`
        })

        this.$store.commit('setUser', null)
        this.$store.commit('setUsers', [])

        // on new user creation redirect to the list
        if(!this.userData) {
          this.$router.replace({path: '/users'})
        }

      }).catch((error) => {
        this.$store.commit('setMessage', {
          status: 'error',
          content: util.convertDjangoErrorToString(error.response.data)
        })
      }).finally(() => {
        this.sending = false
      })

    },
  },
  beforeMount() {
    if(this.userData) {
      this.user = this.userData
    }
  }
}
</script>

<style scoped>

</style>