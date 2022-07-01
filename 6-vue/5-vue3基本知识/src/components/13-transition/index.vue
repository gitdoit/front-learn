<template>
    <button @click="() => flag = !flag">点击切换</button>
    <Transition>
        <div class="box" v-if="flag"></div>
    </Transition>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const flag = ref(true)
</script>
<style>
.box {
    width: 100px;
    height: 100px;
    background-color: brown;
    margin: 10px auto;
}

.v-enter-from {
    width: 0px;
    height: 0px;
    background-color: #fff;
}
.v-enter-to {
    width: 100px;
    height: 100px;
    background-color: brown;
}

.v-leave-from {
    width: 100px;
    height: 100px;
    background-color: brown;
}
.v-leave-to {
    width: 0px;
    height: 0px;
    background-color: brown;
}

.v-enter-active ,.v-leave-active{
    transition: all 1.5s ease-in;
}


</style>