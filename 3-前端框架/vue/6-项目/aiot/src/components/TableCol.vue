<template></template>
<script lang="ts">
import { h, resolveComponent, defineComponent, PropType } from 'vue'


interface Col {
  name: string,
  prop: string,
  width?: number,
  exeFun?: (row: any) => any,
  child?: Col[]
}
export default defineComponent({
  props: {
    col: {
      required: true,
      type: Object as PropType<Col>
    }
  },
  setup(props) {
    function render(header: Col): any {
      let column = [];
      // 如果表头还有子表头
      if (header.child) {
        let child = [];
        for (let i = 0; i < header.child.length; i++) {
          child.push(render(header.child[i]))
        }
        column.push(
          h(
              resolveComponent('el-table-column'), 
              {
                label: header.name,
                align: 'center',
              }, 
              child
          )
        )
      } else {
        column.push(
          h(
            resolveComponent('el-table-column'),
            {
              label: header.name,
              prop: header.prop,
              width: header.width,
              align: 'center',
              formatter: header.exeFun 
            }
          )
        )
      }
      return column
    }
    return () => render(props.col);
  }
}
)


</script>