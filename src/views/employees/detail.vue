<template>
  <el-card class="detail-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="登录账户设置" name="first"><account /></el-tab-pane>
      <el-tab-pane label="个人详情" name="second"><person /></el-tab-pane>
      <el-tab-pane label="岗位详情" name="third"><job /></el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import account from './account.vue'
import person from './person.vue'
import job from './job.vue'
export default {
  name: 'VueAdminTemplateDetail',

  components: {
    account,
    person,
    job
  },

  data() {
    return {
      activeName: 'second'
    }
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
.detail-container {
  margin: 30px;
}
</style>
