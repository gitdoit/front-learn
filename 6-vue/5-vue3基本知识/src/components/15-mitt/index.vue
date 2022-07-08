<template>
    <m-code>
        <pre>
        <code class="language-javascript">
            import { getCurrentInstance } from 'vue'

            const instace = getCurrentInstance()
            const emit1 = () => {
                instace?.proxy?.$Bus.emit('onNumber', 100)
            }
        </code>
      </pre>
    </m-code>
    <button @click="emit1">点我发送事件</button>
    <div class="line"></div>
    <SubEmit></SubEmit>
</template>
<script lang="ts" setup>
import { getCurrentInstance } from 'vue'
import SubEmit from './SubEmit.vue'

const instace = getCurrentInstance()
const emit1 = () => {
    instace?.proxy?.$Bus.emit('onNumber', 100)
}

</script>
<style>
.line {
    border: 2px solid #000;
    height: 2px;
    width: 100%;
}
</style>