<template>
  <div class="relative" ref="dropdownRef">
    <p @click="swtichOpen" :class="[isOpen? 'open': 'close',' rounded-md font-semibold inline-block  px-3 h-8  leading-8 cursor-pointer ']">
      {{ title }}
    </p>
    <ul v-if="isOpen" class="absolute top-9 left-0 w-3/5 border bg-white  rounded-md text-blue-800">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useOnClickOustside from '../hooks/useOnClickOustside'
export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    // vue2的时候通过this.$refs.xxx来引用标签上ref=xxx的元素
    // 现在vue3没有this了,直接定义一个名字为xxx 的HTMLElement响应对象 返回出去,和标签上ref=xxx对应上就行了
    const dropdownRef = ref<null | HTMLElement>(null)
    useOnClickOustside(dropdownRef, () => {
      isOpen.value = false
    })

    function swtichOpen (): void{
      isOpen.value = !isOpen.value
    }
    return {
      isOpen,
      swtichOpen,
      dropdownRef
    }
  }
})
</script>

<style scoped>
.open {
  @apply bg-blue-700 ring-2
}
.close {
  @apply bg-blue-600
}

</style>
