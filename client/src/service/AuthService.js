import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
//axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export const AuthService = () => {
    const urnSignin = 'api/register';
    const urnLogin = 'api/login';
    const urnLogout = 'api/logout';

    const register = ($data) => {
       const res = axios.post(urnSignin, $data);
         return res;
    }

    const login = ($data) => {
        const res = axios.post(urnLogin, $data);
        return res;
    }

    const logout = () => {
        const res = axios.post(urnLogout);
        return res;
    }
    
    return {
        register, login, logout
    }
}
