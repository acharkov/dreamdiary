const state = {
    dreams: []
};

const mutations = {
  'SET_DREAMS' (state, dreams) {
    state.dreams = dreams;
  },

  'ADD_NEW_DREAM' (state, dream) {
    state.dreams.push(dream)
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