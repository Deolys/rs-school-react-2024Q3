import RootLayout from '@/app/layout';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Layout', () => {
  window.matchMedia = jest.fn().mockImplementation(() => 'light');
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('should render', () => {
    const { container } = render(<RootLayout />);
    expect(container).toBeInTheDocument();
  });
});
