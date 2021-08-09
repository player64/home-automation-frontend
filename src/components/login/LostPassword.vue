<template>
  <div class="md-layout md-size-100 login">
    <form v-if="!sent" class="md-layout md-alignment-center" novalidate @submit.prevent="passwordResetRequest()">
      <md-card class="md-layout-item  md-size-50 md-small-size-100 ">
        <md-card-header>
          <div class="md-title">Lost password</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('email')">
              <label for="email">Email</label>
              <md-input name="email" id="email" autocomplete="email" v-model="form.email"
                        :disabled="sending"/>
              <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            </md-field>
          </div>
          <div style="text-align: right">
            <router-link to="login">Login</router-link>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Request password reset</md-button>
        </md-card-actions>
      </md-card>
    </form>
    <div v-else class="md-layout md-alignment-center">
      <div class="alert alert--success md-subheading">
        To entered an email address has been submitted a link to reset the password.
      </div>
    </div>
  </div>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {
  required,
  email,
  // minLength,
  // maxLength
} from 'vuelidate/lib/validators'

export default {
  name: "LostPassword",
  mixins: [validationMixin],
  data: () => ({
    sending: false,
    sent: false,
    msg: {
      content: null,
      status: null
    },
    form: {
      email: null,
    }
  }),
  validations: {
    form: {
      email: {
        required,
        email
      },
    }
  },
  methods: {
    // L00162996@student.lyit.ie
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    passwordResetRequest() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      this.sending = true
      this.axios.post('/api/v1/password-reset/', {
        email: this.form.email
      }).then(() => {

      }).finally(() => {
        this.sending = false
        this.sent = true
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