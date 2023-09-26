import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Forms.css';
import { ProfileService } from '../../service/ProfileService';
import Swal from 'sweetalert2';

function ProfileEditForm() {
  
    const navigate = useNavigate();
    const [formDataState, setFormDataState] = useState({
        image: '',
        description: '',
    });
    const [validationErrors, setValidationErrors] = useState({});
    const { id } = useParams();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileService = ProfileService();
        const response = await profileService.getProfile(id);
        const { image, description } = response.profile;

        setFormDataState({
          image: image || '',
          description: description || '',
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileData();
  }, [id]);

  const profile = ProfileService();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { image, description } = formDataState;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);

    profile
      .updateProfile(id, formData)
      .then((res) => {
        // navigate(`/profile/${id}`);
        console.log(res)
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

  return (
    <div className='body-login'>
      <div className="container">
        <h1 className='form-title'>Edición</h1>
        <p className="">
          Edita tu imagen, descripción o ambos.
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
            <label htmlFor="description" className="form-label">
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

export default ProfileEditForm;

