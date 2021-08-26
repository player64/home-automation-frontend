<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-col cols="12" sm="6" xl="4">
        <v-card v-if="sent" class="pa-2" outlined tile>
          <v-alert dense outlined prominent text type="success">
            To entered the email address has been submitted a link to reset the password.
          </v-alert>
        </v-card>

        <v-card v-else class="pa-2" outlined tile>
          <v-progress-linear v-if="sending" indeterminate color="blue darken-2"/>

          <v-form ref="form" v-model="valid" lazy-validation>

            <v-text-field v-model="email" :rules="emailRules" :disabled="sending" label="Email" required/>
            <div class="recaptcha">
              <div>
                <vue-recaptcha class="reCaptcha reCaptcha--left"
                               :sitekey="reCaptcha.key"
                               :loadRecaptchaScript="true"
                               @verify="reCaptchaVerify"
                               @expired="reCaptcha.response = false"/>
                <div v-if="reCaptcha.touched" class="error--text" style="font-size: 12px">
                  Please resolve the captcha challenge
                </div>
              </div>
              <router-link to="login">Login</router-link>
            </div>


            <v-btn :disabled="!valid || sending" color="success" class="mr-4" @click="passwordResetRequest">
              reset password
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
import VueRecaptcha from 'vue-recaptcha'

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
    reCaptcha: {
      key: util.captchaKey,
      response: false,
      touched: false
    },
  }),
  components: {
    VueRecaptcha
  },

  methods: {
    passwordResetRequest() {
      let error = false
      if (!this.$refs.form.validate()) {
        error = true
      }
      if (!this.reCaptcha.response) {
        this.reCaptcha.touched = error = true;
      }

      if (error) {
        return
      }

      this.sending = true
      axios.post(`${util.apiUrl}/users/password-reset/`, {
        email: this.email,
        recaptcha_response: this.reCaptcha.response
      }).catch(() => {
      })
          .finally(() => {
            this.sending = false
            this.sent = true
          })
    },
    reCaptchaVerify(response) {
      this.reCaptcha.touched = false;
      this.reCaptcha.response = response;
    },
  },
  mounted() {
    this.$store.commit('setTitle', "Lost password")
  }
}
</script>

<style scoped lang="scss">
.recaptcha {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
}
</style>