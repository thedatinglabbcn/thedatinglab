import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import NavbarLogin from '../../components/navbar/NavbarLogin';
import './Faqs.css';
import Footer from '../../components/footer/Footer';

function Faqs() {
  return (
    <div>
      <div><Navbar/></div>
    <div className='faq-container'>
         <h1 className='home-subtitle'>Preguntas Frecuentes</h1>
         <div class="accordion accordion-flush" id="accordionFlushExample">
         <h2 className='faq-title'>Servicios</h2>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      ¿Qué es The Dating Lab?
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">The Dating Lab es una plataforma de citas que prioriza la compatibilidad emocional sobre la física, ofreciendo una experiencia única para que los usuarios conozcan a sus posibles parejas de una manera diferente.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
      ¿Cómo funciona The Dating Lab?
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Funciona mediante un formulario de compatibilidad que los usuarios deben completar. Nuestra plataforma luego les mostrará perfiles de personas con un 70% o más de compatibilidad emocional.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
      ¿Cómo puedo registrarme en The Dating Lab?
      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Para registrarte en The Dating Lab, simplemente crea una cuenta con tu información básica y completa el formulario de compatibilidad emocional.</div>
    </div>
  </div>
  <h2 className='faq-title'>Experiencias</h2>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      ¿Qué son las experiencias de The Dating Lab?
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Las experiencias son oportunidades para que los usuarios se encuentren con sus citas compatibles en persona. Estos eventos se anunciarán en nuestra página principal.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      ¿Cómo puedo asistir a una experiencia?
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Para asistir a una experiencia, debes abonar el costo correspondiente y elegir la experiencia que más te guste. Luego, recibirás información detallada sobre el evento.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      ¿Dónde se realizan las experiencias?
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">La ubicación de las experiencias puede variar dentro de Barcelona, así que asegúrate de revisar la información proporcionada en la página principal o la invitación al evento.</div>
    </div>
  </div>
  <h2 className='faq-title'>Pagos y contacto</h2>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      ¿Qué métodos de pago aceptan para las experiencias?
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Aceptamos pagos a través de Bizum. Deberás contactarnos principalmente a través del número de móvil: 111111111 para realizar el pago.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      ¿Cómo puedo obtener más información sobre una experiencia después de realizar el pago?
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Una vez que hayas realizado el pago, te proporcionaremos información detallada sobre la experiencia, incluyendo la ubicación, fecha y hora, y cualquier otra información relevante.</div>
    </div>
  </div>
  <h2 className='faq-title'>Requisitos de seguridad</h2>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      ¿Por qué se solicita información sobre alergias para asistir a las experiencias?
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Solicitamos información sobre alergias para garantizar la seguridad de todos los asistentes a nuestros eventos. Algunas experiencias pueden incluir alimentos y bebidas, por lo que es importante conocer las alergias de los participantes.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      ¿Cómo se manejarán mis datos personales en The Dating Lab?
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">La privacidad y seguridad de tus datos son una prioridad para nosotros. Puedes consultar nuestra política de privacidad para obtener más información sobre cómo manejamos tus datos.</div>
    </div>
  </div>
</div>
</div>
      <Footer/>
        <NavbarLogin/>
    </div>
  )
};

export default Faqs;