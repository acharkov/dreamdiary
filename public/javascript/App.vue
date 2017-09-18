<template>
<v-app id="example-2" standalone>
    <v-toolbar fixed class="deep-orange" dark>
      <v-toolbar-title>Dream Diary</v-toolbar-title>
      <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-only">
      <v-btn flat v-for="item in menuItems" v-bind:key="item.title" :to="item.link">
        <v-icon left>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
      <v-btn flat v-if='userIsAuthenticated'
      @click='onLogout'>
        <v-icon left>exit_to_app</v-icon>
        Logout
      </v-btn>
    </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: null,
        mini: false,
        right: null
      }
    },
    computed: {
      menuItems() {
        let menuItems = [
          { icon: 'face', title: 'Signup', link: '/signup' },
          { icon: 'face', title: 'Signin', link: '/signin' }
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            { icon: 'lock_open', title: 'Profile', link: '/dreams' },
          ]
        }

        return menuItems
      },

      userIsAuthenticated () {
        return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
      }
    },
    methods: {
      onLogout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>


<style>
body {
    padding-top: 80px;
}
</style>