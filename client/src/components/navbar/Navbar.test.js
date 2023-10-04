
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
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
    const svgElement = getByAltText('The Dating Lab logo'); 
    expect(svgElement).toBeTruthy();
  });
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: jest.fn(),
  };
});
test('should navigate when menu items are clicked', () => {
  const navigate = jest.fn();
  useNavigate.mockImplementation(() => navigate);
  const { getByText } = render(
    <Router>
      <Navbar />
    </Router>
  );
  fireEvent.click(getByText('Registrarse'));
  expect(navigate).toHaveBeenCalledWith('/register');
});
test('should navigate when menu items are clicked', () => {
    const { getByAltText } = render(
      <Router>
        <Navbar />
      </Router>
    );
    const logoElement = getByAltText('Iniciar sesión');
    fireEvent.click(logoElement);
    expect(window.location.pathname).toBe('/login');
  });
