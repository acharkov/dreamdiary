import Vue from 'Vue'

const state = {
    dream: {}
};

const mutations = {
  'SET_SAVED_DREAM' (state, dream) {
    state.dream = dream
    localStorage.setItem('savedDream', state.dream)
  },

  'REMOVE_SAVED_DREAM' (state) {
    state.dream = {}
    localStorage.removeItem('savedDream')
  }
};

const getters = {
  getDreamText: state => {
    return state.dream.text
  }
}

export default {
    state,
    mutations,
    getters
}