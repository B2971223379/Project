<template>
  <div>
    <template>
      <el-table
        :data="dataList"
        style="width: 100%"
        height="500"
        v-loading="loading"
      >
        <el-table-column prop="Planno" label="计划号"> </el-table-column>
        <el-table-column label="录入时间" width="180">
          <template slot-scope="scope" v-if="scope.row.VgmDt != null">
            {{ scope.row.VgmDt | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="Valid" label="有效"> </el-table-column>
        <el-table-column prop="DocTp" label="类型"> </el-table-column>
        <el-table-column prop="InsertUser" label="录入人"> </el-table-column>
        <el-table-column prop="VgmWerght" label="重量"> </el-table-column>
        <el-table-column prop="VgmMethod" label="称重方式"> </el-table-column>
        <el-table-column prop="SendFG" label="产生报告"> </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import http from "../../../api/api.js";
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
    getBoxAuditTab() {
      http
        .getBoxAuditTab4(
          JSON.stringify({
            ResponseSerial: "0",
            ResponsePageIndex: "",
            ResponsePageRowNumber: "",
            ResponseSerialID: "",
            ResponseSerialDelTime: "",
            ResponseData: {
              containerId: this.ContainerID,
              queryType: this.queryType == "" ? "IYC" : this.queryType,
            },
          })
        )
        .then((res) => {
            this.loading=false;
          this.dataList=res.resultData;
        });
    },
  },
//   mounted() {
//     this.getBoxAuditTab();
//   },
  watch: {
    ContainerID() {
      this.getBoxAuditTab();
    },
  },
  components: {},
};
</script>

<style scoped lang="less">
</style>
