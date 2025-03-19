import type { BlockTypeMetadata } from '@digital-u/services/block/types';
import { renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import { SlashMenu } from './SlashMenu';

jest.mock('@digital-u/services/block/create-block', () => ({
  createBlock: jest.fn()
}));

jest.mock('../../../../actions/append-block', () => ({
  appendBlockFromSlashMenu: jest.fn()
}));

// Testing entirety of SlashMenu component, including children
// Unfortunately, formAction cannot be tested here as js-dom does not support it
describe('SlashMenu', () => {
  const SEARCH_PLACEHOLDER = `Add in content like a slide deck, etc. search by pressing '/'`;

  const mockAllowedChildrenMetadata: BlockTypeMetadata[] = [
    {
      id: 'module',
      name: 'Module',
      description: 'Module description',
      icon: 'user',
      referenceOnly: false,
      organizational: true,
      root: false,
      allowedChildren: []
    },
    {
      id: 'assessment',
      name: 'Assessment',
      description: 'Assessment description',
      icon: 'user',
      referenceOnly: false,
      organizational: false,
      root: true,
      allowedChildren: ['module']
    }
  ];

  it('should render', () => {
    renderV3(<SlashMenu allowedChildrenMetadata={[]} />);

    expect(screen.getByPlaceholderText(SEARCH_PLACEHOLDER)).toBeInTheDocument();
  });

  it('should show the slash menu when the user types a slash', async () => {
    renderV3(
      <SlashMenu allowedChildrenMetadata={mockAllowedChildrenMetadata} />
    );

    userEvent.type(screen.getByPlaceholderText(SEARCH_PLACEHOLDER), '/');

    await waitFor(() => {
      expect(screen.getByText('Module')).toBeInTheDocument();
      expect(screen.getByText('Assessment')).toBeInTheDocument();
    });
  });

  it('should show the slash menu when the user clicks the add button', async () => {
    renderV3(
      <SlashMenu allowedChildrenMetadata={mockAllowedChildrenMetadata} />
    );

    userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Module')).toBeInTheDocument();
      expect(screen.getByText('Assessment')).toBeInTheDocument();
    });
  });
});
