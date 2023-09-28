import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Forms.css';
import { ProfileService } from '../../service/ProfileService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function ProfileEditForm({ profile, id, setIsEditing }) {
  
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});
  const [formDataState, setFormDataState] = useState({
    image: '',
    description: profile ? profile.description : '',
  });

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

  const profileService = ProfileService();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', formDataState.image);
    formData.append('description', formDataState.description);

    profileService
      .updateProfile(id, formData)
      .then((res) => {
        setIsEditing(false);
        window.location.reload();
        console.log(res);
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
            },
          });
        }
      });
  };

  return (
    <div className='body-login'>
      <div className="edit-profile-container">
        <p className="">
          Edita tus datos:.
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
            {validationErrors.image && (
              <div className="text-danger">{validationErrors.image.join(', ')}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="preference-text">
              Descripción
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              placeholder="Descríbete..."
              onChange={handleOnChange}
              required
              value={formDataState.description}
            />
            {validationErrors.description && (
              <div className="text-danger">{validationErrors.description.join(', ')}</div>
            )}
          </div>
          <div className='form-buttons'>
            <button type="submit" className="button-send">
              Enviar
            </button>
            <button type="button" className="button-cancel" onClick={() => setIsEditing(false)}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileEditForm;
