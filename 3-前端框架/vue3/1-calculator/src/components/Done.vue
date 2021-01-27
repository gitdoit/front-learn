<template>
  <div class="container">
    <h2>已完成的</h2>
    <ul>
      <li
        v-for="(item,index) in dones"
        :key="'dones'+index"
      >
        <input type="checkbox">{{item}}
        <span @click="del(index)">X</span>
      </li>
    </ul>
  </div>
</template>
<script>
import store from '@/store';
import { computed } from 'vue';

export default {
  setup() {
    return {
      dones: computed(() => store.state.dones),
    };
  },
};
</script>
