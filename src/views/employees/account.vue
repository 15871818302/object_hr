<template>
  <el-form ref="accountForm" :model="accountForm" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="accountForm.name" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="accountForm.password" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'VueAdminTemplateAccount',

  data() {
    return {
      accountForm: {
        name: '',
        password: ''
      }
    }
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped></style>
