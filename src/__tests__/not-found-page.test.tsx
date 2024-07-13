import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { NotFoundPage } from '../pages/not-found-page';
import { MemoryRouter } from 'react-router-dom';

describe('NotFoundPage', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );
    const message = screen.getByText(/page not found/i);
    expect(1).toBe(2);
    expect(message).toBeInTheDocument();
  });
});
