<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-col
          cols="12"
          sm="6"
          xl="4"
      >
        <v-card
            class="pa-2"
            outlined
            tile
        >
          <v-progress-linear
              indeterminate
              color="blue darken-2"
              v-if="sending"
          ></v-progress-linear>
          <v-alert
              v-if="msg.status"
              dense
              outlined
              text
              :type="msg.status"
              v-html="msg.content"
          />
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
          >
            <v-text-field
                v-model="username"
                :rules="usernameRules"
                :disabled="sending"
                label="Username"
                required
            ></v-text-field>

            <v-text-field
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                v-model="password"
                :rules="passwordRules"
                :disabled="sending"
                @click:append="showPass = !showPass"
                :type="showPass ? 'text' : 'password'"
                label="Password"
                required
            ></v-text-field>

            <div style="text-align: right">
              <router-link to="lost-password">Lost password</router-link>
            </div>

            <v-btn
                :disabled="!valid || sending"
                color="success"
                class="mr-4"
                @click="auth"
            >
              Login
            </v-btn>

          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>


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
      this.sending = true
      this.$refs.form.validate()
      this.axios.post('/api/v1/users/login/', {
        username: this.username,
        password: this.password
      }).then((response) => {
        localStorage.setItem('jwt', JSON.stringify(response.data))
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
  beforeMount() {

  },
  mounted() {
    this.$store.commit('setTitle', "Login")
    const token = localStorage.getItem('jwt')
    if (token) {
      const tokenParsed = JSON.parse(token)
      this.axios.post('/api/v1/users/logout/', {
        refresh: tokenParsed.refresh
      }, {
        headers: {
          Authorization: `Bearer ${tokenParsed.access}`
        }
      }).then(() => {
        this.msg = {
          content: "Securely logged out",
          status: "success"
        }
      }).finally(() => {
        this.$store.commit('setAuthenticate', false)
        localStorage.removeItem('jwt')
      })
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  margin-top: 10%;
}

.alert {
  padding: 5px 10px;
  margin: 0.3rem 0;

  &--success {
    color: green;
    background-color: rgba(green, 0.2);
    border: 1px solid green;
  }

  &--error {
    color: red;
    background-color: rgba(red, 0.1);
    border: 1px solid red;
  }
}

</style>