<template>
  <li :class="[disabled ? 'text-gray-400 cursor-not-allowed' : '','border-b-2 px-2 cursor-pointer']">
    <slot></slot>
  </li>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DropdownItem',
  props: {
    disabled: {
      required: false,
      type: Boolean
    }
  }
})
</script>

<style>

</style>
