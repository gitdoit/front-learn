<template>
  <div class="home">
    <Son msg="Welcome to Your Vue.js App" @send-msg='showMsg'/>
  </div>
</template>

<script>
// @ is an alias to /src
import Son from '@/components/子组件.vue';

export default {
  name: 'Home',
  components: {
    Son,
  },
  setup() {
    function showMsg(msg) {
      alert(`msg from child:${msg}`);
    }
    return {
      showMsg,
    };
  },
};
</script>
