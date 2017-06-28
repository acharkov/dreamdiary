<template>
<div>
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
  }
}
</script>

<style>

</style>
