<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" />
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { importEmployee } from '@/api/employee'
// 导入日期转换的函数
import { formatExcelDate } from '@/utils/index.js'
export default {
  name: 'VueAdminTemplateUploadexcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },

  mounted() {},

  methods: {
    async handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
      const mapInfo = {
        入职日期: 'timeOfEntry',
        手机号: 'mobile',
        姓名: 'username',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName',
        聘用形式: 'formOfEmployment'
      }
      // console.log(results)
      const arr = results.map((item) => {
        // console.log(item)
        const zh = Object.keys(item)
        // console.log(zh)
        const obj = {}
        for (const key of zh) {
          // 做条件判断，如果循环到时间的属性，就进行一次数据的转换
          if (
            mapInfo[key] === 'correctionTime' ||
            mapInfo[key] === 'timeOfEntry'
          ) {
            obj[mapInfo[key]] = new Date(formatExcelDate(item[key]))
          } else {
            obj[mapInfo[key]] = item[key]
          }
        }
        // console.log(obj)
        return obj
      })
      console.log(arr)
      // 添加完成之后发送请求
      const res = await importEmployee(arr)
      // console.log(res)
      if (res.success) {
        // 成功之后跳转到上一个页面
        this.$router.push({ name: 'employees' })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
