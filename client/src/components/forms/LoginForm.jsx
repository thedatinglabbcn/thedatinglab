import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Forms.css';
import { AuthService } from '../../service/AuthService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    const [validationErrors, setValidationErrors] = useState({
    });

    const auth = AuthService();
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });

      setValidationErrors({
        ...validationErrors,
        [name]: '',
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      auth.login(formData).then(res => {
        const { token } = res.data;
        
        console.log(res.data);
        localStorage.setItem('auth_token', token);
        localStorage.getItem('profile_id', res.data.user.profile_id);
        
        

        Swal.fire({
          title: '¡Inicio de sesión exitoso!',
          text: '¡Bienvenido!',
          icon: 'success',
          confirmButtonColor: '#ED696B',
          customClass: {
            popup: 'custom-swal-background',
            confirmButton: 'custom-swal-button',
          }
        })  .then(() => {
          navigate('/event');
        });

      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.status === 422) {
          const errors = err.response.data.validation_errors;
          setValidationErrors(errors);
        } else {
          Swal.fire({
            title: '¡Error!',
            text: '¡Los datos no son correctos!',
            icon: 'error',
            confirmButtonColor: '#ED696B',
            customClass: {
            popup: 'custom-swal-background',
            confirmButton: 'custom-swal-button',
          }
          });
        }
      });
    };
 
    return (
      <div className='body-login'>
      <div className="container">
        <h1 className='form-title'>Inicia sesión</h1>
        <form onSubmit={handleSubmit} noValidate>
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
            {validationErrors.email && (
              <div className="text-danger">{validationErrors.email.join(', ')}</div>
            )}
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
            {validationErrors.password && (
              <div className="text-danger">{validationErrors.password.join(', ')}</div>
            )}
          </div>
          <div className='form-buttons'> 
          <button type="submit" className="button-send">
            Ingresar
          </button>
          <button type="button" className="button-cancel"  onClick={() => navigate('/')}>Cancelar</button>
          </div>
        </form>
        
        <p className='form-help'>
          ¿Has olvidado la contraseña? <a  className="link-help" href="#">Toca aquí</a>
        </p>
        <p className='form-help'>
          ¿No tienes una cuenta? <a onClick={() => navigate('/register')} className="link-help" href="#">Regístrate</a>
        </p>
      </div>
      </div>
    );
  };
  
  export default LoginForm;