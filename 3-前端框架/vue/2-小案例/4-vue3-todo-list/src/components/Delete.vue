<template>
  <div class="container">
    <h2>已删除的</h2>
    <ul>
      <li
        v-for="(item,index) in deletes"
        :key="'deletes'+index"
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
    function del(index) {
      store.commit('removeDel', index);
    }
    return {
      deletes: computed(() => store.state.deletes),
      del,
    };
  },
};
</script>
