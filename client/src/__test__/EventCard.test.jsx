import { render, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import EventCard from '../components/eventCard/EventCard';

afterEach(cleanup);

const sampleEvent = {
  id: 1,
  title: 'Sample Event',
  image: 'sample.jpg',
};

test('should render event card with correct data', () => {
  const { getByText, getByAltText } = render(
    <Router>
      <EventCard event={sampleEvent} />
    </Router>
  );

  expect(getByText('Sample Event')).toBeInTheDocument();
  expect(getByAltText('Sample Event')).toBeInTheDocument(); // Corregir el atributo alt
  expect(getByText('Barcelona')).toBeInTheDocument();
  expect(getByText('Más Detalles')).toBeInTheDocument();
});

test('should render event card with different data', () => {
  const differentEvent = {
    id: 2,
    title: 'Different Event',
    image: 'different.jpg',
  };

  const { getByText, getByAltText } = render(
    <Router>
      <EventCard event={differentEvent} />
    </Router>
  );

  expect(getByText('Different Event')).toBeInTheDocument();
  expect(getByAltText('Different Event')).toBeInTheDocument();
  expect(getByText('Barcelona')).toBeInTheDocument();
  expect(getByText('Más Detalles')).toBeInTheDocument();
});
