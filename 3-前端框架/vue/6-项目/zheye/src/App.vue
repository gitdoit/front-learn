<template>
  <div id="app">
    <GlobalHeader :info="user"></GlobalHeader>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserInfo } from './components/GlobalHeader.vue'
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test',
    avatar: 'https://images.dog.ceo/breeds/shihtzu/n02086240_7170.jpg',
    description: 'sm:移动手机 md:横版 lg:平板电脑 xl:cp端 '
  },
  {
    id: 1,
    title: 'test',
    avatar: 'https://images.dog.ceo/breeds/shihtzu/n02086240_7170.jpg',
    description: 'Say hello to the fastest smartphone chip ever. '
  },
  {
    id: 1,
    title: 'test',
    avatar: 'https://images.dog.ceo/breeds/shihtzu/n02086240_7170.jpg',
    description: 'Say hello to the fastest smartphone chip ever. '
  },
  {
    id: 1,
    title: 'test',
    avatar: '',
    description: 'Say hello to the fastest smartphone chip ever. '
  }
]
const user :UserInfo = {
  isLogin: true,
  userName: 'michael',
  id: 1
}
export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader
  },
  setup () {
    testData.forEach(e => {
      e.avatar = e.avatar || require('@/assets/logo.png')
    })
    return {
      list: testData,
      user
    }
  }
})
</script>

<style>
</style>
