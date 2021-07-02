<template>
  <div class="relative">
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
    function swtichOpen (): void{
      isOpen.value = !isOpen.value
    }
    return {
      isOpen,
      swtichOpen
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
