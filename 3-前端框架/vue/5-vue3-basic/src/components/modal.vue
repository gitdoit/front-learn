<template>
  <teleport to="#modal">
    <div
      class="modal"
      v-if="isOpen"
    >
      <button @click="closeModal()">X</button>
      <slot>
        This is a Modal!!
      </slot>
    </div>
  </teleport>

</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    isOpen: Boolean,
  },
  emits: {
    "close-modal": null,
  },
  setup(props, context) {
    let closeModal = (): void => {
      console.log("子组件发射close-modal事件!");
      context.emit("close-modal");
    };
    return {
      closeModal,
    };
  },
});
</script>

<style>
.modal {
  position: absolute;
  left: 20px;
  top: 40px;
  height: 100px;
  width: 200px;
  border: 1px solid;
  text-align: center;
  font-size: 20px;
  line-height: 100px;
}
.modal button {
  height: 20px;
  width: 35px;
  background-color: blueviolet;
  position: absolute;
  left: 5px;
  top: 3px;
  font-size: 20px;
  line-height: 20px;
  color: #fff;
}
</style>