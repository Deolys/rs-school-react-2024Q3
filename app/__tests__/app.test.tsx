import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('should render correctly', () => {
    const { container } = render(<App />);

    expect(container).toBeInTheDocument();
  });
});
