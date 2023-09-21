import React, { useState } from 'react';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Forms.css';
import { AuthService } from '../../service/AuthService';
import Swal from 'sweetalert2';


const LoginForm = () => {
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
  
    const handleSubmit = (e) => {
      e.preventDefault();
      auth.login(formData).then(res => {
        const { token } = res.data;

        localStorage.setItem('auth_token', token);
        

        Swal.fire({
          title: '¡Inicio de sesión exitoso!',
          text: '¡Bienvenido!',
          icon: 'success',
        });
        console.log(res);
      }).catch(err => {
        Swal.fire({
          title: '¡Error!',
          text: '¡Usuario o contraseña incorrectos!',
          icon: 'error',
        });
        console.log(err);
      });



      // Aquí puedes realizar acciones con los datos del formulario, como enviarlos a un servidor para la autenticación.
      console.log(formData);
    };
  
  const handleLogout = (e) => {
      e.preventDefault();
      const auth = AuthService();
      auth.logout().then(res => {
        localStorage.removeItem('auth_token');
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
  };

    return (
      <div className="container">
        <h1 className='form-title'>Iniciar Sesión</h1>
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
          <button type="submit" className="button-send">
            Ingresar
          </button>
        </form>
        <button onClick={handleLogout} className="button-send">
            logout
          </button>
        <p className='form-help'>
          ¿Has olvidado la contraseña? <a href="#">Toca aquí</a>
        </p>
        <p className='form-help'>
          ¿No tienes una cuenta? <a href="#">Regístrate</a>
        </p>
      </div>
    );
  };
  
  export default LoginForm;