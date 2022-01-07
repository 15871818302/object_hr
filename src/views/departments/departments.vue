<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 使用el-tab显示头部标签 -->
        <el-tabs v-model="activeName">
          <el-tab-pane label="组织架构" name="first" />
        </el-tabs>
        <!-- 中间树形组件部分 -->
        <div class="treebox">
          <!-- 用一个行列布局 -->
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            style="height: 40px"
          >
            <el-col :span="20">
              <svg-icon icon-class="eye" /><span>江苏传智播客教育科技股份有限公司</span>
            </el-col>
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <!-- 两个内容 -->
                <el-col>负责人</el-col>
                <!-- 下拉菜单 element -->
                <el-col>
                  <el-dropdown>
                    <span> 操作<i class="el-icon-arrow-down" /> </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        @click.native="addBtn('')"
                      >添加子部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <hr>
          <!-- 树形控件 -->
          <el-tree :data="departmentList" :props="defaultProps">
            <!-- 使用作用域插槽，渲染数据 -->
            <template #default="{ data }">
              <el-row
                type="flex"
                justify="space-between"
                align="middle"
                style="height: 40px; width: 100%"
              >
                <el-col :span="20">
                  {{ data.name }}
                </el-col>
                <el-col :span="4">
                  <el-row type="flex" justify="end">
                    <el-col>
                      {{ data.manager }}
                    </el-col>
                    <el-col>
                      <el-dropdown>
                        <span> 操作<i class="el-icon-arrow-down" /> </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            @click.native="addBtn(data.id)"
                          >添加子部门</el-dropdown-item>
                          <el-dropdown-item
                            @click.native="editBtn(data)"
                          >编辑部门</el-dropdown-item>
                          <el-dropdown-item
                            @click.native="delBtn(data.id)"
                          >删除部门</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-tree>
        </div>
        <!-- 弹出框部分 -->
        <el-dialog title="提示" :visible.sync="showDialog" width="50%">
          <dialogEdit
            v-if="showDialog"
            :is-edit="isEdit"
            :pid="id"
            @success="successHandler"
          />
        </el-dialog>
        <!-- 删除弹出框 -->
        <el-dialog title="警告" :visible.sync="delVisible" width="30%">
          <span>确定删除吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="delVisible = false">取 消</el-button>
            <el-button type="primary" @click="delDepartment">确 定</el-button>
          </span>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script>
// 导入辅助函数
import { mapState } from 'vuex'
// 导入api
import { deleteDepartment } from '@/api/departments'
// 导入树形数据转换的工具函数
// import { transToTree } from '@/utils/index'
// 导入弹出框组件
import dialogEdit from './dialog.vue'
export default {
  name: 'VueAdminTemplateIndex',
  components: {
    dialogEdit
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      activeName: 'first',
      showDialog: false,
      delVisible: false,
      isEdit: false,
      id: ''
    }
  },

  computed: {
    ...mapState('departments', ['departmentList', 'deptData'])
  },

  created() {
    this.$store.dispatch('departments/getList')
    // console.log(transToTree(this.departmentList))
  },

  methods: {
    addBtn(id) {
      this.isEdit = false
      this.showDialog = true
      this.id = id
    },
    delBtn(id) {
      this.delVisible = true
      this.id = id
    },
    editBtn(data) {
      this.isEdit = true
      this.showDialog = true
      // this.deptData = data
      this.$store.commit('departments/GET_INFO', data)
    },
    successHandler() {
      // 成功之后关闭弹出框
      this.showDialog = false
      // 向vuex中传递数据进行页面的刷新
      this.$store.dispatch('departments/getList')
    },
    async delDepartment() {
      // 用户点击确定之后进行数据的删除
      const res = await deleteDepartment(this.id)
      console.log(res)
      // 删除成功之后重新渲染页面
      if (res.success) {
        this.$store.dispatch('departments/getList')
        this.delVisible = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tabs {
  padding: 20px 0 0px 20px;
}

.treebox {
  padding: 30px 120px 0;
}
</style>
