<template>
  <div>
    <el-tree
      ref="tree"
      :data="rightList"
      show-checkbox
      node-key="id"
      :default-checked-keys="perList"
      :props="defaultProps"
      check-strictly
    />
    <div class="btn">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="updatePermission">确认</el-button>
    </div>
  </div>
</template>

<script>
import { getPermission, getRoleDetail, assignPermission } from '@/api/setting'
// 导入转换树形结构的第三方包
import arrayToTree from 'array-to-tree'
export default {
  name: 'VueAdminTemplatePermissionlist',
  props: {
    roleId: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean
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
      // console.log(this.rightList)
    },
    async getRoleInfo() {
      const res = await getRoleDetail(this.roleId)
      // console.log(res)
      if (res.success) {
        this.perList = res.data.permIds
      }
    },
    async updatePermission() {
      // console.log(this.$refs.tree.getCheckedKeys())
      const res = await assignPermission({
        id: this.roleId,
        permIds: this.$refs.tree.getCheckedKeys()
      })
      // console.log(res)
      if (res.success) {
        this.$emit('update:visible', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  margin: 30px 0;
  text-align: center;
}
</style>
