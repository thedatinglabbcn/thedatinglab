import React, { useState } from 'react';
import './PaymentOptions.css';

function PaymentOptions() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    // Aquí puedes realizar acciones adicionales según la opción seleccionada
    console.log('Opción seleccionada:', selectedOption);
    // Redirigir al siguiente paso o procesar el pago real
  };

  return (
    <div className="payment-page">
      <h2 className="payment-title">Subscripción</h2>
      <div className="payment-options">
        <div
          className={`payment-option ${selectedOption === 'cita' ? 'selected' : ''}`}
          onClick={() => handleOptionSelect('cita')}
        >
          <div className="option-title">Cita a ciegas</div>
          <div className="option-description">Pagar solo un evento</div>
          <div className="option-price">$X</div>
        </div>
        <div
          className={`payment-option2 ${selectedOption === '3meses' ? 'selected' : ''}`}
          onClick={() => handleOptionSelect('3meses')}
        >
          <div className="option-title">Paga por 3 meses</div>
          <div className="option-description">Para asistir a 6 eventos</div>
          <div className="option-price">$X</div>
        </div>
        <div
          className={`payment-option ${selectedOption === '6meses' ? 'selected' : ''}`}
          onClick={() => handleOptionSelect('6meses')}
        >
          <div className="option-title">6 meses Recomendado</div>
          <div className="option-description">Asegurado que encontraras a tu pareja ideal</div>
          <div className="option-price">$X</div>
        </div>
      </div>
        <div className="continue-button">
          <button onClick={handleContinue}>Continuar</button>
          <div className="disclaimer">
            Déjate llevar por la emoción de conocer a alguien sin prejuicios visuales. En esta experiencia única, te emparejaremos con alguien compatible emocionalmente y compartirás una cena a ciegas llena de conversación y risas. ¡Descubre el poder de la conexión real.
          </div>
        </div>
    </div>
  );
}

export default PaymentOptions;
