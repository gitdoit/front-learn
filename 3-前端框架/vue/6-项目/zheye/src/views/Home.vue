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
import { defineComponent, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalProp } from '../store'
import ColumnList from '../components/ColumnList.vue'

export default defineComponent({
  name: 'Home',
  components: { ColumnList },
  setup () {
    const store = useStore<GlobalProp>()
    const list = computed(() => store.state.topic)
    onMounted(() => {
      store.dispatch('fetchColums')
    })
    return {
      list
    }
  }
})
</script>

<style>

</style>
