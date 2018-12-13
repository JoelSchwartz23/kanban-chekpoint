<template>
  <div class="boards">
    <div class="row">
      <button class="col-1 offset-10" @click='logout()'>Logout</button>
    </div>
    <h1 class="title">YOUR BOARDS</h1>
    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required>
      <input type="text" placeholder="description" v-model="newBoard.description">
      <button type="submit">Create Board</button>
    </form>
    <div v-for="board in boards" :key="board._id">
      <router-link class="link" :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
      <button @click="deleteBoard(board._id)">DELETE BOARD</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "boards",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
      this.$store.dispatch('getBoards')
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      },
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      },
      logout() {
        this.$store.dispatch("logout")
      }
    }
  };
</script>
<style>
  .link {
    font-family: 'Times New Roman', Times, serif;
    font-size: 4rem;
    font-weight: 100;
    font-style: italic;
    letter-spacing: 5px;
    color: whitesmoke;
    margin: 10px;
  }

  .link:hover {
    color: purple;
  }
</style>