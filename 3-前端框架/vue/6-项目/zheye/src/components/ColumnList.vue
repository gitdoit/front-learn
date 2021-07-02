<template>
  <ul class="grid grid-cols-2 lg:grid-cols-3 gap-4 w-11/12 mx-auto my-4">
    <li
      v-for="item in list"
      :key="item.id"
      class="text-center "
    >
      <div class="border shadow-lg p-2">
        <img
          class="w-full object-cover cursor-pointer max-h-52"
          :src="item.avatar"
          :alt="item.title"
        />
        <h5 class="text-xl font-bold text-gray-800">{{ item.title }}</h5>
        <p class="text-lg text-gray-500 text-left my-3">
          {{ item.description }}
        </p>
        <a
          href="#"
          class="
            border border-blue-500
            rounded-md
            block
            w-24
            h-8
            leading-8
            mx-auto
            text-base
            font-bold
            text-blue-500
            hover:bg-blue-500
            hover:text-white
          "
          >进入专栏</a
        >
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export interface ColumnProps {
  id: number;
  title: string;
  avatar: string;
  description: string;
}
export default defineComponent({
  setup () {
    console.log()
  },
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  }
})
</script>

<style>
</style>
