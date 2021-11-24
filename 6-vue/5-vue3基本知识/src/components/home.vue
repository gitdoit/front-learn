<template>
  <ul class="list clearfix">
    <li
      class="item"
      v-for="(item,index) in list"
      :key="index"
    >
      <router-link :to="item.path">
        {{item.cnName}}
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { routes } from "../route/index";

export default {
  setup() {
    const ok = routes.filter((e) => !!e.cnName);
    return {
      list: ok,
    };
  },
};
</script>

<style>
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.list {
  width: 1200px;
  text-align: center;
  margin: 0 auto;
}
.list .item {
  float: left;
  height: 60px;
  line-height: 60px;
  font-size: 22px;
  font-weight: 600;
  padding: 0 20px;
  margin: 0 10px;
  margin-bottom: 15px;

  border-radius: 10px;
  background: linear-gradient(45deg, #cacaca, #f0f0f0);
  box-shadow: 20px -20px 60px #bebebe, -20px 20px 60px #ffffff;
}

.list .item:hover {
  cursor: pointer;
  border-radius: 10px;
  background: linear-gradient(145deg, #f0f0f0, #cacaca);
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
}
</style>