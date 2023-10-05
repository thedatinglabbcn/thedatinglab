import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../forms/Forms.css';
import { AuthService } from '../../service/AuthService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
    const auth = AuthService();
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const { login } = useAuth();

    const handleSubmit = (e) => {
      e.preventDefault();
      auth.login(formData).then((res) => {
        const { token, user } = res.data;
    
        localStorage.setItem('auth_token', token);
    
        const isAdmin = user.isAdmin;
    
        login(user.email);
    
        if (isAdmin) {
          Swal.fire({
            title: '¡Inicio de sesión exitoso!',
            text: '¡Bienvenido!',
            icon: 'success',
          }).then(() => {
            navigate('/dashboard');
          });
        } else {
          Swal.fire({
            title: '¡Error!',
            text: 'No tienes permisos de administrador',
            icon: 'error',
          });
        }
      }).catch((err) => {
        Swal.fire({
          title: '¡Error!',
          text: '¡Usuario o contraseña incorrectos!',
          icon: 'error',
        });
      });
    };
    
 
    return (
      <div className='body-login'>
      <div className="container">
        <h1 className='form-title'>¡Hola Admin!</h1>
        <h2  className='form-title'>Inicia Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Ingresa tu email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className='login-buttons'>
          <button type="submit" className="button-send">
            Ingresar
          </button>
          </div>
        </form>
      </div>
      </div>
    );
  };
  
  export default LoginForm;