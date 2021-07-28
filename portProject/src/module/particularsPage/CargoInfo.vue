<template>
  <div>
    <!-- 货信息----------------------------------------------------------------------------- -->
    <div class="top">
      <template>
        <el-tabs v-model="activeName">
          <el-tab-pane label="货信息" name="first">
            <template>
              <el-table
                :data="dataList"
                style="width: 100%"
                v-loading="loading"
                height="300"
              >
                <el-table-column prop="ContainerNo" label="有效标志">
                </el-table-column>
                <el-table-column prop="LargeFlag" label="大票">
                </el-table-column>
                <el-table-column prop="GDocsType" label="资料类型">
                </el-table-column>
                <el-table-column prop="BillNo" label="提单号" width="160">
                </el-table-column>
                <el-table-column prop="VesCName" label="船名">
                </el-table-column>
                <el-table-column prop="Voyage" label="航次"> </el-table-column>
                <el-table-column prop="IEFlag" label="I/E"> </el-table-column>
                <el-table-column prop="MarkerNo" label="唛头">
                </el-table-column>
                <el-table-column prop="DockPassFG" label="码头放行">
                </el-table-column>
                <el-table-column prop="CustomPassInfo" label="放行信息">
                </el-table-column>
                <el-table-column label="报文处理时间" width="160">
                  <template
                    slot-scope="scope"
                    v-if="scope.row.EdiProcessTime != ''"
                  >
                    {{ scope.row.EdiProcessTime | dataFormat }}
                  </template>
                </el-table-column>
                <el-table-column prop="" label="海关放行"> </el-table-column>
                <el-table-column prop="EdiTradeType" label="通关性质">
                </el-table-column>
                <el-table-column prop="EdiAddSeal" label="监管方式1" width="90">
                </el-table-column>
                <el-table-column prop="EdiGps" label="监管方式2" width="90">
                </el-table-column>
                <el-table-column prop="EdiSpecialTunnel" label="专用通道">
                </el-table-column>
                <el-table-column prop="DeliveryPlace" label="目的地">
                </el-table-column>
                <el-table-column prop="" label="国检审单代码" width="120">
                </el-table-column>
                <el-table-column prop="" label="代理"> </el-table-column>
                <el-table-column prop="PortOfLoad" label="装货港">
                </el-table-column>
                <el-table-column prop="PortOfDischarge" label="卸货港">
                </el-table-column>
                <el-table-column prop="PortOfDestination" label="目的港">
                </el-table-column>
                <el-table-column prop="GoodsTotalPKS" label="总件数">
                </el-table-column>
                <el-table-column prop="DangerousCD" label="危类">
                </el-table-column>
                <el-table-column prop="GoodsTotalWeight" label="总重量">
                </el-table-column>
                <el-table-column prop="DangerousUNNo" label="Unno">
                </el-table-column>
                <el-table-column prop="GoodsTotalVolume" label="总体积">
                </el-table-column>
                <el-table-column prop="EdiProcessLogID" label="日志ID" width="100">
                </el-table-column>
                <el-table-column prop="GoodsName" label="货名" width="120">
                </el-table-column>
                <el-table-column prop="EdiFileName" label="报文名" width="200">
                </el-table-column>
                <el-table-column prop="ReleaseType" label="复关类型">
                </el-table-column>
                <el-table-column prop="PackageType" label="包装类型">
                </el-table-column>
                <el-table-column
                  prop="CustomPassFG"
                  label="海关放行标志"
                  width="120"
                >
                </el-table-column>
                <el-table-column prop="DeliveryMode" label="交付方式">
                </el-table-column>
                <el-table-column prop="" label="国检放行"> </el-table-column>
                <el-table-column prop="EntryID" label="报关单号">
                </el-table-column>
                <el-table-column prop="GoodRemark" label="旅行备注">
                </el-table-column>
                <el-table-column prop="LockEmpNo" label="加锁人">
                </el-table-column>
                <el-table-column prop="LockFlag" label="加锁标志">
                </el-table-column>
                <el-table-column label="加锁时间" width="160">
                  <template slot-scope="scope" v-if="scope.row.LockTm != null">
                    {{ scope.row.LockTm | dataFormat }}
                  </template>
                </el-table-column>
                <el-table-column prop="CutOffEmpNo" label="截关人">
                </el-table-column>
                <el-table-column prop="CutOffFg" label="截关标志">
                </el-table-column>
                <el-table-column label="截关时间">
                  <template
                    slot-scope="scope"
                    v-if="scope.row.CutOffTm != null"
                  >
                    {{ scope.row.CutOffTm | dataFormat }}
                  </template>
                </el-table-column>
                <el-table-column prop="" label="发/收货人" width="100">
                </el-table-column>
                <el-table-column prop="InsertUser" label="新增人" width="100">
                </el-table-column>
                <el-table-column label="新增时间" width="160">
                  <template
                    slot-scope="scope"
                    v-if="scope.row.InsertTime != null"
                  >
                    {{ scope.row.InsertTime | dataFormat }}
                  </template>
                </el-table-column>
                <el-table-column prop="ModifyUser" label="修改人" width="100">
                </el-table-column>
                <el-table-column prop="ModifyTime" label="修改时间" width="160">
                  <template
                    slot-scope="scope"
                    v-if="scope.row.ModifyTime != null"
                  >
                    {{ scope.row.ModifyTime | dataFormat }}
                  </template>
                </el-table-column>
                <el-table-column prop="ISVIRULENT" label="剧毒标识">
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="货审计" name="second">
            <template>
              <el-table
                :data="GoodsAudit"
                style="width: 100%"
                v-loading="loading"
                height="300"
              >
                <el-table-column prop="OperateCode" label="操作代码">
                </el-table-column>
                <el-table-column
                  prop="OperateItem"
                  label="修改内容"
                  width="160"
                >
                </el-table-column>
                <el-table-column prop="OldValue" label="旧值" width="220">
                </el-table-column>
                <el-table-column prop="NewValue" label="新值" width="220">
                </el-table-column>
                <el-table-column prop="EmpNo" label="员工" width="100">
                </el-table-column>
                <el-table-column label="操作时间" width="160">
                  <template
                    slot-scope="scope"
                    v-if="scope.row.OperateTime != null"
                  >
                    {{ scope.row.OperateTime | dataFormat }}
                  </template>
                </el-table-column>
                <el-table-column prop="OperateReason" label="操作原因">
                </el-table-column>
                <el-table-column prop="Remark" label="备注" width="400">
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
    <div class="bottom">
      <template>
        <el-tabs v-model="activeName_">
          <el-tab-pane label="箱货信息" name="one">
            <template>
              <el-table :data="BoxInfo" style="width: 100%" v-loading="loading">
                <el-table-column prop="ValidFG" label="有效标志">
                </el-table-column>
                <el-table-column prop="CntrNo" label="箱号" width="120">
                </el-table-column>
                <el-table-column prop="IycType" label="箱动态">
                </el-table-column>
                <el-table-column prop="YardLocation" label="场箱位" width="100">
                </el-table-column>
                <el-table-column prop="CntrSz" label="尺寸"> </el-table-column>
                <el-table-column prop="CntrHeight" label="高度">
                </el-table-column>
                <el-table-column prop="CntrTp" label="类型"> </el-table-column>
                <el-table-column prop="CntrStatus" label="箱状态">
                </el-table-column>
                <el-table-column prop="GoodsPKS" label="分件数">
                </el-table-column>
                <el-table-column prop="GoodsWeight" label="分重量">
                </el-table-column>
                <el-table-column prop="GoodsVolume" label="分体积">
                </el-table-column>
                <el-table-column
                  prop="EdiProcessLogID"
                  label="日志ID"
                  width="100"
                >
                </el-table-column>
                <el-table-column prop="EdiFileName" label="报文名" width="200">
                </el-table-column>
                <el-table-column prop="DangerousCD" label="危类">
                </el-table-column>
                <el-table-column
                  prop="DangerousUNNo"
                  label="联合国编号"
                  width="100"
                >
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="箱货审计" name="two">
            <template>
              <el-table
                :data="BoxAudit"
                style="width: 100%"
                v-loading="loading"
              >
                <el-table-column prop="OperateCode" label="操作代码">
                </el-table-column>
                <el-table-column prop="ModifyItem" label="修改内容" width="160">
                </el-table-column>
                <el-table-column
                  prop="ModifyItemName"
                  label="修改名称"
                  width="220"
                >
                </el-table-column>
                <el-table-column prop="OriginalValue" label="旧值" width="220">
                </el-table-column>
                <el-table-column prop="NewValue" label="新值" width="220">
                </el-table-column>
                <el-table-column prop="User" label="员工" width="100">
                </el-table-column>
                <el-table-column label="操作时间" width="160">
                  <template
                    slot-scope="scope"
                    v-if="scope.row.OperateTime != null"
                  >
                    {{ scope.row.OperateTime | dataFormat }}
                  </template>
                </el-table-column>
                <el-table-column prop="OperateReason" label="操作原因">
                </el-table-column>
                <el-table-column prop="Remark" label="备注" width="260">
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="资料箱审计" name="three">
            <template>
              <el-table
                :data="BoxAudit"
                style="width: 100%"
                v-loading="loading"
              >
                <el-table-column prop="OperateCode" label="操作代码">
                </el-table-column>
                <el-table-column prop="ModifyItem" label="修改内容" width="160">
                </el-table-column>
                <el-table-column
                  prop="ModifyItemName"
                  label="修改名称"
                  width="220"
                >
                </el-table-column>
                <el-table-column prop="OriginalValue" label="旧值" width="220">
                </el-table-column>
                <el-table-column prop="NewValue" label="新值" width="220">
                </el-table-column>
                <el-table-column prop="UserID" label="员工" width="100">
                </el-table-column>
                <el-table-column label="操作时间" width="160">
                  <template
                    slot-scope="scope"
                    v-if="scope.row.OperateTime != null"
                  >
                    {{ scope.row.OperateTime | dataFormat }}
                  </template>
                </el-table-column>
                <el-table-column prop="OperateReason" label="操作原因">
                </el-table-column>
                <el-table-column prop="Remark" label="备注" width="260">
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>

