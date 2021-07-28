<template>
  <div>
    <template>
      <el-table :data="dataList" style="width: 100%" height="500" v-loading="loading">
        <el-table-column prop="Billno" label="提单号"> </el-table-column>
        <el-table-column label="删除时间">
          <template slot-scope="scope" v-if="scope.row.DelTime!=null">
            {{ scope.row.DelTime | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="DelUser" label="删除员工"> </el-table-column>
        <el-table-column prop="GoodsId" label="货ID"> </el-table-column>
        <el-table-column prop="Empno" label="操作模块/人"> </el-table-column>
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
      loading:true,
    };
  },
  methods: {
    getBoxAuditTab() {
      http
        .getBoxAuditTab2(
          JSON.stringify({
            ResponseSerial: "0",
            ResponsePageIndex: "",
            ResponsePageRowNumber: "",
            ResponseSerialID: "",
            ResponseSerialDelTime: "",
            ResponseData: {
              containerId: this.ContainerID, //测试数据
              queryType: this.queryType == "" ? "IYC" : this.queryType,
            },
          })
        )
        .then((res) => {
          this.loading = false;
          if (res.resultCode == "100") {
            this.dataList = res.resultData;
          }
        });
    },
  },
    // mounted() {
    //   this.getBoxAuditTab();
    // },
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
