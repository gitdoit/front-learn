<template>
    <m-code>
        <pre>
        <code class="language-javascript">
            动态组件使用componet,并结合is属性指定当前显示的组件 <br>
            如果传入组件名称,那么该组件必须声明组件名称,否则使用组件实例
        </code>
      </pre>
    </m-code>
    <button v-for="item in arr" @click="swtichCom(item)" :key="item.name">{{ item.name }}</button>
    <component :is="current.instance"></component>
</template>
<script lang="ts" setup>
import { ref, Component, reactive, markRaw } from 'vue';
import a from './a.vue'
import b from './b.vue'

type Comp = {
    name: string;
    instance: Component
}
const arr: Comp[] = reactive(
    [{
        name: 'a',
        instance: markRaw(a)
    },
    {
        name: 'b',
        instance: markRaw(b)
    }
    ]
)
type ComName = Pick<Comp, 'instance'>
let current = reactive<ComName>({
    instance: arr[0].instance
})
const swtichCom = (item: Comp) => {
    current.instance = item.instance
}

</script>