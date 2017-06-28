import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import App from './App.vue';
import { routes } from './routes';
import store from './store/store'
import auth from './auth'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

auth.updateAuth();

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
