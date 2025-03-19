import React from 'react';
import { render, screen, userEvent } from '@@/test-utils';
import { Icon } from '../Icon';
import { DropDown } from '.';

describe('Drop Down', () => {
  it('should render the drop down', () => {
    const { container } = render(<DropDown links={[]} />);
    screen.debug();

    const element = container.querySelector('[tabindex="-1"]');
    expect(element).toBeInTheDocument();
  });

  it('should show drop down menu when drop down component is clicked', async () => {
    render(
      <DropDown
        links={[
          {
            title: 'Change Group Name',
            sx: {},
            onClick: jest.fn()
          },
          {
            title: 'Delete Group',
            sx: { color: 'red' },
            onClick: jest.fn()
          }
        ]}
        placeholder="action"
        showTextbox
      />
    );

    userEvent.click(screen.getByText('action'));

    const changeGroupElement = await screen.findByText('Change Group Name');
    expect(changeGroupElement).toBeInTheDocument();
  });

  it('should show drop down menu when the enter key is pressed on the placeholder action', async () => {
    render(
      <DropDown
        links={[
          {
            title: 'Change Group Name',
            sx: {},
            onClick: jest.fn()
          },
          {
            title: 'Delete Group',
            sx: { color: 'red' },
            onClick: jest.fn()
          }
        ]}
        placeholder="action"
        showTextbox
      />
    );

    userEvent.type(screen.getByText('action'), '{enter}');

    const changeGroupElement = await screen.findByText('Change Group Name');
    expect(changeGroupElement).toBeInTheDocument();
  });

  it('should show drop down menu when the enter key is pressed w/ focus on the drop-down icon', async () => {
    render(
      <DropDown
        icon={
          <Icon
            name="arrow_drop_down"
            size="m"
            sx={{
              color: 'black',
              verticalAlign: 'middle'
            }}
            data-testid="icon-arrow-drop-down"
          />
        }
        links={[
          {
            title: 'Change Group Name',
            sx: {},
            onClick: jest.fn()
          },
          {
            title: 'Delete Group',
            sx: { color: 'red' },
            onClick: jest.fn()
          }
        ]}
        placeholder="action"
        showTextbox
      />
    );

    userEvent.type(screen.getByTestId('icon-arrow-drop-down'), '{enter}');

    const changeGroupElement = await screen.findByText('Change Group Name');
    expect(changeGroupElement).toBeInTheDocument();
  });

  it('should show drop down menu and call onBlur when focus is lost', async () => {
    const onBlur = jest.fn();
    render(
      <div>
        <button type="button">unfocus</button>
        <DropDown
          icon={
            <Icon
              name="arrow_drop_down"
              size="m"
              sx={{
                color: 'black',
                verticalAlign: 'middle'
              }}
              data-testid="icon-arrow-drop-down"
            />
          }
          links={[
            {
              title: 'Change Group Name',
              sx: {},
              onClick: jest.fn()
            },
            {
              title: 'Delete Group',
              sx: { color: 'red' },
              onClick: jest.fn()
            }
          ]}
          onBlur={onBlur}
          placeholder="action"
          showTextbox
        />
      </div>
    );

    userEvent.type(screen.getByTestId('icon-arrow-drop-down'), '{enter}');

    const changeGroupElement = await screen.findByText('Change Group Name');
    expect(changeGroupElement).toBeInTheDocument();

    userEvent.click(screen.getByText('unfocus'));
    expect(onBlur).toBeCalled();
  });

  it('should show drop down menu when with the correct userSelectedValue', async () => {
    render(
      <DropDown
        icon={
          <Icon
            name="arrow_drop_down"
            size="m"
            sx={{
              color: 'black',
              verticalAlign: 'middle'
            }}
            data-testid="icon-arrow-drop-down"
          />
        }
        links={[
          {
            title: 'Change Group Name',
            sx: {},
            onClick: jest.fn()
          },
          {
            title: 'Delete Group',
            sx: { color: 'red' },
            onClick: jest.fn()
          }
        ]}
        placeholder="action"
        userSelectedValue="Delete Group"
        showTextbox
      />
    );

    userEvent.click(screen.getByText('Delete Group'));
    const changeGroupElement = await screen.findByText('Change Group Name');
    expect(changeGroupElement).toBeInTheDocument();
    expect(screen.getAllByText('Delete Group')[1]).toBeInTheDocument();
  });
});
