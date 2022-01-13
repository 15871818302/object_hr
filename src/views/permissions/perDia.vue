<template>
  <div>
    <!-- 表单内容 -->
    <el-form label-width="100px">
      <el-form-item label="权限名称">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="权限标识">
        <el-input v-model="formData.code" />
      </el-form-item>
      <el-form-item label="权限描述">
        <el-input v-model="formData.description" />
      </el-form-item>
      <el-form-item label="权限启用">
        <el-switch
          v-model="formData.enVisible"
          active-text="启用"
          active-value="1"
          inactive-text="不启用"
          inactive-value="0"
        />
      </el-form-item>
    </el-form>

    <template>
      <div style="text-align: right">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </template>
  </div>
</template>

<script>
import { addPermission, updatePermission } from '@/api/permissions'
export default {
  name: 'VueAdminTemplatePerdia',
  props: {
    visible: {
      type: Boolean
    },
    permissionRow: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean
    },
    firstClass: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formData: {
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        enVisible: '0', // 开启
        pid: '', // 添加到哪个节点下
        type: '' // 类型
      }
    }
  },
  // 对isedit属性进行监听，如果为真就是编辑按钮，需要将数据渲染到表单上
  watch: {
    isEdit: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.formData = JSON.parse(JSON.stringify(this.permissionRow))
        }
      }
    }
  },

  methods: {
    cancel() {
      this.$emit('update:visible', false)
    },
    submit() {
      this.isEdit ? this.edit() : this.add()
    },
    // 添加权限函数
    async add() {
      this.formData.type = this.firstClass.type
      this.formData.pid = this.firstClass.pid
      const res = await addPermission(this.formData)
      // console.log(res)
      if (res.success) {
        // 添加成功就关闭对话框，并且刷新列表
        this.$emit('update:visible', false)
        this.$emit('success')
      }
    },
    // 编辑权限的函数
    async edit() {
      const res = await updatePermission(this.formData)
      console.log(res)
      if (res.success) {
        // 添加成功就关闭对话框，并且刷新列表
        this.$emit('update:visible', false)
        this.$emit('success')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
