import { hstack } from '@cerberus/styled-system/patterns';
import { Locked } from '@cerberus/icons';
import { Tag, type StaticTagProps } from '@cerberus/react';
import type { ReactNode, JSX } from 'react';
import { css, cx } from '@cerberus/styled-system/css';

type StyledTagProps = StaticTagProps & {
  children: ReactNode;
  className?: string;
};
const StyledTag = ({ children, className, ...props }: StyledTagProps) => (
  <Tag
    shape="square"
    usage="outlined"
    {...props}
    className={cx(
      css({
        color: 'page.text.200',
        textStyle: 'sm',
        lineHeight: '125%',
        letterSpacing: '-0.01',
        py: '1',
        px: '3',
        alignItems: 'center'
      }),
      className
    )}
  >
    {children}
  </Tag>
);

type Props = {
  labels: string[];
};

/**
 * Renders a collection of styled tags based on the provided labels.
 *
 * - Unhandled labels will render as a default styled tag.
 *
 * @param {Props} props - The props object.
 * @param {string[]} props.labels - An array of label strings to render as styled tags.
 *
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * const labels = ['Private', 'Live'];
 * <ClassroomTags labels={labels} />;
 * ```
 */
export const ClassroomTags = ({ labels }: Props) => {
  const renderLabel = (label: string): JSX.Element => {
    switch (label.toLowerCase()) {
      case 'private':
        return (
          <StyledTag palette="page" usage="outlined" key={label}>
            <Locked size={16} />
            {label}
          </StyledTag>
        );
      case 'upcoming':
        return (
          <StyledTag
            palette="info"
            gradient="amphiaraus-light"
            usage="filled"
            key={label}
          >
            {label}
          </StyledTag>
        );
      case 'ended':
        return (
          <StyledTag
            palette="info"
            gradient="amphiaraus-dark"
            usage="filled"
            key={label}
          >
            {label}
          </StyledTag>
        );
      case 'draft':
        return (
          <StyledTag
            palette="info"
            usage="filled"
            key={label}
            className={css({
              bgColor: 'cerberus.neutral.10'
            })}
          >
            {label}
          </StyledTag>
        );
      case 'live':
        return (
          <StyledTag
            palette="info"
            gradient="nyx-light"
            usage="filled"
            key={label}
          >
            {label}
          </StyledTag>
        );
      default:
        return <StyledTag key={label}>{label}</StyledTag>;
    }
  };

  return (
    <div className={hstack({ gap: '2', flexWrap: 'wrap' })}>
      {labels.map(renderLabel)}
    </div>
  );
};
