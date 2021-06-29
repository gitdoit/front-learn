<template>
  <div class="container">
    <pre>
      使用ref函数将基本类型的数据包装成响应式的:
      let data = ref(0);
      data.value++;
      {{'{{data}\}'}}
    </pre>
    <div class="text">
      {{count}}
    </div>
    <div class="text">
      {{double}}
    </div>
    <div
      class="btn"
      @click="increase()"
    >
      👍 增加
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";
export default {
  setup() {
    let count = ref(0);
    let double = computed(() => {
      return count.value * 2;
    });
    let increase = () => {
      count.value++;
    };
    return {
      count,
      double,
      increase,
    };
  },
};
</script>

<style>
.container {
  font-size: 30px;
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
}
.btn:hover {
  cursor: pointer;
}
</style>