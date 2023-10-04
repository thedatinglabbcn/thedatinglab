import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Events from '../components/admin/Events';


test('should render the Events component', () => {
  const event = {
    id: 1,
    title: 'Sample Event',
    image: 'sample.jpg',
  };

  const { getByText, getByAltText } = render(
    <Router> 
      <Events event={event} />
    </Router>
  );

  expect(getByText('Sample Event')).toBeInTheDocument();
  expect(getByAltText('Sample Event')).toBeInTheDocument();
});
