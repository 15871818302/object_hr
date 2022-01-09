<template>
  <el-card class="toolpage">
    <div class="toolpage-box">
      <div class="left">
        <!-- 组件中可以用slot进行占位，让内容更具灵活性 -->
        <slot name="left" />
      </div>
      <div class="right">
        <slot name="right" />
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ToolPage',

  data() {
    return {}
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
.toolpage {
  .toolpage-box {
    display: flex;
    justify-content: space-between;
  }

  margin-bottom: 10px;
}
</style>
