<template>
  <div>
    <!-- 转堆计划------------------------------------------------ -->
    <template>
      <el-table :data="dataList" style="width: 100%" v-loading="loading">
        <el-table-column prop="PlanEmpno" label="员工"> </el-table-column>
        <el-table-column prop="ShiftReason" label="转堆类型">
        </el-table-column>
        <el-table-column prop="OpStep" label="步骤"> </el-table-column>
        <el-table-column prop="ShiftCntrStatus" label="状态"> </el-table-column>
        <el-table-column prop="OutLocation" label="转出位置"> </el-table-column>
        <el-table-column prop="InLocation" label="转入位置"> </el-table-column>
        <el-table-column label="开始时间" width="160">
          <template slot-scope="scope" v-if="scope.row.PlanStartTime != null">
            {{ scope.row.PlanStartTime | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column label="结束时间" width="160">
          <template slot-scope="scope" v-if="scope.row.PlanEndTime != null">
            {{ scope.row.PlanEndTime | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="CycleFlag" label="循环"> </el-table-column>
        <el-table-column prop="MachBalanceFlag" label="均衡"> </el-table-column>
        <el-table-column prop="IntruckFlag" label="内集卡"> </el-table-column>
        <el-table-column prop="OuttruckFlag" label="外集卡"> </el-table-column>
      </el-table>
    </template>
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
    getDataList() {
      http
        .getShiftingPlan(
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
          this.loading = false;
          this.dataList=res.resultData;
        });
    },
  },
  mounted() {
    this.getDataList();
  },
  watch: {
    ContainerID() {
      this.getDataList();
    },
  },
  components: {},
};
</script>

<style scoped lang="less">
</style>
