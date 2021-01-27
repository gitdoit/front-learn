<template>
  <div class="container">
    <h1>TodoList</h1>
    <p>共有<span>{{data.undo.length + data.finished.length}}</span>个任务， 其中已
      <span>{{data.finished.length}} </span>个完成
    </p>
    <h2>未完成的列表</h2>
    <ul>
      <li
        v-for="(value,index) in data.undo"
        :key="value.key"
      >
        <input
          type="checkbox"
          @click="finish(index)"
        >{{value.value}}
        <span @click="del(data.undo,index)">X</span>
      </li>
    </ul>
    <h2>已完成的列表</h2>
    <ul>
      <li
        v-for="(value,index) in data.finished"
        :key="value.key"
      >
        <input type="checkbox">{{value.value}}
        <span @click="del(data.finished,index)">X</span>
      </li>
    </ul>
    <div class="form">
      <input
        type="text"
        v-model="data.input"
      >
      <div
        class="btn"
        @click="add"
      >添加</div>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue';

export default {
  setup() {
    const data = reactive({
      undo: [
        { value: 1, key: 1 },
        { value: 2, key: 2 },
      ],
      finished: [
        { value: 3, key: 3 },
        { value: 4, key: 4 },
      ],
      input: '',
    });
    function selectFrom(low, upper) {
      const choices = upper - low + 1;
      return Math.floor(Math.random() * choices + low);
    }
    function add() {
      const key = selectFrom(1, 10000);
      data.undo.push({ value: data.input, key });
      data.input = '';
    }
    function del(array, index) {
      array.splice(index, 1);
    }
    function finish(index) {
      const remove = data.undo.splice(index, 1);
      data.finished.push(...remove);
    }
    return {
      data,
      add,
      del,
      finish,
    };
  },

};
</script>
<style lang="scss" scoped>
.container {
  width: 950px;
  margin: 0 auto;
  h2 {
    text-align: left;
  }
  ul {
    border: 1px solid #ccc;
    min-height: 50px;
    padding-bottom: 10px;
    padding-right: 40px;
    li {
      list-style: none;
      border: 1px solid #ccc;
      text-align: left;
      border-radius: 6px;
      margin-top: 10px;
      span {
        float: right;
        vertical-align: bottom;
        padding-top: 2px;
        padding-right: 10px;
        cursor: pointer;
        &:hover {
          color: blue;
        }
      }
    }
  }

  .form {
    input {
      width: 420px;
      height: 40px;
      box-sizing: border-box;
      padding: 0 15px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      color: #606266;
      font-size: 14px;
      &:focus {
        border-color: #00a1d6;
        outline: 0;
      }
    }
    .btn {
      // margin-top: 15px;
      height: 40px;
      width: 50%;
      margin: 15px auto 0 auto;
      background-color: darkcyan;
      border-radius: 10px;
      line-height: 40px;
      font-size: 20px;
      font-weight: 700;
      color: #fff;
    }
  }
}
</style>
