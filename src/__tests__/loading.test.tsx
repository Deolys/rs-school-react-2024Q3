import '@testing-library/jest-dom';
import { Loading } from '@/components/loading';
import { render, screen } from '@testing-library/react';

describe('Loading', () => {
  it('renders correctly', () => {
    render(<Loading />);
    const loading = screen.getByTestId('loading');
    expect(loading).toBeInTheDocument();
  });
});
