// Created by Spades<spadesge@gmail.com> on 18/06/01

import types from '../types'

const state = {
    activeIndex: '1'
}

const mutations = {
    /* eslint-disable */
    [types.MENU_CHANGE](state, activeIndex) {
        state.activeIndex = activeIndex
    }
}

const actions = {
    menuChange({ commit }, activeIndex) {
        commit(types.MENU_CHANGE, activeIndex)
    }
}

export default{
    state,
    mutations,
    actions
}
