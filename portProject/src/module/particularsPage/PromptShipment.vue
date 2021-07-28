<template>
  <div>
    <!-- 退关------------------------------------------------- -->
    <template>
      <el-table :data="dataList" style="width: 100%" v-loading="loading">
        <el-table-column prop="SHUTOUTVESCNAME" label="退关船名"> </el-table-column>
        <el-table-column prop="SHUTOUTVOYAGE" label="退关航次"> </el-table-column>
        <el-table-column prop="SHUTOUTREASON" label="退关原因"> </el-table-column>
        <el-table-column prop="SHUTOUTUSER" label="退关员工"> </el-table-column>
        <el-table-column label="退关时间" width="160">
          <template slot-scope="scope" v-if="scope.row.SHUTOUTTIME!=null">
            {{ scope.row.SHUTOUTTIME | dataFormat }}
          </template>
        </el-table-column>
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
      loading:true,
    };
  },
  methods: {
    getDataList() {
        this.loading=true;
      http
        .getPromptShipment(
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
          this.loading=false;
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
