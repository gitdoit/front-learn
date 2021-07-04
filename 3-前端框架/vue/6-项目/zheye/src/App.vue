<template>
  <div id="app" class="w-3/4 mx-auto">
    <global-header :info="user"></global-header>
    <router-view></router-view>
    <Footer>
      <ul class="flex justify-center leading-10 text-gray-400 cursor-pointer py-1">
        <li class="mx-4">@ 2021 知乎者也专栏</li>
        <li class="mx-4">课程</li>
        <li class="mx-4">文档</li>
        <li class="mx-4">联系</li>
        <li class="mx-4">更多</li>
      </ul>
    </Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { GlobalProp } from './store'
import { useStore } from 'vuex'
import Footer from './components/Footer.vue'
import GlobalHeader from './components/GlobalHeader.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Footer
  },
  setup () {
    const store = useStore<GlobalProp>()
    const user = computed(() => store.state.user)
    const fromData = reactive({
      email: '',
      pwd: ''
    })
    return {
      user,
      fromData
    }
  }
})
</script>

<style>
</style>
