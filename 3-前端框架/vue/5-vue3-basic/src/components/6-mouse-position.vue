<template>
  <m-code>
    <pre>
      <code class="language-javascript">
        // 将逻辑抽离出来放到一个单独的文件内
        // 这样可以做到复用,而不是全部都写在setup函数内
        let {x,y} = useMousePosition();
        return {
          x,y
        }
      </code>
    </pre>
  </m-code>
  <div>
    <h1>[{{x}},{{y}}]</h1>
  </div>
</template>

<script>
import useMousePosition from '../hooks/useMousePosition'

export default {
  setup() {
    let {x,y} = useMousePosition();
    return {
      x,y
    }
  }
}
</script>

<style>
</style>