<template>
  <div>
    <button v-if="false" type="button" class="btn btn-default" @click.prevent="getDreams">Get Dreams</button>
    <app-dream v-for="dream in dreams" :dream="dream" :key="dream.id"></app-dream>
  </div>
</template>

<script>
import Dream from './Dream.vue';

export default {
  computed: {
    dreams () {
      return this.$store.getters.getDreams
    }
  },

  components: {
    appDream: Dream
  },

  methods: {
    getDreams: function () {
      this.$http.get('/api/dreams').then(response => {
        let dreams = response.body
        this.$store.commit('SET_DREAMS', dreams)
      }, response => {
        console.log("error on /api/dreams");
      });
    }
  }
}
</script>

<style>

</style>
