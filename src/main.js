import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

// Use AXIOS for posting credentials
Vue.use(VueAxios, axios)
// Create default instance with required headers and baseUrl
window.$dump = axios.create({
  baseURL: `//dump.storemydata.biz/`,
  headers: {
  	'Content-Type': 'application/json; charset=UTF-8',
    'X-API-Key': 'store_your_api_key_here'
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
