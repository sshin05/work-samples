import { TrainingLibraryCard } from '.';
import { screen, render } from '@@/test-utils';

describe('TrainingLibraryCard', () => {
  it('should render TrainingLibraryCard', () => {
    render(
      <TrainingLibraryCard
        title="title"
        value={2}
        unit="foo"
        href="foo"
        buttonText="text"
        vendors={2}
      />
    );
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getAllByText('2')).toHaveLength(2);
    expect(screen.getByText('foos')).toBeInTheDocument();
    expect(screen.getByText('text')).toBeInTheDocument();
  });
});
