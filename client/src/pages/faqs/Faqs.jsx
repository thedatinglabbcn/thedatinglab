import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import NavbarLogin from '../../components/navbar/NavbarLogin';
import './Faqs.css';

function Faqs() {
  return (
    <div>
         <Navbar/>
         <div className='faq-container'>
         <h1 className='home-subtitle'>Preguntas Frecuentes</h1>
        <div className='faq-item'>
          <h2>¿Qué es The Dating Lab?</h2>
            <h3>The Dating Lab es una plataforma de citas que prioriza la compatibilidad emocional sobre la física, ofreciendo una experiencia única para que los usuarios conozcan a sus posibles parejas de una manera diferente.</h3>
        </div>

        <div className='faq-item'>
          <h2>¿Cómo funciona The Dating Lab?</h2>
            <h3>Funciona mediante un formulario de compatibilidad que los usuarios deben completar. Nuestra plataforma luego les mostrará perfiles de personas con un 70% o más de compatibilidad emocional.</h3>
        </div>

        <div className='faq-item'>
          <h2>¿Cómo puedo registrarme en The Dating Lab?</h2>
            <h3>Para registrarte en The Dating Lab, simplemente crea una cuenta con tu información básica y completa el formulario de compatibilidad emocional.</h3>
        </div>

            <h2 className='faq-title'>Experiencias</h2>
        <div className='faq-item'>
          <h2>¿Qué son las experiencias de The Dating Lab?</h2>
            <h3>Las experiencias son oportunidades para que los usuarios se encuentren con sus citas compatibles en persona. Estos eventos se anunciarán en nuestra página principal.</h3>
        </div>
        <div className='faq-item'>
          <h2>¿Cómo puedo asistir a una experiencia?</h2>
            <h3>Para asistir a una experiencia, debes abonar el costo correspondiente y elegir la experiencia que más te guste. Luego, recibirás información detallada sobre el evento.</h3>
        </div>
        <div className='faq-item'>
          <h2>¿Dónde se realizan las experiencias?</h2>
            <h3>La ubicación de las experiencias puede variar dentro de Barcelona, así que asegúrate de revisar la información proporcionada en la página principal o la invitación al evento.</h3>
        </div>
        <h2 className='faq-title'>Pagos y Contacto</h2>
        <div className='faq-item'>
          <h2>¿Qué métodos de pago aceptan para las experiencias?</h2>
            <h3>Aceptamos pagos a través de Bizum. Deberás contactarnos principalmente a través del número de móvil: 111111111 para realizar el pago.</h3>
        </div>
        <div className='faq-item'>
          <h2>¿Cómo puedo obtener más información sobre una experiencia después de realizar el pago?</h2>
            <h3>Una vez que hayas realizado el pago, te proporcionaremos información detallada sobre la experiencia, incluyendo la ubicación, fecha y hora, y cualquier otra información relevante.</h3>
        </div>
            <h2 className='faq-title'>Requisitos de Seguridad</h2>
        <div className='faq-item'>
          <h2>¿Por qué se solicita información sobre alergias para asistir a las experiencias?</h2>
            <h3>Solicitamos información sobre alergias para garantizar la seguridad de todos los asistentes a nuestros eventos. Algunas experiencias pueden incluir alimentos y bebidas, por lo que es importante conocer las alergias de los participantes.</h3>
        </div>
        <div className='faq-item'>
          <h2>¿Cómo se manejarán mis datos personales en The Dating Lab?</h2>
            <h3>La privacidad y seguridad de tus datos son una prioridad para nosotros. Puedes consultar nuestra política de privacidad para obtener más información sobre cómo manejamos tus datos.</h3>
        </div>

      </div>
        <NavbarLogin/>
    </div>
  )
};

export default Faqs;