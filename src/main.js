import Vue from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store'
import router from './router'
import modal from './pugins/ModalWindow'
import menu from './pugins/ContextMenu'

library.add(faAngleLeft, faAngleRight)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(modal)
Vue.use(menu)

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')


