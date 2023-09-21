import React from 'react';
import RegistrationForm from '../../components/forms/RegisterForm';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const RegisterPage = () => {
  return (
    <div>
      <Navbar />
      <RegistrationForm />
      <Footer />
    </div>
  );
}

export default RegisterPage;
