import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Forms.css';
import { PreferencesService } from '../../service/PreferencesService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const PreferencesForm = () => {
  const navigate = useNavigate();

  // Define a list of questions and responses
  const questions = [
    { name: 'gender', question: '¿Con qué género te identificas?', options: ['Hombre', 'Mujer', 'Otro'] },
    { name: 'looksFor', question: 'Buscas...', options: ['Hombre', 'Mujer', 'Otro'] },
    { name: 'preferences1', question: 'Eres más de...', options: ['Netflix', 'Eventos', 'Deporte', 'Escapadas', 'Todas', 'Otras'] },
    { name: 'preferences2', question: 'Eres más de...', options: ['Alcohol', 'Infusiones', 'NoAlcohol', 'Según', 'Ninguna'] },
    { name: 'catsDogs', question: '¿Prefieres los gatos o perros?', options: ['Gatos', 'Perros', 'Todos', 'DeAmigos'] },
  ];

  const [currentStep, setCurrentStep] = useState(0); // Indice de la pregunta actual
  const [formData, setFormData] = useState({}); // Almacena las respuestas
  const [validationErrors, setValidationErrors] = useState({}); // Agrega esta línea para definir validationErrors

  const preferences = PreferencesService();

  const handleOnChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    // Limpia el error del campo específico
    setValidationErrors({
      ...validationErrors,
      [name]: '',
    });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Si estamos en la última pregunta, guarda los datos en la base de datos y redirige
      preferences.createPreferences(formData).then((res) => {
        navigate('/profile-form');
      }).catch((err) => {
        console.error(err);
        // Manejo de errores aquí
        if (err.response && err.response.status === 422) {
          const errors = err.response.data.validation_errors;
          // Establecer los errores en el estado
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
    }
  };

  return (
    <div className='body-registration'>
      <div className="container" style={{ paddingTop: '12px' }}>
        <h1 className='form-title'>¿Quieres conocer a tu pareja ideal?</h1>
        <p className='match-text'>¡Completa este formulario para conocer a tus matches!</p>

        <form noValidate>
          <div className="mb-3">
            <label className="form-label-form">{questions[currentStep].question}</label>
            {questions[currentStep].options.map((option) => (
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
            ))}
          </div>

          <div className='text-danger'>{validationErrors[questions[currentStep].name]}</div>

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
