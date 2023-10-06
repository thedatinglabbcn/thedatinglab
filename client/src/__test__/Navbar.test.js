
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

afterEach(cleanup);
test('should render', () => {
    const { getByText } = render(
      <Router>
        <Navbar />
      </Router>
    );
    expect(getByText('Registrarse')).toBeTruthy();
    expect(getByText('Iniciar sesión')).toBeTruthy();
    expect(getByText('Nuestros eventos')).toBeTruthy();
   
  });
    test('should render the logo', () => {
  const { getByAltText } = render(
    <Router>
      <Navbar />
    </Router>
  );
  const svgElement = getByAltText('The Dating Lab Logo'); 
  expect(svgElement).toBeTruthy();
});
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: jest.fn(),
  };
});

test('should navigate to Register when is clicked', () => {
  const navigate = jest.fn();
  useNavigate.mockImplementation(() => navigate);
  const { getByText } = render(
    <Router>
      <Navbar />
    </Router>
  );
  fireEvent.click(getByText('Registrarse'));
  expect(window.location.pathname).toBe('/register');
});

test('should navigate to Login when is clicked', () => {
  const navigate = jest.fn();
  useNavigate.mockImplementation(() => navigate);
  const { getByText } = render(
    <Router>
      <Navbar />
    </Router>
  );
  fireEvent.click(getByText('Iniciar sesión'));
  expect(window.location.pathname).toBe('/login');
});

test('should navigate to faqs when is clicked', () => {
  const navigate = jest.fn();
  useNavigate.mockImplementation(() => navigate);
  const { getByText } = render(
    <Router>
      <Navbar />
    </Router>
  );
  fireEvent.click(getByText('Preguntas frecuentes'));
  expect(window.location.pathname).toBe('/faqs');
});


test('should navigate to home page when logo is clicked', () => {
  const { getByAltText } = render(
    <Router>
      <Navbar />
    </Router>
  );
  const logoElement = getByAltText('The Dating Lab Logo');
  fireEvent.click(logoElement);
  expect(window.location.pathname).toBe('/');
});
