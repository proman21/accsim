import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import App from './App.vue'
import Simulator from './Simulator.vue'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(VueRouter)

const store = new Vuex.Store({
  state: {
    simulator: {
      round: 0,
      step: "decisions"
    },
    business: {
      name: "Accountable Business",
      start_year: 2018,
      products: {
        'lprod': {
          title: "Luxury Product", price: 300.00, img: "assets/Jacket.jpg",
          inventory: { lastPeriod: 20, thisPeriod: 0 }
        },
        'sprod': {
          title: "Standard Product", price: 75.52, img: "assets/Jacket.jpg",
          inventory: { lastPeriod: 100, thisPeriod: 0 }
        },
        'bprod': {
          title: "Budget Product", price: 29.95, img: "assets/Jacket.jpg",
          inventory: { lastPeriod: 100, thisPeriod: 0 }
        }
      }
    }
  },
  mutations: {
    changeProductPrice(state, payload) {
      Object.assign(state.business.products[payload.id], {price: payload.price})
    },
    changeInventorySupply(state, payload) {
      Object.assign(state.business.products[payload.id].inventory, {thisPeriod: payload.order})
    },
    simulateTrading(state, payload) {
      Object.assign(state.simulator, { step: 'results' })
    },
    startNewRound(state, payload) {
      Object.assign(state.simulator, { step: 'decisions', round: state.simulator.round + 1})
    }
  },
  getters: {
    roundName: (state) => {
      let round = state.simulator.round
      let year = state.business.start_year + (round / 2)
      let period = (round % 2) + 1;
      return `${year} Q${period}`
    }
  }
})

const router = new VueRouter({
  routes: [
    {
      name: "home",
      path: "/",
      component: App
    },
    {
      name: "simulator",
      path: "/:type(trial|real)",
      component: Simulator
    }
  ]
})

new Vue({
  router,
  store
}).$mount('#app')
