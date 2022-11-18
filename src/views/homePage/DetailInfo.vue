<template>
  <div class="detail-info-view">
    <div class="top-view">
      <div>
        <div>{{ year_set }}</div>
        <el-date-picker
          type="month"
          v-model="choose_month"
          format="M月"
          :editable="false"
          :clearable="false"
          prefix-icon="null"
          class="date-picker-view"
          size="small"
          value-format="timestamp"
        >
        </el-date-picker>
      </div>
      <div>
        <div class="title-item">收入</div>
        <div class="content-item">{{ income_month }}</div>
      </div>
      <div>
        <div class="title-item">支出</div>
        <div class="content-item">{{ pay_month }}</div>
      </div>
    </div>
    <div class="icon-view">
      <div class="icon-list-view">
        <div v-for="item in iconList" :key="item.value" class="icon-item-view">
          <div
            class="image-view"
            :style="
              'background-image:url(' +
              require('../../assets/detail/' + item.icon + '.png') +
              ')'
            "
          ></div>
          <div>{{ item.label }}</div>
        </div>
      </div>
    </div>
    <div class="table-view">
      <el-timeline>
        <el-timeline-item
          v-for="item in tableData"
          :key="item.time"
          :timestamp="item.time"
          placement="top"
        >
          <el-card>
            <div
              v-for="(element, index) in item.children"
              :key="index"
              class="card-item"
            >
              <div class="card-image">
                <!-- <i class="icon iconfont icon-travel"></i> -->
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-travel"></use>
                </svg>
              </div>
              <div class="card-remark">{{ element.remark }}</div>
              <div class="card-cash">{{ element.value }}</div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year_set: new Date().getFullYear(),
      choose_month: "",
      income_month: 0,
      pay_month: 0,
      tableData: [],
      iconList: [
        { icon: "icon_1", label: "账单", value: "1" },
        { icon: "icon_2", label: "预算", value: "2" },
        { icon: "icon_3", label: "资产", value: "3" },
        { icon: "icon_4", label: "更多", value: "4" },
      ],
    };
  },
  methods: {
    getFirstData() {
      var tableData = [];
      for (var i = 0; i < 30; i++) {
        var data = {
          time: `2022/11/${i + 1}`,
          children: [
            { icon: "", remark: `记录——1`, value: `${3 * i}` },
            { icon: "", remark: `记录——2`, value: `${3 * i}` },
          ],
        };
        tableData.push(data);
      }
      this.tableData = tableData;
      console.log(this.tableData);
    },
  },
  created() {
    this.choose_month = new Date().getTime();
    this.getFirstData();
  },
  mounted() {},
};
</script>

<style lang="scss">
.detail-info-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .top-view {
    width: 100%;
    height: 60px;
    background-color: var(--theme_bg_color);
    box-sizing: border-box;
    padding: 8px 10px 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .date-picker-view {
      width: 80px;
    }
    .el-input__inner {
      padding: 0;
      border: 0;
      background-color: var(--theme_bg_color);
      font-size: 14px;
    }
    .title-item {
      font-size: 12px;
    }
    .content-item {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
    }
  }
  .icon-view {
    width: 100%;
    background: linear-gradient(#f0d564, #fff);
    box-sizing: border-box;
    padding: 5px 20px;
    .icon-list-view {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      background: #fff;
      box-shadow: 0 0 3px #ddd;
      border-radius: 5px;
      box-sizing: border-box;
      padding: 5px 0;
    }
    .icon-item-view {
      width: 40px;
      text-align: center;
    }
    .image-view {
      width: 40px;
      height: 40px;
      background-position: 50%;
      background-size: cover;
      background-repeat: no-repeat;
      // background-image: url("../../assets/detail/icon_1.png");
    }
  }
  .table-view {
    flex: 1;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 0 10px;
    ul {
      padding: 0;
    }
    .card-item {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ddd;
    }
    .card-image {
      width: 40px;
      height: 40px;
      .icon {
        width: 40px;
        height: 40px;
      }
    }
    .el-card__body {
      padding: 0 10px;
    }
  }
}
</style>
