<template>

  <div class="main-content row">
    <div class="col-md-4 col-md-offset-4">
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <div class="form-group">
        <input type="email" class="form-control" placeholder="Enter your email" v-model="credentials.email">
      </div>
      <form>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Enter your password" v-model="credentials.password">
        </div>
  
        <button type="button" class="btn btn-primary" @click.prevent="signin">Signin</button>
      </form>
    </div>
  </div>

</template>

<script>
import auth from '../auth'
const SIGNIN_URL = 'http://localhost:3000/signin'

export default {
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },

      error: ''
    }
  },

  methods: {
    signin: function () {
      this.$http.post(SIGNIN_URL, { email: this.credentials.email, password: this.credentials.password })
        .then(response => {
          console.log("signin successfull. Token: " + response.body.token);
          auth.setAuthState(true, response.body.token)
          this.$router.push('/')
        }, error => {
          console.log("ERROR: signin failed: ${error}")
        })
    }
  }
}
</script>