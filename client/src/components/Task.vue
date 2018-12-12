<template>
  <div>
    <h4>{{taskData.title}}</h4>
    <p>{{taskData.content}}</p>
    <button type="button" @click="deleteTask(taskData._id, taskData.list)">Delete Task</button>
    <div v-if="lists.length > 1">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          Move Task
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <p v-for="list in lists" @click="editTask(taskData._id, list._id)">{{list.title}}</p>

        </div>
      </div>
    </div>
  </div>
</template>



<script>
  export default {
    name: 'Task',
    props: ['taskData', 'listId'],
    mounted() {
      if (this.$store.state.lists.length) {
        return this.$store.state.lists
      }
    },
    computed: {
      lists() {
        return this.$store.state.lists
      },
    },
    methods: {
      editTask(taskId, newListId) {
        let payload = {
          taskId: taskId,
          list: newListId,
          oldList: this.listId
        }
        this.$store.dispatch('editTask', payload)

      },
      deleteTask(taskId, listId) {
        let payload = {
          taskId: taskId,
          listId: listId
        }
        this.$store.dispatch("deleteTask", payload);
      }
    }

  }

</script>

<style scoped>

</style>