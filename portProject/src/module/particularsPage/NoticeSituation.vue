<template>
  <div>
    <!-- 报文发送情况-------------------------------------------------- -->
    <template>
      <el-tabs v-model="activeName">
        <el-tab-pane label="运抵报告" name="tab1">
          <template>
            <el-table :data="dataList" style="width: 100%" v-loading="loading">
              <el-table-column prop="PackageID" label="报文ID">
              </el-table-column>
              <el-table-column prop="PackageName" label="报文名" width="800">
              </el-table-column>
              <el-table-column label="报文产生时间">
                <template
                  slot-scope="scope"
                  v-if="scope.row.GenerateTime != null">
                  {{ scope.row.GenerateTime | dataFormat }}
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane label="进出门报文" name="tab2">
          <template>
            <el-table :data="dataList_" style="width: 100%" v-loading="loading">
              <el-table-column prop="PackageID" label="报文ID">
              </el-table-column>
              <el-table-column prop="PackageName" label="报文名" width="800">
              </el-table-column>
              <el-table-column label="报文产生时间">
                <template
                  slot-scope="scope"
                  v-if="scope.row.GenerateTime != null"
                >
                  {{ scope.row.GenerateTime | dataFormat }}
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
      </el-tabs>
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
      activeName: "tab1",
      dataList: [],
      dataList_: [],
      loading: true,
    };
  },
  methods: {
    getdataList() {
      this.loading=true;
      http
        .getNoticeSituationArrive(
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
          if (res.resultCode == "100") {
            this.dataList = res.resultData;
          }
        });
    },
    getdataList_() {
      http
        .getNoticeSituationAccess(
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
          if (res.resultCode == "100") {
            this.dataList_ = res.resultData;
          }
        });
    },
  },
  mounted() {
    this.getdataList();
    this.getdataList_();
  },
  watch: {
    ContainerID() {
      this.getdataList();
      this.getdataList_();
    },
  },
  components: {},
};
</script>

<style scoped lang="less">
</style>
