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
    commit("newTodo", response);
  },

  async deleteTodo({ commit }, id) {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    commit("removeTodo", id);
  },

  async filterTodos({ commit }, e) {
    // Get selected number
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    ).then((response) => response.json());

    commit("setTodos", response);
  },

  async updateTodo({ commit }, updatedTodo) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedTodo),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    ).then((response) => response.json());
    commit("updateTodo", response);
  },
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)),
  updateTodo: (state, updatedTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updatedTodo);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
