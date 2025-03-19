import { render, screen } from '@@/test-utils';
import { SideDrawerFooter } from './SideDrawerFooter';

describe('SideDrawerFooter', () => {
  it('renders its children', () => {
    render(
      <SideDrawerFooter>
        <p>Footer Content</p>
      </SideDrawerFooter>
    );
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });
});
