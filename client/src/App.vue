<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  body {
    background-image: linear-gradient(to right, black, aqua);
    height: 100%;
  }

  .title {
    font-family: 'Times New Roman', Times, serif;
    font-weight: 100;
    font-style: italic;
    letter-spacing: 10px;
    color: whitesmoke;
    text-shadow: 2px 2px grey;
  }

  button {
    cursor: pointer;
    background-image: linear-gradient(to right, black, grey);
    color: whitesmoke;
    margin: 10px;
    border: double;
  }

  input {
    margin: 10px;
    border: double;
  }


  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  i {
    cursor: pointer;
  }
</style>