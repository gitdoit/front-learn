<template>
  <div>
    <img :src="data && data.message">
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import axsio from "axios";
export default defineComponent({
  async setup() {
    let { data } = await axsio.get("https://dog.ceo/api/breeds/image/random");
    data = reactive(data);
    function chagen(): void {
      axsio.get("https://dog.ceo/api/breeds/image/random").then((res) => {
        data.message = res.data.message;
      });
    }

    return {
      data,
      chagen,
    };
  },
});
</script>

<style>
</style>