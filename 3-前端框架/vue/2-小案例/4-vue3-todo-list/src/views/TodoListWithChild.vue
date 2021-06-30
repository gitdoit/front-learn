<template>
  <div class="wapper">
    <ul>
      <li>
        <router-link to="/add">添加</router-link>|
      </li>
      <li>
        <router-link to="/done">已完成的</router-link>|
      </li>
      <li>
        <router-link to="/delete">删除的</router-link>|
      </li>
    </ul>
  </div>
  <router-view />
</template>
<script>
export default {

};
</script>
<style lang="scss">
.wapper{
  margin-top: 15px;
  ul{
    li{
      display: inline-block;
      margin: 0 5px;
      list-style: none;
    }
  }
}
.container {
  width: 950px;
  margin: 0 auto;
  h2 {
    text-align: left;
  }
  ul {
    border: 1px solid #ccc;
    min-height: 50px;
    padding-bottom: 10px;
    padding-right: 40px;
    li {
      list-style: none;
      border: 1px solid #ccc;
      text-align: left;
      border-radius: 6px;
      margin-top: 10px;
      span {
        float: right;
        vertical-align: bottom;
        padding-top: 2px;
        padding-right: 10px;
        cursor: pointer;
        &:hover {
          color: blue;
        }
      }
    }
  }

  .form {
    input {
      width: 420px;
      height: 40px;
      box-sizing: border-box;
      padding: 0 15px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      color: #606266;
      font-size: 14px;
      &:focus {
        border-color: #00a1d6;
        outline: 0;
      }
    }
    .btn {
      // margin-top: 15px;
      height: 40px;
      width: 50%;
      margin: 15px auto 0 auto;
      background-color: darkcyan;
      border-radius: 10px;
      line-height: 40px;
      font-size: 20px;
      font-weight: 700;
      color: #fff;
    }
  }
}
</style>
