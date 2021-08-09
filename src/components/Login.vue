<template>
  <div class="md-layout md-size-100 login">
    <form class="md-layout md-alignment-center" novalidate @submit.prevent="auth()">
      <md-card class="md-layout-item  md-size-50 md-small-size-100 ">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>
        <md-card-content>
          <div v-if="msg.status" class="alert" :class="`alert--${msg.status}`" v-html="msg.content" />
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('username')">
                <label for="username">First Name</label>
                <md-input name="username" id="username" autocomplete="username" v-model="form.username"
                          :disabled="sending"/>
                <span class="md-error" v-if="!$v.form.username.required">The username is required</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('password')">
                <label for="password">Password</label>
                <md-input type="password" name="password" id="password" autocomplete="password" v-model="form.password"
                          :disabled="sending"/>
                <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
              </md-field>
            </div>
          </div>
          <div style="text-align: right">
            <router-link to="lost-password">Lost password</router-link>
          </div>
        </md-card-content>
        <md-card-actions>

          <md-button type="submit" class="md-primary" :disabled="sending">Login</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {
  required,
  // email,
  // minLength,
  // maxLength
} from 'vuelidate/lib/validators'

export default {
  name: "Login",
  mixins: [validationMixin],
  data: () => ({
    sending: false,
    msg: {
      content: null,
      status: null
    },
    form: {
      username: null,
      password: null
    }
  }),
  validations: {
    form: {
      username: {
        required,
        minLength: 3
      },
      password: {
        required
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
    auth() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.sending = true
      this.axios.post('/api/v1/login/', {
        username: this.form.username,
        password: this.form.password
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
  mounted() {
    const token = localStorage.getItem('jwt')
    if (token) {
      const tokenParsed = JSON.parse(token)
      this.axios.post('/api/v1/logout/', {
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
      }).catch(() => {
        this.msg = {
          content: "Something went wrong.",
          status: "error"
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