<template>
    <h1>子组件</h1>
    <h2>{{value}}</h2>
</template>

<script lang="ts" setup>
import { inject ,Ref} from 'vue';

const value = inject<Ref<number>>('value')
setTimeout(() => {
    if(value) {
        value.value = 888
    }
}, 3000);

</script>