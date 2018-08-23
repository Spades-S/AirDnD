// Created by Spades<spadesge@gmail.com> on 18/08/18

import Axios from './http'

function getPageContent(type, page) {
    return Axios.get(`/list/${type}/${page}`)
}

function countTotalNum(type) {
    return Axios.get(`/list/total/${type}`)
}

export default {
    getPageContent,
    countTotalNum
}

