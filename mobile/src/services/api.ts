import axios from 'axios';

const api = axios.create({
    baseURL: 'http://26.129.72.234:3333'
})

export default api;