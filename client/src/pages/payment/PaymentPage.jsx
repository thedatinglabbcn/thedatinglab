import React, { useState } from "react";
import "./PaymentPage.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "../../service/axiosConfig";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

function PaymentPage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handlePaymentAndAttendance = () => {
    axios
      .post(`api/event/attendance/${eventId}`, { option: selectedOption })
      .then((response) => {
        Swal.fire({
          title:
            "Solicitud exitosa! Ahora debes hacer una transferencia de pago a este numero: xxxx, y te llegara un comprobante, para que tu asistencia sea confirmada.",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "Ok",
        });

            axios
              .post(`api/send-email`)
              .then((emailResponse) => {
                console.log("Correo electrónico enviado con éxito");
              })
              .catch((emailError) => {
                console.error(
                  "Error al enviar el correo electrónico",
                  emailError
                );
              });

            navigate(`/event`);
          })
          
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          Swal.fire({
            title: "Error!",
            text: "Ya estas registrado en este evento",
            icon: "error",
            confirmButtonText: "Ok",
          });
        } else {
          console.error(error);
        }
      });
  };

  return (
    <>
      <Navbar />
      <div className="payment-page">
        <h2 className="payment-title">Subscripción</h2>
        <div className="payment-options">
          <div
            className={`payment-option ${
              selectedOption === "cita" ? "selected" : ""
            }`}
            onClick={() => handleOptionSelect("cita")}
          >
            <div className="option-title">Cita a ciegas</div>
            <div className="option-description">Pagar solo un evento</div>
            <div className="option-price">$X</div>
          </div>
          <div
            className={`payment-option2 ${
              selectedOption === "3meses" ? "selected" : ""
            }`}
            onClick={() => handleOptionSelect("3meses")}
          >
            <div className="option-title">Paga por 3 meses</div>
            <div className="option-description">Para asistir a 6 eventos</div>
            <div className="option-price">$X</div>
          </div>
          <div
            className={`payment-option ${
              selectedOption === "6meses" ? "selected" : ""
            }`}
            onClick={() => handleOptionSelect("6meses")}
          >
            <div className="option-title">6 meses Recomendado</div>
            <div className="option-description">
              Te aseguramos que encontrarás a tu pareja ideal
            </div>
            <div className="option-price">$X</div>
          </div>
        </div>
        <div className="continue-button">
          <button
            onClick={handlePaymentAndAttendance}
            className="btn btn-primary attend-button"
          >
            Continuar
          </button>
          <div className="disclaimer">
            Déjate llevar por la emoción de conocer a alguien sin prejuicios
            visuales. En esta experiencia única, te emparejaremos con alguien
            compatible emocionalmente y compartirás una cena a ciegas llena de
            conversación y risas. ¡Descubre el poder de la conexión real.
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
