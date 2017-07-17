<template>
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div id="navbar" class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <router-link to="/" activeClass="active" tag="li">
                        <a>Home</a>
                    </router-link>
                    <router-link to="/dreams" activeClass="active" tag="li">
                        <a>Dreams</a>
                    </router-link>
                </ul>
                <ul class="nav navbar-nav navbar-right" v-if='user.authenticated' v-on:click="signout">
                    <router-link to="/login" activeClass="active" tag="li">
                        <a>Logout</a>
                    </router-link>
                </ul>
                <ul class="nav navbar-nav navbar-right" v-if='!user.authenticated'>
                    <router-link to="/signin" activeClass="active" tag="li">
                        <a>SignIn</a>
                    </router-link>
                </ul>
                <ul class="nav navbar-nav navbar-right" v-if='!user.authenticated'>
                    <router-link to="/signup" activeClass="active" tag="li">
                        <a>SignUp</a>
                    </router-link>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import auth from '../auth'

export default {
    data() {
        return {
            user: auth.user
        }
    },

    methods: {
        signout: function () {
            auth.setAuthState(false)
            this.$store.commit('REMOVE_DREAMS')
            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>
