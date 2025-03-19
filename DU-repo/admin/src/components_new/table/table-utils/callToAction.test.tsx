import React from 'react';
import { render } from '@testing-library/react';
import { callToAction } from './callToAction';

describe('callToAction', () => {
  describe('!isServerSide', () => {
    it('renders no results message with global filter when filters are applied', () => {
      const hasFiltersApplied = true;
      const noDataMessage = <p>No data available</p>;
      const globalFilter = 'test filter';
      const { container } = render(
        callToAction(hasFiltersApplied, noDataMessage, globalFilter)
      );
      expect(container.textContent).toBe(
        'No results returned. Please try amending your search and/or filter criteria.'
      );
    });

    it('renders no results message when filters are applied without global filter', () => {
      const hasFiltersApplied = true;
      const noDataMessage = <p>No data available</p>;
      const { container } = render(
        callToAction(hasFiltersApplied, noDataMessage)
      );
      expect(container.textContent).toBe(
        'Your filter criteria did not return any results. Please try amending your filter criteria.'
      );
    });

    it('renders no results message with global filter when no filters are applied', () => {
      const hasFiltersApplied = false;
      const noDataMessage = <p>No data available</p>;
      const globalFilter = 'test filter';
      const { container } = render(
        callToAction(hasFiltersApplied, noDataMessage, globalFilter)
      );
      expect(container.textContent).toBe(
        'No results found for test filter. Please amend your search.'
      );
    });

    it('renders no data message when no filters are applied and no global filter', () => {
      const hasFiltersApplied = false;
      const noDataMessage = <p>No data available</p>;
      const { container } = render(
        callToAction(hasFiltersApplied, noDataMessage)
      );
      expect(container.textContent).toBe('No data available');
    });
  });
  describe('isServerSide', () => {
    it('renders no results message when filters are applied and search term is present', () => {
      const hasFiltersApplied = true;
      const searchTerm = 'example';
      const noDataMessage = <p>No data available</p>;
      const { container } = render(
        callToAction(hasFiltersApplied, noDataMessage, searchTerm)
      );
      expect(container.textContent).toBe(
        'No results returned. Please try amending your search and/or filter criteria.'
      );
    });

    it('renders no results message when filters are applied and no search term is present', () => {
      const hasFiltersApplied = true;
      const noDataMessage = <p>No data available</p>;
      const { container } = render(
        callToAction(hasFiltersApplied, noDataMessage)
      );
      expect(container.textContent).toBe(
        'Your filter criteria did not return any results. Please try amending your filter criteria.'
      );
    });

    it('renders no results message when no filters are applied and search term is present', () => {
      const hasFiltersApplied = false;
      const searchTerm = 'example';
      const noDataMessage = <p>No data available</p>;
      const { container } = render(
        callToAction(hasFiltersApplied, noDataMessage, searchTerm)
      );
      expect(container.textContent).toBe(
        'No results found for example. Please amend your search.'
      );
    });
  });
});
