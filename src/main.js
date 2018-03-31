import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Simulator from './Simulator.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: "/", component: App },
    { path: "/simulator", component: Simulator}
  ]
})

new Vue({
  router
}).$mount('#app')
