import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { MainAsideDetails } from '@components/main-aside-details';
import { MemoryRouter } from 'react-router-dom';
import renderWithProviders from '../test/utils/redux-provider';

describe('MainAsideDetails', () => {
  it('hides the component by clicking the close button ', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/?details=1']}>
        <MainAsideDetails />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: /cross/i }));
    await waitFor(() => {
      expect(screen.queryByRole('aside')).not.toBeInTheDocument();
    });
  });
});
