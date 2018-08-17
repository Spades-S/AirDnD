// Created by Spades<spadesge@gmail.com> on 18/05/23

import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import {
    Carousel,
    CarouselItem,
    Pagination
} from 'element-ui'


import api from './service'

import App from './App.vue'
import router from './router/index'
import store from './store/index'

Vue.config.productionTip = false

Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
Vue.use(api)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
