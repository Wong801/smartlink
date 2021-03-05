import Vue from 'vue'
import Vuex from 'vuex'
import inquirys from './modules/inquirys.js'
import bank from './modules/bank'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    inquirys,
    bank,
  }
})
