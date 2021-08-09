<template>
  <div class="md-layout md-size-100 login">
    <form v-if="!sent" class="md-layout md-alignment-center" novalidate @submit.prevent="resetPassword()">
      <md-card class="md-layout-item  md-size-50 md-small-size-100 ">
        <md-card-header>
          <div class="md-title">Reset password</div>
        </md-card-header>
        <md-card-content>
          <div v-if="msg.status" class="alert" :class="`alert--${msg.status}`" v-html="msg.content"/>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('username')">
                <label for="password">Password</label>
                <md-input type="password" name="password" id="password" v-model="form.password"
                          :disabled="sending"/>
                <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
                <span class="md-error" v-else-if="!$v.form.password.minlength">The password must have at least 8 characters</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('password')">
                <label for="repeat">Repeat Password</label>
                <md-input type="password" name="repeat" id="repeat" v-model="form.repeat"
                          :disabled="sending"/>
                <span class="md-error" v-if="!$v.form.repeat.required">The password is required</span>
                <span class="md-error" v-if="!$v.form.repeat.minlength">The password must have at least 8 characters</span>
                <span class="md-error" v-else-if="!$v.form.repeat.sameAsPassword">The passwords must be the same</span>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-card-actions>

          <md-button type="submit" class="md-primary" :disabled="sending">Reset password</md-button>
        </md-card-actions>
      </md-card>
    </form>
    <div v-else class="md-layout md-alignment-center">
      <div class="alert alert--success md-subheading">
        The password has been changed <br>
        <md-button to="/login" class="md-primary" :disabled="sending">Login</md-button>
      </div>
    </div>
  </div>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {
  required,
  minLength,
  sameAs
} from 'vuelidate/lib/validators'

export default {
  name: "ResetPassword",
  mixins: [validationMixin],
  data: () => ({
    sending: false,
    sent: false,
    msg: {
      content: null,
      status: null
    },
    form: {
      password: null,
      repeat: null
    }
  }),
  validations: {
    form: {
      repeat: {
        required,
        minLength: minLength(8)
      },
      password: {
        required,
        sameAsPassword: sameAs('repeat'),
        minLength: minLength(8)
      }
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    resetPassword() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.axios.post('/api/v1/password-reset/confirm/', {
        token: this.$route.params.token,
        password: this.form.password
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