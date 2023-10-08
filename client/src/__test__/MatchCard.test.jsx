import React from 'react';
import { render, screen } from '@testing-library/react';
import MatchCard from '../components/matchCard/MatchCard';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'; 
import { BrowserRouter as Router } from 'react-router-dom';


const mock = new MockAdapter(axios);

global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }

  observe() {
    // Trigger the callback with an entry that is intersecting
    this.callback([{ isIntersecting: true }]);
  }

  unobserve() {}
  disconnect() {}
};

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

        const indications = await screen.findByText('Desliza para ver más matches')
        expect(indications).toBeInTheDocument();
    });


    it('fetches all matches and shows only >= 70% matches', async () => {
  
        const mockData = {
          matches: [
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
            },
          ],
        };
      
        mock.onGet('/api/matching-users').reply(200, { data: mockData });
      
        render(
          <Router>
            <MatchCard />
          </Router>
        );
      
        const apiCall = mock.history.get[0];
        expect(apiCall.url).toBe('/api/matching-users');
      
        mockData.matches.forEach(async (match) => {
          if (match.matchingPercentage >= 70) {
            const userElement = await screen.findByText(match.name);
            expect(userElement).toBeInTheDocument();
          }
        });
    });

  it('handles no matches', async () => {

    mock.onGet('/api/matching-users').reply(200, {
      data: {
        matches: []
      }
    });
  
    render(
      <Router>
        <MatchCard />
      </Router>
    );
  
    const noMatchesMessage = await screen.findByText('Sin coincidencias por ahora... ¡Vuelve a comprobarlo más tarde!');
    expect(noMatchesMessage).toBeInTheDocument();
  });

})