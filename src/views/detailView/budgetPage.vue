<template>
  <div class="budget-page-view">
    <tab-header :tab-name="tabName" :router-name="routerName"></tab-header>
    <div class="budget-all-view">
      <div class="chart-all" id="chartAll"></div>
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
      <div v-for="item in budgetList" :key="item.name" class="budget-item">
        <div class="budget-left-item" :id="item.id"></div>
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
      <el-button type="" plain class="button-style" @click="editBudget">
        <i class="el-icon-edit-outline"></i>
        编辑预算
      </el-button>
    </div>

    <el-drawer
      title="编辑预算"
      :visible.sync="drawerVisible"
      direction="btt"
      size="70%"
      class="budget-dialog"
    >
      <div class="row-all">
        <span class="span-text">总预算：</span>
        <el-input
          class="input-text"
          v-model="editBudgetAll"
          placeholder=""
        ></el-input>
      </div>
      <div class="table-all">
        <el-table :data="budgetTableData" height="100%">
          <el-table-column label="类别" prop="">
            <template slot="header" slot-scope="scope">
              类别
              <el-button
                type="primary"
                icon="el-icon-plus"
                style="margin-left: 5px"
                circle
                plain
                size="mini"
                @click="addRow(scope.row)"
              ></el-button>
            </template>
            <template slot-scope="scope">
              <el-select v-model="scope.row.name" size="small">
                <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="预算" prop="">
            <template slot-scope="scope">
              <el-input v-model="scope.row.budget" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="" prop="" width="60">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                size="small"
                @click="deleteRow(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="button-all">
        <el-button @click="submitBudget" size="small" type="primary"
          >确定</el-button
        >
        <el-button @click="cancelSubmit" size="small" plain>取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import TabHeader from "@/components/TabHeader.vue";
import * as echarts from "echarts";
import iconListData from "@/utils/data/iconList.js";
export default {
  components: { TabHeader },
  data() {
    return {
      tabName: "预算",
      routerName: "HomeView",
      budgetAll: 2500,
      spendAll: 1800,
      budgetList: [
        { id: "chart1", name: "餐饮", budget: 1300, spend: 1000 },
        { id: "chart2", name: "娱乐", budget: 500, spend: 0 },
        { id: "chart3", name: "休闲", budget: 700, spend: 800 },
      ],
      drawerVisible: false,
      budgetTableData: [],
      typeList: iconListData,
      editBudgetAll: 0,
    };
  },
  mounted() {
    console.log(111);
    this.getBudgetData(this.spendAll, this.budgetAll, "chartAll");
    this.getListBudget();
  },
  methods: {
    // 总预算
    getBudgetData(spendNum, budgetAll, refName) {
      var spendData;
      var extraData;
      var textData;
      var data = [];
      if (spendNum > budgetAll) {
        spendData = {
          value: budgetAll,
          name: "支出",
        };
        extraData = {
          value: 0,
          name: "剩余",
        };
        textData = "已超出";
        data.push(extraData);
        data.push(spendData);
        this.setChart(refName, data, textData, true);
      } else {
        spendData = {
          value: spendNum,
          name: "支出",
        };
        extraData = {
          value: budgetAll - spendNum,
          name: "剩余",
        };
        data.push(extraData);
        data.push(spendData);
        textData = `剩余${this.returnPercent(
          (budgetAll - spendNum) / budgetAll
        )}%`;
        this.setChart(refName, data, textData, false);
      }
    },

    // 分类预算
    getListBudget() {
      this.budgetList.forEach((item) => {
        this.getBudgetData(item.spend, item.budget, item.id);
      });
    },

    // 预算图
    setChart(refName, data, text, isOver = false) {
      var chartDom = document.getElementById(refName);
      var myChart = echarts.init(chartDom);
      var option = {
        title: {
          show: true,
          text: text,
          top: "center",
          left: "center",
          textStyle: {
            color: isOver ? "red" : "#808080",
            fontSize: 14,
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

    // 点击编辑预算
    editBudget() {
      this.drawerVisible = true;
      this.editBudgetAll = this.budgetAll;
      this.budgetTableData = JSON.parse(JSON.stringify(this.budgetList));
    },

    // 删除某一行
    deleteRow(row) {
      console.log(row);
    },
    // 新增某一行
    addRow() {
      this.budgetTableData.push({ id: "", name: "", budget: 0, spend: 0 });
    },

    // 点击确定
    submitBudget() {},
    // 点击取消
    cancelSubmit() {},
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
  .budget-dialog {
    .row-all {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: 0 10px;
    }
    .span-text {
      width: 70px;
    }
    .input-text {
      width: calc(100% - 70px);
    }
    .el-table .cell {
      text-align: center;
    }
    .table-all {
      width: 100%;
      height: calc(100% - 92px);
    }
    .button-all {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
