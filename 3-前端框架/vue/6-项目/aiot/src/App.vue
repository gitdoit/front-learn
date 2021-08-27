<template>
  <div class="wapper">
    <el-menu
    default-active="tenant"
    class="theHeader"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="tenant">
      <router-link to='/tenant'>租户管理</router-link>
    </el-menu-item>
    <el-menu-item index="sensor">
      <router-link to='/sensor'>设备管理</router-link>
    </el-menu-item>
    <el-menu-item index="user">
      <router-link to='/user'>用户管理</router-link>
    </el-menu-item>
    <el-menu-item index="monitor">
      <router-link to='/monitor'>测点管理</router-link>
    </el-menu-item>
  </el-menu>
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
interface Prop {
  tenant: Boolean;
  sensor: Boolean;
  user: Boolean;
  monitor: Boolean;
  [key: string]: Boolean
}

export default defineComponent({
  setup() {
    const show :Prop= reactive({
      tenant: true,
      user: false,
      sensor: false,
      monitor: false
    })

    function handleSelect(index :string): void {

      Object.keys(show).forEach((p: string) => {
            show[p] = false;
          })
      show[index] = true;
    }
    return {
      handleSelect
    };
  },
});
</script>


<style>
.wapper .theHeader {
  padding-left: 35%;
}
</style>
