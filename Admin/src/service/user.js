// Created by Spades<spadesge@gmail.com> on 18/08/18


import Axios from './http'

function fetchMB() {
    return Axios.get('/user/mailbox')
}

function forgetPSW() {
    return Axios.post('/user/forget')
}

function login(data) {
    return Axios.post('/user', data)
}

function updateMB(data) {
    return Axios.put('/user/mailbox', data)
}

function updatePSW(data) {
    return Axios.put('/user', data)
}


export default {
    fetchMB,
    forgetPSW,
    login,
    updateMB,
    updatePSW
}

