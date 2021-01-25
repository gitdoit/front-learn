<template>
  <div class="hello">
    <input type="text" v-model="state.num1">
    <span>+</span>
    <input type="text" v-model="state.num2">
    <span>=</span>
    {{state.result}}
  </div>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup() {
    const state = reactive({
      num1: 0,
      num2: 0,
      result: computed(() => parseInt(state.num1, 10) + parseInt(state.num2, 10)),
    });
    return { state };
  },
  // data() {
  //   return {
  //     num1: 0,
  //     num2: 0,
  //   };
  // },
  // computed: {
  //   result() {
  //     return parseInt(this.num1, 10) + parseInt(this.num2, 10);
  //   },
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
