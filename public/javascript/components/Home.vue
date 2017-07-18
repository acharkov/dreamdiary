<template>

  <div class="container">
    <div class="jumbotron">
      <h1>Дневник снов</h1>
      <p>Дневник, который всегда рядом</p>
    </div>
  
    <form>
      <div class="form-group">
        <label for="dreamText">Новый Сон:</label>
        <textarea v-model="newDreamText" class="form-control" rows="6" id="dreamText"></textarea>
        <div class="text-right">
          <button type="button" class="btn btn-success" :disabled="!newDreamText" @click.prevent="sendNewDream">Save Dream</button>
        </div>
      </div>
    </form>
    <app-dreams></app-dreams>
  </div>
</template>

<script>
import uuid from 'uuid';
import Dreams from './Dreams.vue'

export default {
  data() {
    return {
      newDreamText: ""
    }
  },
 
  computed: {
    savedDreamText () {
      return this.$store.getters.getDreamText
    }
  },

  components: {
    appDreams: Dreams
  },

  methods: {
    sendNewDream: function () {
      if (!this.newDreamText) {
        return;
      }
      let dream = {
        id: uuid.v4(),
        date: new Date().toUTCString(),
        text: this.newDreamText
      };
      console.log(dream);
      this.$http.post('http://localhost:3000/api/dream', { dream: dream }).then(
        response => {
          this.newDreamText = "";
          this.$store.commit('ADD_NEW_DREAM', dream)
        }, response => {
          if (response.status === 401) {
            console.log("Go login");
            this.$store.commit('SET_SAVED_DREAM', dream)
            this.$router.push('/signin')
          }
        });
    },
  },

  created() {
    if (this.savedDreamText) {
      this.newDreamText = this.savedDreamText
      this.$store.commit('REMOVE_SAVED_DREAM')
    }
  }
}
</script>

<style>

</style>
