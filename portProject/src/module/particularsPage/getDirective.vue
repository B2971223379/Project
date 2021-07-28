<template>
  <div>
    <!-- 指令------------------------------------------------------------------------- -->

    <template>
      <el-tabs v-model="activeName">
        <el-tab-pane label="作业指令" name="first">
          <div class="top">
            <template>
              <el-table
                :data="dataList"
                style="width: 100%"
                height="300"
                v-loading="loading"
              >
                <el-table-column prop="OPMode" label="作业方式" width="120">
                </el-table-column>
                <el-table-column prop="Priority" label="优先级">
                </el-table-column>
                <el-table-column label="作业产生时间" width="160">
                  <template slot-scope="scope" v-if="scope.row.GENTM != null">
                    {{ scope.row.GENTM | dataFormat }}
                  </template>
                </el-table-column>
                <el-table-column prop="PlanID" label="计划ID">
                </el-table-column>
                <el-table-column prop="Status" label="状态"> </el-table-column>
                <el-table-column
                  prop="ChangeDoorFG"
                  label="换箱门标志"
                  width="100"
                >
                </el-table-column>
                <el-table-column prop="PowerFG" label="上去电标志" width="100">
                </el-table-column>
                <el-table-column prop="VLocation" label="船箱位">
                </el-table-column>
                <el-table-column prop="YLocation" label="场箱位" width="100">
                </el-table-column>
                <el-table-column
                  prop="LoadMachNo"
                  label="装载机械ID"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="UnLoadMachNo"
                  label="卸箱机械ID"
                  width="100"
                >
                </el-table-column>
                <el-table-column label="轮胎吊要求作业时间" width="160">
                  <template
                    slot-scope="scope"
                    v-if="scope.row.AskFinshTime != null"
                  >
                    {{ scope.row.AskFinshTime | dataFormat }}
                  </template>
                </el-table-column>
                <el-table-column label="轮胎吊预计作业时间" width="160">
                  <template
                    slot-scope="scope"
                    v-if="scope.row.FFinshTime != null"
                  >
                    {{ scope.row.FFinshTime | dataFormat }}
                  </template>
                </el-table-column>
                <el-table-column label="刷新时间" width="160">
                  <template
                    slot-scope="scope"
                    v-if="scope.row.RefressTime != null"
                  >
                    {{ scope.row.RefressTime | dataFormat }}
                  </template>
                </el-table-column>
                <el-table-column prop="WkFlow" label="桥吊作业类型" width="120">
                </el-table-column>
                <el-table-column prop="FromLoc" label="来源" width="100">
                </el-table-column>
                <el-table-column prop="CurLoc" label="当前位置">
                </el-table-column>
                <el-table-column
                  prop="MachType"
                  label="装卸机械类型"
                  width="120"
                >
                </el-table-column>
                <el-table-column prop="MachNo" label="装卸机械编号" width="120">
                </el-table-column>
                <el-table-column prop="ToLoc" label="目标位置">
                </el-table-column>
                <el-table-column prop="CWPID" label="CWP编号" width="100">
                </el-table-column>
                <el-table-column prop="DoorRequest" label="箱门要求">
                </el-table-column>
              </el-table>
            </template>
          </div>
          <div class="bottom">
            <div class="title">指令审计</div>
            <template>
              <el-table
                :data="dataList_"
                style="width: 100%"
                v-loading="loading"
              >
                <el-table-column prop="Item" label="项目" width="150">
                </el-table-column>
                <el-table-column prop="OperateCD" label="操作">
                </el-table-column>
                <el-table-column prop="Reason" label="原因"> </el-table-column>
                <el-table-column prop="OriValue" label="原值" width="120">
                </el-table-column>
                <el-table-column prop="NewValue" label="更改值" width="160">
                </el-table-column>
                <el-table-column label="更改时间" width="160">
                  <template slot-scope="scope" v-if="scope.row.Time != null">
                    {{ scope.row.Time | dataFormat }}
                  </template>
                </el-table-column>
                <el-table-column prop="Remark" label="备注" width="480">
                </el-table-column>
              </el-table>
            </template>
          </div>
        </el-tab-pane>
        <el-tab-pane label="调度日志" name="second">
          <div class="top">
            <template>
              <el-table
                :data="dispatchList"
                style="width: 100%"
                v-loading="loading"
                height="300"
              >
                <el-table-column prop="OpinStrID1" label="任务ID2">
                </el-table-column>
                <el-table-column prop="Ctn2" label="箱号2"> </el-table-column>
                <el-table-column prop="FromLoc2" label="起始位置2">
                </el-table-column>
                <el-table-column prop="ToLoc2" label="目标位置2">
                </el-table-column>
                <el-table-column prop="ItactID" label="集卡动态ID">
                </el-table-column>
                <el-table-column label="回应时间" width="160">
                  <template
                    slot-scope="scope"
                    v-if="scope.row.ResponsTM != null"
                  >
                    {{ scope.row.ResponsTM | dataFormat }}
                  </template>
                </el-table-column>
                <el-table-column prop="PreFG" label="预空作业标志">
                </el-table-column>
                <el-table-column prop="NoLoadDistnc" label="空载距离">
                </el-table-column>
                <el-table-column label="进入堆场时间">
                  <template slot-scope="scope" v-if="scope.row.YardTM != null">
                    {{ scope.row.YardTM | dataFormat }}
                  </template>
                </el-table-column>
                <el-table-column label="上档时间">
                  <template
                    slot-scope="scope"
                    v-if="scope.row.OnLaneTM != null"
                  >
                    {{ scope.row.OnLaneTM | dataFormat }}
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
          <div class="bottom">
            <div class="title">调度日志</div>
            <template>
              <el-table
                :data="dispatchList_"
                style="width: 100%"
                v-loading="loading"
              >
                <el-table-column prop="TruckNo" label="集卡号" width="150">
                </el-table-column>
                <el-table-column prop="Item" label="选项" width="150">
                </el-table-column>
                <el-table-column prop="OperateCD" label="操作">
                </el-table-column>
                <el-table-column prop="Reason" label="原因"> </el-table-column>
                <el-table-column prop="OriValue" label="原始值" width="120">
                </el-table-column>
                <el-table-column prop="NewValue" label="更改值" width="160">
                </el-table-column>
                <el-table-column prop="User" label="更改人" width="160">
                </el-table-column>
                <el-table-column label="更改时间" width="160">
                  <template slot-scope="scope" v-if="scope.row.Time != null">
                    {{ scope.row.Time | dataFormat }}
                  </template>
                </el-table-column>
                <el-table-column prop="Remark" label="备注" width="400">
                </el-table-column>
              </el-table>
            </template>
          </div>
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
      dataList: [],
      dataList_: [],
      loading: true,
      activeName: "first",
      dispatchList: [],
      dispatchList_: [],
    };
  },
  methods: {
    //作业指令
    getDataList() {
      this.loading=true;
      http
        .getInstructions(
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
          const [one] = res.resultData;
          this.dataList_ = one.OperateInstructionAuditlists;
        });
    },
    getDataList_() {
      this.loading=true;
      http
        .getDispatchJournal(
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
          console.log(res.resultData);
          this.dispatchList = res.resultData;
          if (res.resultData != null) {
            const [one] = res.resultData;
            this.dispatchList_ = one.TrucDispatchLogAuditlists;
          }
        });
    },
  },
  mounted() {
    this.getDataList();
    this.getDataList_();
  },
  watch: {
    ContainerID() {
      this.getDataList();
      this.getDataList_();
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
