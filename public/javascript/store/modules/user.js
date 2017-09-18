import Vue from 'vue'
import VueResource from 'vue-resource'
const SIGNUP_URL = 'http://localhost:3000/signup'
const SIGNIN_URL = 'http://localhost:3000/signin'

const state = {
    user: { 
        id: null,
        token: null,
        dreams: []
    }
};

const mutations = {
    setUser (state, user) {
        state.user = user
    }, 
    saveUser (state, user) {
        localStorage.setItem('dd_user_id', user.id)
        localStorage.setItem('dd_user_token', user.token)
    },
    getUser (state) {
        let user = {
            id: localStorage.getItem('dd_user_id'),
            token: localStorage.getItem('dd_user_token')
        }
        console.log(user);
        state.user = user;
    },
    deleteUser (state, user) {
        localStorage.removeItem('dd_user_id')
        localStorage.removeItem('dd_user_token')
    }
};

const actions = {
    signUserUp({ commit }, payload) {
        Vue.http.post(SIGNUP_URL, payload)
            .then(
            response => {
                console.log("signup successfull response.body=", response.body);
                let newUser = {
                    id: response.body.id,
                    token: response.body.token,
                    dreams: []
                }
                commit('setUser', newUser);
                commit('saveUser', newUser);
            })
            .catch(
            error => {
                console.log(error)
            })
    },

    signUserIn({ commit }, payload) {
        Vue.http.post(SIGNIN_URL, { email: payload.email, password: payload.password })
            .then(response => {
                console.log("signin successfull response.body=", response.body);
                let newUser = {
                    id: response.body.id,
                    token: response.body.token,
                    dreams: []
                }
                commit('setUser', newUser);
                commit('saveUser', newUser);
            })
            .catch(
            error => {
                console.log(error)
            }
            )
    },
    logout ({ commit }) {
        commit('setUser', { id: null, token: null, dreams: []});
        commit('deleteUser');
    }
}

const getters = {
    getUser (state) {
        return state.user.token;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}