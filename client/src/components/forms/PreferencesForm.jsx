import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Forms.css';
import { PreferencesService } from '../../service/PreferencesService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const PreferencesForm = () => {
  const navigate = useNavigate();

  const questions = [
    { name: 'gender', question: '¿Con qué género te identificas?', options: ['Hombre', 'Mujer', 'No binario'] },
    { name: 'looksFor', question: 'Estoy interesado en conocer...', options: ['Hombre', 'Mujer', 'No binario'] },
    { name: 'birthdate', question: 'Introduce tu fecha de nacimiento:'},
    { name: 'ageRange', question: 'Selecciona un rango de edades:', options: ['18-25', '26-35', '36-45', 'Más de 45'] },
    { name: 'hasChildren', question: '¿Tienes hijos?', options: ['Sí', 'No'] },
    { name: 'wantsFamily', question: '¿Quieres formar una familia?', options: ['Sí', 'No'] },
    { name: 'datesParents', question: '¿Saldrías con alguien que tiene hijos?', options: ['Sí', 'No', 'No me lo he planteado'] },
    { name: 'sexoAffective', question: '¿Qué tipo de relación sexoafectiva buscas?', options: ['Monógama', 'Abierta', 'Amigos con derecho a roce', 'Lo que surja', 'Casual'] },
    { name: 'heartState', question: '¿En qué estado se encuentra tu corazón actualmente?', options: ['Totalmente roto', 'Con ganas de compartir', 'Se siente solo', 'Feliz y palpitante', 'Despechadísimo'] },
    { name: 'preferences1', question: 'Eres más de...', options: ['Netflix', 'Eventos', 'Deporte', 'Escapadas', 'Todas', 'Otras'] },
    { name: 'preferences2', question: 'Eres más de...', options: ['Alcohol', 'Bebidas calientes', 'Refrescos', 'Según', 'Ninguna'] },
    { name: 'catsDogs', question: '¿Prefieres los gatos o perros?', options: ['Gatos', 'Perros', 'Todos', 'De amigos'] },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const preferences = PreferencesService();

  const handleOnChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validar el campo en tiempo real aquí
    if (name === 'birthdate') {
      const birthdate = value;
      const today = new Date();
      const birthDate = new Date(birthdate);
      const age = today.getFullYear() - birthDate.getFullYear();

      if (age < 18) {
        setValidationErrors({
          ...validationErrors,
          [name]: 'Tienes que ser mayor de 18 años para ingresar.',
        });
      } else {
        setValidationErrors({
          ...validationErrors,
          [name]: '', // Limpiar el error si es válido
        });
      }
    } else {
      setValidationErrors({
        ...validationErrors,
        [name]: '', // Limpiar el error para otros campos
      });
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      const currentQuestion = questions[currentStep];
      const currentValue = formData[currentQuestion.name];
    
      if (!currentValue && currentQuestion.name !== 'birthdate') {
        setValidationErrors({
          ...validationErrors,
          [currentQuestion.name]: 'Este campo es obligatorio.',
        });
        return;
      }
    
      setGeneralError('');
      setCurrentStep(currentStep + 1);
    } else {
      if (!formData['birthdate']) {
        setValidationErrors({
          ...validationErrors,
          ['birthdate']: 'Este campo es obligatorio.',
        });
        return;
      }
    
      const birthdate = formData['birthdate'];
      const today = new Date();
      const birthDate = new Date(birthdate);
      const age = today.getFullYear() - birthDate.getFullYear();
    
      if (age < 18) {
        setValidationErrors({
          ...validationErrors,
          ['birthdate']: 'Tienes que ser mayor de 18 años para ingresar.',
        });
        return;
      }
    
      preferences.createPreferences(formData).then((res) => {
        navigate('/profile-form');
      }).catch((err) => {
        console.error(err);
        if (err.response && err.response.status === 422) {
          const errors = err.response.data.validation_errors;
          setValidationErrors(errors);
        } else {
          setGeneralError('¡Ha habido un error!'); // Mostrar el error general
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
    }
  };
  
  

  return (
    <div className='body-registration'>
      <div className="container" style={{ paddingTop: '12px' }}>
        <h1 className='form-title'>¿Quieres conocer a tu pareja ideal?</h1>
        <p className='preference-text'>¡Completa este formulario para conocer a tus matches!</p>

        <form noValidate>
          <div className="mb-3">
            <label className="form-label-form">{questions[currentStep].question}</label>
            {questions[currentStep].name === 'birthdate' ? (
              <input
                type="date"
                className="form-control"
                name={questions[currentStep].name}
                value={formData[questions[currentStep].name] || ''}
                onChange={(e) => handleOnChange(questions[currentStep].name, e.target.value)}
              />
            ) : (
              questions[currentStep].options.map((option) => (
                <div className="input-options" key={option}>
                  <input
                    type="radio"
                    className='btn-check'
                    autoComplete='off'
                    id={option}
                    name={questions[currentStep].name}
                    value={option}
                    checked={formData[questions[currentStep].name] === option}
                    onChange={() => handleOnChange(questions[currentStep].name, option)}
                  />
                  <label className="btn btn-outline-danger" htmlFor={option}>{option}</label>
                </div>
              ))
            )}
          </div>

          <div className='text-danger'>{validationErrors[questions[currentStep].name]}</div>

          {generalError && <div className='text-danger'>{generalError}</div>}

          <div className="button-group">
            {currentStep > 0 && (
              <button type="button" className="button-cancel" onClick={() => setCurrentStep(currentStep - 1)}>
                <FontAwesomeIcon icon={faArrowLeft} /> Atrás
              </button>
            )}

            <button type="button" className="button-send" onClick={handleNext}>
              Siguiente <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PreferencesForm;
