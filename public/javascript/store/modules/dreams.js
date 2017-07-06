import Vue from 'Vue'

const state = {
    dreams: []
};

const mutations = {
  'SET_DREAMS' (state, dreams) {
    // for (let i = 0; i < dreams.length; ++i) {
    //   state.dreams[i] = dreams[i]
    // }
    //state.dreams = dreams.slice()
    state.dreams = dreams
  },

  'ADD_NEW_DREAM' (state, dream) {
    state.dreams.unshift(dream)
  },

  'REMOVE_DREAMS' (state) {
    state.dreams = []
  }
};

const getters = {
  getDreams: state => {
    return state.dreams
  }
}

export default {
    state,
    mutations,
    getters
}