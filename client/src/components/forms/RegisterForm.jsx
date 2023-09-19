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
    });
    
    const auth = AuthService();
    const handleOnChange = (e) => {
      e.persist();
      const { name, value } = e.target;
       setFormData({
        ...formData,
        [name]: value,
      });
    };
   //console.log('formData', formData);
    const handleSubmit = (e) => {
      e.preventDefault();
      const { name, image, lastname, birthday, email} = e.target;
      const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('lastname', lastname);
        formData.append('birthday', birthday);
        formData.append('email', email);
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
          <form onSubmit={handleSubmit} encType="multipart/form-data" >
            <div className="mb-4">
              <label htmlFor="nombreApellido" className="form-label">
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
              <label htmlFor="nombre" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                placeholder="Ingresa tu apellido"
                value={formData.lastname}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="edad" className="form-label">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                className="form-control"
                id="birthday"
                name="birthday"
                placeholder="Ingresa tu edad"
                value={formData.birthday}
                onChange={handleOnChange}
                required
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
              <label htmlFor="imagen" className="form-label">
                Subir imagen
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
            {/* }
            <div className="mb-4">
              <label className="form-label">¿Quieres tener hijos?</label>
              <div>
                <input
                  type="radio"
                  className='form-radio'
                  id="siHijos"
                  name="quieresHijos"
                  value="Si"
                  onChange={handleOnChange}
                  checked={formData.quieresHijos === 'Si'}
                />
                <label className="form-label" htmlFor="siHijos">Si</label>
              </div>
              <div>
                <input
                  type="radio"
                  className='form-radio'
                  id="noHijos"
                  name="quieresHijos"
                  value="No"
                  onChange={handleOnChange}
                  checked={formData.quieresHijos === 'No'}
                />
                <label className="form-label" htmlFor="noHijos">No</label>
              </div>
              <div>
                <input
                  type="radio"
                  className='form-radio'
                  id="algundiaHijos"
                  name="quieresHijos"
                  value="Algún día"
                  onChange={handleOnChange}
                  checked={formData.quieresHijos === 'Algún día'}
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
                  name="fumas"
                  value="Si"
                  onChange={handleOnChange}
                  checked={formData.fumas === 'Si'}
                />
                <label className="form-label" htmlFor="siFumas">Si</label>
              </div>
              <div>
                <input
                  type="radio"
                  className='form-radio'
                  id="noFumas"
                  name="fumas"
                  value="No"
                  onChange={handleOnChange}
                  checked={formData.fumas === 'No'}
                />
                <label className="form-label" htmlFor="noFumas">No</label>
              </div>
              <div>
                <input
                  type="radio"
                  className='form-radio'
                  id="socialmenteFumas"
                  name="fumas"
                  value="Socialmente"
                  onChange={handleOnChange}
                  checked={formData.fumas === 'Socialmente'}
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
                id="mayorEdad"
                name="mayorEdad"
                checked={formData.mayorEdad}
                onChange={handleOnChange}
                //required
              />
              <label className="form-label" htmlFor="mayorEdad">Confirmo que soy mayor de edad</label>
            </div>
            <div className="mb-3">
              <input
                type="checkbox"
                className='form-checkbox'
                id="aceptoTerminos"
                name="aceptoTerminos"
                checked={formData.aceptoTerminos}
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
                name="recibirInformacion"
                checked={formData.recibirInformacion}
                onChange={handleOnChange}
              />
              <label htmlFor="recibirInformacion">Quiero recibir información sobre noticias y eventos</label>
            </div>
             */}
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