import React, { useState } from 'react';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Forms.css';


const RegistrationForm = () => {
    const [formData, setFormData] = useState({
      nombreApellido: '',
      edad: '',
      email: '',
      password: '',
      imagen: null,
      quieresHijos: '',
      fumas: '',
      mayorEdad: false,
      aceptoTerminos: false,
      recibirInformacion: false,
    });
  
    const handleChange = (e) => {
      const { name, value, type, checked, files } = e.target;
      const newValue = type === 'checkbox' ? checked : files ? files[0] : value;
      setFormData({
        ...formData,
        [name]: newValue,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Aquí puedes realizar acciones con los datos del formulario, como enviarlos a un servidor.
      console.log(formData);
    };

    return (
        <div className="container">
          <h1 className='form-title'>¿Quieres conocer a tu pareja ideal?</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nombreApellido" className="form-label">
                Nombre y Apellido
              </label>
              <input
                type="text"
                className="form-control"
                id="nombreApellido"
                name="nombreApellido"
                placeholder="Ingresa tu nombre y apellido"
                value={formData.nombreApellido}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="edad" className="form-label">
                Edad
              </label>
              <input
                type="number"
                className="form-control"
                id="edad"
                name="edad"
                placeholder="Ingresa tu edad"
                value={formData.edad}
                onChange={handleChange}
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
            <div className="mb-4">
              <label htmlFor="imagen" className="form-label">
                Subir imagen
              </label>
              <input
                type="file"
                className="form-control"
                id="imagen"
                name="imagen"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">¿Quieres tener hijos?</label>
              <div>
                <input
                  type="radio"
                  className='form-radio'
                  id="siHijos"
                  name="quieresHijos"
                  value="Si"
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                onChange={handleChange}
                required
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
                onChange={handleChange}
                required
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
                onChange={handleChange}
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