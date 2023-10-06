jest.mock('bootstrap/dist/css/bootstrap.min.css', () => {});
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm';
import HomePage from '../pages/home/HomePage';
import RegForm from '../components/forms/RegForm';

test('should login successfully and generate a token', async () => {
  const { getByLabelText, getByText } = render(
    <Router>
      <LoginForm />
    </Router>
  );

  const emailInput = getByLabelText('Email');
  const passwordInput = getByLabelText('Contraseña');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  const submitButton = getByText('Ingresar');
  fireEvent.click(submitButton);

  await waitFor(() => {
    const token = localStorage.getItem('auth_token');
    expect(token).toBeDefined();
  });
});

test('should redirect to home on Cancel button click', () => {
  const { getByText } = render(
    <Router>
      <LoginForm />
      <HomePage/>
    </Router>
  );

  const cancelButton = getByText('Cancelar');
  fireEvent.click(cancelButton);

  const homePageText = getByText('¿Te apuntas?');
  expect(homePageText).toBeInTheDocument();
});

test('should redirect to register on "¿No tienes una cuenta? Regístrate" link click', () => {
  const { getByText } = render(
    <Router>
      <LoginForm />
      <RegForm />
    </Router>
  );

  const registerLink = getByText('Regístrate');
  fireEvent.click(registerLink);

  const registerPageText = getByText('Acepto ser mayor de 18 años');
  expect(registerPageText).toBeInTheDocument();
});