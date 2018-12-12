<template>
  <div>
    <h4>{{taskData.title}}</h4>
    <p>{{taskData.content}}</p>
    <button type="button" @click="deleteTask(taskData._id, taskData.list)">Delete Task</button>
    <div v-if="lists.length > 1">

    </div>
  </div>
</template>



<script>
  export default {
    name: 'Task',
    props: ['taskData'],
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
          listId: newListId
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