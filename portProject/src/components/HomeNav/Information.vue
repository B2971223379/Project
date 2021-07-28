<template>
  <div id="information">
    <header>
      <span>箱货综合查询</span>
    </header>
    <main>
      <!-- 搜索条件框 -->
      <div class="search">
        <div :class="ActiveTrue ? 'inquire1' : 'inquire2'" class="inquire">
          <div class="inqu_info">
            <div>
              <span>查询类型</span>
              <select v-model="SelectInfo.queryType">
                <option
                  v-for="(item, index) in SelectList.LoadQueryType"
                  :key="index"
                  :value="item.LowValue"
                >
                  {{ item.Meaning }}
                </option>
              </select>
            </div>
            <div>
              <span>籍号</span
              ><input
                type="text"
                v-model="SelectInfo.containerNo"
                placeholder="请输入箱号"
              />
            </div>
            <div>
              <span>提单号</span
              ><input
                type="text"
                v-model="SelectInfo.billNo"
                placeholder="请输入提单号"
              />
            </div>
            <div>
              <span>船名</span>
              <select v-model="SelectInfo.LoadVoyage">
                <option
                  v-for="(item, index) in SelectList.LoadVoyage"
                  :key="index"
                  :value="item"
                >
                  {{ item.HighValue }}
                  {{ item.Abbr }}
                </option>
              </select>
            </div>
            <div>
              <span>航次</span>
              <div v-if="SelectInfo.LoadVoyage">
                <input
                  type="text"
                  v-model="SelectInfo.LoadVoyage.Abbr"
                  placeholder="请输入关键字"
                />
              </div>
            </div>
            <div>
              <span>箱状态</span>
              <select v-model="SelectInfo.LoadContainerStatus">
                <option
                  v-for="(item, index) in SelectList.LoadContainerStatus"
                  :key="index"
                  :value="item.LowValue"
                >
                  {{ item.Meaning }}
                </option>
              </select>
            </div>
            <div>
              <span>箱动态</span>
              <select v-model="SelectInfo.iycType">
                <option
                  v-for="(item, index) in SelectList.LoadIycType"
                  :key="index"
                  :value="item.LowValue"
                >
                  {{ item.Meaning }}
                </option>
              </select>
            </div>
            <div>
              <span>持箱人</span>
              <select v-model="SelectInfo.LoadCntOwener">
                <option
                  v-for="(item, index) in SelectList.LoadCntOwener"
                  :key="index"
                  :value="item.LowValue"
                >
                  {{ item.Meaning }}
                </option>
              </select>
            </div>
            <div>
              <!-- SelectInfo.cntStackDays -->
              <span>堆存天数</span>
              <input type="text" style="width: 7.25rem" placeholder="起始值" />-
              <input type="text" style="width: 7.25rem" placeholder="结束值" />
            </div>
            <div>
              <span>附加操作</span>
              <select v-model="SelectInfo.LoadAddtionalOperate">
                <option
                  v-for="(item, index) in SelectList.LoadAddtionalOperate"
                  :key="index"
                  :value="item.LowValue"
                >
                  {{ item.Meaning }}
                </option>
              </select>
            </div>
            <div>
              <span>支付方式</span>
              <select v-model="SelectInfo.LoadDeliverMode">
                <option
                  v-for="(item, index) in SelectList.LoadDeliverMode"
                  :key="index"
                  :value="item.LowValue"
                >
                  {{ item.Meaning }}
                </option>
              </select>
            </div>
            <div>
              <span>箱型</span>
              <select v-model="SelectInfo.LoadCntType">
                <option
                  v-for="(item, index) in SelectList.LoadCntType"
                  :key="index"
                  :value="item.LowValue"
                >
                  {{ item.Meaning }}
                </option>
              </select>
            </div>
            <div>
              <span>箱高</span>
              <select v-model="SelectInfo.LoadCntHeight">
                <option
                  v-for="(item, index) in SelectList.LoadCntHeight"
                  :key="index"
                  :value="item.Meaning"
                >
                  {{ item.EDICode }}
                </option>
              </select>
            </div>
            <div>
              <span>通关性质</span>
              <select v-model="SelectInfo.LoadEdiTradeType">
                <option
                  v-for="(item, index) in SelectList.LoadEdiTradeType"
                  :key="index"
                  :value="item.LowValue"
                >
                  {{ item.Meaning }}
                </option>
              </select>
            </div>
            <div>
              <span>场箱位</span>
              <input
                type="text"
                v-model="SelectInfo.FieldSlot"
                placeholder="请输入场箱位"
              />
            </div>
            <div>
              <span>是否放关</span>
              <select v-model="SelectInfo.LoadPassFg">
                <option value="Y">Y</option>
                <option value="N">N</option>
              </select>
            </div>

            <div>
              <span>危险品</span>
              <select v-model="SelectInfo.LoadDangerous">
                <option
                  v-for="(item, index) in SelectList.LoadDangerous"
                  :key="index"
                  :value="item.LowValue"
                >
                  {{ item.Meaning }}
                </option>
              </select>
            </div>
            <div>
              <span>流向</span>
              <select v-model="SelectInfo.LoadFromTo">
                <option
                  v-for="(item, index) in SelectList.LoadFromTo"
                  :key="index"
                  :value="item.LowValue"
                >
                  {{ item.Meaning }}
                </option>
              </select>
            </div>
            <div>
              <span>出场时间</span>
              <el-date-picker
                v-model="SelectInfo.dtOutst"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="but">
            <button style="background: #46a6ff" @click="getListInfo">
              检索
            </button>
            <button style="background: #999999" @click="emptyClick">
              清空
            </button>
            <button style="background: #2f71a9" @click="showInfo">更多</button>
          </div>
        </div>
      </div>
      <!-- table表格 -->
      <div class="box_info">
        <div class="title">
          <span>进出历史</span>
        </div>
        <div class="table">
          <template>
            <el-table
              :data="List"
              height="820"
              v-loading="loading"
              @expand-change="getBoxInfo"
            >
              <el-table-column width="60" type="expand">
                <template slot-scope="scope">
                  <ul class="TableInfo" v-loading="expandloading">
                    <li>
                      <span>箱号:{{ scope.row.ContainerNo }}</span>
                      <span>箱动态:{{ scope.row.Type }}</span>
                      <span>箱状态:{{ scope.row.ContainerStatusCode }}</span>
                      <span>场箱位:{{ scope.row.YardLocation }}</span>
                      <span>箱高:{{ scope.row.ContainerHeight }}</span>
                    </li>
                    <li>
                      <span>箱ISO代码:{{ scope.row.ContainerISOCode }}</span>
                      <span>尺寸:{{ scope.row.ContainerSize }}</span>
                      <span>箱型:{{ scope.row.ContainerType }}</span>
                      <span>持箱人:{{ scope.row.ContainerOwnerCode }}</span>
                      <span>联动码头:{{ scope.row.LdTermCode }}</span>
                    </li>
                    <li>
                      <span>总重量:{{ scope.row.ContainerWeight }}</span>
                      <span>箱内货重:{{ scope.row.CntrGoodsWeight }}</span>
                      <span>箱净重:{{ scope.row.ContainerNetWeight }}</span>
                      <span>地磅重量:{{ scope.row.ContainerActWeight }}</span>
                      <span>箱组:{{ scope.row.GroupFlag }}</span>
                    </li>
                    <li>
                      <span>资料类型:{{ scope.row.DocsType }}</span>
                      <span>共享标志:{{ scope.row.ShareType }}</span>
                      <span>进口船名:{{ scope.row.ImportVesselName }}</span>
                      <span>进口航次:{{ scope.row.ImportVoyage }}</span>
                      <span>出口船名:{{ scope.row.ExportVesselName }}</span>
                    </li>
                    <li>
                      <span>出口航次:{{ scope.row.ExportVoyage }}</span>
                      <span>附加操作:{{ scope.row.AddtionalOperate }}</span>
                      <span>验箱结果:{{ scope.row.DmgInspectResult }}</span>
                      <span>验箱人:{{ scope.row.DmgCheckEmpno }}</span>
                      <span>付费人:{{ scope.row.DmgCheckPayer }}</span>
                    </li>
                    <li>
                      <span
                        >验箱时间:<span
                          v-if="scope.row.DmgInspectIime != null"
                          >{{ scope.row.DmgInspectIime | dataFormat }}</span
                        >
                      </span>
                      <span>设备交接单:{{ scope.row.OhcEir }}</span>
                      <span>来源:{{ scope.row.ContainerFrom }}</span>
                      <span>流向:{{ scope.row.ContainerTo }}</span>
                      <span>运输方式:{{ scope.row.TransportMode }}</span>
                    </li>
                    <li>
                      <span>港内疏状态:{{ scope.row.InnerScatterFg }}</span>
                      <span>海铁联运:{{ scope.row.SeaRailFG }}</span>
                      <span>穿梭巴士标志:{{ scope.row.ShuttleBusFlag }}</span>
                      <span>外部船名:{{ scope.row.OuterVesselName }}</span>
                      <span>外部航次:{{ scope.row.OuterVoyage }}</span>
                    </li>
                    <li>
                      <span
                        >进场时间:<span v-if="scope.row.InYardTime != null">{{
                          scope.row.InYardTime | dataFormat
                        }}</span>
                      </span>
                      <span>进场方式:{{ scope.row.InOperateMode }}</span>
                      <span>进场过程:{{ scope.row.InOperateProcedure }}</span>
                      <span
                        >出场时间:<span v-if="scope.row.OutTime != null">{{
                          scope.row.OutTime | dataFormat
                        }}</span>
                      </span>
                      <span>出场方式:{{ scope.row.OutOperateMode }}</span>
                    </li>
                    <li>
                      <span>出场过程:{{ scope.row.OutOperateProcedure }}</span>
                      <span>整拼:{{ scope.row.FullLessFlag }}</span>
                      <span>放关:{{ scope.row.PassFlag }}</span>
                      <span>空放:{{ scope.row.EmptyPassFlag }}</span>
                      <span>码扣:{{ scope.row.DockLockFlag }}</span>
                    </li>
                    <li>
                      <span>箱锁:{{ scope.row.LockFlag }}</span>
                      <span>配载:{{ scope.row.StowageFlag }}</span>
                      <span>铅封号:{{ scope.row.SealNo }}</span>
                      <span>装货港:{{ scope.row.DisplayPortOfLoad }}</span>
                      <span>转运港:{{ scope.row.PortOfTransfer }}</span>
                    </li>
                    <li>
                      <span>卸货港:{{ scope.row.PortOfDischarge }}</span>
                      <span>目的港:{{ scope.row.PortOfDestination }}</span>
                      <span
                        >箱变空时间:<span v-if="scope.row.EmptyTime != null">{{
                          scope.row.EmptyTime | dataFormat
                        }}</span></span
                      >
                      <span>箱变空原因:{{ scope.row.EmptyReason }}</span>
                      <span>箱材料:{{ scope.row.ContainerMaterial }}</span>
                    </li>
                    <li>
                      <span>箱门方向:{{ scope.row.DoorDirection }}</span>
                      <span>箱最大负荷:{{ scope.row.ContainerMaxWeight }}</span>
                      <span>验箱分类:{{ scope.row.CheckType }}</span>
                      <span>危险品:{{ scope.row.DangerousCode }}</span>
                      <span>超限代码:{{ scope.row.OverLimitCode }}</span>
                    </li>
                    <li>
                      <span>UNNO:{{ scope.row.DangerousUNNo }}</span>
                      <span>超高:{{ scope.row.OverHeight }}</span>
                      <span>温度:{{ scope.row.SetTemperature }}</span>
                      <span>单位:{{ scope.row.TemperatureUnit }}</span>
                      <span>冷藏箱状态:{{ scope.row.RefStatus }}</span>
                    </li>
                    <li>
                      <span>前超长:{{ scope.row.FrontOverLength }}</span>
                      <span>后超长:{{ scope.row.BackOverLength }}</span>
                      <span>左超宽:{{ scope.row.LeftOverWidth }}</span>
                      <span>右超宽:{{ scope.row.RightOverWidth }}</span>
                      <span>剧毒标识:{{ scope.row.IsVirulent }}</span>
                    </li>
                    <li>
                      <span>平台车标志:{{ scope.row.FlatFlag }}</span>
                      <span>特殊操作:{{ scope.row.SpecialOperateCode }}</span>
                      <span>特殊作业类型:{{ scope.row.pecOprType }}</span>
                      <span>工原残:{{ scope.row.OriginalDamageFlag }}</span>
                      <span>残损代码:{{ scope.row.BreakDamageCode }}</span>
                    </li>
                    <li>
                      <span>污箱标志:{{ scope.row.DirtyCode }}</span>
                    </li>
                  </ul>
                </template>
              </el-table-column>
              <el-table-column prop="ContainerNo" label="箱号" width="120">
              </el-table-column>
              <el-table-column prop="YardLocation" label="场箱位" width="90">
              </el-table-column>
              <el-table-column prop="ContainerSize" label="尺寸">
              </el-table-column>
              <el-table-column prop="ContainerType" label="箱型">
              </el-table-column>
              <el-table-column prop="ContainerHeight" label="箱高">
              </el-table-column>
              <el-table-column prop="ContainerISOCode" label="ISO">
              </el-table-column>
              <el-table-column prop="ContainerOwnerCode" label="持箱人">
              </el-table-column>
              <el-table-column prop="ContainerStatusCode" label="箱状态">
              </el-table-column>
              <!-- <el-table-column prop="" label="内外贸"> </el-table-column> -->
              <el-table-column prop="Type" label="箱动态"> </el-table-column>
              <!-- <el-table-column prop="" label="SCI"> </el-table-column> -->
              <el-table-column prop="StowageFlag" label="配载">
              </el-table-column>
              <!-- <el-table-column prop="" label="码放"> </el-table-column> -->
              <el-table-column prop="EmptyPassFlag" label="空放">
              </el-table-column>

              <el-table-column label="进场时间" width="160">
                <template
                  slot-scope="scope"
                  v-if="scope.row.InYardTime != null"
                >
                  {{ scope.row.InYardTime | dataFormat }}
                </template>
              </el-table-column>
              <el-table-column prop="InOperateMode" label="进场方式">
              </el-table-column>
              <el-table-column label="出场时间" width="160">
                <template slot-scope="scope" v-if="scope.row.OutTime != null">
                  {{ scope.row.OutTime | dataFormat }}
                </template>
              </el-table-column>
              <el-table-column prop="OutOperateMode" label="出场方式">
              </el-table-column>
              <el-table-column
                prop="ExportVesselName"
                label="出口船名"
                width="220"
              >
              </el-table-column>
              <el-table-column prop="ExportVoyage" label="出口航次" width="100">
              </el-table-column>
              <el-table-column
                prop="ImportVesselName"
                label="进口船名"
                width="160"
              >
              </el-table-column>
              <el-table-column prop="ImportVoyage" label="进口航次">
              </el-table-column>
              <el-table-column prop="LockFlag" label="箱锁"> </el-table-column>
              <el-table-column prop="SealNo" label="铅封号" width="120">
              </el-table-column>
              <el-table-column label="操作" fixed="right">
                <template slot-scope="scope">
                  <span
                    style="color: #2481d7"
                    @click="OpenParticulars(scope.row)"
                    >详情</span
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>

          <!-- 分页 -->
          <template>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[50, 100, 200, 500]"
                :page-size="25"
                layout="total, sizes, prev, pager, next, jumper"
                :total="Number(total)"
              >
              </el-pagination>
            </div>
          </template>

          <!-- 详情页 -->
          <el-dialog :visible.sync="dialogVisible" width="95%">
            <template>
              <el-tabs v-model="activeName" @tab-click="tabClick">
                <!-- 箱动态 -->
                <el-tab-pane label="箱动态" name="tab1">
                  <BoxDynamic
                    v-if="isActive.tab1"
                    :queryType="SelectInfo.queryType"
                    :ContainerID="ContainerID"
                  ></BoxDynamic>
                </el-tab-pane>
                <!-- 箱审计 -->
                <el-tab-pane label="箱审计" name="tab2">
                  <BoxAudit
                    v-if="isActive.tab2"
                    :queryType="SelectInfo.queryType"
                    :ContainerID="ContainerID"
                  ></BoxAudit>
                </el-tab-pane>
                <el-tab-pane label="货信息" name="tab3">
                  <CargoInfo
                    v-if="isActive.tab3"
                    :queryType="SelectInfo.queryType"
                    :ContainerNo="ContainerNo"
                    :voyODObject="voyODObject"
                  ></CargoInfo>
                </el-tab-pane>
                <el-tab-pane label="报文发送情况" name="tab4">
                  <NoticeSituation
                    v-if="isActive.tab4"
                    :queryType="SelectInfo.queryType"
                    :ContainerID="ContainerID"
                  ></NoticeSituation>
                </el-tab-pane>
                <el-tab-pane label="外集卡托运" name="tab5">
                  <CollectCardsConsign
                    v-if="isActive.tab5"
                    :queryType="SelectInfo.queryType"
                    :ContainerID="ContainerID"
                  ></CollectCardsConsign>
                </el-tab-pane>
                <el-tab-pane label="退关" name="tab6">
                  <PromptShipment
                    v-if="isActive.tab6"
                    :queryType="SelectInfo.queryType"
                    :ContainerID="ContainerID"
                  ></PromptShipment>
                </el-tab-pane>
                <el-tab-pane label="受理计划" name="tab7">
                  <AcceptancePlan
                    v-if="isActive.tab7"
                    :queryType="SelectInfo.queryType"
                    :ContainerID="ContainerID"
                  ></AcceptancePlan>
                </el-tab-pane>
                <el-tab-pane label="船图箱" name="tab8">
                  <ShipPictureBox
                    v-if="isActive.tab8"
                    :queryType="SelectInfo.queryType"
                    :ContainerID="ContainerID"
                  ></ShipPictureBox>
                </el-tab-pane>
                <el-tab-pane label="转推计划" name="tab9">
                  <ShiftingPlan
                    v-if="isActive.tab9"
                    :queryType="SelectInfo.queryType"
                    :ContainerID="ContainerID"
                  ></ShiftingPlan>
                </el-tab-pane>
                <el-tab-pane label="指令" name="tab10">
                  <getDirective
                    v-if="isActive.tab10"
                    :queryType="SelectInfo.queryType"
                    :ContainerID="ContainerID"
                  ></getDirective>
                </el-tab-pane>
                <el-tab-pane label="箱组" name="tab11">
                  <BoxGroup
                    v-if="isActive.tab11"
                    :queryType="SelectInfo.queryType"
                    :ContainerID="ContainerID"
                  ></BoxGroup>
                </el-tab-pane>
                <el-tab-pane label="残损登记" name="tab12">
                  <DamagedRegister
                    v-if="isActive.tab12"
                    :queryType="SelectInfo.queryType"
                    :ContainerID="ContainerID"
                  ></DamagedRegister>
                </el-tab-pane>
                <el-tab-pane label="辅助作业记录" name="tab13">
                  <TaskMonitoringRecord
                    v-if="isActive.tab13"
                    :queryType="SelectInfo.queryType"
                    :ContainerID="ContainerID"
                  ></TaskMonitoringRecord>
                </el-tab-pane>
                <el-tab-pane label="箱费用" name="tab14">
                  <BoxCost
                    v-if="isActive.tab14"
                    :queryType="SelectInfo.queryType"
                    :ContainerID="ContainerID"
                  ></BoxCost>
                </el-tab-pane>
                <el-tab-pane label="EDI记录" name="tab15">
                  <EDIRecord
                    v-if="isActive.tab15"
                    :queryType="SelectInfo.queryType"
                    :ContainerID="ContainerID"
                  ></EDIRecord>
                </el-tab-pane>
              </el-tabs>
            </template>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import http from "../../api/api.js";
