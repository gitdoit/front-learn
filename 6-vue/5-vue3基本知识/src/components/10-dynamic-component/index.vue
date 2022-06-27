<template>
<h1>动态组件</h1>
<button @click="flag = !flag">点我切换组件</button>
<component :is="flag ? a : b"></component>


</template>
<script lang="ts" setup> 
import { ref } from 'vue';
import a from './a.vue'
import b from './b.vue'

const flag = ref(true)


</script>