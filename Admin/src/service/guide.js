// Created by Spades<spadesge@gmail.com> on 18/08/18

import Axios from './http'

function fetch() {
    return Axios.get('/guide')
}

function update(formdata) {
    return Axios.put('/guide', formdata)
}

export default {
    fetch,
    update
}
