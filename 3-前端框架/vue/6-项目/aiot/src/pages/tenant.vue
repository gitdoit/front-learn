<template>
  <el-table :data="data.list" size="small" stripe border>
    <table-col v-for="(item, index) in cols" :col="item" :key="index"></table-col>
    <el-table-column fixed="right" label="操作" width="150">
      <template #default="scope">
        <el-button type="text" size="small" @click="showAddUser(scope.row)">添加用户</el-button>
        <el-button type="text" size="small" @click="showAddTenant(scope.row)">添加设备</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 添加用户 -->
  <el-dialog title="添加用户到组织" v-model="data.showAddUser">
    <el-form :model="data.form" ref="ruleForm" status-icon>
      <el-form-item
        label="手机号"
        :rules="rules.phone('手机号不能为空')"
        prop="mobile"
      >
        <el-input v-model="data.form.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="data.showAddUser = false">取 消</el-button>
        <el-button type="primary" @click="doAddUser">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import TableCol from '../components/TableCol.vue'
import { listSensor, joinOrg } from '../service'
import rules from '../util/validates'

interface Org {
  id: string
}

export default defineComponent({
  components: { TableCol },
  name: 'tenant',
  setup () {
    const data = reactive({
      list: new Array<any>(),
      showAddUser: false,
      showAddTenant: false,
      selected: {
        id: ''
      },
      form: {
        mobile: '',
        code: '',
        name: '',
        texpear: ''
      }
    })
    // 加载租户
    listSensor().then(r => {
      if (r.data.success) {
        data.list = r.data.data
      }
    })
    // 展示添加用户form
    const showAddUser = (row: {id: string}) => {
      data.showAddUser = true
      data.selected = row
    }
    // 添加用户到组织
    function doAddUser () {
      data.showAddUser = false
      if (data.selected !== null) {
        joinOrg(data.form.mobile, data.selected.id)
      }
    }

    const showAddTenant = (row: any) => {
      data.showAddTenant = true
      data.selected = row
    }
    function doAddTenant () {
      data.showAddTenant = false
    }

    const cols = reactive([
      {
        name: '组织名称',
        prop: 'name'
      },
      {
        name: '组织id',
        prop: 'id'
      },
      {
        name: '租户id',
        prop: 'tenantId'
      },
      {
        name: '创建时间',
        prop: 'createTime'
      }
    ])
    return {
      cols,
      data,
      showAddUser,
      showAddTenant,
      doAddUser,
      doAddTenant,
      rules
    }
  }
})
</script>
