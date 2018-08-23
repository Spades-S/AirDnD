// Created by Spades<spadesge@gmail.com> on 18/08/18

import Axios from './http'

function fetch() {
    return Axios.get('/about')
}

function update(formdata) {
    return Axios.put('/about', formdata)
}

export default {
    fetch,
    update
}
