<template>
<div>
  <ul class="mx-auto ">
    <li v-for="post in list" :key="post.id" class="border shadow-lg w-full mb-6 p-4">
      <h1 class=" text-2xl font-bold">{{post.title}}</h1>
      <img class=" float-left h-16 m-2 rounded-md" :src="post.image" v-if="post.image" alt="">
      <p class=" pl-2">{{post.content}}</p>
      <h3 class=" text-gray-300 text-sm block mt-4 ml-2">
        {{post.createAt}}
      </h3>
    </li>
  </ul>
</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PostProps } from '../TestData'
export default defineComponent({
  name: 'PostList',
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>
    }
  }
})
</script>

<style>

</style>
