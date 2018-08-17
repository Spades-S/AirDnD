// Created by Spades<spadesge@gmail.com> on 18/08/16

import Axios from './http'

function fetch() {
    return Axios.get('/guide')
}

export default {
    fetch
}

