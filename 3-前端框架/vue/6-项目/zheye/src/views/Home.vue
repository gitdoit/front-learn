<template>
  <div>
    <div class="w-11/12 mx-auto ">
      <img src="../assets/svg/create_post.svg" alt="create" class="w-1/2 mx-auto mt-6">
      <button class=" w-28 h-8 border shadow-lg bg-blue-500 rounded-md mx-auto block my-6 text-white">开始写文章</button>
    </div>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColumnList, { ColumnProps } from '../components/ColumnList.vue'
export default defineComponent({
  name: 'Home',
  components: { ColumnList },
  setup () {
    const list : ColumnProps[] = [
      {
        id: 1,
        title: 'God Job',
        avatar: 'https://images.dog.ceo/breeds/terrier-lakeland/n02095570_6222.jpg',
        description: 'Vue is a good good youossdf ewsce!'
      },
      {
        id: 2,
        title: 'God Job',
        avatar: 'https://images.dog.ceo/breeds/papillon/n02086910_2648.jpg',
        description: 'Vue is a good good youossdf ewsce!'
      },
      {
        id: 3,
        title: 'God Job',
        avatar: 'https://images.dog.ceo/breeds/papillon/n02086910_2648.jpg',
        description: 'Vue is a good good youossdf ewsce!'
      },
      {
        id: 4,
        title: 'God Job',
        avatar: 'https://images.dog.ceo/breeds/papillon/n02086910_2648.jpg',
        description: 'Vue is a good good youossdf ewsce!'
      },
      {
        id: 5,
        title: 'God Job',
        avatar: 'https://images.dog.ceo/breeds/papillon/n02086910_2648.jpg',
        description: 'Vue is a good good youossdf ewsce!'
      },
      {
        id: 6,
        title: 'God Job',
        avatar: 'https://images.dog.ceo/breeds/papillon/n02086910_2648.jpg',
        description: 'Vue is a good good youossdf ewsce!'
      }
    ]
    return {
      list
    }
  }
})
</script>

<style>

</style>
