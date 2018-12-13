<template>
  <div class="board container-fluid">
    <div class="row">
      <div class="col-3 offset-8">
        <button @click="returnToBoards()">Back To Boards</button>
        <button @click='logout()'>Logout</button>
      </div>
    </div>
    <div class="row">
      <h1 class="col-12 title">{{board.title}}</h1>
      <h3 class="col-12 title">{{board.description}}</h3>
      <form class="col-12" @submit.prevent="addList">
        <input type="text" placeholder="title" v-model="newList.title" required>
        <button type="submit">Create List</button>
      </form>
    </div>
    <div class="row">
      <list class="d-block" v-for="list in lists" :listData="list"></list>
    </div>

  </div>
</template>

<script>
  import List from "@/components/List.vue"


  export default {
    name: "board",
    components: {
      List
    },
    mounted() {
      if (!this.$store.state.boards.length) {
        this.$store.dispatch('getBoards', this.$route.params.boardId)
      }
      this.$store.dispatch('getLists', this.$route.params.boardId)
    },
    data() {
      return {
        newList: {
          title: '',
          board: this.$route.params.boardId
        }
      }
    },
    computed: {
      board() {
        return this.$store.state.boards.find(b => b._id == this.$route.params.boardId) || { title: 'Loading...' }
      },
      lists() {
        return this.$store.state.lists
      },
    },
    methods: {
      addList() {
        this.$store.dispatch("addList", this.newList);
        this.newList = { title: "" };
      },
      returnToBoards() {
        this.$store.dispatch("returnToBoards")

      },
      logout() {
        this.$store.dispatch("logout")
      }
    },
  }
</script>

<style scoped>
  .board {
    color: whitesmokeS;
  }
</style>