import { render, screen } from '@@/test-utils';
import { UserCard } from '.';

describe('search bar', () => {
  it('should render the search container', () => {
    const account = {
      firstName: 'first',
      lastName: 'last',
      email: 'email',
      branch: 'Air Force',
      userType: 'military',
      grade: 'Civilian',
      metadata: {
        command: 'Air Force',
        spaceDelta: 'Space Force',
        squadron: 'Space Force',
        wing: 'Air Force',
        dutyStation: 'base'
      }
    };
    render(<UserCard {...account} />);

    expect(
      screen.getByText(new RegExp(account.firstName, 'ig'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(account.lastName, 'ig'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(account.email, 'ig'))
    ).toBeInTheDocument();
  });

  it('should render the search container', () => {
    const account = {
      firstName: 'first',
      lastName: 'last',
      email: 'email',
      branch: 'Air Force',
      userType: null,
      grade: 'Civilian',
      metadata: {
        command: 'Air Force',
        spaceDelta: 'Space Force',
        squadron: 'Space Force',
        wing: 'Air Force',
        dutyStation: 'base'
      }
    };
    render(<UserCard {...account} />);

    expect(
      screen.getByText(new RegExp(account.firstName, 'ig'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(account.lastName, 'ig'))
    ).toBeInTheDocument();
    expect(screen.getByText('Onboarding not complete')).toBeInTheDocument();
  });
});
