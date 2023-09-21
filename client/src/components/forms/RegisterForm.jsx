import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Forms.css';
import { AuthService } from '../../service/AuthService';
import Swal from 'sweetalert2';
import { useMatchingUsers } from '../../contexts/MatchingUsersContext';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {

  const [errors, setErrors] = useState({});
  const [formDataState, setFormDataState] = useState({
      name: '',
      lastname: '',
      birthday: '',
      email: '',
      password: '',
      image: '',
      wantsChildren: '',
      smokes: '',
      // acceptsTerms: false,
      // wantsInfo: false,
    });
    const { setMatchingUsers } = useMatchingUsers();
    const navigate = useNavigate();

      const handleSubmit = async (e) => {
      e.preventDefault();

      const { name, lastname, birthday, email, password, image, wantsChildren, smokes } = formDataState;

      const formData = new FormData();
        formData.append('name', name);
        formData.append('lastname', lastname);
        formData.append('birthday', birthday);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', image);
        formData.append('wantsChildren', wantsChildren);
        formData.append('smokes', smokes);
        // formData.append('acceptsTerms', acceptsTerms);
        // formData.append('wantsInfo', wantsInfo);
      
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/register', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          
          const { matchingUsers } = response.data;
          setMatchingUsers(matchingUsers);

          if (response.status === 201) {
            Swal.fire({
                  title: '¡Registro exitoso!',
                  text: 'Tu cuenta ha sido creada correctamente.',
                  icon: 'success',
                }).then(() => {
                  // Redirige a la página deseada
                  navigate('/matches');
                });
          }

        } catch (error) {
          console.error('Error al enviar el formulario:', error.response);
        }
    };

    const handleOnChange = (e) => {
      e.persist();
      const { name, value, type, checked } = e.target;
      const newValue = type === 'checkbox' ? checked : value;

      if (name === 'name' && newValue.trim() === '') {
        setErrors({ ...errors, [name]: 'Este campo es obligatorio' });
      } else if (name === 'lastname' && newValue.trim() === '') {
        setErrors({ ...errors, [name]: 'Este campo es obligatorio' });
      } else if (name === 'email' && !isValidEmail(newValue)) {
        setErrors({ ...errors, [name]: 'El correo electrónico no es válido' });
      } else if (name === 'password' && newValue.length < 8) {
        setErrors({ ...errors, [name]: 'La contraseña debe tener al menos 8 caracteres' });
      } else if (name === 'birthday' && newValue.length === '') {
        setErrors({ ...errors, [name]: 'Este campo es obligatorio' });
      }
      else {
        setErrors({ ...errors, [name]: '' }); // Limpia el error si el campo es válido
      }

      setFormDataState({
      ...formDataState,
      [name]: newValue,
      });
    };

    const isValidEmail = (email) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }

    const handleImageChange = (e) => {
      setFormDataState({
        ...formDataState,
        image: e.target.files[0],
      });
    };

    return (
      <div className='body-registration'>
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
              {errors.name && <p className="error-message">{errors.name}</p>}
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
              {errors.lastname && <p className="error-message">{errors.lastname}</p>}
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
              {errors.birthday && <p className="error-message">{errors.birthday}</p>}
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
              {errors.email && <p className="error-message">{errors.email}</p>}
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
            {/* <div className="mb-3">
              <input
                type="checkbox"
                className='form-checkbox'
                id="aceptoTerminos"
                name="acceptsTerms"
                // checked={formDataState.acceptsTerms}
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
                // checked={formDataState.wantsInfo}
                onChange={handleOnChange}
              />
              <label htmlFor="recibirInformacion">Quiero recibir información sobre noticias y eventos</label>
            </div> */}
            <button type="submit" className="button-send" >
              Enviar
            </button>
            <button type="button" className="button-cancel"  onClick={() => window.location.href = '/'}>Cancelar</button>
          </form>
          <div>
          {/* {matchingUsers.length > 0 && (
        <div>
          <h2>Usuarios coincidentes:</h2>
          <ul>
            {matchingUsers.map((matchingUser) => (
              <li key={matchingUser.id}>
                Nombre: {matchingUser.name}, Apellido: {matchingUser.lastname}, Edad: {matchingUser.birthday}
              </li>
            ))}
          </ul>
        </div>
      )} */}
          </div>
        </div>
        </div>
      );
    };
    
    export default RegistrationForm;