import BoxDynamic from "../../module/particularsPage/BoxDynamic.vue";
import BoxAudit from "../../module/particularsPage/BoxAudit.vue";
import PromptShipment from "../../module/particularsPage/PromptShipment.vue";
import AcceptancePlan from "../../module/particularsPage/AcceptancePlan.vue";
import CollectCardsConsign from "../../module/particularsPage/CollectCardsConsign.vue";
import NoticeSituation from "../../module/particularsPage/NoticeSituation.vue";
import TaskMonitoringRecord from "../../module/particularsPage/TaskMonitoringRecord.vue";
import ShipPictureBox from "../../module/particularsPage/ShipPictureBox.vue";
import BoxCost from "../../module/particularsPage/BoxCost.vue";
import ShiftingPlan from "../../module/particularsPage/ShiftingPlan.vue";
import getDirective from "../../module/particularsPage/getDirective.vue";
import EDIRecord from "../../module/particularsPage/EDIRecord.vue";
import BoxGroup from "../../module/particularsPage/BoxGroup.vue";
import DamagedRegister from "../../module/particularsPage/DamagedRegister.vue";
import CargoInfo from "../../module/particularsPage/CargoInfo.vue";
export default {
  props: {},
  data() {
    return {
      ActiveTrue: true,
      //查询条件保存信息
      SelectInfo: {
        queryType: "", //查询类型
        containerNo: "", //籍号
        billNo: "", //提单号
        LoadVoyage:{},//船名
        LoadContainerStatus: "", //箱状态
        iycType: "", //箱动态
        LoadCntOwener: "", //持箱人
        cntStackDays:[], //堆存天数
        LoadAddtionalOperate: "", //附加操作
        LoadDeliverMode: "", //支付方式
        LoadCntType: "", //箱型
        LoadCntHeight: "", //箱高
        LoadEdiTradeType: "", //通关性质
        FieldSlot:"", //场箱位
        LoadPassFg: "", //是否放关
        LoadDangerous: "", //危险品
        LoadFromTo: "", //流向
        dtOutst: [], //出场时间
      },

      //动态获取查询条件
      SelectList: {},

      ContainerID: null,
      ContainerNo: null,
      voyODObject: null,
      //箱货界面信息
      List: [],
      //详情页开关
      dialogVisible: false,
      //详情页信息
      particularsList: {
        //箱动态信息
        BoxDynamic: [],
      },
      //详情页默认显示导航栏
      activeName: "tab1",

      // tabs切换栏懒加载判断条件
      isActive: {
        tab1: true,
        tab2: false,
        tab3: false,
        tab4: false,
        tab5: false,
        tab6: false,
        tab7: false,
        tab8: false,
        tab9: false,
        tab10: false,
        tab11: false,
        tab12: false,
        tab13: false,
        tab14: false,
        tab15: false,
      },

      // 分页
      currentPage4: 1, //默认当前页为第一页
      pagesize: 50, //默认每页20条数据
      pagenum: 1, //请求的页数 默认第一页
      total: null, //总页数
      loading: true,
      expandloading: true,
      ISNull: true,
      ISNull1: true,
      ISNull2: true,
    };
  },
  methods: {
    //检索
    getListInfo() {
      console.log(this.SelectInfo.dtOutst)
      this.loading = true;
      http
        .getListInfoAPI(
          JSON.stringify({
            ResponseSerial: "0",
            ResponsePageIndex: this.pagenum,
            ResponsePageRowNumber: this.pagesize,
            ResponseSerialID: "",
            ResponseSerialDelTime: "10",
            ResponseData: {
              containerNo:this.SelectInfo.containerNo != "" ? this.SelectInfo.containerNo: "CAIU%", //籍号
              iycType:this.SelectInfo.iycType != "" ? this.SelectInfo.iycType : "SAC", //箱动态
              containerStatus: "OF", 
              queryType:this.SelectInfo.queryType != ""  ? this.SelectInfo.queryType : "IYC", //查询类型
              billNo: this.SelectInfo.billNo, //提单号
              voyIDObject:this.SelectInfo.LoadVoyage.EnMeaning=="I"?this.SelectInfo.LoadVoyage.LowValue:"",//船名航次 进口航次ID 
              voyODObject:this.SelectInfo.LoadVoyage.EnMeaning=="E"?this.SelectInfo.LoadVoyage.LowValue:"",//船名航次 出口航次ID
              cntOwner:this.SelectInfo.LoadCntOwener, //持箱人
              addtionalOperate:this.SelectInfo.LoadAddtionalOperate, //附加操作
              deliverMode:this.SelectInfo.LoadDeliverMode, //支付方式
              cntType:this.SelectInfo.LoadCntType, //箱型
              cntHeight:this.SelectInfo.LoadCntHeight, //箱高
              CustomClearance:this.SelectInfo.LoadEdiTradeType, //通关性质
              cntYlocation:this.SelectInfo.FieldSlot, //场箱位
              cntPassFg:this.SelectInfo.LoadPassFg, //是否放关
              cntDngerCd:this.SelectInfo.LoadDangerous, //危险品
              cntContainerTo:this.SelectInfo.LoadFromTo, //流向
              dtOutst:this.SelectInfo.dtOutst[0],//出场时间 起始
              dtOutet:this.SelectInfo.dtOutst[1], //出场时间 终止
            },
          })
        )
        .then((res) => {
          console.log(res);
          if (res.resultCode == "100" && res.resultData.length != "0") {
            this.loading = false;
            res.resultData.map((item) => {
              item.ruleItemDate = [];
            });
            this.List = res.resultData;
            this.total = res.resultMsg;
          } else if (res.resultData.length == "0") {
            this.$message({
              message: "暂无此数据",
              type: "warning",
            });
            this.loading = false;
          }
        })
        .catch((error) => {
          if (error) {
            this.$message({
              message: "当前网络状态差，请求超时！",
              type: "warning",
            });
            this.loading = false;
          }
        });
    },
    //清空
    emptyClick() {
    this.SelectInfo= {
        queryType: "", //查询类型
        containerNo: "", //籍号
        billNo: "", //提单号
        LoadVoyage:{},//船名
        LoadContainerStatus: "", //箱状态
        iycType: "", //箱动态
        LoadCntOwener: "", //持箱人
        cntStackDays:[], //堆存天数
        LoadAddtionalOperate: "", //附加操作
        LoadDeliverMode: "", //支付方式
        LoadCntType: "", //箱型
        LoadCntHeight: "", //箱高
        LoadEdiTradeType: "", //通关性质
        FieldSlot:"", //场箱位
        LoadPassFg: "", //是否放关
        LoadDangerous: "", //危险品
        LoadFromTo: "", //流向
        dtOutst: [], //出场时间
      }
    },
    //更多
    showInfo() {
      this.ActiveTrue = !this.ActiveTrue;
    },

    //详情页
    OpenParticulars(row) {
      this.dialogVisible = !this.dialogVisible;
      this.ContainerID = row.ContainerID;
      this.voyODObject = row.ExportVoyageID;
      this.ContainerNo = row.ContainerNo;
      console.log(row.ContainerID, row.ExportVoyageID, row.ContainerNo);
    },
    //动态获取搜索条件下拉框数据
    getSelectList() {
      http
        .getSelectListAPI(
          JSON.stringify({
            ResponseSerial: "0",
            ResponsePageIndex: "",
            ResponsePageRowNumber: "",
            ResponseSerialID: "",
            ResponseSerialDelTime: "3",
            ResponseData: {
              //查询类型
              LoadQueryType: "1",
              //船名航次
              LoadVoyage:"1",
              //箱状态
              LoadContainerStatus: "1",
              //箱动态
              LoadIycType: "1",
              //持箱人
              LoadCntOwener: "1",
              //附加操作
              LoadAddtionalOperate: "1",
              //支付方式
              LoadDeliverMode: "1",
              //箱型
              LoadCntType: "1",
              //箱高
              LoadCntHeight: "1",
              //通关性质
              LoadEdiTradeType: "1",
              //是否放关
              //危险品
              LoadDangerous: "1",
              //流向
              LoadFromTo: "1",
            },
          })
        )
        .then((res) => {
          console.log(res);
          this.SelectList = res.resultData;
        });
    },
    //获取table展开行的数据
    getBoxInfo(row, index) {
      if (index.length == 0) return;
      http
        .getTableInfoAPI(
          JSON.stringify({
            ResponseSerial: "0",
            ResponsePageIndex: "",
            ResponsePageRowNumber: "",
            ResponseSerialID: "",
            ResponseSerialDelTime: "",
            ResponseData: { containerid: row.ContainerID, queryType: "IYC" },
          })
        )
        .then((res) => {
          this.expandloading = false;
          this.List.forEach((item, index) => {
            if (item.ContainerNo === row.ContainerNo) {
              this.List[index].ruleItemDate.push(res.resultData);
            }
          });
        });
    },

    //分页  改变每页显示数据时触发
    handleSizeChange(val) {
      this.loading = true;
      this.pagesize = val;
      this.getListInfo();
    },
    //改变页数时触发
    handleCurrentChange(val) {
      this.loading = true;
      this.pagenum = val;
      this.getListInfo();
    },
    tabClick(tab) {
      switch (tab.index) {
        case "0":
          this.isActive.tab1 = true;
          break;
        case "1":
          this.isActive.tab2 = true;
          break;
        case "2":
          this.isActive.tab3 = true;
          break;
        case "3":
          this.isActive.tab4 = true;
          break;
        case "4":
          this.isActive.tab5 = true;
          break;
        case "5":
          this.isActive.tab6 = true;
          break;
        case "6":
          this.isActive.tab7 = true;
          break;
        case "7":
          this.isActive.tab8 = true;
          break;
        case "8":
          this.isActive.tab9 = true;
          break;
        case "9":
          this.isActive.tab10 = true;
          break;
        case "10":
          this.isActive.tab11 = true;
          break;
        case "11":
          this.isActive.tab12 = true;
          break;
        case "12":
          this.isActive.tab13 = true;
          break;
        case "13":
          this.isActive.tab14 = true;
          break;
        case "14":
          this.isActive.tab15 = true;
          break;
      }
    },
  },
  mounted() {
    this.getSelectList();
    this.getListInfo();
  },

  components: {
    BoxDynamic,
    BoxAudit,
    PromptShipment,
    AcceptancePlan,
    CollectCardsConsign,
    NoticeSituation,
    TaskMonitoringRecord,
    ShipPictureBox,
    BoxCost,
    ShiftingPlan,
    getDirective,
    EDIRecord,
    BoxGroup,
    DamagedRegister,
    CargoInfo,
  },
};
</script>

