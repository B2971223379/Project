<template>
  <div>
    <!-- 受理计划-------------------------------------------------------- -->
    <template>
      <el-tabs v-model="activeName">
        <el-tab-pane label="受理计划" name="tab1">
          <template>
            <el-table :data="dataList" style="width: 100%" v-loading="loading">
              <el-table-column prop="PLANNO" label="计划号" width="100">
              </el-table-column>
              <el-table-column prop="OPMODE" label="作业方式">
              </el-table-column>
              <el-table-column prop="OPPRC" label="操作过程"> </el-table-column>
              <el-table-column prop="PLCSTATUS" label="计划箱状态" width="100">
              </el-table-column>
              <el-table-column prop="PLCTYPE" label="计划箱类型" width="100">
              </el-table-column>
              <el-table-column
                prop="PLCVALIDATENO"
                label="计划箱预约号"
                width="110"
              >
              </el-table-column>
              <el-table-column prop="ENDLOC" label="计划开始时间" width="160">
                <template
                  slot-scope="scope"
                  v-if="scope.row.OPSTARTTIME != null"
                >
                  {{ scope.row.OPSTARTTIME | dataFormat }}
                </template>
              </el-table-column>
              <el-table-column prop="ENDLOC" label="计划结束时间" width="160">
                <template slot-scope="scope" v-if="scope.row.OPENDTIME != null">
                  {{ scope.row.OPENDTIME | dataFormat }}
                </template>
              </el-table-column>
              <el-table-column prop="PLANEMPID" label="计划员工" width="100">
              </el-table-column>
              <el-table-column label="计划时间" width="160">
                <template slot-scope="scope" v-if="scope.row.PLANTIME != null">
                  {{ scope.row.PLANTIME | dataFormat }}
                </template>
              </el-table-column>
              <el-table-column
                prop="PLANVALIDATENO"
                label="计划预约号"
                width="100"
              >
              </el-table-column>
              <el-table-column prop="OLDPLANNO" label="旧计划号">
              </el-table-column>
              <el-table-column prop="PAYFLAG" label="付费标志">
              </el-table-column>
              <el-table-column prop="PAYEMPID" label="付费员工" width="100">
              </el-table-column>
              <el-table-column label="网上提交申请时间" width="160">
                <template slot-scope="scope" v-if="scope.row.SUBTIME != null">
                  {{ scope.row.SUBTIME | dataFormat }}
                </template>
              </el-table-column>
              <el-table-column
                prop="VALIDATENO"
                label="用箱需求预约号"
                width="130"
              >
              </el-table-column>
              <el-table-column prop="PLANREMARK" label="计划备注">
              </el-table-column>
            </el-table> </template
        ></el-tab-pane>
        <el-tab-pane label="用箱审计" name="tab2">
          <template>
            <el-table :data="dataList_" style="width: 100%">
              <el-table-column prop="PLANNO" label="计划号"> </el-table-column>
              <el-table-column prop="PLCVALIDATENO" label="计划箱预约">
              </el-table-column>
              <el-table-column prop="VURVALIDATENO" label="用箱需求预约号">
              </el-table-column>
              <el-table-column prop="OPMODE" label="作业方式">
              </el-table-column>
              <el-table-column prop="PLCSTATUS" label="计划箱状态">
              </el-table-column>
              <el-table-column prop="PCJAUDITACTION" label="操作方式">
              </el-table-column>
              <el-table-column prop="PCJAUDITUSER" label="操作员工">
              </el-table-column>
              <el-table-column label="操作时间" width="160">
                <template slot-scope="scope" v-if="scope.row.PCJAUDITTIME">
                  {{ scope.row.PCJAUDITTIME | dataFormat }}
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
      this.loading = true;
      http
        .getAcceptancePlan(
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
    getdataList_() {
      this.loading = true;
      http.getEmployBoxAudit(
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
      ).then(res=>{
        this.loading=false;
        this.dataList_=res.resultData;
      })
    },
  },
  mounted() {
    this.getdataList();
    this.getdataList_();
  },
  watch: {
    ContainerID() {
      this.getdataList();
    },
  },
  components: {},
};
</script>

<style scoped lang="less">
</style>
