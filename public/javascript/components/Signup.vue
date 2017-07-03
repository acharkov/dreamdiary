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
        <div class="form-group">
          <input type="number" class="form-control" placeholder="Enter your age" v-model="credentials.age">
        </div>
  
        <button type="button" class="btn btn-primary" @click.prevent="signup">Signup</button>
      </form>
    </div>
  </div>

</template>

<script>
import auth from '../auth'
const SIGNUP_URL = 'http://localhost:3000/signup'
const SIGNIN_URL = 'http://localhost:3000/signin'

export default {
  data() {
    return {
      credentials: {
        email: '',
        password: '',
        age: ''
      },

      error: ''
    }
  },

  methods: {
    signup: function () {
      this.$http.post(SIGNUP_URL, this.credentials).then(response => {
        //auth.updateAuth(true);
        console.log("signup successfull");
        this.$http.post(SIGNIN_URL, { email: this.credentials.email, password: this.credentials.password }).then(response => {
          console.log("signin successfull");
          auth.setAuthState(true)
        }, error => {
          console.log("ERROR: signin failed: ${error}")
        })
      }, error => {
        console.log("Error received: ${error}")
      })
    }
  }
}
</script>