<template>
  <div>
    <template>
      <el-table :data="dataList" style="width: 100%" height="500" v-loading="loading">
        <el-table-column prop="ModifyItem" label="修改内容" width="150"> </el-table-column>
        <el-table-column prop="ModifyItemName" label="修改名称" width="100">
        </el-table-column>
        <el-table-column prop="OriginalValue" label="旧值"> </el-table-column>
        <el-table-column prop="NewValue" label="新值" width="150"> </el-table-column>
        <el-table-column prop="UserID" label="员工" width="100"> </el-table-column>
        <el-table-column label="操作时间" width="160">
          <template slot-scope="scope" v-if="scope.row.OperateTime!=null">
            {{ scope.row.OperateTime | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="OperateReason" label="操作原因">
        </el-table-column>
        <el-table-column prop="Remark" label="备注" width="450">
        </el-table-column>
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
        .getBoxAuditTab1(
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
          console.log(res);
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
