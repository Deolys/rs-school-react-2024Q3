import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { Card } from '@/components/card';
import { mockCard } from '@/test/__mocks__/mock-data';
import renderWithProviders from '@/test/utils/redux-provider';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

describe('Card Component', () => {
  it('renders the relevant card data', () => {
    renderWithProviders(
      <MemoryRouterProvider>
        <Card card={mockCard} />
      </MemoryRouterProvider>,
    );
    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('7.5')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('Action, Adventure')).toBeInTheDocument();
    expect(screen.getByAltText('Title 1')).toHaveAttribute('src', 'https://example.com/image1.jpg');
  });

  it('toggles the checkbox by click', () => {
    renderWithProviders(
      <MemoryRouterProvider>
        <Card card={mockCard} />
      </MemoryRouterProvider>,
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
