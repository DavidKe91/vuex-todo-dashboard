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

  async addTodo({ commit }, title) {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
    console.log(response);

    commit("newTodo", response);
  },
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
