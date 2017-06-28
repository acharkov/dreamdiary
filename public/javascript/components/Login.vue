<template>

  <div class="main-content row">
    <div class="col-md-4 col-md-offset-4">
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Enter your username" v-model="credentials.username">
      </div>
      <form>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Enter your password" v-model="credentials.password">
        </div>
  
        <button type="button" class="btn btn-primary" @click.prevent="submitWithUser(updateDreamsCb)">Login</button>
      </form>
    </div>
  </div>

</template>

<script>
import auth from '../auth'
const LOGIN_URL = 'http://localhost:3000/login';

export default {
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },

      error: ''
    }
  },

  methods: {
    updateDreamsCb: function () {
      this.$http.get('/api/dreams').then(
        response => {
          let dreams = response.body;
          this.$store.commit('SET_DREAMS', dreams);
          console.log('dreams got from server');
          this.$router.push("/dreams")
        }, response => {
          console.log("error on /api/dreams");
        });
    },

    submitWithUser: function (cb) {
      var credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }

      auth.login(this, credentials, cb)
    }
  }
}
</script>