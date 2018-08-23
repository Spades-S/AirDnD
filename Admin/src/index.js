// Created by Spades<spadesge@gmail.com> on 18/05/23

import Vue from 'vue'

import 'element-ui/lib/theme-chalk/index.css'
import {
    Button,
    Carousel,
    CarouselItem,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Pagination,
    Menu,
    Submenu,
    MenuItem,
    MessageBox,
    Notification,
    Row,
    Upload,
    Progress,
    Tabs,
    TabPane
} from 'element-ui'

import api from './service'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

Vue.config.productionTip = false

Vue.use(api)

Vue.use(Button)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Pagination)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Row)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})

