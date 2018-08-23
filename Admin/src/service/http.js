// Created by Spades<spades@gmail.com> on 18/08/18

import axios from 'axios'

import router from '../router'

const { axios: axiosConfig } = require('../../config')

const Axios = axios.create(axiosConfig)

Axios.interceptors.response.use(res => res, (err) => {
    if (err.response.status === 401) {
        router.push('/login')
    }
    return Promise.reject(err)
})

export default Axios
