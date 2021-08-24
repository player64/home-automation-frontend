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
            To entered an email address has been submitted a link to reset the password.
          </v-alert>

          <v-btn
              color="primary"
              depressed
              elevation="2"
              to="login"
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

          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
          >
            <v-text-field
                v-model="email"
                :rules="emailRules"
                :disabled="sending"
                label="Email"
                required
            ></v-text-field>


            <div style="text-align: right">
              <router-link to="login">Login</router-link>
            </div>

            <v-btn
                :disabled="!valid || sending"
                color="success"
                class="mr-4"
                @click="passwordResetRequest"
            >
              reset password
            </v-btn>

          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "LostPassword",
  data: () => ({
    sending: false,
    sent: false,
    msg: {
      content: null,
      status: null
    },
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    valid: true,

  }),

  methods: {
    passwordResetRequest() {
      this.sending = true
      this.axios.post('/api/v1/users/password-reset/', {
        email: this.email
      }).then(() => {

      }).finally(() => {
        this.sending = false
        this.sent = true
      })
    }
  },
  mounted() {
    this.$store.commit('setTitle', "Lost password")
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