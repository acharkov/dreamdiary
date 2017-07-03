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
      </div>
      <button type="button" class="btn btn-default" @click.prevent="sendNewDream">Save Dream</button>
    </form>
    <hr>
  </div>
</template>

<script>
import uuid from 'uuid';

export default {
  data() {
    return {
      newDreamText: ""
    }
  },

  methods: {
    sendNewDream: function () {
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
          if (response.status === 403) {
            console.log("Go login");
            router.push('/login');
          }
        });
    },
  }
}
</script>

<style>

</style>
