jest.mock('bootstrap/dist/css/bootstrap.min.css', () => {});
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileForm from '../components/forms/ProfileForm';

global.URL.createObjectURL = jest.fn();

describe('ProfileForm', () => {
  it('should handle form submission', async () => {
    const { getByText, getByLabelText } = render(
      <Router>
        <ProfileForm />
      </Router>
    );
    
    const descriptionInput = getByLabelText('Cuéntanos algo de ti');
    const imageInput = getByLabelText('Elige la foto de perfil');
    const submitButton = getByText('Enviar');

    fireEvent.change(descriptionInput, { target: { name: 'description', value: 'Ejemplo de descripción' } });
    fireEvent.change(imageInput, { target: { name: 'image', files: [new File([], 'test.png')] } });

    fireEvent.click(submitButton);
  });
});
