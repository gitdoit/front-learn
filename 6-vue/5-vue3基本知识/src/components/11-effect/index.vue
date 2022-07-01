<template>
  <m-code>
    <pre>
        <code class="language-javascript">
            import { ref, watchEffect } from 'vue'
            const foo = ref(1)
            const bar = ref(1)
            // 使用副作用,在响应式变量变化的时候执行副作用函数
            watchEffect(() => {
                // 副作用函数会立即执行一次,因为vue需要收集依赖
                // 什么时候使用watchEffect,什么时候使用watch?
                // 1 对于需要依赖多个响应式数据来进行副作用操作,使用watchEffect
                // 2 对于不需要关心被监测对对象,只关心是否有变化使用watchEffect
                // 3 需要处理前后值变化,使用watch
                console.log(foo.value+bar.value);
            })
        </code>
      </pre>
  </m-code>
  <p>
    <strong>watchEffect</strong>在第一次执行时会收集依赖,此时需要保证条件语句中的依赖对象是否能被访问
  </p>
  <a href="https://stackoverflow.com/questions/60510895/vue-3-composition-api-watcheffect-vs-watch"
    style="color: blue;">watcheffect VS watch</a>
  <br>
  <button v-on:click="() => foo++">点击查看控制台</button>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
const foo = ref(1)
const bar = ref(1)

watchEffect(() => {
  console.log(foo.value+bar.value);
})

</script>