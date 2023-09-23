import axios from 'axios';
import './axiosConfig';

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
