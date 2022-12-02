<template>
  <div class="budget-page-view">
    <tab-header :tab-name="tabName" :router-name="routerName"></tab-header>
    <div class="budget-all-view">
      <div class="chart-all" ref="chartAll"></div>
      <div class="content-all">
        <div class="content-child-item">
          <div>{{ spendAll > budgetAll ? "超出预算：" : "剩余预算：" }}</div>
          <div>
            {{
              spendAll > budgetAll ? spendAll - budgetAll : budgetAll - spendAll
            }}
          </div>
        </div>
        <div class="content-child">
          <div>本月预算：</div>
          <div>{{ budgetAll }}</div>
        </div>
        <div class="content-child">
          <div>本月支出：</div>
          <div>{{ spendAll }}</div>
        </div>
      </div>
    </div>
    <div class="budget-content-view">
      <div
        v-for="(item, index) in budgetList"
        :key="item.name"
        class="budget-item"
      >
        <div class="budget-left-item" :id="'chartid' + index"></div>
        <div class="budget-right-item">
          <div class="content-child-item">
            <div>
              {{ item.spend > item.budget ? "超出预算：" : "剩余预算：" }}
            </div>
            <div>
              {{
                item.spend > item.budget
                  ? item.spend - item.budget
                  : item.budget - item.spend
              }}
            </div>
          </div>
          <div class="content-child">
            <div>本月预算：</div>
            <div>{{ item.budget }}</div>
          </div>
          <div class="content-child">
            <div>本月支出：</div>
            <div>{{ item.spend }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="edit-button-view">
      <el-button type="" plain class="button-style">
        <i class="el-icon-edit-outline"></i>
        编辑预算
      </el-button>
    </div>
  </div>
</template>

<script>
import TabHeader from "@/components/TabHeader.vue";
import * as echarts from "echarts";
export default {
  components: { TabHeader },
  data() {
    return {
      tabName: "预算",
      routerName: "HomeView",
      budgetAll: 2500,
      spendAll: 1800,
      budgetList: [
        { name: "餐饮", budget: 1300, spend: 1000 },
        { name: "娱乐", budget: 500, spend: 0 },
        { name: "休闲", budget: 700, spend: 800 },
      ],
    };
  },
  mounted() {
    console.log(111);
    this.getAllBudget();
    this.getListBudget();
  },
  methods: {
    // 总预算
    getAllBudget() {
      const spendNum = 1800;
      var spendData;
      var extraData;
      var textData;
      var data = [];
      if (spendNum > this.budgetAll) {
        spendData = {
          value: this.budgetAll,
          name: "支出",
        };
        extraData = {
          value: 0,
          name: "剩余",
        };
        textData = "已超出";
        data.push(extraData);
        data.push(spendData);
        this.setChart("chartAll", data, textData, true);
      } else {
        spendData = {
          value: spendNum,
          name: "支出",
        };
        extraData = {
          value: this.budgetAll - spendNum,
          name: "剩余",
        };
        data.push(extraData);
        data.push(spendData);
        textData = `剩余${this.returnPercent(
          (this.budgetAll - spendNum) / this.budgetAll
        )}%`;
        this.setChart("chartAll", data, textData, false);
      }
    },

    // 分类预算
    getListBudget() {},

    // 预算图
    setChart(refName, data, text, isOver = false) {
      var chartDom = this.$refs[refName];
      var myChart = echarts.init(chartDom);
      var option = {
        title: {
          show: true,
          text: text,
          top: "center",
          left: "center",
          textStyle: {
            color: isOver ? "red" : "#808080",
          },
        },
        tooltip: {
          show: false,
        },
        legend: {
          show: false,
        },
        color: ["#f0d564", "#dcdcdc"],
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["60%", "80%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: false,
              },
            },
            labelLine: {
              show: false,
            },
            data: data,
          },
        ],
      };
      myChart.setOption(option);
    },

    // 计算百分比
    returnPercent(value) {
      return Math.round(value * 10000) / 100;
    },
  },
};
</script>

<style lang="scss">
.budget-page-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .budget-all-view {
    width: 100%;
    height: 26%;
    border-bottom: 1px solid #dcdcdc;
    display: flex;
    align-items: center;
    .chart-all {
      width: 40%;
      height: 100%;
    }
    .content-all {
      width: 60%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
  .content-child-item {
    width: 100%;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #dcdcdc;
    font-size: 16px;
    color: #696969;
    display: flex;
    justify-content: space-between;
  }
  .content-child {
    width: 100%;
    height: 26px;
    line-height: 26px;
    font-size: 14px;
    color: #808080;
    display: flex;
    justify-content: space-between;
  }
  .budget-content-view {
    width: 100%;
    flex: 1;
    .budget-item {
      width: 100%;
      height: 150px;
      display: flex;
    }
    .budget-left-item {
      flex: 2;
      height: 100%;
    }
    .budget-right-item {
      flex: 3;
      height: 100%;
      box-sizing: border-box;
      padding: 0 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
  .edit-button-view {
    width: 100%;
    height: 40px;
    .button-style {
      width: 100%;
    }
  }
}
</style>
