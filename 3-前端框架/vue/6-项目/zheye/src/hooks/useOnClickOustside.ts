import { onMounted, onUnmounted, Ref } from 'vue'

const onClickOutside = (e :Ref<null|HTMLElement>, callBack: (target :HTMLElement | null) => void): void => {
  const handle = (el :MouseEvent) => {
    if (e.value && !e.value.contains(el.target as HTMLElement)) {
      callBack(el.target as HTMLElement)
    }
  }
  onMounted(() => {
    document.addEventListener('click', handle)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handle)
  })
}
export default onClickOutside
