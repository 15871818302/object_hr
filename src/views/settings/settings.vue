<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理" name="first">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="roleList">
              <el-table-column type="index" label="序号" width="120" />
              <el-table-column prop="name" label="角色名称" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <template v-slot="scope">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary">编辑</el-button>
                  <el-button size="small" type="danger">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <!-- 分页组件 -->
              <el-pagination
                :current-page="pageParams.page"
                :page-sizes="[2, 4, 6, 8]"
                :page-size="pageParams.pagesize"
                layout="sizes, prev, pager, next, jumper"
                :total="100"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-row>
            <!-- 弹出框 -->
            <el-dialog
              title="新增角色"
              :visible.sync="setDialogVisible"
              width="50%"
            >
              <setDialog
                v-if="setDialogVisible"
                :is-edit="isEdit"
                :visible.sync="setDialogVisible"
                :single-role-form="form"
                @success="success"
              />
            </el-dialog>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="second">公司信息</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
// 导入vuex
import { mapState } from 'vuex'
export default {
  name: 'VueAdminTemplateIndex',

  data() {
    return {
      activeName: 'second',
      setDialogVisible: false,
      isEdit: false
    }
  },

  computed: {
    ...mapState('setting', ['pageParams', 'roleList', 'total', 'form'])
  },

  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.$store.commit('setting/changePageSize', val)
      // 切换页面大小时，重新给页面大小赋值
      // this.pageParams.pagesize = val
      // 重新发送请求并刷新页面
      // this.initUserList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      // 重新给页码赋值
      // 将页码值赋值给vuex中
      this.$store.commit('setting/changePage', val)
      // this.pageParams.page = val
      // 切换页面时，重新发送请求刷新页面
      // this.initUserList()
    }
  }
}
</script>

<style lang="scss" scoped></style>
