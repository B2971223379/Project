<template>
  <div id="Home">
    <nav :class="isnav ? 'active' : 'active1'">
      <router-link to="/Home/workwarn"
        ><i class="el-icon-help"></i><span>作业监控</span></router-link
      >
      <router-link to="/Home/ShipWorkMonitoring"
        ><i class="el-icon-ship"></i><span>船舶作业监控</span></router-link
      >
      <router-link to="/Home/information"
        ><i class="el-icon-tickets"></i><span>信息资料</span></router-link
      >
      <router-link to="/Home/shipxy"
        ><i class="el-icon-eleme"></i><span>船讯网</span></router-link
      >
      <router-link to="/Home/standby"
        ><i class="el-icon-upload"></i><span>备用</span>
      </router-link>
      <router-link to="/Home/EmergencyManual"
        ><i class="el-icon-reading"></i> <span>应急处置手册</span></router-link
      >
      <!-- 导航按钮 -->
      <img v-if="isnav" src="..\assets\img\ToRight.png" @click="aaa" />
      <img v-else src="..\assets\img\ToLeft.png" @click="aaa" />
    </nav>
    <main>
      <router-view></router-view>
      <i class="fa fa-camera-retro fa-lg"></i>
    </main>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      isnav: true,
    };
  },
  methods: {
    aaa() {
      this.isnav = !this.isnav;
    },
  },
  components: {},
};
</script>

<style scoped lang="less">
#Home {
  width: 100%;
  height: 100%;
  display: flex;
  nav {
    height: 100%;
    background-color: #33945e;
    position: absolute;
    z-index: 90000000;
    position: absolute;
    a {
      display: block;
      width: 18rem;
      padding: 2rem 0.5rem;
      font-size: 1.8rem;
      color: white;
      display: flex;
      align-items: center;

      span {
        margin-left: 1rem;
      }
      i {
        font-size: 2.4rem;
      }
    }
    .router-link-active {
      background-color: #076533;
    }
    img {
      width: 5rem;
      height: 15rem;
      position: absolute;
      top: 50%;
      right: -2.5rem;
      margin-top: -50%;
    }
  }
  .active {
    left: -18rem;
    animation: Left 1s;
  }
  .active1 {
    left: 0;
    animation: Right 1s;
  }
  main {
    width: 100%;
    height: 100%;
  }
}

@keyframes Right {
  0% {
    left: -18rem;
  }
  100% {
    left: 0;
  }
}
@keyframes Left {
  0% {
    left: 0;
  }
  100% {
    left: -18rem;
  }
}
</style>
