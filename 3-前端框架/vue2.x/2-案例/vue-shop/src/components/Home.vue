<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="heima" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="exit"></el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b" unique-opened="true" router>
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级子菜单 -->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主要结构 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      menuList: ''
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    exit() {
      window.sessionStorage.clear()
      this.$router.push('')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      console.log(res)
    }
  }
}
</script>
<style lang="less" scoped>
.el-header {
  background-color: #373d41;
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.home_container {
  height: 100%;
}
.iconfont {
  margin-left: 10px;
}
</style>
