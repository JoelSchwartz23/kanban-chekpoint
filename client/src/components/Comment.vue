<template>
  <div class="card">
    <div class="row">
      <i class="fa fa-trash-alt col-2 offset-10 mb-2" @click="deleteComment(commentData._id, commentData.task)"></i>
    </div>
    <p class="card-text">{{commentData.content}}</p>
  </div>

</template>



<script>
  export default {
    name: "Comment",
    props: ['commentData'],
    methods: {
      deleteComment(commentId, taskId) {
        let payload = {
          taskId: taskId,
          commentId: commentId
        }
        this.$store.dispatch('deleteComment', payload)
      }
    }
  }
</script>

<style scoped>
  .card-text {
    margin-left: 6px;
  }
</style>