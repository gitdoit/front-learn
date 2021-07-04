<template>
  <div class=" h-16 mx-auto bg-blue-400 bg-cli  rounded-md text-white  grid grid-cols-12 ">
    <h1 class="col-start-1 col-span-4 text-lg  font-bold p-4">
      <router-link to="/">知乎者也专栏</router-link>
    </h1>
    <ul class="col-end-13 col-span-2 text-md leading-7 py-4">
      <li v-if="info.isLogin" >
        <Dropdown :title="`你好,${info.userName}`">
          <DropdownItem>新建文章</DropdownItem>
          <DropdownItem disabled>管理账户</DropdownItem>
          <DropdownItem>退出登录</DropdownItem>
        </Dropdown>
      </li>
      <li v-else class="text-center ">
        <div class=" w-16 h-8 border inline-block mx-2 hover:bg-white hover:text-blue-500 cursor-pointer">
          <router-link to='/login'>登录</router-link>
        </div>
        <div class=" w-16 h-8 border inline-block mx-2 hover:bg-white hover:text-blue-500 cursor-pointer">
          <router-link to='/login'>注册</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import { UserProps } from '../store'

export default defineComponent({
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    info: {
      required: true,
      type: Object as PropType<UserProps>
    }
  }
})
</script>

<style>
</style>
