import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { TabContent } from './TabContent';

const TITLE = 'Test Title';
const TEXT = 'Test content';

describe('TabContent', () => {
  it('renders the title and children correctly', () => {
    renderV3(
      <TabContent title={TITLE}>
        <p>{TEXT}</p>
      </TabContent>
    );

    const titleElement = screen.getByText(TITLE);
    const contentElement = screen.getByText(TEXT);

    expect(titleElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
  });
});
