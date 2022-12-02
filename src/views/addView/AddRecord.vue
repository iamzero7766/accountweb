<template>
  <div class="add-record-view">
    <el-tabs v-model="activeName" @tab-click="getIconList">
      <el-tab-pane label="支出" name="1"></el-tab-pane>
      <el-tab-pane label="收入" name="2"></el-tab-pane>
    </el-tabs>
    <el-button
      @click="returnHome"
      type="text"
      size="small"
      class="text-button-view"
      >取消</el-button
    >
    <div :class="['content-view', visibleAble ? 'height50' : 'height100']">
      <div
        :class="[
          'icon-view',
          choose_name == item.name ? 'back-light' : 'back-grey',
        ]"
        v-for="item in iconList"
        :key="item.name"
      >
        <div class="icon-box" @click="changeChooseName(item)">
          <svg class="icon" aria-hidden="true" v-html="item.icon"></svg>
        </div>
        <div class="text-view">{{ item.value }}</div>
      </div>
    </div>

    <el-drawer
      :visible.sync="visibleAble"
      direction="btt"
      :modal="false"
      :title="drawerTitle"
      size="100%"
      show-close="false"
      :before-close="handleClose"
    >
      <div class="remark-view">
        {{ activeName == 1 ? "支出" : "收入" }}
        <el-input v-model="spend_money" size="small"></el-input>
      </div>
      <div class="remark-view">
        备注
        <el-input v-model="remark_value" size="small"></el-input>
      </div>
      <div class="remark-view">
        日期
        <el-date-picker
          v-model="date_time"
          type="date"
          :editable="false"
          :clearable="false"
          size="small"
        >
        </el-date-picker>
      </div>
      <div class="button-view">
        <el-button type="primary" plain size="small">确定</el-button>
        <el-button plain size="small">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "1",
      iconList: [],
      choose_name: "",
      visibleAble: false,
      spend_money: "0",
      remark_value: "",
      date_time: new Date(),
      drawerTitle: "",
    };
  },
  methods: {
    // 切换
    changeChooseName(obj) {
      this.choose_name = obj.name;
      this.drawerTitle = obj.value;
      this.visibleAble = true;
      this.resetForm();
    },

    // 关闭抽屉之前
    handleClose(done) {
      this.choose_name = "";
      done();
    },

    // 清空表单
    resetForm() {
      this.spend_money = "0";
      this.remark_value = "";
      this.date_time = new Date();
    },

    // 返回
    returnHome() {
      this.$router.push({
        path: "HomeView",
      });
    },

    // 获取icon
    getIconList() {
      this.visibleAble = false;
      this.resetForm();
      console.log("value", this.activeName);
      if (this.activeName == "1") {
        this.iconList = [
          {
            name: "icon-book",
            value: "书籍",
            icon: `<use xlink:href="#icon-cultivate"></use>`,
          },
          {
            name: "icon-travel",
            value: "旅行",
            icon: `<use xlink:href="#icon-travel"></use>`,
          },
          {
            name: "icon-food",
            value: "餐饮",
            icon: `<use xlink:href="#icon-food"></use>`,
          },
          {
            name: "icon-digital",
            value: "数码",
            icon: `<use xlink:href="#icon-digital"></use>`,
          },
          {
            name: "icon-cultivate",
            value: "培训",
            icon: `<use xlink:href="#icon-cultivate"></use>`,
          },
          {
            name: "icon-plane",
            value: "飞机",
            icon: `<use xlink:href="#icon-plane"></use>`,
          },
          {
            name: "icon-clothes",
            value: "服饰",
            icon: `<use xlink:href="#icon-clothes"></use>`,
          },
          {
            name: "icon-train",
            value: "火车",
            icon: `<use xlink:href="#icon-train"></use>`,
          },
          {
            name: "icon-education",
            value: "教育",
            icon: `<use xlink:href="#icon-education"></use>`,
          },
          {
            name: "icon-cash-gift",
            value: "礼金",
            icon: `<use xlink:href="#icon-cash-gift"></use>`,
          },
          {
            name: "icon-oil",
            value: "加油",
            icon: `<use xlink:href="#icon-oil"></use>`,
          },
          {
            name: "icon-cosmetology",
            value: "美容",
            icon: `<use xlink:href="#icon-cosmetology"></use>`,
          },
          {
            name: "icon-electric",
            value: "电费",
            icon: `<use xlink:href="#icon-electric"></use>`,
          },
          {
            name: "icon-shopping",
            value: "购物",
            icon: `<use xlink:href="#icon-cultivate"></use>`,
          },
          {
            name: "icon-fruits",
            value: "水果",
            icon: `<use xlink:href="#icon-fruits"></use>`,
          },
          {
            name: "icon-cosmetics",
            value: "护肤",
            icon: `<use xlink:href="#icon-cultivate"></use>`,
          },
          {
            name: "icon-work",
            value: "办公",
            icon: `<use xlink:href="#icon-work"></use>`,
          },
          {
            name: "icon-snacks",
            value: "零食",
            icon: `<use xlink:href="#icon-snacks"></use>`,
          },
          {
            name: "icon-communication",
            value: "通讯",
            icon: `<use xlink:href="#icon-communication"></use>`,
          },
          {
            name: "icon-pets",
            value: "亲友",
            icon: `<use xlink:href="#icon-pets"></use>`,
          },
          {
            name: "icon-housing",
            value: "住房",
            icon: `<use xlink:href="#icon-housing"></use>`,
          },
          {
            name: "icon-tuition",
            value: "学费",
            icon: `<use xlink:href="#icon-tuition"></use>`,
          },
        ];
      } else {
        this.iconList = [
          {
            name: "icon-lottery",
            value: "彩票",
            icon: `<use xlink:href="#icon-lottery"></use>`,
          },
          {
            name: "icon-salary",
            value: "工资",
            icon: `<use xlink:href="#icon-salary"></use>`,
          },
          {
            name: "icon-bonus",
            value: "奖金",
            icon: `<use xlink:href="#icon-bonus"></use>`,
          },
          {
            name: "icon-alimony",
            value: "生活费",
            icon: `<use xlink:href="#icon-alimony"></use>`,
          },
          {
            name: "icon-part-time-job",
            value: "兼职",
            icon: `<use xlink:href="#icon-part-time-job"></use>`,
          },
        ];
      }
    },
  },
  created() {
    this.getIconList("1");
  },
};
</script>

