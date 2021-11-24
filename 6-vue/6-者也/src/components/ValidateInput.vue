<template>
  <div class="my-4">
    <label class="block font-bold">
      <slot></slot>
    </label>
    <input
      v-if="tag !== 'textarea'"
      v-bind="$attrs"
      :value="value"
      @input="onInput"
      @blur="onBlur"
      class="px-2 border focus:outline-none focus:ring focus:border-blue-300 w-full h-8"
    />
    <textarea
      v-else
      v-bind="$attrs"
      :value="value"
      @input="onInput"
      @blur="onBlur"
      class="px-2 border focus:outline-none focus:ring focus:border-blue-300 w-full h-14"
    />
    <div class="text-red-500" v-if="hasError">{{ errorMsg }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, onMounted } from 'vue'
import { mitter } from './ValidateForm.vue'
interface ValidateRule {
  readonly rule: (value: string | null, notice?: string) => boolean,
  readonly message: string,
}
export type TagType = 'input' | 'textarea'
/**
 * 1、属性校验
 *  定义一组校验规则，在组件的props上声明可以传入校验规则，这样在输入的时候可以进行自定义校验
 * 2、v-model绑定
 *  普通的input的元素可以用vue的v-model进行绑定，但是我们自己写的组件就需要写代码来实现对应的功能
 *  1、在props中声明一个名为modelValue的属性（必须是这个名字）
 *  2、在值被更新的时候调用context.emit('update:modelValue', inputValue)
 */
export default defineComponent({
  name: 'ValidateInput',
  // 属性继承(在组件上写属性会出现在template下最外层的那个div上)
  inheritAttrs: false,
  props: {
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    },
    modelValue: {
      required: true,
      type: String
    },
    rules: {
      required: false,
      type: Array as PropType<ValidateRule[]>
    }
  },
  setup (props, context) {
    const value = ref(props.modelValue || '')
    const hasError = ref(false)
    const errorMsg = ref('')
    const onBlur = (): boolean => {
      if (props.rules) {
        hasError.value = !props.rules.every(r => {
          if (!r.rule(value.value)) {
            errorMsg.value = r.message
            return false
          }
          return true
        })
      }
      return !hasError.value
    }
    const onInput = (event: Event) => {
      const inputValue = (event.target as HTMLInputElement).value
      value.value = inputValue
      context.emit('update:modelValue', inputValue)
    }
    // 加载的时候注册上去
    onMounted(() => {
      mitter.emit('form-item-create', onBlur)
    })
    return {
      onBlur,
      hasError,
      errorMsg,
      value,
      onInput
    }
  }
})

class Rules {
  static readonly NOT_NULL = (message: null | string): ValidateRule => {
    return {
      rule: (value) => !!value,
      message: message || '该项不能为空'
    }
  }

  static readonly EMAIL = (message: null | string): ValidateRule => {
    return {
      rule: (value) => {
        const emailReg = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/
        return !!value && emailReg.test(value)
      },
      message: message || '请输入合法的邮箱'
    }
  }
}
export { Rules }
</script>

<style>
</style>
