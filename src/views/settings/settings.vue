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
                @click="addRole"
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
                  <el-button
                    size="small"
                    type="primary"
                    @click="editBtn(scope.row)"
                  >编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="delBtn(scope.row.id)"
                  >删除</el-button>
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
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-row>
            <!-- 弹出框 -->
            <el-dialog
              title="新增角色"
              :visible.sync="dialogVisible"
              width="50%"
              @close="closeHandler"
            >
              <setDialog v-if="dialogVisible" :visible.sync="dialogVisible" />
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
// 导入组件
import setDialog from './setDialog.vue'
export default {
  name: 'VueAdminTemplateIndex',

  components: {
    setDialog
  },
  data() {
    return {
      activeName: 'second',
      dialogVisible: false
    }
  },

  computed: {
    ...mapState('setting', [
      'pageParams',
      'roleList',
      'total',
      'form',
      'setDialogVisible',
      'isEdit'
    ])
  },

  created() {
    this.$store.dispatch('setting/getRoleList')
    // console.log(this.pageParams)
  },

  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.$store.commit('setting/changePageSize', val)
      this.$store.dispatch('setting/getRoleList')
      console.log(this.pageParams)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      // 重新给页码赋值
      // 将页码值赋值给vuex中
      this.$store.commit('setting/changePage', val)
      this.$store.dispatch('setting/getRoleList')
    },
    // 添加角色
    addRole() {
      this.dialogVisible = true
      // 在vuex中更改数据
      this.$store.commit('setting/controlDialog', true)
      this.$store.commit('setting/controlEdit', false)
    },
    // 关闭弹出框的回调
    closeHandler() {
      this.$store.commit('setting/controlDialog', false)
      this.$store.commit('setting/controlEdit', false)
    },
    // 编辑按钮
    editBtn(data) {
      this.dialogVisible = true
      // console.log(data)
      // 点击编辑按钮，就让isedit为真
      this.$store.commit('setting/controlEdit', true)
      // 并且将data的数据传递给vuex
      this.$store.commit('setting/editData', data)
    },
    // 删除角色
    delBtn(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 向vuex中发送数据，进行数据的删除
          this.$store.dispatch('setting/delRole', id)
        })
        .catch((e) => e)
    }
  }
}
</script>

<style lang="scss" scoped></style>