<style lang="scss">
.add-record-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #888;
  .el-tabs__nav-scroll {
    background-color: var(--theme_bg_color);
    display: flex;
    justify-content: center;
  }
  .text-button-view {
    position: absolute;
    top: 4px;
    right: 10px;
  }
  .el-button--text {
    color: #888;
  }
  .el-button--text:focus,
  .el-button--text:hover {
    color: #888;
  }
  .el-tabs__header {
    margin: 0;
  }
  .height100 {
    flex: 1;
  }
  .height50 {
    height: calc(100% - 260px);
  }
  .content-view {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 10px;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    .icon-view {
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 15px;
    }
    .back-light .icon-box {
      background: #cfe9ce;
    }
    .back-grey .icon-box {
      background: #ddd;
    }
    .icon-box {
      width: 50px;
      height: 50px;
      border-radius: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon {
      width: 40px;
      height: 40px;
    }
    .text-view {
      height: 30px;
      line-height: 30px;
    }
  }
  .el-drawer__wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 220px;
    top: auto !important;
    box-shadow: 0 0 5px #666;
    color: #222;
    .el-drawer__container {
      bottom: 0;
      height: 220px;
      top: auto !important;
    }
    .el-drawer__header {
      margin: 0;
      padding: 10px 10px 5px 10px;
      .el-drawer__close-btn {
        padding: 0;
      }
    }
    .el-drawer__body {
      padding: 0 10px;
      box-sizing: border-box;
    }
    .remark-view {
      width: 100%;
      height: 40px;
      line-height: 40px;
      .el-input {
        width: calc(100% - 40px);
      }
    }
    .button-view {
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
