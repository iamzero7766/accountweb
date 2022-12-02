<template>
  <div class="bill-view-style">
    <tab-header :tab-name="tabName" :router-name="routerName"></tab-header>
    <div class="date-view">
      <div class="date-child-item">
        <span class="margin-left">年份：</span>
        <el-date-picker
          type="year"
          v-model="choose_year"
          size="small"
          :editable="false"
          prefix-icon="null"
          :clearable="false"
          class="date-picker-view"
        ></el-date-picker>
      </div>
      <div class="date-child-item">
        <span class="margin-left">收入：</span>
        <span class="text-big">{{ income_all }}</span>
      </div>
      <div class="date-child-item">
        <span class="margin-left">支出：</span>
        <span class="text-big">{{ pay_all }}</span>
      </div>
    </div>
    <div class="content-view">
      <el-table :data="billList" height="100%">
        <el-table-column label="月份" prop="month"></el-table-column>
        <el-table-column label="收入" prop="income"></el-table-column>
        <el-table-column label="支出" prop="pay"></el-table-column>
        <el-table-column
          label="盈亏"
          prop="value"
          :formatter="getValue"
        ></el-table-column>
        <el-table-column label="" prop="" width="60">
          <template slot-scope="scope">
            <i class="el-icon-arrow-right" @click="showDetail(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import TabHeader from "@/components/TabHeader.vue";
export default {
  components: { TabHeader },
  data() {
    return {
      tabName: "账单",
      routerName: "HomeView",
      choose_year: new Date(),
      income_all: "8999",
      pay_all: "999",
      billList: [],
    };
  },
  created() {
    this.getBillList();
  },
  methods: {
    getBillList() {
      for (var i = 0; i < 12; i++) {
        this.billList.push({
          month: `${i + 1}月`,
          income: (Math.random() * 100).toFixed(2),
          pay: (Math.random() * 1000).toFixed(2),
        });
      }
    },

    // 获取月份详情
    showDetail(row) {
      console.log(row);
      this.$router.push({
        path: "billDetail",
        query: {
          year: this.choose_year.getFullYear(),
          month: row.month,
        },
      });
    },

    getValue(row) {
      return (row.income - row.pay).toFixed(2);
    },
  },
};
</script>

<style lang="scss">
.bill-view-style {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .date-view {
    width: 100%;
    height: 46px;
    background-color: var(--theme_bg_color);
    font-size: 12px;
    color: #606266;
    display: flex;
    align-items: center;
    .date-child-item {
      flex: 1;
    }
    .margin-left {
      margin-left: 10px;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 80px;
    }
    .text-big {
      font-size: 14px;
    }
  }
  .date-picker-view {
    width: 80px;
    .el-input__inner {
      padding: 0;
      border: 0;
      background-color: var(--theme_bg_color);
      font-size: 12px;
    }
  }
  .content-view {
    flex: 1;
    width: 100%;
    .el-table .cell {
      text-align: center;
    }
  }
}
</style>
