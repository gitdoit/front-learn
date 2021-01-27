import { createStore } from 'vuex';

export default createStore({
  state: {
    todos: [1, 2, 3],
    dones: [],
    deletes: [],
  },
  mutations: {
    add(state, value) {
      state.todos.push(value);
    },
    done(state, value) {
      const done = state.todos.splice(value, 1);
      state.dones.push(...done);
    },
    delete(state, value) {
      const removed = state.todos.splice(value, 1);
      state.deletes.push(...removed);
    },
    removeDel(state, value) {
      state.deletes.splice(value, 1);
    },
  },
  actions: {
  },
  modules: {
  },
});
