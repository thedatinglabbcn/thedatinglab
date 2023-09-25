import React from 'react';
import LoginForm from '../../components/forms/LoginForm'
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const LoginPage = () => {
  return (
    <div>
      <Navbar />
      <LoginForm />
      <Footer />
    </div>
  );
}

export default LoginPage;
