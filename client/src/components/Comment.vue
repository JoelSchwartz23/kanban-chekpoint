<template>
  <div>
    <p>{{commentData.content}}</p>
    <button type="button" @click="deleteComment(commentData._id, commentData.task)">Delete Comment</button>

  </div>

</template>



<script>
  export default {
    name: "Comment",
    props: ['commentData'],
    methods: {
      deleteComment(commentId, taskId) {
        debugger
        let payload = {
          taskId: taskId,
          commentId: commentId
        }
        this.$store.dispatch('deleteComment', payload)
      }
    }
  }
</script>

<style>

</style>