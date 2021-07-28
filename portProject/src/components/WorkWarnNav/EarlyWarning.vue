<template>
  <div id="EarlyWarning">
    <div class="box">
      <div class="title">参数设置</div>
      <div class="main">
        <div class="module">
          <div class="tit">在港船舶突击作业提醒</div>
          <hr size="1" />
          <div class="tit_">
            <span>突击作业 台时量触发提醒阈值</span>
            <div>
              <input
                type="text"
                v-model="DataList.VesselUnitByHourValue"
                @input="myFunc()"
              />
              <button @click="getDataList">确认</button>
            </div>
          </div>
        </div>
        <div class="module">
          <div class="tit">在港船舶待作业危险品、框架箱预警</div>
          <hr size="1" />
          <div class="tit_">
            <span>船舶待作业危险品、框架箱 触发预警阈值</span>
            <div>
              <input
                type="text"
                v-model="DataList.VesselDgFrCntrValue"
                @input="myFunc()"
              />
              <button @click="getDataList">确认</button>
            </div>
          </div>
        </div>
        <div class="module">
          <div class="tit">吊桥异常待时预警</div>
          <hr size="1" />
          <div class="tit_">
            <span>吊桥有指令未作业，触发预警阈值</span>
            <div>
              <input
                type="text"
                v-model="DataList.STSdelayValue"
                @input="myFunc()"
              />
              <button @click="getDataList">确认</button>
            </div>
          </div>
        </div>
        <div class="module">
          <div class="tit">轮胎异常待时预警</div>
          <hr size="1" />
          <div class="tit_">
            <span>轮胎吊有指令未作业，触发预警阈值</span>
            <div>
              <input
                type="text"
                v-model="DataList.RTGdelayValue"
                @input="myFunc()"
              />
              <button @click="getDataList">确认</button>
            </div>
          </div>
        </div>
        <div class="module">
          <div class="tit">箱区集卡数量预警</div>
          <hr size="1" />
          <div class="tit_">
            <span>箱区集卡数量 触发预警阈值</span>
            <div>
              <input
                type="text"
                v-model="DataList.TrucksInYardValue"
                @input="myFunc()"
              />
              <button @click="getDataList">确认</button>
            </div>
          </div>
        </div>
        <div class="module">
          <div class="tit">占道作业提醒</div>
          <hr size="1" />
          <div class="tit_">
            <span>占道作业 触发提醒阈值</span>
            <div>
              <input
                type="text"
                v-model="DataList.SpecYardInstrunctionsValue"
                @input="myFunc()"
              />
              <button @click="getDataList">确认</button>
            </div>
          </div>
        </div>
        <div class="module">
          <div class="tit">外集卡超时预警</div>
          <hr size="1" />
          <div class="active">
            <div>
              <span>外集卡超时 触发提醒阈值（粉色）</span>
              <div>
                <input
                  type="text"
                  v-model="DataList.OutTrkAttentionValue"
                  @input="myFunc()"
                />
                <button @click="getDataList">确认</button>
              </div>
            </div>
            <div>
              <span>外集卡超时 触发警示阈值（红色）</span>
              <div>
                <input
                  type="text"
                  v-model="DataList.OutTrkWarningValue"
                  @input="myFunc()"
                />
                <button @click="getDataList">确认</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../api/TaskMonitoringAPI.js";
export default {
  props: {},
  data() {
    return {
      DataList: {},
      active: true,
    };
  },
  methods: {
    getDataList() {
      http
        .getEarlyWarning(
          JSON.stringify({
            ResponseSerial: "0",
            ResponsePageIndex: "",
            ResponsePageRowNumber: "",
            ResponseSerialID: "",
            ResponseSerialDelTime: "",
            ResponseData: {
              VesselUnitByHourType: this.active ? "1" : "2",
              VesselUnitByHourValue: this.DataList.VesselUnitByHourValue,
              VesselDgFrCntrType: this.active ? "1" : "2",
              VesselDgFrCntrValue: this.DataList.VesselDgFrCntrValue,
              STSdelayType: this.active ? "1" : "2",
              STSdelayValue: this.DataList.STSdelayValue,
              RTGdelayType: this.active ? "1" : "2",
              RTGdelayValue: this.DataList.RTGdelayValue,
              TrucksInYardType: this.active ? "1" : "2",
              TrucksInYardValue: this.DataList.TrucksInYardValue,
              SpecYardInstrunctionsType: this.active ? "1" : "2",
              SpecYardInstrunctionsValue:this.DataList.SpecYardInstrunctionsValue,
              OutTrkAttentionType: this.active ? "1" : "2",
              OutTrkAttentionValue: this.DataList.OutTrkAttentionValue,
              OutTrkWarningType: this.active ? "1" : "2",
              OutTrkWarningValue: this.DataList.OutTrkWarningValue,
            },
          })
        )
        .then((res) => {
          console.log(res);
          if (res.resultCode == "100") {
            this.DataList = res.resultData;
            if (this.active == false) {
              this.$message({
                message: "修改成功",
                type: "success",
              });
            }
          }
          this.active = true;
        });
    },
    myFunc() {
      this.active = false;
    },
  },
  mounted() {
    this.getDataList();
  },
  components: {},
};
</script>

<style scoped lang="less">
#EarlyWarning {
  width: 100%;
  height: 100%;
  .box {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    background-color: #091629;
    .title {
      width: 100%;
      padding: 1rem 3rem;
      color: #158dcb;
      font-size: 2rem;
    }
    .main {
      width: 100%;
      height: 100%;
      padding: 0rem 5rem;
      .module {
        width: 100%;
        height: 6.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 2rem;
        .tit {
          width: 100%;
          color: #158dcb;
          font-size: 2rem;
        }
        .tit_ {
          width: 75%;
          color: #5cd2c0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          div {
            width: 45%;
            display: flex;
            justify-content: space-between;
          }
          span {
            font-size: 2rem;
          }
        }
        .active {
          width: 75%;
          color: #5cd2c0;
          display: flex;
          flex-direction: column;
          div {
            display: flex;
            justify-content: space-between;
            margin-top: 0.5rem;
            div {
              width: 45%;
              display: flex;
              justify-content: space-between;
            }
          }
          span {
            font-size: 2rem;
          }
        }
      }
    }
    input {
      width: 25rem;
      height: 2.5rem;
      border-radius: 0.5rem;
    }
    button {
      padding: 0.4rem 3rem;
      border-radius: 0.5rem;
      background-color: white;
      font-size: 1.4rem;
    }
    hr {
      color: #0d4064;
    }
  }
}
</style>
