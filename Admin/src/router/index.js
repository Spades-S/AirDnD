// Created by Spades<spadesge@gmail.com> on 18/05/23
import Vue from 'vue'
import Router from 'vue-router'
import RentDetail from '../components/RentDetail.vue'
import SaleDetail from '../components/SaleDetail.vue'
import List from '../components/List.vue'
import Guide from '../components/Guide.vue'
import About from '../components/About.vue'
import NewSale from '../components/NewSale.vue'
import NewRent from '../components/NewRent.vue'
import Login from '../components/Login.vue'

import Axios from '../service/http'

import Store from '../store'

Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        redirect: '/list/0'
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
        path: '/about',
        component: About
    }, {
        path: '/guide',
        component: Guide
    }, {
        path: '/new/sale',
        component: NewSale
    }, {
        path: '/new/rent',
        component: NewRent
    }, {
        path: '/login',
        component: Login,
        props: {
            isLogin: true
        }
    }, {
        path: '/changepsw',
        component: Login,
        props: {
            isLogin: false
        }
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


router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next()
    } else {
        Axios.get('authorize')
            .then(() => {
                let activeIndex = '1'
                switch (to.path) {
                    case '/list/0':
                        activeIndex = '1'
                        break
                    case '/list/1':
                    case '/new/sale':
                        activeIndex = '2'
                        break
                    case '/guide':
                        activeIndex = '3'
                        break
                    case '/about':
                        activeIndex = '4'
                        break
                    default:
                        if (to.matched[0].path === '/rent/:id') {
                            activeIndex = '1'
                        }
                        if (to.matched[0].path === '/sale/:id') {
                            activeIndex = '2'
                        }
                        break
                }

                Store.dispatch('menuChange', activeIndex)
                next()
            })
    }
})


export default router
