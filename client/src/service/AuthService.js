import axios from 'axios';
import './axiosConfig';

export const AuthService = () => {
    const urnSignin = 'https://api.thedatinglab.es/api/register';
    const urnLogin = 'https://api.thedatinglab.es/api/login';
    const urnLogout = 'https://api.thedatinglab.es/api/logout';
    const urnUsers = 'https://api.thedatinglab.es/api/admin/users';
  

    // const urnSignin = '/api/register';
    // const urnLogin = '/api/login';
    // const urnLogout = '/api/logout';
    // const urnUsers = '/api/admin/users';
  

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

    const getAllUsers = ($data) => {
      const res = axios.get(urnUsers)
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error al obtener la lista de usuarios:', error);
        throw error;
      });
      return res;
  }

    return {
        register, 
        login, 
        logout, 
        getAllUsers,
    }
}
export default AuthService;