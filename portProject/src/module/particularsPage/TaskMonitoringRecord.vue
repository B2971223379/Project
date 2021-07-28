<template>
  <div>
    <!-- 辅助作业记录---------------------------------------------------------------------------- -->
    <template>
      <el-table :data="dataList" style="width: 100%" v-loading="loading">
        <el-table-column prop="User" label="员工"> </el-table-column>
        <el-table-column prop="OpMode" label="作业方式"></el-table-column>
        <el-table-column prop="OpStatus" label="作业状态"> </el-table-column>
        <el-table-column label="作业时间">
          <template slot-scope="scope" v-if="scope.row.OpTime != null">
            {{ scope.row.OpTime | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="OpContent" label="作业内容"></el-table-column>
        <el-table-column prop="OpResult" label="作业结果"></el-table-column>
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
    getdataList() {
      this.loading=true;
      http
        .getTaskMonitoringRecord(
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
          this.dataList=res.resultData
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
</style>
