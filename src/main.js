import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import 'bulma/css/bulma.min.css'
import 'fontawesome-free/css/all.min.css'
import 'fontawesome-free/js/all.min.js'
import 'animate.css/animate.min.css'
import '@/style.sass'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
