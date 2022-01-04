<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
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
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
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
                        <el-dropdown-item>添加子部门</el-dropdown-item>
                        <el-dropdown-item>编辑部门</el-dropdown-item>
                        <el-dropdown-item>删除部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
// 导入辅助函数
import { mapState } from 'vuex'
// 导入树形数据转换的工具函数
// import { transToTree } from '@/utils/index'
export default {
  name: 'VueAdminTemplateIndex',

  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },

  computed: {
    ...mapState('departments', ['departmentList'])
  },

  mounted() {
    this.$store.dispatch('departments/getList')
    // console.log(transToTree(this.departmentList))
  },

  methods: {}
}
</script>

<style lang="scss" scoped></style>
