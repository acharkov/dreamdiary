<template>

  <v-container>
    <v-layout row>
      <v-flex>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="email" label="e-mail" id="email" v-model="credentials.email" type="email" required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="password" label="password" id="password" v-model="credentials.password" type="password" required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="confirmedPassword" label="confirm password" id="confirmedPassword" 
                    v-model="credentials.confirmedPassword" :rules=[comparePasswords] type="password" >
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit">Sign Up</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
export default {
  data() {
    return {
      credentials: {
        email: '',
        password: '',
        confirmedPassword: ''
      },

      error: ''
    }
  },
  computed: {
    comparePasswords () {
      return this.credentials.password !== this.credentials.confirmedPassword ? 'Passwords do not match' : true
    },
    user () {
      return this.$store.getters.getUser
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignup() {
      this.$store.dispatch('signUserUp', this.credentials)
    }
  }
}
</script>