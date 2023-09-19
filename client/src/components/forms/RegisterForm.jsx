import React, { useState } from 'react';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Forms.css';
import { AuthService } from '../../service/AuthService';
import Swal from 'sweetalert2';


const RegistrationForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      lastname: '',
      birthday: '',
      email: '',
      password: '',
      image: '',
      wantsChildren: '',
      smokes: '',
      acceptsTerms: false,
      wantsInfo: false,
    });
    
    const auth = AuthService();
    const handleOnChange = (e) => {
      e.persist();
      const { name, value, type, checked, files } = e.target;
      const newValue = type === 'checkbox' ? checked : files ? files[0] : value;
      setFormData({
      ...formData,
      [name]: newValue,
      });
    };
   //console.log('formData', formData);
    const handleSubmit = (e) => {
      e.preventDefault();
      const userData = {
        name: formData.name,
        lastname: formData.lastname,
        birthday: formData.birthday,
        email: formData.email,
        password: formData.password,
        image: formData.image,
        wantsChildren: formData.wantsChildren,
        smokes: formData.smokes,
        acceptsTerms: formData.acceptsTerms,
        wantsInfo: formData.wantsInfo,
      };
      auth.register(formData).then(res => {
        Swal.fire({
          title: '¡Registro exitoso!',
          text: 'Tu cuenta ha sido creada correctamente.',
          icon: 'success',
        });
        
        console.log(res);
      }).catch(err => console.log(err));
      // Aquí puedes realizar acciones con los datos del formulario, como enviarlos a un servidor.
      console.log(formData);
    };

    const handleImageChange = (event) => {
      setFormData({
        ...formData,
        image: event.target.files[0],
      });
    };

    return (
        <div className="container">
          <h1 className='form-title'>¿Quieres conocer a tu pareja ideal?</h1>
          <form onSubmit={handleSubmit}>
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
                value={formData.name}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastname" className="form-label">
                Nombre 
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                placeholder="Ingresa tu nombre"
                value={formData.lastname}
                onChange={handleOnChange}
                required
              />
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
                value={formData.birthday}
                onChange={handleOnChange}
                // required
              />
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
                value={formData.email}
                onChange={handleOnChange}
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
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="form-label">
                Subir imagen
              </label>
              <label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                accept="image/*"
                required
                onChange={handleImageChange}
              />
              </label>
                   
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
                  checked={formData.wantsChildren === 'Sí'}
                />
                <label className="form-label" htmlFor="siHijos">Si</label>
              </div>
              <div>
                <input
                  type="radio"
                  className='form-radio'
                  id="noHijos"
                  name="wantsChildren"
                  value="No"
                  onChange={handleOnChange}
                  checked={formData.wantsChildren === 'No'}
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
                  checked={formData.wantsChildren === 'Algún día'}
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
                  value="Si"
                  onChange={handleOnChange}
                  checked={formData.smokes === 'Si'}
                />
                <label className="form-label" htmlFor="siFumas">Si</label>
              </div>
              <div>
                <input
                  type="radio"
                  className='form-radio'
                  id="noFumas"
                  name="smokes"
                  value="No"
                  onChange={handleOnChange}
                  checked={formData.smokes === 'No'}
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
                  checked={formData.smokes === 'Socialmente'}
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
                checked={formData.acceptsTerms}
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
                checked={formData.wantsInfo}
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
          </form>
        </div>
      );
    };
    
    export default RegistrationForm;