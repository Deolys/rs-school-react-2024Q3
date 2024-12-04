import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { NotFoundPage } from '@/routes/$';
import { ReactNode } from 'react';

jest.mock('@remix-run/react', () => ({
  Link: (props: { children: ReactNode }) => <>{props.children}</>,
}));

describe('NotFoundPage', () => {
  it('should render correctly', () => {
    render(<NotFoundPage />);
    const message = screen.getByText(/page not found/i);
    expect(message).toBeInTheDocument();
  });
});
