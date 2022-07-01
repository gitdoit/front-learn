<template>
    <label for="bar">Bar</label>
    <input id="bar" type="text" name="test">
</template>
<script lang="ts" setup>
import { onMounted,onUnmounted ,onActivated,onDeactivated} from 'vue';

onMounted(() => {
    console.log('Bar 组件被挂载!');
})
onUnmounted(() => {
    console.log('Bar 组件被卸载!');
})
onActivated(() => {
    console.log('Bar 组件被激活!');
})
onDeactivated(() => {
    console.log('Bar 组件被失活');
})
</script>