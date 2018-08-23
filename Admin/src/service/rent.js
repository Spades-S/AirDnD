// Created by Spades<spadesge@gmail.com> on 18/08/18

import Axios from './http'

function add(formdata, progressHandler) {
    return Axios.post('/rents', formdata, {
        headers: {
            'Content-Type': 'mutipart/formdata'
        },
        onUploadProgress: progressHandler || null
    })
}

function del(id) {
    return Axios.delete(`/rents/${id}`)
}

function fetch(id) {
    return Axios.get(`/rents/${id}`)
}

function update(id, formdata, progressHandler) {
    return Axios.put(`/rents/${id}`, formdata, {
        headers: {
            'Content-Type': 'mutipart/formdata'
        },
        onUploadProgress: progressHandler || null
    })
}

export default {
    add,
    del,
    fetch,
    update
}
