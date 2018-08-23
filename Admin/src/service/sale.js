// Created by Spades<spadesge@gmail.com> on 18/08/18

import Axios from './http'

function add(formdata, progressHandler) {
    return Axios.post('/sales', formdata, {
        headers: {
            'Content-Type': 'multipart/formdata'
        },
        onUploadProgress: progressHandler || null
    })
}

function del(id) {
    return Axios.delete(`/sales/${id}`)
}

function fetch(id) {
    return Axios.get(`/sales/${id}`)
}

function update(id, formdata, progressHandler) {
    return Axios.put(`/sales/${id}`, formdata, {
        headers: {
            'Content-Type': 'multipart/formdata'
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

