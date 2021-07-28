<template>
  <div>
    <!-- EDI记录--------------------------------------------------------------------------------- -->
    <template>
      <el-table :data="dataList" style="width: 100%" v-loading="loading">
        <el-table-column prop="ARPATH" label="文件名称">
        </el-table-column>
        <el-table-column  label="回执时间">
          <template slot-scope="scope" v-if="scope.row.BCDT">
            {{ scope.row.BCDT | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="ISHANDLE" label="接受标志"> </el-table-column>
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
      this.loading=true;
      http
        .getEDIRecord(
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
          this.dataList = res.resultData;
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
