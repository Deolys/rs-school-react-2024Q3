import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CardDetails } from '@/components/card-details';
import { mockCard } from '@/test/__mocks__/mock-data';

describe('CardDetails', () => {
  it('correctly displays the detailed card data', () => {
    render(<CardDetails card={mockCard} />);

    expect(screen.getByText(mockCard.title)).toBeInTheDocument();
    expect(screen.getByText(`Duration: ${mockCard.duration}`)).toBeInTheDocument();
    expect(screen.getByText(`Rank: ${mockCard.rank}`)).toBeInTheDocument();
    expect(screen.getByText(mockCard.synopsis)).toBeInTheDocument();
  });
});
