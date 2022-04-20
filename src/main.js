import Vue from 'vue'
import App from './App.vue'
import VueApexCharts from "vue-apexcharts";

import store from './store'
import router from './router'
import modal from './plugins/ModalWindow'
import menu from './plugins/ContextMenu'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(modal)
Vue.use(menu)

Vue.use(VueApexCharts);
Vue.component("apexChart", VueApexCharts);

new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
