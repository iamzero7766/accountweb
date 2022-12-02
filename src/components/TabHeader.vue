<template>
  <div class="tab-header-view">
    <el-button
      @click="returnHome"
      type="text"
      size="small"
      v-show="tabSet == 1"
      class="text-return-view"
    >
      <i class="el-icon-arrow-left"></i>
      返回
    </el-button>
    {{ tabName }}
    <el-button
      @click="returnHome"
      type="text"
      size="small"
      v-show="tabSet == 2"
      class="text-button-view"
      >取消</el-button
    >
  </div>
</template>

<script>
export default {
  props: {
    tabName: {
      type: String,
      default: "",
    },
    routerName: {
      type: String,
      default: "",
    },
    tabSet: {
      default: "2",
    },
  },
  created() {
    console.log(this.tabSet);
  },
  methods: {
    returnHome() {
      this.$router.push({
        path: this.routerName || "HomeView",
      });
    },
  },
};
</script>

<style lang="scss">
.tab-header-view {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: var(--theme_bg_color);
  color: #606266;
  .text-button-view {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .text-return-view {
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .el-button--text {
    color: #606266;
    font-size: 14px;
  }
  .el-button--text:focus,
  .el-button--text:hover {
    color: #606266;
  }
}
</style>
