// Created by Spades<spadesge@gmail.com> on 18/08/15

import axios from 'axios'

const { axios: axiosConfig } = require('../../config')

const Axios = axios.create(axiosConfig)


Axios.interceptors.response.use(null, (err) => {
    console.log(err)
})

export default Axios

