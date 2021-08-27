<template>
    <el-table :data="list" size="small" stripe border>
        <table-col v-for="(item, index) in cols" :col="item" :key="index"></table-col>
    </el-table>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import TableCol from '../components/TableCol.vue'
import { listSensor } from '../service'

export default defineComponent({
    components: { TableCol },
    name: 'tenant',
    setup() {
        const list :any[] = reactive([]);
        listSensor().then(r => {
            if(r.data.success) {
                list.push(...r.data.data)
            }
        })
        const cols = reactive([
            {
                name: '组织名称',
                prop: 'name',
            },
            {
                name: '组织id',
                prop: 'id',
            },
            {
                name: '租户id',
                prop: 'tenantId',
            },
            {
                name: "创建时间",
                prop: "createTime",
            }
        ])
        return {
            cols,
            list
        }
    }
})
</script>