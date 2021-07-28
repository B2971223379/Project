<template>
  <div>
    <template>
      <el-table
        :data="dataList"
        style="width: 100%"
        height="500"
        v-loading="loading"
      >
        <el-table-column prop="ModifyItem" label="修改内容"> </el-table-column>
        <el-table-column prop="OriginalValue" label="旧值"> </el-table-column>
        <el-table-column prop="NewValue" label="新值"> </el-table-column>
        <el-table-column prop="UserID" label="员工"> </el-table-column>
        <el-table-column label="操作时间">
          <template slot-scope="scope" v-if="scope.row.OperateTime != null">
            {{ scope.row.OperateTime }}
          </template>
        </el-table-column>
        <el-table-column prop="OperateCode" label="操作原因"> </el-table-column>
        <el-table-column prop="Remark" label="备注"> </el-table-column>
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
        .getBoxAuditTab5(
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
          this.loading = false;
          this.dataList=res.resultData;
        });
    },
  },
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
