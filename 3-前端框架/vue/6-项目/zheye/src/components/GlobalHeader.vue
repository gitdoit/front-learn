<template>
  <div class=" h-16 w-11/12  mx-auto bg-blue-400 bg-cli  rounded-md text-white  grid grid-cols-12 ">
    <h1 class="col-start-1 col-span-4 text-lg  font-bold p-4">知乎者也专栏</h1>
    <ul class="col-end-13 col-span-2 text-md leading-7 py-4">
      <li v-if="info.isLogin" >
        <Dropdown :title="`你好,${info.userName}`">
          <DropdownItem>新建文章</DropdownItem>
          <DropdownItem disabled>管理账户</DropdownItem>
          <DropdownItem>退出登录</DropdownItem>
        </Dropdown>
      </li>
      <li v-else class="text-center ">
        <div class=" w-16 h-8 border inline-block mx-2 hover:bg-white hover:text-blue-500 cursor-pointer">登录</div>
        <div class=" w-16 h-8 border inline-block mx-2 hover:bg-white hover:text-blue-500 cursor-pointer">注册</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
export interface UserInfo {
  isLogin: boolean;
  userName?: string;
  id?: number;
}
export default defineComponent({
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    info: {
      required: true,
      type: Object as PropType<UserInfo>
    }
  }
})
</script>

<style>
</style>
