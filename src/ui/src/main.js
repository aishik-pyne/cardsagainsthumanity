import Vue from 'vue'
import App from './App.vue'
import router from './routes.js'
import VueRouter from 'vue-router'
import VueSocketIOExt from 'vue-socket.io-extended';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
Vue.config.productionTip = false

import { io } from 'socket.io-client';

// Socket
const socket = io('http://localhost:3000', {
  query: {
    "name": localStorage.getItem("name")
  }
});
Vue.use(VueSocketIOExt, socket);

// Routing
Vue.use(VueRouter);
new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
 