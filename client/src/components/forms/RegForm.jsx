import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Forms.css';
import { AuthService } from '../../service/AuthService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
    });

const [validationErrors, setValidationErrors] = useState({});

    const auth = AuthService();
    const handleOnChange = (e) => {
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
        auth.register(formData).then(res => {
          const { token } = res.data;
           
          localStorage.setItem('auth_token', token);
          
          Swal.fire({
            title: 'Tu cuenta ha sido creada correctamente.',
            text: '¡Bienvenid@!',
            icon: 'success',
          })  .then(() => {
            navigate('/preferences');
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
              text: '¡Usuario o contraseña incorrectos!',
              icon: 'error',
            });
          }
        });
    };

    return (
      <div className='body-registration'>
        <div className="container">
          <h1 className='form-title'>¿Quieres conocer a tu pareja ideal?</h1>
          <form
            onSubmit={handleSubmit}
            noValidate>
            <div className="mb-4">
              <label htmlFor="name" className="form-label">
                Nombre 
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Ingresa tu nombre"
                onChange={handleOnChange}
                required
              />
              {validationErrors.name && (
              <div className="text-danger">{validationErrors.name.join(', ')}</div>
            )}
            </div>
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
                onChange={handleOnChange}
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
                onChange={handleOnChange}
                required
              />
              {validationErrors.password && (
              <div className="text-danger">{validationErrors.password.join(', ')}</div>
            )}
            </div>
            <button type="submit" className="button-send" >
              Enviar
            </button>
            <button type="button" className="button-cancel"  onClick={() => navigate('/')}>Cancelar</button>
          </form>
        </div>
        </div>
      );
    };
    
    export default RegistrationForm;