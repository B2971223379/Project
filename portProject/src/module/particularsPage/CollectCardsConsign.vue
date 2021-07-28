<template>
  <div id="Consign">
    <!-- 外集卡托运-------------------------------------------------- -->
    <div class="top">
      <template>
        <el-table
          :data="dataList"
          height="300"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column prop="TruckNo" label="集卡号" width="90">
          </el-table-column>
          <el-table-column prop="FBFlag" label="前/后"> </el-table-column>
          <el-table-column prop="EirNo" label="Eir号"> </el-table-column>
          <el-table-column prop="Opmode" label="作业方式" width="120">
          </el-table-column>
          <el-table-column prop="Opprc" label="操作过程"> </el-table-column>
          <el-table-column prop="OpStatus" label="托运箱状态" width="100">
          </el-table-column>
          <el-table-column label="进道口时间" width="160">
            <template slot-scope="scope" v-if="scope.row.InGateTime != null">
              {{ scope.row.InGateTime | dataFormat }}
            </template>
          </el-table-column>
          <el-table-column label="出道口时间" width="160">
            <template slot-scope="scope" v-if="scope.row.OutGateTime != null">
              {{ scope.row.OutGateTime | dataFormat }}
            </template>
          </el-table-column>
          <el-table-column prop="InGateno" label="进道口号"> </el-table-column>
          <el-table-column prop="OutGateno" label="出道口号"> </el-table-column>
          <el-table-column prop="CancelReason" label="取消原因">
          </el-table-column>
          <el-table-column prop="OperationType" label="作业类型" width="120">
          </el-table-column>
          <el-table-column label="作业时间" width="160">
            <template slot-scope="scope" v-if="scope.row.OpTime">
              {{ scope.row.OpTime | dataFormat }}
            </template>
          </el-table-column>
          <el-table-column prop="OpEmpid" label="作业员工"> </el-table-column>
          <el-table-column prop="Outvname" label="外部船名"> </el-table-column>
          <el-table-column prop="Outvoyage" label="外部航次"> </el-table-column>
          <el-table-column prop="billno" label="外部提单" width="160">
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="bottom">
      <div class="title">换箱门付费发票号审计</div>
      <template>
        <el-table :data="dataList_" style="width: 100%">
          <el-table-column prop="OLfid" label="操作代码"> </el-table-column>
          <el-table-column prop="OLJ_ITEM" label="修改内容"> </el-table-column>
          <el-table-column prop="OLJ_ORIVALUE" label="旧值"> </el-table-column>
          <el-table-column prop="OLJ_NEWVALUE" label="新值"> </el-table-column>
          <el-table-column prop="OLJ_USER" label="员工"> </el-table-column>
          <el-table-column label="操作时间" width="160">
            <template slot-scope="scope" v-if="scope.row.OLJ_TIME!=null">
              {{ scope.row.OLJ_TIME | dataFormat }}
            </template>
          </el-table-column>
          <el-table-column prop="OLJ_REASON" label="操作原因"> </el-table-column>
          <el-table-column prop="OLJ_REMARK" label="备注" width="160"> </el-table-column>
        </el-table>
      </template>
    </div>
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
      dataList_: [],
      loading: true,
    };
  },
  methods: {
    getdataList() {
      this.loading=true;
      http
        .getCollectCardsConsign(
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
            //换箱门付费发票号审计
            http.getCollectCardsConsignBottom(
              JSON.stringify({
                ResponseSerial: "0",
                ResponsePageIndex: "1",
                ResponsePageRowNumber: "50",
                ResponseSerialID: "",
                ResponseSerialDelTime: "3",
                ResponseData: {
                  OhcId: res.resultData.ohcidn,
                },
              })
            ).then(obj=>{
                this.dataList_=obj.resultData
            })
          }
        });
    },
  },
  mounted() {
    this.getdataList();
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
#Consign {
  width: 100%;
  height: 100%;
  .title {
    width: 100%;
    padding: 1rem 1rem;
    background-color: #e4e5e9;
  }
}
</style>
