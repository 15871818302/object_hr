<template>
  <div>
    <el-tree
      :data="rightList"
      show-checkbox
      node-key="id"
      :default-checked-keys="perList"
      :props="defaultProps"
      check-strictly
    />
  </div>
</template>

<script>
import { getPermission, getRoleDetail } from '@/api/setting'
// 导入转换树形结构的第三方包
import arrayToTree from 'array-to-tree'
export default {
  name: 'VueAdminTemplatePermissionlist',
  props: {
    roleId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      rightList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      perList: []
    }
  },

  created() {
    this.getStaffInfo()
    this.getRoleInfo()
  },

  methods: {
    async getStaffInfo() {
      const res = await getPermission()
      // console.log(res)
      this.rightList = arrayToTree(res.data, {
        parentProperty: 'pid',
        customID: 'id'
      })
      console.log(this.rightList)
    },
    async getRoleInfo() {
      const res = await getRoleDetail(this.roleId)
      console.log(res)
      if (res.success) {
        this.perList = res.data.permIds
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
