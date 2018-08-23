// Created by Spades<spadesge@gmail.com> on 18/08/18

import Axios from './http'

function add(formdata) {
    return Axios.post('/services', formdata, {
        headers: {
            'Content-Type': 'multipart/formdata'
        }
    })
}

function del(id) {
    return Axios.delete(`/services/${id}`)
}

/* eslint-disable consistent-return */
function fetch(part) {
    if (part === 'about' || part === 'guide') {
        return Axios.get(`/services/${part}`)
    }
}

function update(id, formdata) {
    return Axios.put(`/services/${id}`, formdata, {
        headers: {
            'Content-Type': 'multipart/formdata'
        }
    })
}

export default {
    add,
    del,
    fetch,
    update
}

