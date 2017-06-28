import Vue from 'vue'
import Vuex from 'vuex'

import stocks from './modules/dreams';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        stocks
    }

})
