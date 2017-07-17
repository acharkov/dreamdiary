<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">{{ dream.date }}</h3>
    
        </div>
        <div class="panel-body">
            <!-- to preserv line breaks -->
            <span style="white-space: pre;">{{ dream.text }}</span>
            
            <div class="pull-down">
                <div class="pull-right">
                    <button class="btn btn-success">Edit</button>
                    <button class="btn btn-warning" @click.prevent="removeDream(dream)">Remove</button>
                </div>
            </div>
    
        </div>
    </div>
</template>

<script>
export default {
    props: ['dream'],

    methods: {
        removeDream: function (dream) {
            this.$http.delete('/api/dream/' + dream.id).
                then(response => {
                    this.$store.commit('REMOVE_DREAM', dream)
                }, response => {
                    console.log("error during delete");
                });
        }
    }
}
</script>

<style>

</style>
