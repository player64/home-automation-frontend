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
            v-if="sent"
        >
          <v-alert
              dense
              outlined
              prominent
              text
              type="success"
          >
            The new password have been set.
          </v-alert>

          <v-btn
              color="primary"
              depressed
              elevation="2"
              to="/login"
          >Login</v-btn>

        </v-card>
        <v-card
            class="pa-2"
            outlined
            tile
            v-else
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
                :append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
                v-model="password"
                :rules="[repeatPasswordRules]"
                :disabled="sending"
                @click:append="showPass1 = !showPass1"
                :type="showPass1 ? 'text' : 'password'"
                label="Password"
                required
            ></v-text-field>


            <v-text-field
                :append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
                v-model="repeatPassword"
                :rules="[repeatPasswordRules, passwordMath]"
                :disabled="sending"
                @click:append="showPass1 = !showPass1"
                :type="showPass1 ? 'text' : 'password'"
                label="Repeat password"
                required
            ></v-text-field>

            <div style="text-align: right">
              <router-link to="/login">Login</router-link>
            </div>

            <v-btn
                :disabled="!valid || sending"
                color="success"
                class="mr-4"
                @click="resetPassword"
            >
              Reset password
            </v-btn>

          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>


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
    ],
    repeatPassword: '',
    repeatPasswordRules: [
      v => !!v || 'This field is required',
     // this.passwordMath: () => ('The passwords aren\'t match')
    ],
    form: {
      password: null,
      repeat: null
    }
  }),
  computed: {
    passwordMath() {
      return () => (this.password === this.repeatPassword) || 'Passwords must match'
    },
  },
  methods: {

    resetPassword() {
      this.axios.post('/api/v1/users/password-reset/confirm/', {
        token: this.$route.params.token,
        password: this.password
      }).then(() => {
        this.sent = true
      }).catch(() => {
        this.msg = {
          content: "The token is not valid. Password hasn't been changed. Try again.",
          status: "error"
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