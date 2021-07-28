<template>
  <div id="ControlHome">
    管控首页
    <div class="Main_top">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="Main_bottom">
      <div></div>
      <div id="myChart"></div>
    </div>
  </div>
</template>

<script>
var echarts = require("echarts");

export default {
  props: {},
  data() {
    return {};
  },
  methods: {
    aaa() {
      var chartDom = document.getElementById("myChart");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: [
            "百度",
            "谷歌",
            "必应",
            "其他",
          ],
        },
        grid: {
          left: "1%",
          right: "2%",
          bottom: "1%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "百度",
            type: "bar",
            barWidth: 5,
            stack: "搜索引擎",
            emphasis: {
              focus: "series",
            },
            data: [620, 732, 701, 734, 1090, 1130, 1120],
          },
          {
            name: "谷歌",
            type: "bar",
            stack: "搜索引擎",
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 290, 230, 220],
          },
          {
            name: "必应",
            type: "bar",
            stack: "搜索引擎",
            emphasis: {
              focus: "series",
            },
            data: [60, 72, 71, 74, 190, 130, 110],
          },
          {
            name: "其他",
            type: "bar",
            stack: "搜索引擎",
            emphasis: {
              focus: "series",
            },
            data: [62, 82, 91, 84, 109, 110, 120],
          },
        ],
      };

      option && myChart.setOption(option);

      myChart.on("click", function (params) {
        console.log(params);
      });
    },
  },
  mounted() {
    this.aaa();
  },
  components: {},
};
</script>

<style scoped lang="less">
#ControlHome {
  width: 100%;
  height: 100%;
  .Main_top {
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: space-between;
    div {
      height: 100%;
    }
    div:nth-child(1) {
      flex-grow: 3;
    }
    div:nth-child(2) {
      flex-grow: 4;
    }
    div:nth-child(3) {
      flex-grow: 3;
    }
  }
  .Main_bottom {
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: space-between;
    div {
      width: 49.5%;
      height: 300px;
      #myChart {
        width: 100%;
      }
    }
  }
}
</style>
