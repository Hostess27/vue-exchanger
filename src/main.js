import "@/styles/main.scss"

import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import { initApi } from '@/js/api'

Vue.config.productionTip = false;

initApi()

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
