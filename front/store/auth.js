export const state = () => ({
  currentUser: {}
});

export const mutations = {
  setUser(state, payload) {
    state.currentUser = payload
  },
};

// store.commit('aaa') を呼び出して直接ミューテーションをコミットすると、同期的にする必要がある。
// store.dispatch('aaa') だと非同期で良い。

export const actions = {
  setUser(context, data) {
    context.commit('setUser', data)
  }
};