<template>
  <div id="WorkWarn">
    <nav>
      <div class="nav">
        <router-link to="/Home/workwarn/ControlHome">管控首页</router-link>
        <router-link to="/Home/workwarn/ShipWork">船舶作业</router-link>
        <router-link to="/Home/workwarn/DataInfo">信息查询</router-link>
        <router-link to="/Home/workwarn/Shipxy">船讯网 </router-link>
        <router-link to="/Home/workwarn/ShipPositionMap">船位图 </router-link>
      </div>
      <div class="title">
        <span>明东公司“移动TOPS”现场作业实时智慧管控平台</span>
      </div>
      <div class="right">
        <div>
          <router-link to="/Home/workwarn/EarlyWarning"
            ><i class="icon iconfont icon-yujing" style="color: red"></i
            >预警</router-link
          >
        </div>
        <div>
          <router-link to="/Home/workwarn/EarlyWarning"
            ><i class="icon iconfont icon-shangchuan" style="color: #234c6a"></i
            >资料库</router-link
          >
        </div>
        <div>
          <i class="icon iconfont icon-yonghuming" style="color: #234c6a;margin-top:1rem;"></i>
          <select>
            <option value="">用户名1</option>
            <option value="">用户名2</option>
            <option value="">用户名3</option>
          </select>
        </div>
      </div>
    </nav>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  methods: {},
  components: {},
};
</script>

<style scoped lang="less">
#WorkWarn {
  width: 100%;
  height: 100%;
  background-color: #071225;
  nav {
    width: 100%;
    height: 7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0rem 1rem;
    border: 0.2rem solid #234c6a;

    .nav {
      width: 26%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        display: flex;
        align-content: center;
        padding: 0.5rem;
        background-color: #234c6a;
        font-size: 1.4rem;
        color: rgb(20, 20, 20);
      }
      .router-link-exact-active {
        color: #ffc600;
        border: 0.2rem solid #ffc600;
      }
    }
    .title {
      width: 50%;
      color: white;
      font-size: 2.8rem;
      text-align: center;
    }
    .right {
      width: 20%;
      color: white;
      font-size: 1.8rem;
      display: flex;
      justify-content: space-between;
      align-content: center;
      div {
        display: flex;
        justify-content: center;
        align-content: center;
        i {
          font-size: 2.5rem;
          height: 2.5rem;
        }
        a {
          padding: 1rem 0rem;
          display: flex;
          align-content: center;
          font-size: 1.8rem;
          color: white;
          i {
            font-size: 2.5rem;
          }
        }
        select {
          height: 5rem;
          background-color: #071225;
          border: none;
          color: white;
          font-size: 1.8rem;
        }
      }
    }
  }
  main {
    width: 100%;
    height: 100%;
  }
}
</style>
