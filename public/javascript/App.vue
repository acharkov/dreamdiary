<template>
    <div class="container">
        <app-header></app-header>
        <div class="row">
            <div class="col-xs-12">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './components/Header.vue'
import auth from './auth'

export default {
    data() {
        return {
            user: auth.user
        }
    },

    components: {
        appHeader: Header
    },

    methods: {
    },

    created() {
        if (!this.user.authenticated) {
            console.log('cannot get the dreams for unknown user')
            return
        }

        this.$http.get('/api/dreams').then(response => {
            let dreams = response.body;
            this.$store.commit('SET_DREAMS', dreams);
            console.log('dreams got from server');
        }, response => {
            console.log("error on /api/dreams");
        });
    }
}
</script>

<style>
body {
    padding-top: 80px;
}
</style>