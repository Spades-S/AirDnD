// Created by Spades<spadesge@gmail.com> on 18/08/16

import about from './about'
import guide from './guide'
import list from './list'
import rent from './rent'
import sale from './sale'
import service from './service'

export default {
    install(Vue) {
        Object.defineProperty(Vue.prototype, '$api', {
            value: {
                about,
                guide,
                list,
                rent,
                sale,
                service
            }
        })
    }
}
