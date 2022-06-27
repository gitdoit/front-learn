<template>
  <m-code>
    <pre>
      <code class="language-javascript">
        // 定义响应类型
        interface Response &lt;T&gt; {
          data: T | null;
          loadding: boolean;
          error: Error | null;
          success: boolean;
        }
      </code>
    </pre>
  </m-code>
  <div v-if="loadding">
    <h1>图片加载中...</h1>
  </div>
  <div
    v-else
    id="div"
  >
    <img
      :src="data.message"
      id="axios"
    >
  </div>
</template>

<script lang="ts">
import useURLLoader from "../../hooks/useURLLoader";
import { toRefs } from "vue";

interface DogResponse {
  message: string;
  status: string;
}

export default {
  setup() {
    let resposne = useURLLoader<DogResponse>(
      "https://dog.ceo/api/breeds/image/random"
    );

    return {
      ...toRefs(resposne),
    };
  },
};
</script>

<style>
#div #axios {
  height: unset;
  width: unset;
}
</style>