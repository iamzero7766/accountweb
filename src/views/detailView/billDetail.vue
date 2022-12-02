<template>
  <div class="bill-detail-view">
    <tab-header
      :tab-name="tabName"
      :router-name="routerName"
      :tabSet="'1'"
    ></tab-header>
  </div>
</template>

<script>
import TabHeader from "@/components/TabHeader.vue";
export default {
  components: { TabHeader },
  created() {
    console.log(this.$route.query);
    this.tabName = `${this.$route.query.year}年${this.$route.query.month}账单`;
  },
  data() {
    return {
      tabName: "",
      routerName: "billPage",
    };
  },
};
</script>

<style lang="scss">
.bill-detail-view {
  width: 100%;
  height: 100%;
}
</style>
