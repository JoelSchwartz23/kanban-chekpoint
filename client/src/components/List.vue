<template>
  <div>
    <div class="col-2 card">
      <h1>{{listData.title}}</h1>
      <form @submit.prevent.reset="addTask()">
        <input type="text" placeholder="title" v-model="newTask.title" required>
        <input type="text" placeholder="description" v-model="newTask.content" required>
        <button type="submit">Create Task</button>
      </form>
      <i class="fa fa-trash-alt" @click="deleteList(listData._id, listData.board)"></i>
      <task v-for="task in tasks" :taskData="task" :listId="listData._id"></task>
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
    computed: {
      tasks() {
        return this.$store.state.tasks[this.listData._id] || []
      }
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
        this.newTask = {
          title: '',
          board: this.$route.params.boardId,
          list: this.listData._id,
          content: ''
        }
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