<script>
import http from "../../api/api.js";
export default {
  props: {
    queryType: String,
    ContainerNo: String,
    voyODObject: Number,
  },
  data() {
    return {
      loading: true,
      activeName: "first",
      activeName_: "one",
      dataList: [],
      GoodsAudit: [],
      BoxInfo: [],
      BoxAudit: [],
      dataBoxAudit: [],
    };
  },
  methods: {
    getDataList() {
      this.loading = true;
      http
        .getCargoInfo(
          JSON.stringify({
            ResponseSerial: "0",
            ResponsePageIndex: "1",
            ResponsePageRowNumber: "50",
            ResponseSerialID: "",
            ResponseSerialDelTime: "3",
            ResponseData: {
              queryType: this.queryType == "" ? "IYC" : this.queryType,
              voyODObject: this.voyODObject,
              containerNo: this.ContainerNo,
            },
          })
        )
        .then((res) => {
          console.log(res);
          this.loading = false;
          this.dataList = res.resultData;
          let [obj] = res.resultData;
          this.GoodsAudit = obj.GoodsAuditLists;
          this.BoxInfo = obj.DocContainerGoodsLists;
          let [obj_] = obj.DocContainerGoodsLists;
          this.BoxAudit = obj_.ContainerGoodsAuditLists;
          this.dataBoxAudit = obj_.ContainerAuditss;
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
