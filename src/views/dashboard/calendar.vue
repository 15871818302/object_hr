<template>
  <div>
    <el-select v-model="value2" placeholder="请选择" @change="change">
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
    <el-select v-model="value" placeholder="请选择" @change="change">
      <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
    </el-select>
    <el-calendar v-model="time">
      <template #dateCell="{ date }">
        {{ timeHandle(date) }}
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'VueAdminTemplateCalendar',

  data() {
    return {
      time: new Date(),
      value: '',
      value2: ''
    }
  },

  computed: {
    options() {
      const arr = []
      const y = new Date().getFullYear()
      for (var i = 0; i < 11; i++) {
        arr.push(y + i - 5)
      }
      return arr
    }
  },

  mounted() {
    // this.timeHandle()
    this.initTime()
  },

  methods: {
    timeHandle(t) {
      return new Date(t).getDate()
    },
    change() {
      // 通过控制下面日历v-model绑定的属性来控制下面显示的具体年月日
      this.time = new Date(`${this.value2}-${this.value}`)
    },
    initTime() {
      this.value2 = new Date().getFullYear()
      this.value = new Date().getMonth() + 1
    }
  }
}
</script>

<style lang="scss" scoped></style>
