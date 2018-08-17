// Created by Spades<spadesge@gmail.com> on 18/05/23

import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index.vue'
import RentDetail from '../components/RentDetail.vue'
import SaleDetail from '../components/SaleDetail.vue'
import List from '../components/List.vue'
import Guide from '../components/Guide.vue'
import About from '../components/About.vue'

Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        component: Index
    }, {
        path: '/rent/:id',
        component: RentDetail

    }, {
        path: '/sale/:id',
        component: SaleDetail
    }, {
        path: '/list/:type',
        component: List
    }, {
        path: '/guide',
        component: Guide
    }, {
        path: '/about',
        component: About
    }],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
            /* eslint-disable no-else-return */
        } else {
            return { x: 0, y: 0 }
        }
    }
})


export default router
