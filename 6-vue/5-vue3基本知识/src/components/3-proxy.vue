<template>
  <m-code>
    <pre>
      <code class="language-javascript">
        setup() {
          const data = reactive({
            list: [1, 2, 3],
            person: {},
          });
          function update(index: number): void {
            // 直接更新数组中元素的值,也可以促使渲染视图
            data.list[index]++;
          }
          return {
            ...toRefs(data),
            update,
          };
        },
      </code>
    </pre>
  </m-code>
  <ul>
    <li
      class="proxy"
      v-for="(item,index) in list"
      :key="index"
      @click="update(index)"
    >
      {{item}}
    </li>
  </ul>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";

export default {
  setup() {
    const data = reactive({
      list: [1, 2, 3],
      person: {},
    });
    function update(index: number): void {
      data.list[index]++;
    }
    return {
      ...toRefs(data),
      update,
    };
  },
};
</script>

<style>
.proxy {
  height: 25px;
  width: 20px;
  margin: 0 auto;
  border: 1px solid;
  cursor: pointer;
}
</style>