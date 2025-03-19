import React from 'react';
import { render, screen, userEvent } from '@@/test-utils';
import { DropDownMenu } from '.';

describe('Drop Down Menu', () => {
  it('should render the drop down menu', () => {
    const { container } = render(<DropDownMenu links={[]} />);

    const element = container.querySelector('[tabindex="-1"]');
    expect(element).toBeInTheDocument();
  });

  it('should call onClick when a drop down menu item is clicked', () => {
    const changeGroupName = jest.fn();
    render(
      <DropDownMenu
        onSelect={jest.fn()}
        links={[
          {
            title: 'Change Group Name',
            sx: {},
            onClick: changeGroupName
          },
          {
            title: 'Delete Group',
            sx: { color: 'red' },
            onClick: jest.fn()
          }
        ]}
      />
    );

    userEvent.click(screen.getByText('Change Group Name'));
    expect(changeGroupName).toBeCalled();
  });

  it('should call onBlur when the drop down menu loses focus', () => {
    const changeFocus = jest.fn();
    render(
      <div>
        <DropDownMenu
          onSelect={jest.fn()}
          links={[
            {
              title: 'Change Group Name',
              sx: {},
              onClick: jest.fn()
            },
            {
              title: 'Delete Group',
              sx: { color: 'red' },
              onClick: jest.fn
            }
          ]}
          onBlur={changeFocus}
        />
        <button type="button">unfocus</button>
      </div>
    );

    userEvent.type(screen.getByText('Change Group Name'), '{enter}');
    expect(changeFocus).toBeCalled();
  });
});
