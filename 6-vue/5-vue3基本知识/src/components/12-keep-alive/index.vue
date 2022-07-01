<template>
    <m-code>
        <pre>
        <code class="language-javascript">
            // 组件保活,避免在多个组件间来回切换的时候频繁创建,导致接口重复请求,以及丢失输入框中输入的文本.
            // 另外使用钩子函数 onActivated onDeactivated 来监听组件是否被激活
        </code>
      </pre>
    </m-code>
    <keep-alive>
        <component :is="flag ? Foo : Bar"></component>
    </keep-alive>
    <div>
        <button v-on:click="() => flag = !flag">点击切换</button>
    </div>
</template>
<script lang="ts" setup>
import { ref, Component, reactive } from 'vue'
import Foo from './Foo.vue'
import Bar from './Bar.vue'
const flag = ref(false)



</script>