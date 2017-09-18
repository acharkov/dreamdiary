import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuetify from 'vuetify';

import App from './App.vue';
import { routes } from './routes';
import store from './store/store'
import auth from './auth'
 
Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

//we need to add Authorization header for JWT authetication
Vue.http.interceptors.push((request, next) => {
  //TODO: move getting token to vuex or smth?
  request.headers.set('Authorization', localStorage.getItem('dd_user_token'));
  next()
})

new Vue({
  el: '#app',
  router,
  store,
  created() {
    this.$store.commit('getUser')
  },
  render: h => h(App)
})