<style scoped lang="less">
.WidthHeight {
  width: 100%;
  height: 100%;
}
#information {
  width: 100%;
  height: 100%;
  background-color: #f5f6fa;
  header {
    width: 100%;
    background-color: white;
    padding: 0.5rem 2rem;
    span {
      display: block;
      width: 12rem;
      border-bottom: 0.2rem solid #1890ff;
      font-size: 2rem;
      color: #1890ff;
      padding: 0.2rem 0rem;
      text-align: center;
    }
  }
  main {
    .WidthHeight;
    padding: 1rem;
    //综合查询样式
    .search {
      background-color: #f5f6fa;
      .inquire {
        display: flex;
        align-items: center;
        position: relative;
        background-color: white;
        // padding: 2rem 0rem;
        .inqu_info {
          width: 75%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          overflow: hidden;
          div {
            width: 33%;
            display: flex;
            align-items: center;
            margin-top: 1rem;
            .el-date-editor {
              margin-top: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              .el-input__icon {
                width: 0;
                height: 0;
              }
            }

            span {
              display: block;
              width: 10rem;
              color: rgb(12, 12, 12);
              font-size: 1.4rem;
              text-align: right;
              margin-right: 1rem;
            }
            input,
            select {
              height: 3rem;
              width: 15rem;
              border: 0.1rem solid;
              border-radius: 0.5rem;
              border: 0.1rem solid rgb(189, 189, 189);
              font-size: 1.4rem;
              padding-left: 1rem;
              background-color: white;
            }

            .el-range-editor {
              width: 18rem;
              height: 4.5rem;
            }
          }
        }
        .but {
          width: 20%;
          height: 3rem;
          display: flex;
          justify-content: space-between;
          position: absolute;
          right: 1rem;
          top: 1rem;
          button {
            width: 50rem;
            margin-left: 1rem;
            border-radius: 0.5rem;
            color: white;
            font-size: 1.2rem;
          }
        }

        //设置input框中placeholder属性的字体大小
        ::-webkit-input-placeholder {
          /* WebKit browsers */
          color: #999;
          font-size: 1.3rem;
        }
      }
      .inquire1 {
        width: 100%;
        height: 5rem;
      }
      .inquire2 {
        width: 100%;
        height: 100%;
      }
    }
    //信息列表样式
    .box_info {
      .WidthHeight;
      background-color: white;
      margin-top: 1rem;
      .title {
        width: 100%;
        padding: 0.5rem 2rem;
        span {
          display: block;
          width: 8rem;
          border-bottom: 0.2rem solid #1890ff;
          font-size: 2rem;
          color: #1890ff;
          padding: 0.2rem 0rem;
          text-align: center;
        }
      }
      .table {
        .WidthHeight;
        .el-table {
          width: 100%;
          .TableInfo {
            width: 130rem;
            height: 100%;
            li {
              width: 100%;
              padding: 1rem;
              border-bottom: 0.2rem dashed;
              display: flex;
              flex-wrap: wrap;
              span {
                width: 16.5%;
                font-size: 1.3rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>