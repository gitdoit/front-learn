<template>
  <div class="about">
    <button>
      点我向父组件传值
    </button>

  </div>
</template>

<script>
export default {
  setup(props, { emit }) {
    console.log('setup -> props', props);
    const clickFun = () => {
      emit('sendMsg', 'from ok!');
    };
    return {
      clickFun,
    };
  },
};

</script>
<style lang="stylus" scoped></style>
