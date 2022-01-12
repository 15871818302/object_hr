<template>
  <div class="department-container">
    <div class="app-container">
      <ToolPage>
        <template #right>
          <el-button type="primary" @click="handleDownload">导出</el-button>
          <el-button
            type="primary"
            @click="$router.push({ name: 'uploadExcel' })"
          >导入</el-button>
          <el-button
            type="primary"
            @click="addVisible = true"
          >+ 新增员工</el-button>
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
            <template v-slot="scope">
              <el-button
                type="text"
                size="small"
                @click="
                  $router.push({ name: 'detail', params: { id: scope.row.id } })
                "
              >查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
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
        <!-- 弹出框 -->
        <el-dialog title="新增员工" :visible.sync="addVisible" width="50%">
          <emp-dialog :visible.sync="addVisible" @success="success" />
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script>
// 导入api中获取员工列表的函数
import { getEmployeeList } from '@/api/employee'
// 导入子组件
import empDialog from './empDialog.vue'
export default {
  name: 'VueAdminTemplateIndex',
  components: {
    empDialog
  },
  data() {
    return {
      page: 1,
      size: 10,
      total: 1,
      userList: [],
      addVisible: false,
      tHeader: [],
      map: {
        id: '编号',
        password: '密码',
        mobile: '手机号',
        username: '姓名',
        timeOfEntry: '入职日期',
        formOfEmployment: '聘用形式',
        correctionTime: '转正日期',
        workNumber: '工号',
        departmentName: '部门',
        staffPhoto: '头像地址'
      }
    }
  },
  created() {
    // console.dir(require.keys())
    this.getUserList()
  },

  methods: {
    async getUserList() {
      const res = await getEmployeeList(this.page, this.size)
      // console.log(res)
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
    },
    // 成功发送请求之后的回调
    success() {
      this.getUserList()
    },
    // 导出excel
    handleDownload() {
      this.tHeader = Object.values(this.map)
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then((excel) => {
        // const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
        // const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        const list = this.userList
        const data = this.formatJson(list)
        console.log(data)
        excel.export_json_to_excel({
          header: this.tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(list) {
      // console.log(list)
      return list.map((item) => {
        // 设置英文键
        // 如果直接对item进行循环，会导致循环出来的变量会多一个undefined，需要对遍历出来的英文键进行循环
        const enKey = Object.keys(this.map)
        // console.log(item)
        const obj = {}
        for (const key of enKey) {
          // if (this.map[key] === undefined) return
          obj[this.map[key]] = item[key]
        }
        console.log(obj)
        return Object.values(obj)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog__header {
  background-color: rgb(124, 191, 253) !important;
}
</style>
