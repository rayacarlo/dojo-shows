import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from '../router'
import VueFirestore from 'vue-firestore'

Vue.use(Vuex)
Vue.use(VueFirestore, {key: 'id'});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')



