<template>
    <m-code>
        <pre>
        <code class="language-javascript">
            import { reactive, getCurrentInstance } from 'vue'
            const instace = getCurrentInstance()
            const data = reactive({
                list: [] as number[]
            })
            instace?.proxy?.$Bus.on('onNumber', (num: number) => {
                data.list.push(num)
            })
        </code>
      </pre>
    </m-code>
    <h1>Listener event from Mitt</h1>
    <div v-for="(item, index) in data.list" :key="index">
        {{ item }}
    </div>
</template>
<script lang="ts" setup>
import { reactive, getCurrentInstance } from 'vue'
const instace = getCurrentInstance()
const data = reactive({
    list: [] as number[]
})
instace?.proxy?.$Bus.on('onNumber', (num: number) => {
    data.list.push(num)
})


</script>