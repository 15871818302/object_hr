<template>
  <el-form ref="deptForm" :model="form" :rules="fromrule" label-width="120px">
    <el-form-item label="部门名称" prop="name">
      <el-input
        v-model="form.name"
        style="width: 80%"
        placeholder="1-50个字符"
      />
    </el-form-item>
    <el-form-item label="部门编码" prop="code">
      <el-input
        v-model="form.code"
        style="width: 80%"
        placeholder="1-50个字符"
      />
    </el-form-item>
    <el-form-item label="部门负责人" prop="manager">
      <el-select v-model="form.manager" style="width: 80%" placeholder="请选择">
        <el-option
          v-for="item in managerList"
          :key="item.id"
          :value="item.username"
          :label="item.username"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="部门介绍" prop="introduce">
      <el-input
        v-model="form.introduce"
        style="width: 80%"
        placeholder="1-300个字符"
        type="textarea"
        :rows="3"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="small"
        @click="submitForm"
      >确定</el-button>
      <el-button size="small">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// 导入api
import { getManagerList } from '@/api/employee'
import { addDepartment } from '@/api/departments'
export default {
  name: 'VueAdminTemplateDialog',
  props: {
    pid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
        pid: ''
      },
      managerList: [],
      fromrule: {
        name: [{ required: true, message: '请填写部门名称', trigger: 'blur' }],
        code: [
          { required: true, message: '请填写部门名称', trigger: 'blur' },
          {
            pattern: /^[0-9a-zA-Z]{1,50}$/,
            message: '部门代码必须是1-50位字母或者是数字',
            trigger: 'blur'
          }
        ],
        manager: [
          { required: true, message: '请填写部门负责人名称', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请填写部门说明', trigger: 'blur' }
        ]
      }
    }
  },

  created() {
    this.getList()
  },

  methods: {
    submitForm() {
      // 做兜底校验
      this.$refs.deptForm.validate(async(val) => {
        if (!val) return
        // 将父组件中的数据传递给子组件中的pid
        this.form.pid = this.pid
        // 如果校验通过就发送Ajax
        const res = await addDepartment(this.form)
        // console.log(res)
        if (res.success) {
          // 成功发送之后清空表单数据
          this.form = {
            name: '', // 部门名称
            code: '', // 部门编码
            manager: '', // 部门管理者
            introduce: '', // 部门介绍
            pid: ''
          }
          // 向父级组件传递数据，进行弹出框的隐藏
          this.$emit('success')
        }
      })
    },
    async getList() {
      const res = await getManagerList()
      // console.log(res)
      this.managerList = res.data
    }
  }
}
</script>

<style lang="scss" scoped></style>
