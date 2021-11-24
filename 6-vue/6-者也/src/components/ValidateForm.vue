<template>
  <div>
    <form action="">
      <div>
        <slot></slot>
      </div>
      <div @click.prevent="onSubmit">
        <slot name="submit">
          <button class="hover:opacity-60 w-20 h-8 bg-blue-600 rounded-md text-center leading-8 text-white mx-auto block">提交</button>
        </slot>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
export const mitter = mitt()
export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup (props, context) {
    const cheacks: any[] = []
    const handler = (value: any) => {
      cheacks.push(value)
    }
    mitter.on('form-item-create', handler)
    const onSubmit = () => {
      context.emit('form-submit', cheacks.map(e => e()).every(e => e))
    }
    onUnmounted(() => {
      mitter.off('form-item-create', handler)
    })
    return {
      onSubmit
    }
  }
})
</script>

<style>

</style>
