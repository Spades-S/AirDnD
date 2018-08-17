// Created by Spades<spadesge@gmail.com> on 18/05/24

import types from '../types'

const state = {
    lang: 'zh'
}

const mutations = {
    /* eslint-disable */
    [types.LANGUAGE_CHANGE](state, lang) {
        state.lang = lang
    }
}

const actions = {
    langChange({ commit }, lang) {
        commit(types.LANGUAGE_CHANGE, lang)
    }
}

export default {
    state,
    mutations,
    actions
}
