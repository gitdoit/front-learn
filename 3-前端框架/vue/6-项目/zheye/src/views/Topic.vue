<template>
  <div class="my-4">
    <img class=" inline-block h-24   rounded-full border" src="../assets/svg/news.svg" alt="">
    <div class=" inline-block mx-4   align-middle ">
      <h1 class=" text-2xl font-bold ">{{topic.title}}</h1>
      <p class="text-gray-400">{{topic.description}}</p>
    </div>
  </div>
  <div v-if="loading">加载中...</div>
  <div v-else>
    <post-list   :list="post" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ColumnProps, PostProps } from '../model'
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
    const topicId = route.params.id

    const loading = computed(() => {
      console.log('xxx')
      return store.state.loading
    })
    onMounted(() => {
      store.dispatch('fetchColum', topicId)
      store.dispatch('fetchPosts', topicId)
    })
    const currentTopic : ColumnProps = store.getters.getTopicById(topicId)
    const post :PostProps[] = store.state.posts
    return {
      post,
      topic: currentTopic,
      loading
    }
  }
})
</script>

<style>

</style>
