import '@testing-library/jest-dom';
import NotFoundPage from '@/app/not-found';
import { render } from '@testing-library/react';

describe('Not found page', () => {
  it('should render', () => {
    const { container } = render(<NotFoundPage />);
    expect(container).toBeInTheDocument();
  });
});
