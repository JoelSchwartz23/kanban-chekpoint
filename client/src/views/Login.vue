<template>
  <div class="login">
    <div class="row">
      <form class="col-12" v-if="loginForm" @submit.prevent="loginUser">
        <input type="email" v-model="creds.email" placeholder="email">
        <input type="password" v-model="creds.password" placeholder="password">
        <button type="submit">Login</button>
      </form>
      <form class="col-12" v-else @submit.prevent="register">
        <input type="text" v-model="newUser.name" placeholder="name">
        <input type="email" v-model="newUser.email" placeholder="email">
        <input type="password" v-model="newUser.password" placeholder="password">
        <button type="submit">Create Account</button>
      </form>
      <div class="action col-12" @click="loginForm = !loginForm">
        <p v-if="loginForm">No account? Click here to Register</p>
        <p v-else>Already have an account? Click here to Login</p>
      </div>
      <h1 class="title col-12">Welcome To Your Kanban Board!</h1>
    </div>
    <div class="buffer">
    </div>
    <div class="flavor">
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        }
      };
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      }
    }
  };
</script>

<style>
  .action {
    cursor: pointer;
    color: whitesmoke;
    font-family: 'Times New Roman', Times, serif;
  }

  .flavor {
    background-image: url('C:/Users/neder/source/codeworks/kanban-chekpoint/client/assets/Photo2.jpg');
    min-height: 79vh;
    background-size: cover;
    background-position: center;
  }

  .buffer {
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgb(0, 0, 0));
    height: 10vh;
  }
</style>