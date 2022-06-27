<template>
  <div id="modal-father">
    <m-code>
      <pre>
        <code class="language-javascript">
          //使用teleport标签包裹子组件,并指定to属性
          //这样就能让这个组件直接渲染在对应的地方,例如root下的某个标签上
          // 另外 defineComponent() 方法适用于配合typeScript进行类型推断
          // 不用这个也行,但是写代码的时候就没提示了
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
        </code>
      </pre>
    </m-code>
    <button @click="openModal">打开模态框</button>
    <Modal
      :isOpen="isOpen"
      @close-modal="onCloseModal"
    />
  </div>
</template>

<script lang="ts">
import Modal from "../modal.vue";
import { ref } from "vue";
export default {
  setup() {
    let isOpen = ref(false);
    let openModal = (): void => {
      isOpen.value = true;
    };
    let onCloseModal = (): void => {
      isOpen.value = false;
    };
    return {
      isOpen,
      openModal,
      onCloseModal,
    };
  },
  components: {
    Modal,
  },
};
</script>

<style>
</style>