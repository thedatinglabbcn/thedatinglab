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
  
  const [validationErrors, setValidationErrors] = useState({});

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
        const profileId = res.data.profile_id;
        Swal.fire({
          title: 'Perfil creado',
          text: '¡Ya estás dentro!',
          icon: 'success',
          confirmButtonColor: '#ED696B',
          customClass: {
          popup: 'custom-swal-background',
          confirmButton: 'custom-swal-button',
          }
        }).then(() => {
          navigate(`/profile/${profileId}`);
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
            text: '¡Ha habido un error!',
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

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormDataState({
      ...formDataState,
      [name]: value,
    });
    
    setValidationErrors({
      ...validationErrors,
      [name]: '',
    });
  };

  const handleImageChange = (e) => {
    setFormDataState({
      ...formDataState,
      image: e.target.files[0],
    });
    
    setValidationErrors({});
  };

  const handleImageConfirmation = (e) => { // Añade (e) como argumento
    Swal.fire({
      title: '¿Te gusta esta imagen de perfil?',
      text: 'Una vez confirmada, no podrás cambiarla hasta después.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'No, cambiar',
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario confirmó su imagen de perfil, ahora puedes continuar con el envío del formulario.
        handleSubmit(e); // Pasa (e) como argumento para evitar errores.
      }
    });
  };
  

  return (
    <div className='body-login'>
      <div className="container">
      <h1 className='form-title'>¡Ya casi hemos terminado!</h1>
        <p className="preference-text">
          Para terminar, sube una foto y cuéntanos algo sobre ti.
        </p>
        <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
          <div className="mb-4">
            <label htmlFor="image" className="form-label-profile">
              Elige la foto de perfil
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
            {validationErrors.image && (
              <div className="text-danger">{validationErrors.image.join(', ')}</div>
            )}
          </div>
            {formDataState.image && (
            <div className="mb-4">
            <label className="form-label-profile">Vista previa de la imagen de perfil</label>
            <center>
            <img
            src={URL.createObjectURL(formDataState.image)}
              alt="Vista previa de la imagen de perfil"
              className="rounded-circle "
              />
            </center>
            </div>
            )}
          <div className="mb-4">
            <label htmlFor="description" className="form-label-profile">
            ¿En qué estado se encuentra tu corazón? ¿Qué tipo de relación te gustaría tener? ¿En qué momento vital estás? ¡Cuéntanos!
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              placeholder="Descríbete..."
              onChange={handleOnChange}
              required
            />
            {validationErrors.description && (
              <div className="text-danger">{validationErrors.description.join(', ')}</div>
            )}
          </div>
          <div className='form-buttons'>
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
