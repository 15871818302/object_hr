<template>
  <div>
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{
        item.name
      }}</el-checkbox>
    </el-checkbox-group>
    <div class="btn">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="submitRole">确定</el-button>
    </div>
  </div>
</template>

<script>
// 导入api
import { getStaffList } from '@/api/setting'
import { getEmployeeInfo, assignRoles } from '@/api/employee'
export default {
  name: 'VueAdminTemplateRoledialog',
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
      checkList: [],
      pageparams: {
        page: 1,
        pagesize: 100
      },
      roleList: []
    }
  },

  created() {
    this.initRoleList()
    this.getStaffInfo()
  },

  methods: {
    async initRoleList() {
      const res = await getStaffList(this.pageparams)
      // console.log(res)
      if (res.success) {
        this.roleList = res.data.rows
      }
    },
    // 获取员工基本信息
    async getStaffInfo() {
      const res = await getEmployeeInfo(this.roleId)
      // console.log(res)
      if (res.success) {
        // 根据数据筛选出里面的对象数据(这个地方打印的时候，里面有很多杂乱的数据，需要进行筛选)
        const arr = res.data.roleIds.filter((item) => {
          return item instanceof Object
        })
        // console.log(arr)
        this.checkList = arr
      }
    },
    // 点击确认按钮进行角色信息的提交
    async submitRole() {
      const res = await assignRoles({
        id: this.roleId,
        roleIds: this.checkList
      })
      console.log(res)
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
