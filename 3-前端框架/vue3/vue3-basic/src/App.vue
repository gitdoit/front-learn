<template>
  <div>
    <img
      @click="go()"
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <h1>Vue 3基础demo</h1>
    <router-view />
  </div>
</template>

<script lang="ts">
import router from "./route/index";
export default {
  setup() {
    function go() {
      router.push("/");
    }
    return {
      go,
    };
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
#app h1 {
  font-size: 24px;
  font-weight: 600;
}
#app img {
  height: 80px;
  width: 80px;
}
</style>
