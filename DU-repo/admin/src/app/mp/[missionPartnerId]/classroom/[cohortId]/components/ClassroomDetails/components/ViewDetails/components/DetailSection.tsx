import { css } from '@cerberus/styled-system/css';

type DetailSectionProps = {
  sectionTitle: string;
  children: React.ReactNode;
};

export const DetailSection = ({
  sectionTitle,
  children
}: DetailSectionProps) => (
  <div>
    <h3 className={css({ mb: 2, textStyle: 'heading-2xs' })}>{sectionTitle}</h3>
    {children}
  </div>
);
