import App from '@/root';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

jest.mock('@remix-run/react', () => ({
  Links: () => {},
  Meta: () => {},
  Outlet: () => {},
  Scripts: () => {},
}));

window.matchMedia = jest.fn().mockImplementation(() => ({}));

describe('root', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => {
    consoleSpy.mockRestore();
  });
  it('should render', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
