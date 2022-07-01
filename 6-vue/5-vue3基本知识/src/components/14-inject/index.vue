<template>
    <m-code>
        <pre>
        <code class="language-javascript">
            // 父组件中注入
            import { provide, ref } from 'vue'
            import subBar from './subBar.vue';\

            const value = ref(1)
            provide('value', value)

            // 子组件
            const value = inject('value')
        </code>
      </pre>
    </m-code>
    <h1>{{ value }}</h1>
    <div>
        <button @click="value++">点赞👍</button>
    </div>
    <div style="height:1px;width:100%;border:1px solid;"></div>
    <sub-bar></sub-bar>
</template>
<script lang="ts" setup>
import { provide, ref } from 'vue'
import subBar from './subBar.vue';
const value = ref(1)
provide('value', value)
</script>