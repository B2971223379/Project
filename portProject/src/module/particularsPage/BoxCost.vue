<template>
  <div id="BoxCost">
      <!-- 箱费用---------------------------------------------------------------------- -->
    <template>
      <el-table  :data="dataList!=null? dataList.FeeLists:dataList" style="width: 100%" v-loading="loading">
        <el-table-column prop="FeeItemName" label="费用名称" width="350"></el-table-column>
        <el-table-column prop="PieceUnit" label="计价单位"></el-table-column>
        <el-table-column prop="Mitemdisplay" label="属性" width="120"></el-table-column>
        <el-table-column prop="Camt" label="数量"></el-table-column>  
        <el-table-column prop="Discount" label="折扣"></el-table-column>
        <el-table-column prop="Rate" label="费率"></el-table-column>
        <el-table-column prop="Price" label="单价"></el-table-column>
        <el-table-column prop="CalCurrency" label="计价币种"></el-table-column>
        <el-table-column prop="PlanNo" label="计划号"></el-table-column>
        <el-table-column prop="BillNumber" label="发票号" width="100"></el-table-column>
        <el-table-column prop="Money" label="金额"></el-table-column>
      </el-table>
    </template>
    <div  v-if="dataList!=null" class="TotalPrices"><span>总价：{{dataList.TotalMoney}}</span></div>
  </div>
</template>

<script>
import http from "../../api/api.js";
export default {
  props: {
    queryType: String,
    ContainerID: Number,
  },
  data() {
    return {
      dataList: [],
      loading: true,
    };
  },
  methods: {
    getdataList() {
      http
        .getBoxCost(
          JSON.stringify({
            ResponseSerial: "0",
            ResponsePageIndex: "1",
            ResponsePageRowNumber: "50",
            ResponseSerialID: "",
            ResponseSerialDelTime: "3",
            ResponseData: {
              queryType: this.queryType == "" ? "IYC" : this.queryType,
              ContainerID: this.ContainerID,
            },
          })
        )
        .then((res) => {
          console.log(res);
          this.loading = false;
          this.dataList = res.resultData;
        });
    },
  },
  mounted() {
    this.getdataList();
  },
  watch: {
    ContainerID() {
      this.getdataList();
    },
  },
  components: {},
};
</script>

<style scoped lang="less">

.TotalPrices{
  width: 100%;
  padding: 1rem 3rem;
  position: relative;
  text-align: right;
  font-size: 2rem;
  font-weight: 800;
}

</style>
