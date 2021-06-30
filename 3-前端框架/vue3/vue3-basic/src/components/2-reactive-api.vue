<template>
  <div class="container">
    <m-code>
      <pre>
        <code  class="language-javascript">
          // reactive函数将一个对象包装成响应式的,这个时候就可以直接操作对象的属性
          // 而不需要带value了
          const data = reactive({
            count: 0,
            double: computed(() =>{ return data.count * 2}),
            increase: () => data.count++ }
          );
          return {
            data
          }
          // 使用方式
          {{'{{data.count}\}'}}
          // 由于直接返回data引用的时候需要data.count这样
          // 比较麻烦,可以用return {...toRefs(data)}
        </code>
      </pre>
    </m-code>

    <div class="text">
      {{data.count}}
    </div>
    <div class="text">
      {{data.double}}
    </div>
    <div
      class="btn"
      @click="data.increase()"
    >
      👍 增加
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, computed } from "vue";

interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}

export default {
  setup() {
    const data: DataProps = reactive({
      count: 0,
      double: computed(() => {
        return data.count * 2;
      }),
      increase: () => data.count++,
    });
    return {
      data,
    };
  },
};
</script>

<style>
.container {
  font-size: 15px;
}
.text {
  height: 40px;
  width: 80px;
  border: 1px solid;
  line-height: 40px;
  text-align: center;
  margin: 10px auto;
}
.btn {
  font-size: 20px;
  text-align: center;
}
.btn:hover {
  cursor: pointer;
}
</style>