import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BACKEND_PROD_SERVER : process.env.VUE_APP_BACKEND_LOCAL_SERVER,
});

export default instance;
