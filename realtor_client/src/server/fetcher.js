import axios from 'axios';

const fetcher = axios.create({
    baseURL: 'http://localhost:9000',
    withCredentials: true
});

export default fetcher;
