<template>
  <div class="mx-auto shadow-md border-2 p-8 mt-2">
    <validate-form @form-submit="onLogin">
      <validate-input v-model="formData.email" type="text" :rules="[Rules.EMAIL(''),Rules.NOT_NULL('')]">邮箱</validate-input>
      <validate-input v-model="formData.password" type="password" :rules="[Rules.NOT_NULL('')]">密码</validate-input>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { GlobalProp } from '../store'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { Rules } from '../components/ValidateInput.vue'
export default defineComponent({
  components: { ValidateForm, ValidateInput },
  name: 'Login',
  setup () {
    const stroe = useStore<GlobalProp>()
    const router = useRouter()
    const formData = reactive({
      email: '',
      password: ''
    })
    const onLogin = (validate :boolean) => {
      if (validate) {
        console.log('登录成功!')
        stroe.dispatch('loginAndFetch', formData).then(() => {
          router.push('/')
        })
        // stroe.commit('login')
      }
    }
    return {
      onLogin,
      Rules,
      formData
    }
  }
})
</script>

<style>

</style>
