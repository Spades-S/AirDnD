// Created by Spades<spadesge@gmail.com> on 18/05/24

import Vue from 'vue'
import Vuex from 'vuex'
import 'babel-polyfill'

import Lang from './modules/lang'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        struct: {
            zh: {
                name: 'AirDnd',
                rent: '民宿短租',
                sale: '民宿出售',
                guide: '地接服务',
                about: '关于我们',
                phone: '客服热线',
                slogan: 'This is slogon'
            },
            en: {
                name: 'AirDnd',
                rent: 'short term rental',
                sale: 'homes for sale',
                guide: 'grounding service',
                about: 'about us',
                phone: 'hotline',
                slogan: 'This is the slogan'
            },
            jp: {
                name: 'AirDnd',
                rent: '短期レンタル',
                sale: '販売のための家',
                guide: '接地サービス',
                about: '私たちについて',
                phone: 'hotline',
                slogan: 'This is the slogan'
            }
        }
    },
    modules: {
        Lang
    }
})

