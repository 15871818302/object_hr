<template>
  <div class="department-container">
    <div class="app-container">
      <ToolPage>
        <template #right>
          <el-button type="primary">导出</el-button>
          <el-button type="primary">导入</el-button>
          <el-button type="primary">+ 新增员工</el-button>
        </template>
      </ToolPage>
      <el-card>
        <!-- 具体页面结构 -->
        <el-table :data="userList" border>
          <el-table-column label="序号">
            <template v-slot="scope">
              {{ (page - 1) * 10 + 1 + scope.$index }}
            </template>
          </el-table-column>
          <el-table-column prop="username" label="姓名" />
          <el-table-column prop="workNumber" label="工号" />
          <el-table-column prop="formOfEmployment" label="聘用形式" />
          <el-table-column prop="departmentName" label="部门" />
          <el-table-column prop="timeOfEntry" label="入职时间">
            <template v-slot="scope">
              {{ scope.row.timeOfEntry | format() }}
            </template>
          </el-table-column>
          <el-table-column prop="enableState" label="工作状态" />
          <el-table-column label="操作" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
// 导入api中获取员工列表的函数
import { getEmployeeList } from '@/api/employee'
export default {
  name: 'VueAdminTemplateIndex',

  data() {
    return {
      page: 1,
      size: 10,
      total: 1,
      userList: []
    }
  },
  created() {
    // console.dir(require.keys())
    this.getUserList()
  },

  methods: {
    async getUserList() {
      const res = await getEmployeeList(this.page, this.size)
      console.log(res)
      this.userList = res.data.rows
      this.total = res.data.total
    },
    // 分页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      // 点击分页的页码时，将分页的页码值赋值给data里面的数据
      this.page = val
      // 重新发送请求
      this.getUserList()
    }
  }
}
</script>

<style lang="scss" scoped></style>
