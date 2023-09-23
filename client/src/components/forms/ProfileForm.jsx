import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Forms.css';
import { ProfileService } from '../../service/ProfileService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function ProfileForm() {
  const navigate = useNavigate();
  const [formDataState, setFormDataState] = useState({
    image: '',
    description: '',
  });

  const profile = ProfileService();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { image, description } = formDataState;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);

    profile
      .createProfile(formData)
      .then((res) => {
        Swal.fire({
          title: 'Perfil creado',
          text: '¡Ya estás dentro!',
          icon: 'success',
        }).then(() => {
          navigate('/matches');
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: '¡Error!',
          text: '¡Ha habido un error!',
          icon: 'error',
        });
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormDataState({
      ...formDataState,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormDataState({
      ...formDataState,
      image: e.target.files[0],
    });
  };

  return (
    <div className='body-login'>
      <div className="container">
        <h1 className='form-title'>¡Ya casi hemos terminado!</h1>
        <p>
          Para terminar, sube una foto de perfil y explícanos brevemente quién eres y qué buscas (p.ej., ¿En qué estado se encuentra tu corazón actualmente?, ¿Qué tipo de relación sexoafectiva te gustaría tener?, ¿Momento vital en el que estás?)
        </p>
        <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
          <div className="mb-4">
            <label htmlFor="image" className="form-label">
              Foto de perfil
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
            <label htmlFor="description" className="form-label">
              Descríbete
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              placeholder="Descríbete..."
              onChange={handleOnChange}
              required
            />
          </div>
          <div className='login-buttons'>
            <button type="submit" className="button-send">
              Enviar
            </button>
            <button type="button" className="button-cancel" onClick={() => navigate('/preference-edit')}>
              Atrás
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;