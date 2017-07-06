import Vue from 'vue'
import Vuex from 'vuex'

import dreams from './modules/dreams';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        dreams
    }

})
