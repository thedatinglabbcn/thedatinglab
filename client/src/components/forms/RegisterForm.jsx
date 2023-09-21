import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Forms.css';
import { AuthService } from '../../service/AuthService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



const RegistrationForm = () => {
  const { setUser } = AuthService();
  const [nameError, setNameError] = React.useState('');
  const [lastnameError, setLastnameError] = React.useState('');
  const [birthdayError, setBirthdayError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [imageError, setImageError] = React.useState('');
  const [wantsChildrenError, setWantsChildrenError] = React.useState('');
  //const navigate = useNavigate();
  
  const [formDataState, setFormDataState] = useState({
      name: '',
      lastname: '',
      birthday: '',
      email: '',
      password: '',
      image: '',
      wantsChildren: '',
      smokes: '',
      acceptsTerms: '',
      wantsInfo: '',
    });
    
      const handleSubmit = async (e) => {
      e.preventDefault();

      const { name, lastname, birthday, email, password, image, wantsChildren, smokes, acceptsTerms, wantsInfo } = formDataState;

      const formData = new FormData();
        formData.append('name', name);
        formData.append('lastname', lastname);
        formData.append('birthday', birthday);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', image);
        formData.append('wantsChildren', wantsChildren);
        formData.append('smokes', smokes);
        formData.append('acceptsTerms', acceptsTerms);
        formData.append('wantsInfo', wantsInfo);
      
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/register', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          
          if (response.status === 201) {
            Swal.fire({
                  title: '¡Registro exitoso!',
                  text: 'Tu cuenta ha sido creada correctamente.',
                  icon: 'success',
                });
          //navigate('/login');
              }
        } catch (error) {
          if (error.response.data.errors.name) {
            setNameError(error.response.data.errors.name[0]);
          } else {
            setNameError('');
          }
          if (error.response.data.errors.lastname) {
            setLastnameError(error.response.data.errors.lastname[0]);
          } else {
            setLastnameError('');
          }
          if (error.response.data.errors.birthday) {
            setBirthdayError(error.response.data.errors.birthday[0]);
          } else {
            setBirthdayError('');
          }
          if (error.response.data.errors.email) {
            setEmailError(error.response.data.errors.email[0]);
          } else {
            setEmailError('');
          }
          if (error.response.data.errors.password) {
            setPasswordError(error.response.data.errors.password[0]);
          } else {
            setPasswordError('');
          }
          if (error.response.data.errors.image) {
            setImageError(error.response.data.errors.image[0]);
          } else {
            setImageError('');
          }
    };
  };

    const handleOnChange = (e) => {
      e.persist();
      const { name, value, type, checked } = e.target;
      let newValue;
    
      if (type === 'checkbox') {
        newValue = checked; // Asigna el valor booleano directamente
      } else {
        newValue = value;
      }
      setFormDataState({
      ...formDataState,
      [name]: newValue,
      });
    };

    
    const handleImageChange = (e) => {
      setFormDataState({
        ...formDataState,
        image: e.target.files[0],
      });
    };

    return (
        <div className="container">
          <h1 className='form-title'>¿Quieres conocer a tu pareja ideal?</h1>
          <form
            onSubmit={handleSubmit}
            className="create-dest"
            encType="multipart/form-data"
            required>
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
               {nameError && <p className="error-message">{nameError}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="lastname" className="form-label">
                Apellidos 
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                placeholder="Ingresa tu apellido"
                onChange={handleOnChange}
                required
              />
              {lastnameError && <p>{lastnameError}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="birthday" className="form-label">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                className="form-control"
                id="birthday"
                name="birthday"
                placeholder="Ingresa tu fecha de nacimiento"
                onChange={handleOnChange}
                // required
              />
              {birthdayError && <p>{birthdayError}</p>}
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
              {emailError && <p>{emailError}</p>}
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
              {passwordError && <p>{passwordError}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="form-label">
                Subir imagen
              </label>
              
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                accept="image/*"
                required
                onChange={handleImageChange}
              />
              {imageError && <p>{imageError}</p>} 
            </div>
            <div className="mb-4">
              <label className="form-label">¿Quieres tener hijos?</label>
              <div>
                <input
                  type="radio"
                  className='form-radio'
                  id="siHijos"
                  name="wantsChildren"
                  value="Sí"
                  onChange={handleOnChange}
                  // checked={formDataState.wantsChildren === 'Sí'}
                />
                <label className="form-label" htmlFor="siHijos">Sí</label>
              </div>
              <div>
                <input
                  type="radio"
                  className='form-radio'
                  id="noHijos"
                  name="wantsChildren"
                  value="No"
                  onChange={handleOnChange}
                  // checked={formDataState.wantsChildren === 'No'}
                />
                <label className="form-label" htmlFor="noHijos">No</label>
              </div>
              <div>
                <input
                  type="radio"
                  className='form-radio'
                  id="algundiaHijos"
                  name="wantsChildren"
                  value="Algún día"
                  onChange={handleOnChange}
                  // checked={formDataState.wantsChildren === 'Algún día'}
                />
                <label className="form-label" htmlFor="algundiaHijos">Algún día</label>
              </div>
            </div>
            <div className="mb-3">
              <label>¿Fumas?</label>
              <div>
                <input
                  type="radio"
                  className='form-radio'
                  id="siFumas"
                  name="smokes"
                  value="Sí"
                  onChange={handleOnChange}
                  // checked={formDataState.smokes === 'Si'}
                />
                <label className="form-label" htmlFor="siFumas">Sí</label>
              </div>
              <div>
                <input
                  type="radio"
                  className='form-radio'
                  id="noFumas"
                  name="smokes"
                  value="No"
                  onChange={handleOnChange}
                  // checked={formDataState.smokes === 'No'}
                />
                <label className="form-label" htmlFor="noFumas">No</label>
              </div>
              <div>
                <input
                  type="radio"
                  className='form-radio'
                  id="socialmenteFumas"
                  name="smokes"
                  value="Socialmente"
                  onChange={handleOnChange}
                  // checked={formDataState.smokes === 'Socialmente'}
                />
                <label className="form-label" htmlFor="socialmenteFumas">Socialmente</label>
              </div>
            </div>
            <p className='form-text'>
              Al completar el formulario, aseguramos la compatibilidad con otros usuarios y su compromiso con nuestra
              comunidad. Te invitamos a abonar 50 euros para acceder a tres eventos de tu elección. Tu contribución nos
              ayuda a mantener la calidad de nuestros eventos y nuestra comunidad activa. ¡Únete a nosotros!
            </p>
            <div className="mb-3">
              <input
                type="checkbox"
                className='form-checkbox'
                id="aceptoTerminos"
                name="acceptsTerms"
                checked={formDataState.acceptsTerms}
                onChange={handleOnChange}
                //required
              />
              <label className="form-label" htmlFor="aceptoTerminos">He leído y acepto los términos y condiciones de uso</label>
            </div>
            <div className="mb-3">
              <input
                type="checkbox"
                className='form-checkbox'
                id="recibirInformacion"
                name="wantsInfo"
                checked={formDataState.wantsInfo}
                onChange={handleOnChange}
              />
              <label htmlFor="recibirInformacion">Quiero recibir información sobre noticias y eventos</label>
            </div>
            <button type="submit" className="button-send">
              Enviar
            </button>
            <button type="button" className="button-cancel">
              Cancelar
            </button>
            <a href="/login" className="link-login">¿Ya tienes una cuenta? Inicia sesión</a>
          </form>
        </div>
      );
    };
    
    export default RegistrationForm;