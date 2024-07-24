import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { NotFoundPage } from '@/pages/404';

describe('NotFoundPage', () => {
  it('should render correctly', () => {
    render(<NotFoundPage />);
    const message = screen.getByText(/page not found/i);
    expect(message).toBeInTheDocument();
  });
});
