// Created by Spades<spadesge@gmail.com> on 18/08/18

import Axios from './http'

function fetch() {
    return Axios.get('/verifycode')
}

export default {
    fetch
}
