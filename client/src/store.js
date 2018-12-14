import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let production = !window.location.host.includes('localhost')
let baseUrl = production ? 'https://jake-joel-kanban.herokuapp.com/' : '//localhost:3000/'


let auth = Axios.create({
  baseURL: baseUrl + "auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: baseUrl + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: {},
    comments: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setLists(state, lists) {
      state.lists = lists
    },
    setActiveBoard(state, activeBoard) {
      state.activeBoard = activeBoard
    },
    deleteTask(state, oldTask) {
      let index = state.tasks[oldTask.listId].findIndex(task => {
        return task._id == oldTask.taskId
      })
      state.tasks[oldTask.listId].splice(index, 1)
    },
    setTasks(state, tasks) {
      if (tasks.length) {
        Vue.set(state.tasks, tasks[0].list, tasks)
      }
    },
    setComments(state, comments) {
      if (comments.length) {
        Vue.set(state.comments, comments[0].task, comments)
      }
    }
  },
  actions: {
    //AUTH STUFF
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          // router.push({ name: 'boards' })
        })
        .catch(err => {
          console.error(err)
          router.push({ name: 'login' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    logout({ commit, dispatch }) {
      auth.delete('logout')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'login' })
        })
    },

    //BOARDS
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    getBoard({ commit }, boardId) {
      api.get('boards/' + boardId)
        .then(res => {
          commit('setActiveBoard', res.data[0])
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },
    //Lists
    getLists({ commit }, boardId) {
      api.get('boards/' + boardId + '/lists')
        .then(res => {
          commit('setLists', res.data)
        })
    },
    addList({ commit, dispatch }, listData) {
      api.post('lists', listData)
        .then(serverList => {
          dispatch('getLists', listData.board)
        })
    },
    deleteList({ commit, dispatch }, payload) {
      api.delete('lists/' + payload.listId)
        .then(res => {
          dispatch('getLists', payload.boardId)
        })
    },
    //Tasks
    getTasks({ commit }, listId) {
      api.get('lists/' + listId + '/tasks')
        .then(res => {
          commit('setTasks', res.data)
        })
    },
    addTask({ commit, dispatch }, taskData) {
      api.post('tasks', taskData)
        .then(res => {
          dispatch('getTasks', taskData.list)
        })
    },
    deleteTask({ commit, dispatch }, payload) {
      api.delete('tasks/' + payload.taskId)
        .then(res => {
          dispatch('getTasks', payload.listId)
        })
    },
    editTask({ commit, dispatch }, payload) {
      api.put('tasks/' + payload.taskId, payload)
        .then(res => {
          let oldTask = {
            taskId: payload.taskId,
            listId: payload.oldList
          }
          commit('deleteTask', oldTask)
          dispatch('getTasks', payload.list)
        })
    },
    //comments
    getComments({ commit }, taskId) {
      api.get('tasks/' + taskId + '/comments')
        .then(res => {
          commit('setComments', res.data)
        })
    },
    addComment({ commit, dispatch }, commentData) {
      api.post('comments', commentData)
        .then(res => {
          dispatch('getComments', commentData.task)
        })
    },
    deleteComment({ commit, dispatch }, payload) {
      api.delete('comments/' + payload.commentId)
        .then(res => {
          dispatch('getComments', payload.taskId)
        })
    },
    editComment({ commit, dispatch }, payload) {
      api.put('comments/' + payload.commentId, payload)
        .then(res => {
          dispatch('getComments', payload.task)
        })
    },

    //routing
    returnToBoards() {
      router.push({ name: "boards" })
    }


  }
})