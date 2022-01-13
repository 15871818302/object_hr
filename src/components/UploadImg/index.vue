<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="upload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'UploadImg',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // console.log(file)
      this.imageUrl = URL.createObjectURL(file.raw)
      // console.log(this.imageUrl)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    upload(res) {
      // console.log(res)
      var COS = require('cos-js-sdk-v5')

      // SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
      var cos = new COS({
        // 上传github进行密钥的隐藏
        SecretId: '1111',
        SecretKey: '222'
      })
      cos.putObject(
        {
          Bucket: 'xsz1-1309205972' /* 必须 */,
          Region: 'ap-nanjing' /* 存储桶所在地域，必须字段 */,
          Key: res.file.name /* 必须 */, // 文件名称
          StorageClass: 'STANDARD', // 上传模式
          Body: res.file, // 上传文件对象
          onProgress: function(progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        // 需要写成箭头函数的形式才能读取vue组件里面的数据
        (err, data) => {
          // console.log(this)
          console.log(err || data)
          // 上传成功之后进行数据的赋值
          if (data.statusCode === 200) {
            this.imageUrl = 'https://' + data.Location
            // 向父级组件传值
            this.$emit('success', this.imageUrl)
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
