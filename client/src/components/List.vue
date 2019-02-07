<template>
  <div>
    <div class="col-12">
      <div class="col-12 card">
        <div class="row">
          <h1 class="col-10 title">{{listData.title}}</h1>
          <i class="fa fa-trash-alt col-2" @click="deleteList(listData._id, listData.board)"></i>
        </div>
        <div class="btn-group dropright">
          <button type="button" class="btn btn-secondary">
            New Task
          </button>
          <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            <span class="sr-only">Toggle Dropright</span>
          </button>
          <div class="dropdown-menu">
            <form @submit.prevent.reset="addTask()">
              <input type="text" placeholder="title" v-model="newTask.title" required>
              <input type="text" placeholder="description" v-model="newTask.content" required>
              <button type="submit">Create Task</button>
            </form>
          </div>
        </div>
        <task v-for="task in tasks" :taskData="task" :listId="listData._id"></task>

      </div>
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
    background-image: linear-gradient(to bottom right, black, aqua);
    color: whitesmoke;
    border: black, 5px;
    font-family: 'Times New Roman', Times, serif;
    font-weight: 100;
    color: whitesmoke;
    text-shadow: 2px 2px grey;
    font-size: 1.25rem;
  }

  .dropdown-menu {
    background-image: linear-gradient(to bottom right, black aqua);
    color: whitesmoke;
  }
</style>