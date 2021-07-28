<template>
  <div>
    <!-- 箱组--------------------------------------------------------------------------------- -->
    <template>
      <el-table :data="dataList" style="width: 100%" v-loading="loading" height="400">
        <el-table-column prop="ContainerNo" label="箱号">
        </el-table-column>
        <el-table-column prop="ContainerSize" label="尺寸">
        </el-table-column>
        <el-table-column prop="ContainerType" label="箱型"> </el-table-column>
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
      this.loading = true;
      http
        .getBoxGroup(
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
