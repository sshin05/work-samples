import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { Profile } from '../Profile/Profile';
import { userMock } from '.././mocks';

describe('<Profile />', () => {
  it('should render', () => {
    renderV3(<Profile user={userMock} loading={false} />);

    expect(screen.getByText('Branch').nextElementSibling).toHaveTextContent(
      'toon'
    );
    expect(screen.getByText('User Type').nextElementSibling).toHaveTextContent(
      'main character'
    );
    expect(screen.getByText('MAJCOM').nextElementSibling).toHaveTextContent(
      'Toon Army'
    );
    expect(
      screen.getByText('Wing or equivalent').nextElementSibling
    ).toHaveTextContent('Loney Toons');
    expect(screen.getByText('Grade').nextElementSibling).toHaveTextContent(
      'Head Toon'
    );
    expect(
      screen.getByText('Duty Station').nextElementSibling
    ).toHaveTextContent('Toontown');
    expect(screen.getByText('AFSC').nextElementSibling).toHaveTextContent(
      '17TOON'
    );
    expect(
      screen.getByText('Current Career (Optional)').nextElementSibling
    ).toHaveTextContent('-');
  });
});
