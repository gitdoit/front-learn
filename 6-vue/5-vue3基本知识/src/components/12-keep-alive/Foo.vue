<template>
    <label for="test">Foo</label>
    <input lable="test" type="text" name="test" >
</template>
<script lang="ts" setup>
import { onMounted,onUnmounted ,onActivated,onDeactivated} from 'vue';

onMounted(() => {
    console.log('Foo 组件被挂载!');
})
onUnmounted(() => {
    console.log('Foo 组件被卸载!');
})
onActivated(() => {
    console.log('Foo 组件被激活!');
})
onDeactivated(() => {
    console.log('Foo 组件被失活');
})
</script>