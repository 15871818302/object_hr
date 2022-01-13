<template>
  <div class="user-info">
    <!-- 个人信息 -->
    <el-form label-width="220px">
      <!--手机 -->

      <el-form-item label="手机">
        <el-input v-model="userInfo.mobile" style="width: 220px" />
      </el-form-item>

      <!-- 工号 入职时间 -->

      <el-form-item label="入职时间">
        <el-date-picker
          v-model="userInfo.timeOfEntry"
          type="date"
          class="inputW"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>

      <!-- 员工照片 -->

      <el-form-item label="员工头像">
        <!-- 放置上传图片 -->
        <!-- 使用封装的组件进行头像的上传 -->
        <UploadImg v-model="userInfo.staffPhoto" @success="success" />
      </el-form-item>

      <!-- 保存个人信息 -->
      <el-form-item>
        <el-button type="primary" @click="saveUpdate">保存更新</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 导入api
import { saveEmployeeInfo, getEmployeeInfo } from '@/api/employee'
import { getInfo } from '@/api/user'
export default {
  data() {
    return {
      userId: this.$route.params.id,
      userInfo: {
        mobile: '',
        timeOfEntry: '',
        staffPhoto: ''
      },
      confirmId: ''
    }
  },
  created() {
    this.getStaffInfo()
    this.getUserId()
  },
  methods: {
    async saveUpdate() {
      // console.log(this.confirmId, this.userId)
      // 如果登录的用户id和进入的id不一样就不能进行头像的更改
      if (this.confirmId !== this.userId) {
        this.$message({
          message: '不允许擅自更改他人信息',
          type: 'warning'
        })
      } else {
        const res = await saveEmployeeInfo(this.userInfo)
        // console.log(res)
        if (res.success) {
          // 成功之后自动跳转员工详情页
          this.$router.push({ name: 'employees' })
          // 并重新获取员工信息
          // this.getStaffInfo()
        }
      }
    },
    // 获取员工基本信息
    async getStaffInfo() {
      const res = await getEmployeeInfo(this.$route.params.id)
      console.log(res)
      if (res.success) {
        this.userInfo = res.data
      }
    },
    success(src) {
      console.log(src)
      this.userInfo.staffPhoto = src
    },
    // 根据登录的信息获取当前用户的id
    async getUserId() {
      const res = await getInfo()
      console.log(res)
      if (res.success) {
        this.confirmId = res.data.userId
      }
    }
  }
}
</script>

<style scoped lang="scss">
.user-info {
  padding-top: 20px;
}
</style>
