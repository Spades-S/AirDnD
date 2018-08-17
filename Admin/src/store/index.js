// Created by Spades<spadesge@gmail.com> on 18/05/24

import Vue from 'vue'
import Vuex from 'vuex'
import 'babel-polyfill'

import Lang from './modules/lang'
import Menu from './modules/menu'


Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        struct: {
            zh: {
                name: 'AirDnD',
                rent: '民宿短租',
                sale: '民宿出售',
                guide: '地接服务',
                about: '关于我们',
                phone: '客服热线',
                control: '控制台',
                logout: '注销',
                changepsw: '修改密码',
                bindmailbox: '绑定邮箱'
            },
            en: {
                name: 'AirDnD',
                rent: 'short term rental',
                sale: 'homes for sale',
                guide: 'grounding service',
                about: 'about us',
                phone: 'hotline',
                control: 'CONSOLE',
                logout: 'log out',
                changepsw: 'change password',
                bindmailbox: 'bind mailbox'
            },
            jp: {
                name: 'AirDnD',
                rent: '短期レンタル',
                sale: '販売のための家',
                guide: '接地サービス',
                about: '私たちについて',
                phone: 'hotline',
                control: 'コンソール',
                logout: 'ログアウトする',
                changepsw: 'パスワードを変更する',
                bindmailbox: 'メールボックスをバインドする'
            }
        }
    },
    modules: {
        Lang,
        Menu
    }
})
