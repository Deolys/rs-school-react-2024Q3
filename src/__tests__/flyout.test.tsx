import '@testing-library/jest-dom';
import { Flyout } from '@components/flyout';
import renderWithProviders from '../test/utils/redux-provider';
import convertJSONToCSV from '@components/flyout/convert-json-to-csv';
import { mockCards, mockColumnNames, mockJsonData } from '../test/__mocks__/mock-data';

describe('Flyout', () => {
  URL.createObjectURL = jest.fn();

  it('shows the amount of selected cards', () => {
    const { container } = renderWithProviders(<Flyout />, {
      preloadedState: {
        selectedCards: mockCards,
      },
    });

    const selectedCount = container.querySelector('.selectedCount');
    expect(selectedCount).toBeInTheDocument();
    expect(selectedCount).toHaveTextContent('3');
  });
});

describe('convertJSONToCSV', () => {
  it('returns empty string when no data provided', () => {
    const result = convertJSONToCSV([], mockColumnNames);
    expect(result).toBe('');
  });

  it('converts JSON to CSV with correct headers', () => {
    const expectedHeaders = mockColumnNames.join(';') + '\n';
    const result = convertJSONToCSV(mockJsonData, mockColumnNames);
    expect(result.startsWith(expectedHeaders)).toBeTruthy();
  });

  it('converts JSON to CSV with correct values', () => {
    const expectedRows = [`"value1";"value2"`, `"value3";"value4"`].join('\n');
    const result = convertJSONToCSV(mockJsonData, mockColumnNames);
    expect(result.includes(expectedRows)).toBeTruthy();
  });
});
