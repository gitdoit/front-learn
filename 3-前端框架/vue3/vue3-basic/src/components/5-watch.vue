<template>
  <m-code>
    <pre>
      <code class="language-javascript">
        import { watch } from "vue";
        let title = ref("");
        watch([() => data.counter, title], (newValue, oldValue) => {
          // 被观察的对象如果是多个,可以用数组接收
          // 并且必须是一个回调函数,或者是响应式对象等
        });
      </code>
    </pre>
  </m-code>
  <div>
    <button @click="updateTitle()">重置title</button>
    <button @click="increaseCounter()">更新counter</button>
  </div>
</template>

<script lang="ts">
import { watch, ref, reactive } from "vue";

export default {
  setup() {
    const data = reactive({
      counter: 0,
    });
    let title = ref("");

    watch([() => data.counter, title], (newValue, oldValue) => {
      console.log("The newValue is" + newValue);
      console.log("The oldValue is" + oldValue);
      document.title = title.value + newValue;
    });

    function updateTitle(): void {
      title.value = "reset";
    }
    function increaseCounter(): void {
      data.counter++;
    }

    return {
      updateTitle,
      increaseCounter,
      data,
    };
  },
};
</script>

<style>
</style>