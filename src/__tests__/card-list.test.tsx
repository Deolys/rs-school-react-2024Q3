import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CardList } from '@components/card-list';
import { mockCards } from '../test/__mocks__/mock-data';
import { MemoryRouter } from 'react-router-dom';

describe('CardList Component', () => {
  it('should render the specified number of cards', () => {
    const { container } = render(
      <MemoryRouter>
        <CardList cards={mockCards} isLoading={false} errorMessage={''} />
      </MemoryRouter>,
    );
    expect(container.querySelectorAll('.card')).toHaveLength(mockCards.length);
  });

  it('displays a message if no cards are present', () => {
    render(
      <MemoryRouter>
        <CardList cards={[]} isLoading={false} errorMessage="" />
      </MemoryRouter>,
    );
    expect(screen.getByText(/no cards found/i)).toBeInTheDocument();
  });

  it('displays an error message', () => {
    const testErrorMessage = 'Error fetching cards';
    render(
      <MemoryRouter>
        <CardList cards={[]} isLoading={false} errorMessage={testErrorMessage} />
      </MemoryRouter>,
    );
    expect(screen.getByText(testErrorMessage)).toBeInTheDocument();
  });

  it('displays loading state', () => {
    render(
      <MemoryRouter>
        <CardList cards={[]} isLoading={true} errorMessage="" />
      </MemoryRouter>,
    );
    expect(screen.getByTestId(/loading/i)).toBeInTheDocument();
  });
});
