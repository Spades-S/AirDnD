// Created by Spades<spadesge@gmail.com> on 18/08/16

import Axios from './http'

/* eslint-disable consistent-return */
function fetch(part) {
    if (part === 'about' || part === 'guide') {
        return Axios.get(`/services/${part}`)
    }
}

export default {
    fetch
}

