import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Forms.css';
import { PreferencesService } from '../../service/PreferencesService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const PreferencesForm = () => {
  
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        gender: '',
        looksFor: '',
        preferences1: '',
        preferences2: '',
        catsDogs: '',
    });

    const preferences = PreferencesService();

    const handleOnChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
        ...formData,
        [name]: newValue,
    });

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    preferences.createPreferences(formData).then(res => {
        navigate('/profile-form');
    }).catch(err => {
      Swal.fire({
        title: '¡Error!',
        text: '¡Ha habido un error!',
        icon: 'error',
      });
    });
  };

  return (
    <div className='body-registration'>
      <div className="container">
        <h1 className='form-title'>¿Quieres conocer a tu pareja ideal?</h1>
        <p>Rellena este formulario para conocer a tus matches</p>
        <form
          onSubmit={handleSubmit}
          noValidate>
          <div className="mb-4">
            <label className="form-label">¿Con qué género te identificas?</label>
            <div>
              <input type="radio"
                className='btn-check'
                autoComplete='off'
                id="hombre"
                name="gender"
                value="Hombre"
                onChange={handleOnChange}
              />
              <label className="btn btn-outline-danger" htmlFor="hombre">Hombre</label>
            </div>
            <div>
            <input type="radio"
                className='btn-check'
                autoComplete='off'
                id="mujer"
                name="gender"
                value="Mujer"
                onChange={handleOnChange}
              />
              <label className="btn btn-outline-danger" htmlFor="mujer">Mujer</label>
            </div>
            <div>
            <input type="radio"
                className='btn-check'
                autoComplete='off'
                id="otro"
                name="gender"
                value="Otro"
                onChange={handleOnChange}
              />
              <label className="btn btn-outline-danger" htmlFor="otro">Otro</label>
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label">Buscas...</label>
            <div>
            <input type="radio"
                className='btn-check'
                autoComplete='off'
                id="buscaHombre"
                name="looksFor"
                value="Hombre"
                onChange={handleOnChange}
              />
              <label className="btn btn-outline-danger" htmlFor="buscaHombre">Hombre</label>
            </div>
            <div>
            <input type="radio"
                className='btn-check'
                autoComplete='off'
                id="buscaMujer"
                name="looksFor"
                value="Mujer"
                onChange={handleOnChange}
              />
              <label className="btn btn-outline-danger" htmlFor="buscaMujer">Mujer</label>
            </div>
            <div>
            <input type="radio"
                className='btn-check'
                autoComplete='off'
                id="buscaOtro"
                name="looksFor"
                value="Otro"
                onChange={handleOnChange}
              />
              <label className="btn btn-outline-danger" htmlFor="buscaOtro">Otro</label>
            </div>
          </div>
          <div className="mb-4">
            <label>Eres más de...</label>
            <div>
            <input type="radio"
                className='btn-check'
                autoComplete='off'
                id="netflix"
                name="preferences1"
                value="Netflix"
                onChange={handleOnChange}
              />
              <label className="btn btn-outline-danger" htmlFor="netflix">Netflix y mi sofá</label>
            </div>
            <div>
            <input type="radio"
                className='btn-check'
                autoComplete='off'
                id="eventos"
                name="preferences1"
                value="Eventos"
                onChange={handleOnChange}
              />
              <label className="btn btn-outline-danger" htmlFor="eventos">Eventos, restaurantes, copeo</label>
            </div>
            <div>
            <input type="radio"
                className='btn-check'
                autoComplete='off'
                id="deporte"
                name="preferences1"
                value="Deporte"
                onChange={handleOnChange}
              />
              <label className="btn btn-outline-danger" htmlFor="deporte">Gimnasio, deporte y aire libre</label>
            </div>
            <div>
            <input type="radio"
                className='btn-check'
                autoComplete='off'
                id="escapadas"
                name="preferences1"
                value="Escapadas"
                onChange={handleOnChange}
              />
              <label className="btn btn-outline-danger" htmlFor="escapadas">Escapadas, playa y montaña</label>
            </div>
            <div>
            <input type="radio"
                className='btn-check'
                autoComplete='off'
                id="todas"
                name="preferences1"
                value="Todas"
                onChange={handleOnChange}
              />
              <label className="btn btn-outline-danger" htmlFor="todas">Todas las anteriores</label>
            </div>
            <div>
            <input type="radio"
                className='btn-check'
                autoComplete='off'
                id="otras"
                name="preferences1"
                value="Otras"
                onChange={handleOnChange}
              />
              <label className="btn btn-outline-danger" htmlFor="otras">Otras que te invito a descubrir</label>
            </div>
          </div>
          <div className="mb-4">
            <label>Eres más de...</label>
            <div>
            <input type="radio"
                className='btn-check'
                autoComplete='off'
                id="alcohol"
                name="preferences2"
                value="Alcohol"
                onChange={handleOnChange}
              />
              <label className="btn btn-outline-danger" htmlFor="alcohol">Cata de vinos, cerveza, vermut... o lo que se tercie</label>
            </div>
            <div>
            <input type="radio"
                className='btn-check'
                autoComplete='off'
                id="infusiones"
                name="preferences2"
                value="Infusiones"
                onChange={handleOnChange}
              />
              <label className="btn btn-outline-danger" htmlFor="infusiones">Café, chai latte, mate, infusiones varias...</label>
            </div>
            <div>
            <input type="radio"
                className='btn-check'
                autoComplete='off'
                id="noalcohol"
                name="preferences2"
                value="NoAlcohol"
                onChange={handleOnChange}
              />
              <label className="btn btn-outline-danger" htmlFor="noalcohol">Agua, zumos naturales, batidos detox</label>
            </div>
            <div>
            <input type="radio"
                className='btn-check'
                autoComplete='off'
                id="según"
                name="preferences2"
                value="Según"
                onChange={handleOnChange}
              />
              <label className="btn btn-outline-danger" htmlFor="según">Según el momento o casi todas las anteriores</label>
            </div>
            <div>
            <input type="radio"
                className='btn-check'
                autoComplete='off'
                id="ninguna"
                name="preferences2"
                value="Ninguna"
                onChange={handleOnChange}
              />
              <label className="btn btn-outline-danger" htmlFor="ninguna">Ninguna, no ingiero líquidos</label>
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label">¿Prefieres los gatos o perros?</label>
            <div>
            <input type="radio"
                className='btn-check'
                autoComplete='off'
                id="gatos"
                name="catsDogs"
                value="Gatos"
                onChange={handleOnChange}
              />
              <label className="btn btn-outline-danger" htmlFor="gatos">Gatos</label>
            </div>
            <div>
            <input type="radio"
                className='btn-check'
                autoComplete='off'
                id="perros"
                name="catsDogs"
                value="Perros"
                onChange={handleOnChange}
              />
              <label className="btn btn-outline-danger" htmlFor="perros">Perros</label>
            </div>
            <div>
            <input type="radio"
                className='btn-check'
                autoComplete='off'
                id="todos"
                name="catsDogs"
                value="Todos"
                onChange={handleOnChange}
              />
              <label className="btn btn-outline-danger" htmlFor="todos">Todos los animales</label>
            </div>
            <div>
            <input type="radio"
                className='btn-check'
                autoComplete='off'
                id="deAmigos"
                name="catsDogs"
                value="DeAmigos"
                onChange={handleOnChange}
              />
              <label className="btn btn-outline-danger" htmlFor="deAmigos">Me gustan los de mis amig@s</label>
            </div>
          </div>
          <p className='form-text'>
            Al completar el formulario, aseguramos la compatibilidad con otros usuarios y su compromiso con nuestra comunidad. Te invitamos a abonar 50 euros para acceder a tres eventos de tu elección. Tu contribución nos ayuda a mantener la calidad de nuestros eventos y nuestra comunidad activa. ¡Únete a nosotros!
          </p>
          <button type="submit" className="button-send">
            Enviar
          </button>
          <button type="button" className="button-cancel" onClick={() => navigate('/profile-form')}>
            Atrás
          </button>
        </form>
      </div>
    </div>
  );
};

export default PreferencesForm;
