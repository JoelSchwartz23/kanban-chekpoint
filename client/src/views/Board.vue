<template>
  <div class="board">
    <h1>{{board.title}}</h1>
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required>
      <button type="submit">Create List</button>
    </form>

    <list v-for="list in lists" :listData="list"></list>


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
    },
  }
</script>

<style scoped>
  .board {
    color: orange;
  }
</style>