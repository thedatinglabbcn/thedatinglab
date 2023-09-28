import React, { useState } from 'react';
import './PaymentPage.css';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import axios from '../../service/axiosConfig';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

function PaymentPage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const { eventId } = useParams();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handlePaymentAndAttendance = () => {
    // Simular el proceso de pago (puedes agregar lógica adicional aquí)
    // ...

    axios
      .post(`api/event/attendance/${eventId}`, { option: selectedOption })
      .then((response) => {
        Swal.fire({
          title: 'Solicitud exitosa! Ahora debes hacer una transferencia de pago para que tu asistencia sea confirmada.',
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'Ok'
        });
       
        console.log('Pago realizado y asistencia confirmada:', response.data.message);
      })
      .catch((error) => {
        console.error('Error al realizar el pago y confirmar la asistencia:', error);
      });
  };

  return (
    <>
      <Navbar />
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
            <div className="option-description">Te aseguramos que encontrarás a tu pareja ideal</div>
            <div className="option-price">$X</div>
          </div>
        </div>
        <div className="continue-button">
          <button onClick={handlePaymentAndAttendance} className="btn btn-primary attend-button">
            Continuar
          </button>
          <div className="disclaimer">
            Déjate llevar por la emoción de conocer a alguien sin prejuicios visuales. En esta experiencia única, te emparejaremos con alguien compatible emocionalmente y compartirás una cena a ciegas llena de conversación y risas. ¡Descubre el poder de la conexión real.
          </div>
        </div>
      </div>
     
    </>
  );
}

export default PaymentPage;
