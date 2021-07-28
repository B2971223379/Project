<template>
  <div>
    <!-- 残损登记-------------------------------------------------------------------------------- -->
    <template>
      <el-table
        :data="dataList"
        style="width: 100%"
        v-loading="loading"
        height="400"
      >
        <el-table-column prop="OriginDamageFlag" label="工/原残">
        </el-table-column>
        <el-table-column prop="BreakDamageCode" label="残损代码">
        </el-table-column>
        <el-table-column label="残损时间" width="160">
          <template slot-scope="scope" v-if="scope.row.DamageTime">
            {{ scope.row.DamageTime |dataFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="ReceiptNo" label="设备交接单号">
        </el-table-column>
        <el-table-column prop="InputUser" label="登记员工">
        </el-table-column>
        <el-table-column label="登记时间" width="160">
          <template slot-scope="scope" v-if="scope.row.InputTime">
              {{scope.row.InputTime |dataFormat}}
          </template>
        </el-table-column>
        <el-table-column prop="Remark" label="备注"> </el-table-column>
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
        .getDamagedRegister(
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
