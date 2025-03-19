'use client';
import { useState } from 'react';
import { isEmpty } from 'lodash';
import { Tag, Text } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';

const DEFAULT_SKILLS_COUNT = 12;

interface SkillsSectionProps {
  skills: string[];
  isLoading: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills = [],
  isLoading
}) => {
  const [showAllSkills, setShowAllSkills] = useState(false);

  if (isEmpty(skills)) return null;

  const visibleSkills = showAllSkills
    ? skills
    : skills?.slice(0, DEFAULT_SKILLS_COUNT);
  const skillCountDifference = skills.length - DEFAULT_SKILLS_COUNT;

  return (
    <div
      aria-busy={isLoading}
      className={vstack({
        alignItems: 'flex-start',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'page.border.initial',
        borderRadius: 'md',
        gap: 15,
        rowGap: 4,
        mb: 6,
        padding: 4
      })}
    >
      <Text as="h5" textStyle="h5">
        Skills
      </Text>
      <div className={hstack({ flexWrap: 'wrap', gap: 4, rowGap: 4 })}>
        {visibleSkills.map(skill => (
          <Tag
            key={skill}
            palette="page"
            shape="pill"
            usage="filled"
            className={css({
              px: 4,
              py: 2,
              _hover: { bg: 'gradient.charon-dark.text.initial' }
            })}
          >
            {skill}
          </Tag>
        ))}
      </div>
      <div className={css({ textAlign: 'center', w: 'full' })}>
        {skills.length > DEFAULT_SKILLS_COUNT && (
          <Text
            as="small"
            onClick={() => setShowAllSkills(prev => !prev)}
            className={css({
              _hover: {
                textDecoration: 'underline',
                cursor: 'pointer'
              }
            })}
          >
            {showAllSkills ? 'Show Less' : `+${skillCountDifference} more`}
          </Text>
        )}
      </div>
    </div>
  );
};
