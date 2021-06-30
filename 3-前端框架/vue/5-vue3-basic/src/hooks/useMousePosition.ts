import {ref,onMounted,onUnmounted,Ref} from 'vue';

interface ReturnType {
  x: Ref<number>,
  y: Ref<number>,
}

function useMousePosition() : ReturnType{
  const x = ref(0);
  const y = ref(0);

  function listener(e :MouseEvent): void{
    x.value = e.pageX;
    y.value = e.pageY;
  }
  onMounted(() => {
    document.addEventListener('click',listener)
  })

  onUnmounted(() => {
    document.removeEventListener('click',listener)
  })
  return {x,y}
}

export default useMousePosition;