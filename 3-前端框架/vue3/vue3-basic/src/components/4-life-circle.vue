<template>
  <m-code>
    <pre>
      <code class="language-javascript">
        import {onMounted, onUpdated } from "vue";
        export default {
          setup() {
            onMounted(() => {
              console.log("trigger onMounted!");
            });
            onUpdated(() => {
              console.log("trigger updated!");
            });
          },
        };
      </code>
    </pre>
  </m-code>

  <div
    class="demo"
    @click="update()"
  >
    {{counter}}
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onUpdated } from "vue";

export default {
  setup() {
    onMounted(() => {
      console.log("trigger onMounted!");
    });
    onUpdated(() => {
      console.log("trigger updated!");
    });

    let counter = ref(0);
    function update(): void {
      counter.value++;
    }
    return {
      counter,
      update,
    };
  },
};
</script>

<style>
</style>