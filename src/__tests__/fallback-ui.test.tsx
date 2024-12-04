import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { FallbackUI } from '@/components/fallback-ui';

describe('Fallback UI', () => {
  it('should render correctly', () => {
    const { container } = render(<FallbackUI />);

    expect(container).toBeInTheDocument();
  });
});
