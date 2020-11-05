<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" />
      </div>
      <!-- 登录表单 -->
      <el-form ref="loginFormRef" label-width="0px" class="login_form" :model="loginForm" :rules="loginFormRules">
        <el-form-item  prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input  type="password" v-model="loginForm.password" prefix-icon="iconfont icon-3702mima"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '用户名不能为空！', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名在3到10位之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名在3到10位之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      // 登录验证
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          // eslint-disable-next-line no-unused-vars
          const { data: res } = await this.$http.post('login', this.loginForm)
          if (res.meta.status !== 200) {
            return this.$message.error('登录失败！')
          }
          this.$message.success('登录成功')
          window.sessionStorage.setItem('token', res.data.token)
          // 跳转到首页
          this.$router.push('/home')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  // 将应用这个样式的div抠出来，相对于浏览器
  // 进行绝对定位
  position: absolute;
  // 左,上两边距离浏览器50%
  left: 50%;
  top: 50%;
  // 将这个div移动自己长宽的负50%
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    // 边框1像素
    border: 1px solid #eee;
    // 圆角
    border-radius: 50%;
    // 内边距10像素
    padding: 10px;
    // 添加阴影
    box-shadow: 0 0 10px #ddd;
    // 绝对定位
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      height: 100%;
      width: 100%;
      // 圆角
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  bottom: 0;
}
</style>
