import { render, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '../components/footer/Footer';

afterEach(cleanup);

test('should render the text', () => {
    const { getByText } = render(
      <Router>
        <Footer />
      </Router>
    );
    expect(getByText('The Dating Lab')).toBeTruthy();
  });

  test('should render the links', () => {
    const { getByAltText } = render(
      <Router>
        <Footer />
      </Router>
    );
    expect(getByAltText('Instagram icon')).toBeTruthy();
    expect(getByAltText('Twitter icon')).toBeTruthy();
    expect(getByAltText('LinkedIn icon')).toBeTruthy();
   });
   