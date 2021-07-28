<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import './assets/css/common.css'
export default {
  props: {},
  data() {
    return {};
  },
  mounted() {
  },
  methods: {},
  components: {},
};
</script>

<style scoped lang="less">
#app{
  width: 100%;
  height: 100%;
}
//强制横屏显示
@media screen and(orientation:portrait) {
  //竖屏状态下 旋转90度
  #app {
    position: absolute;
    width: 100vh;
    height: 100vw;
    top: 0;
    left: 100vw;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    transform-origin: 0% 0%;
  }
}

@media screen and (orientation: landscape) {
  //横屏状态下
  #main {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
}
</style>
