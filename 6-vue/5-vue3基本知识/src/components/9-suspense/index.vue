<template>
  <m-code>
    <pre>
        <code class="language-javascript">
          // 使用异步组件,配合Suspense标签, 这样在加载的时候能够给个默认占位提示
          // 异步组件的就是setup函数返回Promise,或者用它的语法糖async+await都行
          export default defineComponent({
            setup() {
              return new Promise((reslove) => {
                    setTimeout(() => {
                      return reslove({ result: 42 });
                    }, 3000);
                  });
            }
          });

          // 在父组件中使用,来捕获组件渲染异常
          onErrorCaptured((e) => {
            console.log(e);
          });
        </code>
      </pre>
  </m-code>
  <Suspense>
    <template #default>
      <async-show></async-show>
    </template>
    <template #fallback>
      Please wait...
    </template>
  </Suspense>
  <h1>======================</h1>
  <Suspense>
    <template #default>
      <dog-show></dog-show>
    </template>
    <template #fallback>
      Please wait...
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, onErrorCaptured } from "vue";
import AsyncShow from "./AsyncShow.vue";

export default defineComponent({
  components: {
    AsyncShow,
    DogShow: defineAsyncComponent(() => import("./AsyncShowDog.vue")),
  },
  setup() {
    onErrorCaptured((e) => {
      console.log(e);
    });
  },
});
</script>
<style>
</style>