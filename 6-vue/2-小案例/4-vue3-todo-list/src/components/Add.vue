<template>
  <div class="container">
    <h2>未完成的列表</h2>
    <ul>
      <li v-for="(item,index) in todos" :key="'todos'+index">
        <input type="checkbox" @click="done(index)">{{item}}
        <span @click="del(index)">X</span>
      </li>
    </ul>
    <div class="form">
      <input type="text" v-model="inputValue" placeholder="回车输入" @keydown.enter="add(inputValue)">
    </div>
  </div>
</template>
<script>
import { computed, reactive, ref } from 'vue';
import store from '@/store';

export default {
  setup() {
    const inputValue = ref('');
    function add(value) {
      if (value) {
        // 这种方式调用store中的方法
        store.commit('add', value);
        inputValue.value = '';
      }
    }
    function done(index) {
      store.commit('done', index);
    }
    function del(index) {
      store.commit('delete', index);
    }
    return reactive({
      inputValue,
      add,
      done,
      del,
      // 从store中取数据，要搞成响应式的？？
      todos: computed(() => store.state.todos),
    });
  },
};
</script>
