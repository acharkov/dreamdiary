<template>

  <v-container>
    <v-layout row>
      <v-flex>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="email" label="E-mail" id="email" v-model="credentials.email" type="email" required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="password" label="Password" id="password" v-model="credentials.password" type="password" required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit">Sign In</v-btn>
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
        password: ''
      },

      error: ''
    }
  },
  computed: {
    user() {
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
    onSignin() {
      this.$store.dispatch('signUserIn', this.credentials)
    }
  }
}
</script>