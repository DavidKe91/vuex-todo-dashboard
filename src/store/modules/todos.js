const state = {
  todos: [],
};

const getters = {
  allTodos: (state) => state.todos,
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos"
    ).then((response) => response.json());

    commit("setTodos", response);
  },
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
