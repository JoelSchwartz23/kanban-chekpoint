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
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
        Comments
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <comment v-for="comment in comments" :commentData="comment" :taskId="taskData._id"></comment>
      </div>
    </div>
    <form @submit.prevent="addComment()">
      <input type="text-field" placeholder="description" v-model="newComment.content" required>
      <button type="submit">Create Comment</button>
    </form>
  </div>
</template>



<script>
  import Comment from "@/components/Comment.vue"

  export default {
    name: 'Task',
    props: ['taskData', 'listId'],
    components: {
      Comment
    },
    mounted() {
      this.$store.dispatch('getComments', this.taskData._id)
    },
    computed: {
      lists() {
        return this.$store.state.lists
      },
      comments() {
        return this.$store.state.comments[this.taskData._id] || []
      }
    },
    data() {
      return {
        newComment: {
          content: '',
          board: this.$route.params.boardId,
          task: this.taskData._id
        }
      }

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
      },
      addComment() {
        this.$store.dispatch('addComment', this.newComment)
        this.newComment = {
          content: '',
          board: this.$route.params.boardId,
          task: this.taskData._id
        }

      }
    }

  }

</script>

<style scoped>

</style>