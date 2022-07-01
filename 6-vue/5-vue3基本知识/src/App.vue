<template>
  <div>
    <div class="title">
      <img
        @click="go()"
        alt="Vue logo"
        src="./assets/logo.png"
      >
      <h1>{{currentActiveRouter}}</h1>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import router from "./route/index";
import { ref } from 'vue'
const currentActiveRouter = ref("")
router.beforeEach(e => {
  console.log(e);
  currentActiveRouter.value = e?.meta?.cnName as string
})

function go() {
  router.push("/");
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  font-size: 20px;
}
#app .title {
  text-align: center;
  margin-bottom: 15px;
}
#app .title h1 {
  font-size: 24px;
  font-weight: 600;
}
#app .title img {
  height: 60px;
  width: 60px;
}
</style>
