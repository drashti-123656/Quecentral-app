import axios from 'axios'
import { BASE_URL, API_URL } from './../utils/global'

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['token'] = '1RMmvsEVTfRgUb5';
axios.defaults.headers.post['Content-Type'] = 'application/json';

function setToken(token) {
  axios.defaults.headers.common.token = token;
  console.log('token : '+ token);
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
    setToken,
  };