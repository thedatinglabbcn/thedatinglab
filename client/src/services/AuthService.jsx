import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const AuthService = () => {
    const urnSignin = 'api/register';

    const register = ($data) => {
       const res = axios.post(urnSignin, $data);
         return res;
    }
    return {
        register
    }
}
