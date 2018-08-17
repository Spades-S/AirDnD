// Created by Spades<spadesge@gmail.com> on 18/08/16

import Axios from './http'

function fetchItem(id) {
    return Axios.get(`/rents/${id}`)
}

export default {
    fetchItem
}

