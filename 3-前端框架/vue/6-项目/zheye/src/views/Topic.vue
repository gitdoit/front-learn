<template>
  <div class="my-4">
    <img class=" inline-block h-24   rounded-full border" src="../assets/svg/news.svg" alt="">
    <div class=" inline-block mx-4   align-middle ">
      <h1 class=" text-2xl font-bold ">{{topic.title}}</h1>
      <p class="text-gray-400">{{topic.description}}</p>
    </div>
  </div>
  <post-list :list="post"></post-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { PostProps, ColumnProps } from '../TestData'
import { GlobalProp } from '../store'
import { useStore } from 'vuex'
import PostList from '../components/PostList.vue'
export default defineComponent({
  name: 'topic',
  components: {
    PostList
  },
  setup () {
    const route = useRoute()
    const store = useStore<GlobalProp>()
    const topicId = +route.params.id
    const currentTopic : ColumnProps = store.getters.getTopicById(topicId) || {
      id: 1,
      title: '',
      description: ''
    }
    const post :PostProps[] = store.state.posts.filter(e => e.topicId === topicId)
    return {
      post,
      topic: currentTopic
    }
  }
})
</script>

<style>

</style>
