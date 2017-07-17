import Vue from 'vue'
import Vuex from 'vuex'

import dreams from './modules/dreams';
import dream from './modules/dream';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        dreams,
        dream
    }

})
