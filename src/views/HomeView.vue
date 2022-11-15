<template>
  <div class="home-view-style">
    <el-menu
      :default-active="activeIndex"
      class="menu-style"
      mode="horizontal"
      @select="selectMenu"
    >
      <el-menu-item index="1">明细</el-menu-item>
      <el-menu-item index="2">图表</el-menu-item>
      <el-menu-item index="3">
        <template slot="title">
          <i class="el-icon-circle-plus-outline"></i>
        </template>
      </el-menu-item>
      <el-menu-item index="4">论坛</el-menu-item>
      <el-menu-item index="5">设置</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      activeIndex: "1",
      menuList: [
        { label: "明细", value: "1", router: "DetailInfo" },
        { label: "图表", value: "2", router: "ChartInfo" },
        { label: "论坛", value: "3", router: "ForumInfo" },
        { label: "设置", value: "4", router: "PersonSet" },
      ],
    };
  },
  methods: {
    selectMenu(index) {
      if (index == 3) {
        this.$router.push({
          path: "addView",
        });
      } else {
        const content = this.menuList.find((x) => x.value == index);
        if (content) {
          this.$router.push({
            path: content.router,
          });
        }
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss">
.home-view-style {
  width: 100%;
  height: 100%;
  .menu-style {
    width: 100%;
    display: flex;
    .el-menu-item {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
