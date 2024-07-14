import '@testing-library/jest-dom';
import type { JSX, ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '@components/error-boundary';

const ProblemChild = (): ReactNode => {
  throw new Error('Error thrown from problem child');
};

const Fallback = (): JSX.Element => {
  return <h1>Test fallback</h1>;
};

describe('<ErrorBoundary />', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('displays the component, when there is no error', () => {
    render(
      <ErrorBoundary fallback={<Fallback />}>
        <div>no problems here</div>
      </ErrorBoundary>,
    );
    expect(screen.getByText('no problems here')).toBeInTheDocument();
  });

  it('displays a message, when there is an error', () => {
    render(
      <ErrorBoundary fallback={<Fallback />}>
        <ProblemChild />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Test fallback')).toBeInTheDocument();
  });
});
