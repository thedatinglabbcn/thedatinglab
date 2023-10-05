import React from 'react';
import { render } from '@testing-library/react';
import Button from '../components/button/Button';

test('should render a submit button', () => {
  const { getByRole } = render(<Button text="Click me" backgroundColorClass="bg-blue" />);
  const submitButton = getByRole('button', { type: 'submit' });
  
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toHaveClass('bg-blue');
});