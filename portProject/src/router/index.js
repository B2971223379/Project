import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Home',
  },
  {
    path: '/Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/Home',
        redirect: '/Home/information'
      },
      {
        path: 'information',
        component: () => import('../components/HomeNav/Information.vue'),
      },
      {
        path: 'workwarn',
        component: () => import('../components/HomeNav/WorkWarn.vue'),
        children: [
          {
            path: '/Home/workwarn',
            redirect: '/Home/workwarn/ControlHome',
          },
          {
            path: 'ControlHome',
            component: () => import('../components/WorkWarnNav/ControlHome.vue'),
          },
          {
            path: 'ShipWork',
            component: () => import('../components/WorkWarnNav/ShipWork.vue'),
          },
          {
            path: 'DataInfo',
            component: () => import('../components/WorkWarnNav/DataInfo.vue'),
          },
          {
            path: 'Shipxy',
            component: () => import('../components/WorkWarnNav/Shipxy.vue'),
          },
          {
            path: 'ShipPositionMap',
            component: () => import('../components/WorkWarnNav/ShipPositionMap.vue'),
          },
          {
            path: 'EarlyWarning',
            component: () => import('../components/WorkWarnNav/EarlyWarning.vue'),
          },
        ]
      },
      {
        path: 'ShipWorkMonitoring',
        component: () => import('../components/HomeNav/ShipWorkMonitoring.vue'),
      },
      {
        path: 'shipxy',
        component: () => import('../components/HomeNav/shipxy.vue'),
      },
      {
        path: 'standby',
        component: () => import('../components/HomeNav/standby.vue'),
      },
      {
        path: 'EmergencyManual',
        component: () => import('../components/HomeNav/EmergencyManual.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
