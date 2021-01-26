<template>
  <div class="about">
    <button @click="clickFun">
      点我向父组件传值
    </button>

  </div>
</template>

<script>
export default {
  setup(props, { emit }) {
    // 搂一眼setup的形参，可以接收emit用来发射事件
    console.log('setup -> props', props);
    const clickFun = () => {
      emit('send-msg', 'from ok!');
    };
    return {
      clickFun,
    };
  },
};

</script>
<style lang="stylus" scoped></style>
