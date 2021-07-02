<template>
  <div id="app">
    <global-header :info="user"></global-header>
    <div v-if="false">
      <column-list :list="list"></column-list>
    </div>
    <div class=" w-1/3 border mx-auto mt-3 rounded-md p-3 shadow-md">
      <validate-form @form-submit="onFormSubmit">
        <validate-input type="text" placeholder="请输入邮箱"
          :rules="[Rules.NOT_NULL(''),Rules.EMAIL('')]" v-model="emailForm.val">
          密码
        </validate-input>
        <template #submit>
        </template>
      </validate-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserInfo } from './components/GlobalHeader.vue'
import ValidateInput, { Rules } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'
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
const user: UserInfo = {
  isLogin: true,
  userName: 'michael',
  id: 1
}
export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup () {
    testData.forEach(e => {
      e.avatar = e.avatar || require('@/assets/logo.png')
    })
    const emailForm = reactive({
      val: '123',
      error: false,
      msg: ''
    })
    const onFormSubmit = (ok :boolean) => {
      console.log('12121', ok)
    }
    return {
      list: testData,
      user,
      emailForm,
      Rules,
      onFormSubmit
    }
  }
})
</script>

<style>
</style>
