<template>
  <el-form
    ref="roleForm"
    :model="roleForm"
    :rules="roleRules"
    label-width="100px"
    class="demo-roleForm"
  >
    <el-form-item label="角色名称" prop="name">
      <el-input v-model="roleForm.name" />
    </el-form-item>
    <el-form-item label="角色描述" prop="description">
      <el-input v-model="roleForm.description" />
    </el-form-item>
    <el-form-item>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
import { addStaff, updateStaff } from '@/api/setting'
export default {
  name: 'VueAdminTemplateSetdialog',

  props: {
    visible: {
      type: Boolean
    }
  },

  data() {
    return {
      roleForm: {
        name: '',
        description: ''
      },
      roleRules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {
    ...mapState('setting', ['isEdit', 'form'])
  },

  // 对isedit进行监听，如果为真就将数据填写到表单中
  watch: {
    isEdit: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.roleForm = JSON.parse(JSON.stringify(this.form))
        }
      }
    }
  },

  methods: {
    cancel() {
      this.$emit('update:visible', false)
    },
    submit() {
      // 进行兜底校验
      this.$refs.roleForm.validate((val) => {
        if (!val) return
        // 通过isedit数值来判断发送哪个请求
        this.isEdit ? this.editStaff() : this.addStaff()
      })
    },
    // 添加角色
    async addStaff() {
      const res = await addStaff(this.roleForm)
      // console.log(res)
      // 如果成功就关闭对话框，并且刷新页面，将数据存储到vuex中
      if (res.success) {
        this.$emit('update:visible', false)
        this.$store.dispatch('setting/getRoleList')
      }
    },
    // 编辑角色
    async editStaff() {
      const res = await updateStaff(this.roleForm)
      // console.log(res)
      if (res.success) {
        this.$emit('update:visible', false)
        this.$store.dispatch('setting/getRoleList')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
