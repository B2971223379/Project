<template>
  <div id="BoxDynamic">
    <!-- //箱动态------------------------------------------------------- -->
    <template>
      <el-table :data="BoxDynamic" style="width: 100%" v-loading="loading">
        <el-table-column prop="OpMode" label="作业方式" width="120"> </el-table-column>
        <el-table-column prop="OPPRC" label="操作过程"> </el-table-column>
        <el-table-column prop="MACHINEID" label="操作机械"> </el-table-column>
        <el-table-column label="操作时间" width="160">
          <template slot-scope="scope">
            {{ scope.row.OPTIME | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column label="确认时间" width="160">
          <template slot-scope="scope" v-if="scope.row.CONFIRMTIME!=null">
            {{ scope.row.CONFIRMTIME | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="DRIVERID" label="作业员工" width="100"> </el-table-column>
        <el-table-column prop="ENDFLAG" label="结束标志"> </el-table-column>
        <el-table-column prop="STARTLOC" label="起始位置" width="120"> </el-table-column>
        <el-table-column prop="ENDLOC" label="目标位置"> </el-table-column>
        <el-table-column prop="USER" label="员工" width="100"> </el-table-column>
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
      BoxDynamic: [],
      loading: true,
    };
  },

  methods: {
    getBoxDynamic() {
      this.loading=true;
      http
        .getBoxDynamic(
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
          if (res.resultCode == "100") {
            this.BoxDynamic = res.resultData;
          }
        });
    },
  },
  mounted() {
    this.getBoxDynamic();
  },
  watch: {
    ContainerID() {
      this.getBoxDynamic();
    },
  },
  components: {},
};
</script>

<style scoped lang="less">
</style>
