<template>
  <div>
    <div class="col-2 card">
      <h1>{{listData.title}}</h1>
      <form @submit.prevent="addTask()">
        <input type="text" placeholder="title" v-model="newTask.title" required>
        <input type="text" placeholder="description" v-model="newTask.content" required>
        <button type="submit">Create Task</button>
      </form>
      <button @click="deleteList(listData._id, listData.board)">Delete List</button>
    </div>
    <div v-if="tasks[listData._id]">
      <task v-for="task in tasks[listData._id]" :taskData="task"></task>
    </div>
  </div>
</template>

<script>
  import Task from "@/components/Task.vue"

  export default {
    name: 'List',
    props: ['listData'],
    components: {
      Task
    },
    mounted() {
      this.$store.dispatch('getTasks', this.listData._id)
    },
    methods: {
      deleteList(listId, board) {
        let payload = {
          boardId: board,
          listId: listId
        }
        this.$store.dispatch("deleteList", payload);
      },
      addTask() {
        this.$store.dispatch("addTask", this.newTask)
      }
    },
    computed: {
      tasks() {
        return this.$store.state.tasks
      }
    },
    data() {
      return {
        newTask: {
          title: '',
          board: this.$route.params.boardId,
          list: this.listData._id,
          content: ''
        }
      }
    }
  }
</script>

<style scoped>
  .card {
    background: grey;
  }
</style>