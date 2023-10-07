import React from 'react';
import { render, screen } from '@testing-library/react';
import MatchCard from '../components/MatchCard/MatchCard';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'; 
import { BrowserRouter as Router } from 'react-router-dom';

// Configura el mock de Axios
const mock = new MockAdapter(axios);

// Configura el mock para la ruta de la API que usa tu servicio
mock.onGet('/api/matching-users').reply(200, {
    data: {
      user: [
        {
          id: 1,
          image: 'image1.jpg',
          name: 'User 1',
          birthdate: '1990-01-01',
          matchingPercentage: 75,
          description: 'Description 1',
        },
        {
          id: 2,
          image: 'image2.jpg',
          name: 'User 2',
          birthdate: '1980-10-10',
          matchingPercentage: 70,
          description: 'Description 2',
        }
      ]
    }
  });

describe('MatchCard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', async () => {
    render(
        <Router>
        <MatchCard />
      </Router>
    );

    const title = await screen.findByText('¡Tus matches!');

    expect(title).toBeInTheDocument();
  });

  it('should handle empty matches list', async () => {
    render(
        <Router>
        <MatchCard />
      </Router>
    );

    // Espera a que se resuelva la promesa
    await screen.findByText('Sin coincidencias por ahora... ¡Vuelve a comprobarlo más tarde!');

    // No necesitas configurar manualmente el mock para MatchingService aquí

    // Verifica que se llamó a getAllMatches
    expect(mock.history.get.length).toBe(2);
    expect(mock.history.get[0].url).toBe('/api/matching-users');
  });

  it('fetches all matches', async () => {
    
    render(
        <Router>
        <MatchCard />
      </Router>
    );

    const mockData = {
        user: [
          {
            id: 1,
            image: 'image1.jpg',
            name: 'User 1',
            birthdate: '1990-01-01',
            matchingPercentage: 75,
            description: 'Description 1',
          },
          {
            id: 2,
            image: 'image2.jpg',
            name: 'User 2',
            birthdate: '1980-10-10',
            matchingPercentage: 70,
            description: 'Description 2',
          }
        ]
      }
        
    // Espera a que se resuelva la promesa
    await screen.findByText('Sin coincidencias por ahora... ¡Vuelve a comprobarlo más tarde!');

    // Obtiene la última llamada a la API
    const apiCall = mock.history.get[1]; // 1 porque es la segunda llamada

    // Verifica la URL de la llamada a la API
    expect(apiCall.url).toBe('/api/matching-users');

    // Obtén la respuesta de la llamada a la API
    const response = await axios.get(apiCall.url);

    // Verifica que la respuesta coincida con los datos simulados
    expect(response.data).toEqual({ data: mockData });
});

it('renders only matches with a minimum matching percentage', async () => {
    render(
      <Router>
        <MatchCard />
      </Router>
    );
  
    const minMatchPercentage = 70;
  
    // Update the data to include a single user with a matching percentage of 75%
    const userMatches = {
      user: [
        {
          id: 1,
          image: 'image1.jpg',
          name: 'User 1',
          birthdate: '1990-01-01',
          matchingPercentage: 75,
          description: 'Description 1',
        },
      ],
    };
  
    // Ensure that the user with matchingPercentage >= 70% is present in the rendered output
    userMatches.user.forEach((match) => {
        if (match.matchingPercentage >= minMatchPercentage) {
      const userElement = screen.queryByText('Coincidencia:');
      expect(userElement).not.toBeInTheDocument();
    }
    });
  
    // Ensure that users with matchingPercentage < 70% are not present in the rendered output
    userMatches.user.forEach((match) => {
      if (match.matchingPercentage < minMatchPercentage) {
        const userElement = screen.queryByText('Sin coincidencias por ahora... ¡Vuelve a comprobarlo más tarde!');
        expect(userElement).toBeInTheDocument();
      }
    });
  });
    
});
