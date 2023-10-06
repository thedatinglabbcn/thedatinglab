import axios from 'axios';
import './axiosConfig';

export const AuthService = () => {
    const urnSignin = '/api/register';
    const urnLogin = '/api/login';
    const urnLogout = '/api/logout';

    const register = ($data) => {
       const res = axios.post(urnSignin, $data);
         return res;
    }

    const login = ($data) => {
        const res = axios.post(urnLogin, $data);
        return res;
    }

    const logout = () => {
        return axios.post(urnLogout)
    .then((res) => {
      localStorage.removeItem('auth_token');
      return res;
    })
    .catch((error) => {
      console.error('Error al hacer logout:', error);
      throw error;
    });
    }

    return {
        register, login, logout
    }
}
