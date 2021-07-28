<template>
  <div>
    <!-- 船图箱------------------------------------------------------------------------------------ -->
    <div class="top">
      <template>
        <el-tabs v-model="activeName">
          <el-tab-pane label="船图箱" name="tab1">
            <template>
              <el-table
                :data="dataList"
                style="width: 100%"
                v-loading="loading"
                height="300"
              >
                <el-table-column prop="CONTAINERNO" label="箱号" width="120">
                </el-table-column>
                <el-table-column
                  prop="VLOCATION"
                  label="船箱位"
                ></el-table-column>
                <el-table-column
                  prop="VESCNAME"
                  label="当前船名"
                  width="120"
                ></el-table-column>
                <el-table-column prop="VOYAGE" label="当前航次" width="120">
                </el-table-column>
                <el-table-column
                  prop="VPCSTATUS"
                  label="作业状态"
                ></el-table-column>
                <el-table-column prop="I/E" label="I/E"></el-table-column>
                <el-table-column
                  prop="CONTAINERSIZE"
                  label="尺寸"
                ></el-table-column>
                <el-table-column
                  prop="CONTAINERTYPE"
                  label="箱型"
                ></el-table-column>
                <el-table-column
                  prop="CONTAINERHEIGHT"
                  label="箱高"
                ></el-table-column>
                <el-table-column
                  prop="CONTAINERISOCODE"
                  label="箱ISO代码"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="CONTAINERSTATUSCODE"
                  label="箱状态"
                ></el-table-column>
                <el-table-column
                  prop="CONTAINEROWNERCODE"
                  label="持箱人代码"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="CONTAINERWEIGHT"
                  label="箱重"
                ></el-table-column>
                <el-table-column
                  prop="CONTAINERNETWEIGHT"
                  label="箱净重"
                ></el-table-column>
                <el-table-column
                  prop="PORTOFLOAD"
                  label="装货港"
                ></el-table-column>
                <el-table-column
                  prop="PORTOFDISCHARGE"
                  label="卸货港"
                ></el-table-column>
                <el-table-column
                  prop="PORTOFDESTINATION"
                  label="目的港"
                ></el-table-column>
                <el-table-column
                  prop="PORTOFTRANSFER"
                  label="转运港"
                ></el-table-column>
                <el-table-column
                  prop="VPCRESTOWTYPE"
                  label="翻舱作业类型"
                  width="120"
                ></el-table-column>
                <el-table-column
                  prop="TRANSVESCNAME"
                  label="中转船名"
                ></el-table-column>
                <el-table-column
                  prop="TRANSVOYAGE"
                  label="中转航次"
                ></el-table-column>
                <el-table-column
                  prop="TRANSIEFLAG"
                  label="中转I/E"
                ></el-table-column>
                <el-table-column
                  prop="TRANSFERFLAG"
                  label="运输方式"
                ></el-table-column>
                <el-table-column
                  prop="TEMPERATUREUNIT"
                  label="温度单位"
                ></el-table-column>
                <el-table-column
                  prop="STARTTEMPERATURE"
                  label="设置温度"
                ></el-table-column>
                <el-table-column
                  prop="REFSTATUS"
                  label="冷藏箱状态"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="DANGEROUSCODE"
                  label="危险品代码"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="DANGEROUSUNNO"
                  label="UNNO"
                ></el-table-column>
                <el-table-column
                  prop="OVERLIMITCODE"
                  label="超限代码"
                ></el-table-column>
                <el-table-column
                  prop="GROUPFG"
                  label="箱组标志"
                ></el-table-column>
                <el-table-column
                  prop="CONTAINERFROM"
                  label="来源"
                ></el-table-column>
                <el-table-column
                  prop="CONTAINERTO"
                  label="流向"
                ></el-table-column>
                <el-table-column
                  prop="BREAKDAMAGECODE"
                  label="残损代码"
                ></el-table-column>
                <el-table-column
                  prop="ORIGINALDAMAGEFLAG"
                  label="工原残标志"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="CONTAINERMAXWEIGHT"
                  label="箱最大负荷"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="CONTAINERMATERIAL"
                  label="箱材料"
                ></el-table-column>
                <el-table-column
                  prop="EPLID"
                  label="EDI报文ID"
                  width="100"
                ></el-table-column>
                <el-table-column prop="EMPNO" label="录入人"> </el-table-column>
                <el-table-column label="录入时间" width="160">
                  <template slot-scope="scope" v-if="scope.row.TIME != null">
                    {{ scope.row.TIME | dataFormat }}
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="船图箱组" name="tab2">
            <template>
              <el-table
                :data="dataList"
                style="width: 100%"
                v-loading="loading"
                height="400"
              >
                <el-table-column prop="CONTAINERNO" label="箱号" width="120">
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
    <div class="bottom">
      <div class="title">船图箱审计</div>
      <template>
        <el-table :data="dataList_" style="width: 100%" v-loading="loading">
          <el-table-column prop="OperateCode" label="操作代码">
          </el-table-column>
          <el-table-column
            prop="ModifyItem"
            label="修改内容"
            width="100"
          ></el-table-column>
          <el-table-column prop="ModifyItemName" label="修改名称">
          </el-table-column>
          <el-table-column prop="OriginalValue" label="旧值"></el-table-column>
          <el-table-column prop="NewValue" label="新值"></el-table-column>
          <el-table-column
            prop="UserID"
            label="员工"
            width="100"
          ></el-table-column>
          <el-table-column label="操作时间" width="160">
            <template slot-scope="scope" v-if="scope.row.OperateTime != null">
              {{ scope.row.OperateTime | dataFormat }}
            </template>
          </el-table-column>
          <el-table-column
            prop="OperateReason"
            label="操作原因"
          ></el-table-column>
          <el-table-column
            prop="Remark"
            label="备注"
            width="600"
          ></el-table-column>
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
      activeName: "tab1",
    };
  },
  methods: {
    getdataList() {
      this.loading=true;
      http
        .getShipPictureBox(
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
          this.dataList_=null;
          this.dataList = res.resultData;
          this.loading = false;
          if(res.resultData==null) return
          res.resultData.forEach((item) => {
            this.dataList_ = item.CntrAuditList;
          });
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
.title {
  width: 100%;
  padding: 1rem 1rem;
  background-color: #e4e5e9;
}
</style>
