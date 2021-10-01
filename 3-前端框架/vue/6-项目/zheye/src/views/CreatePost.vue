<template>
  <h1 class="text-lg font-black">新建文章</h1>
  <div class="mx-auto shadow-md border-2 p-8 mt-2">
    <validate-form @form-submit="onCreatePost">
      <validate-input v-model="data.title" type="text" :rules="[Rules.NOT_NULL('')]">标题</validate-input>
      <validate-input tag='textarea' v-model="data.content" type="password" :rules="[Rules.NOT_NULL('')]">内容</validate-input>
    </validate-form>
  </div>
</template>
<script lang="ts" setup>
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { Rules } from '../components/ValidateInput.vue'
import { reactive } from 'vue'
import { GlobalProp } from '../store'
import { useStore } from 'vuex'
import { PostProps } from '../TestData'
import { useRouter } from 'vue-router'

const data = reactive({
  title: '',
  content: ''
})
const router = useRouter()
const stroe = useStore<GlobalProp>()
const topicId = stroe.state.user.columnId
function onCreatePost (validate: boolean) {
  if (validate) {
    if (topicId) {
      const newPost :PostProps = {
        id: new Date().getTime(),
        title: data.title,
        content: data.content,
        topicId,
        createAt: new Date().toLocaleDateString()
      }
      stroe.commit('createPost', newPost)
      router.push({ name: 'topic', params: { id: topicId } })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
