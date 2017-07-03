const state = {
    dreams: []
};

const mutations = {
  'SET_DREAMS' (state, dreams) {
    state.dreams = dreams
    console.log('store dreams: ' + state.dreams)
  },

  'ADD_NEW_DREAM' (state, dream) {
    state.dreams.push(dream)
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