<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import { Header } from "./components";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style>
body {
  min-width: 768px;
}

#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(44, 62, 80);
}
</style>
