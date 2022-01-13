<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button
            type="primary"
            size="small"
            @click="addPermission(1, '')"
          >添加权限</el-button>
        </div>
        <el-table
          :data="permissionList"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          border
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="type" label="标识" />
          <el-table-column prop="description" label="描述" />
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button
                v-if="scope.row.type === 1"
                type="text"
                @click="addSecondPermission(2, scope.row.id)"
              >添加</el-button>
              <el-button
                type="text"
                @click="editPermission(scope.row)"
              >编辑</el-button>
              <el-button
                type="text"
                @click="delBtn(scope.row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 页面弹窗 -->
      <el-dialog
        :visible.sync="showDialog"
        :title="isEdit ? '编辑权限' : '添加权限'"
      >
        <perDia
          v-if="showDialog"
          :first-class="firstClass"
          :is-edit="isEdit"
          :permission-row="row"
          :visible.sync="showDialog"
          @success="success"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 导入api
import { getPermissionList, delPermission } from '@/api/permissions'
// 导入树形结构转换的函数
import arrayToTree from 'array-to-tree'
// 导入组件
import perDia from './perDia.vue'
export default {
  name: 'VueAdminTemplateIndex',
  components: {
    perDia
  },
  data() {
    return {
      permissionList: [],
      showDialog: false, // 是否显示弹层
      isEdit: false,
      // 点击编辑按钮获取到的信息
      row: {},
      // 点击最上面添加权限按钮获取pid和type
      firstClass: {
        pid: '',
        type: 1
      }
    }
  },

  created() {
    this.getPer()
  },

  methods: {
    async getPer() {
      const res = await getPermissionList()
      console.log(res)
      if (res.success) {
        // 成功之后进行数据的转换和赋值
        this.permissionList = arrayToTree(res.data, {
          parentProperty: 'pid',
          customID: 'id'
        })
      }
    },
    // 添加权限
    addPermission(type, pid) {
      this.showDialog = true
      this.isEdit = false
      this.firstClass.type = type
      this.firstClass.pid = pid
    },
    // 次级菜单添加权限
    addSecondPermission(type, pid) {
      this.showDialog = true
      this.isEdit = false
      this.firstClass.type = type
      this.firstClass.pid = pid
    },
    // 编辑权限
    editPermission(row) {
      this.showDialog = true
      this.isEdit = true
      console.log(row)
      this.row = row
    },
    // 发送成功刷新列表
    success() {
      this.getPer()
    },
    // 删除按钮
    delBtn(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await delPermission(id)
          console.log(res)
          if (res.success) {
            this.getPer()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
