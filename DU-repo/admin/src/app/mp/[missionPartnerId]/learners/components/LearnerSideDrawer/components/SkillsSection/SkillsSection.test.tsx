import { render, screen, waitFor, userEvent } from '@@/test-utils';
import { SkillsSection } from './SkillsSection';

jest.mock('@cerberus/react', () => {
  const actual = jest.requireActual('@cerberus/react');

  return {
    ...actual,
    Text: ({ children, onClick }) => <div onClick={onClick}>{children}</div>
  };
});

describe('SkillsSection', () => {
  it('renders null when skills array is empty', () => {
    const { container } = render(
      <SkillsSection skills={[]} isLoading={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders skills and no toggle when skills array length is less than DEFAULT_SKILLS_COUNT', () => {
    const skills = ['JavaScript', 'TypeScript', 'React'];
    render(<SkillsSection skills={skills} isLoading={false} />);

    expect(screen.getByText('Skills')).toBeInTheDocument();

    skills.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });

    expect(screen.queryByText(/more/)).toBeNull();
    expect(screen.queryByText(/Show Less/)).toBeNull();
  });

  it('renders only the default number of skills and a toggle when skills array length is greater than DEFAULT_SKILLS_COUNT', async () => {
    const totalSkills = 15;
    const skills = Array.from(
      { length: totalSkills },
      (_, i) => `Skill ${i + 1}`
    );
    render(<SkillsSection skills={skills} isLoading={false} />);

    expect(screen.getByText('Skills')).toBeInTheDocument();

    for (let i = 0; i < 12; i++) {
      expect(screen.getByText(`Skill ${i + 1}`)).toBeInTheDocument();
    }
    expect(screen.queryByText('Skill 13')).toBeNull();

    const toggleButton = screen.getByText('+3 more');
    expect(toggleButton).toBeInTheDocument();

    userEvent.click(toggleButton);

    await waitFor(() => {
      expect(screen.getByText(/Skill\s*13/)).toBeInTheDocument();
    });

    for (let i = 0; i < totalSkills; i++) {
      expect(screen.getByText(`Skill ${i + 1}`)).toBeInTheDocument();
    }
    expect(screen.getByText('Show Less')).toBeInTheDocument();
  });

  it('applies the correct aria-busy attribute based on isLoading prop', () => {
    const skills = ['JavaScript', 'TypeScript'];
    const { container, rerender } = render(
      <SkillsSection skills={skills} isLoading={true} />
    );
    expect(container.firstChild).toHaveAttribute('aria-busy', 'true');

    rerender(<SkillsSection skills={skills} isLoading={false} />);
    expect(container.firstChild).toHaveAttribute('aria-busy', 'false');
  });
});
