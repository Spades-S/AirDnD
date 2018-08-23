// Created by Spades<spadesge@gmail.com> on 18/08/18

import about from './about'
import guide from './guide'
import list from './list'
import rent from './rent'
import sale from './sale'
import service from './service'
import user from './user'
import verifycode from './verifycode'


export default {
    install(Vue) {
        Vue.prototype.$api = {
            about,
            guide,
            list,
            rent,
            sale,
            service,
            user,
            verifycode
        }
    }
}

