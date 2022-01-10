<template>
  <el-form ref="formData" label-width="120px" :model="formData" :rules="rules">
    <el-form-item label="姓名" prop="username">
      <el-input
        v-model="formData.username"
        style="width: 50%"
        placeholder="请输入姓名"
      />
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input
        v-model="formData.mobile"
        style="width: 50%"
        placeholder="请输入手机号"
      />
    </el-form-item>
    <el-form-item label="入职时间" prop="timeOfEntry">
      <el-date-picker
        v-model="formData.timeOfEntry"
        style="width: 50%"
        placeholder="请选择入职时间"
      />
    </el-form-item>
    <el-form-item label="聘用形式" prop="formOfEmployment">
      <el-select
        v-model="formData.formOfEmployment"
        style="width: 50%"
        placeholder="请选择"
      >
        <el-option
          v-for="item in hireType"
          :key="item.id"
          :label="item.value"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="工号" prop="workNumber">
      <el-input
        v-model="formData.workNumber"
        style="width: 50%"
        placeholder="请输入工号"
      />
    </el-form-item>
    <el-form-item label="部门" prop="departmentName">
      <!-- <el-input
        ref="treeIpt"
        v-model="formData.departmentName"
        style="width: 50%"
        placeholder="请选择部门"
      /> -->
      <el-cascader
        v-model="formData.departmentName"
        :options="list"
        :props="defaultParams"
        :show-all-levels="false"
      >
        <!-- <template v-slot="{ data }">
          <span>{{ data.name }}</span>
        </template> -->
      </el-cascader>
    </el-form-item>
    <el-form-item label="转正时间" prop="correctionTime">
      <el-date-picker
        v-model="formData.correctionTime"
        style="width: 50%"
        placeholder="请选择转正时间"
      />
    </el-form-item>
    <el-form-item>
      <el-button @click="cancelDia">取消</el-button>
      <el-button type="primary" @click="addEmployee">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import EmployeeEnum from '@/constant/employees'
import arrayToTree from 'array-to-tree'
// 导入api
import { getDepartmentList } from '@/api/departments'
import { addStaff } from '@/api/employee'
export default {
  name: 'VueAdminTemplateEmpdialog',
  props: {
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      formData: {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'change' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: 'blur' }
        ]
      },
      hireType: EmployeeEnum.hireType,
      list: [],
      defaultParams: {
        label: 'name',
        value: 'name',
        children: 'children',
        expandTrigger: 'hover',
        emitPath: false
      }
    }
  },

  created() {
    this.getList()
  },

  methods: {
    async getList() {
      const res = await getDepartmentList()
      // console.log(res)
      if (!res.success) return
      this.list = arrayToTree(res.data.depts, {
        parentProperty: 'pid',
        customID: 'id'
      })
      // console.log(this.list)
    },
    addEmployee() {
      // 兜底校验
      this.$refs.formData.validate(async(val) => {
        if (!val) return
        // 发送Ajax
        const res = await addStaff(this.formData)
        // console.log(res)
        // 发送成功关闭对话框，并进行页面的刷新,并清空数据
        if (res.success) {
          this.$emit('update:visible', false)
          this.$emit('success')
          this.$refs.formData.resetFields()
        }
      })
    },
    cancelDia() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped></style>
