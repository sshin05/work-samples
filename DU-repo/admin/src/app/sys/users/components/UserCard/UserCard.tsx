import React from 'react';
import { Heading } from '@/components_new/deprecated/Heading';
import type { CardFormat, UserCardProps } from './UserCard.types';
import { Text } from '@/components_new/deprecated/Text';
import { css } from '@cerberus/styled-system/css';

export const UserCard: React.FC<UserCardProps> = ({
  firstName,
  lastName,
  email,
  branch,
  userType,
  grade,
  metadata
}) => {
  const cardFormat: CardFormat = {
    military: {
      'Air Force': [
        {
          label: 'Branch',
          value: branch
        },
        {
          label: 'User Type',
          value: userType
        },
        {
          label: 'Command',
          value: metadata?.command
        },
        {
          label: 'Wing or Equivalent',
          value: metadata?.wing
        },
        {
          label: 'Rank',
          value: grade
        },
        {
          label: 'Duty Station',
          value: metadata?.dutyStation
        }
      ],
      'Space Force': [
        {
          label: 'Branch',
          value: branch
        },
        {
          label: 'User Type',
          value: userType
        },
        {
          label: 'Space Delta',
          value: metadata?.spaceDelta
        },
        {
          label: 'Unit',
          value: metadata?.squadron
        },
        {
          label: 'Rank',
          value: grade
        },
        {
          label: 'Duty Station',
          value: metadata?.dutyStation
        }
      ],
      Navy: [
        {
          label: 'Branch',
          value: branch
        },
        {
          label: 'User Type',
          value: userType
        }
      ]
    },
    civilian: {
      'Air Force': [
        {
          label: 'Branch',
          value: branch
        },
        {
          label: 'User Type',
          value: userType
        },
        {
          label: 'Command',
          value: metadata?.command
        },
        {
          label: 'Wing or Equivalent',
          value: metadata?.wing
        },
        {
          label: 'Grade',
          value: grade
        },
        {
          label: 'Duty Station',
          value: metadata?.dutyStation
        }
      ],
      'Space Force': [
        {
          label: 'Branch',
          value: branch
        },
        {
          label: 'User Type',
          value: userType
        },
        {
          label: 'Space Delta',
          value: metadata?.spaceDelta
        },
        {
          label: 'Unit',
          value: metadata?.squadron
        },
        {
          label: 'Grade',
          value: grade
        },
        {
          label: 'Duty Station',
          value: metadata?.dutyStation
        }
      ]
    },
    contractor: {
      'Air Force': [
        {
          label: 'Branch',
          value: branch
        },
        {
          label: 'User Type',
          value: userType
        },
        {
          label: 'Command',
          value: metadata?.command
        },
        {
          label: 'Wing or Equivalent',
          value: metadata?.wing
        },
        {
          label: 'Grade',
          value: grade
        },
        {
          label: 'Duty Station',
          value: metadata?.dutyStation
        }
      ],
      'Space Force': [
        {
          label: 'Branch',
          value: branch
        },
        {
          label: 'User Type',
          value: userType
        },
        {
          label: 'Space Delta',
          value: metadata?.spaceDelta
        },
        {
          label: 'Unit',
          value: metadata?.squadron
        },
        {
          label: 'Grade',
          value: grade
        },
        {
          label: 'Duty Station',
          value: metadata?.dutyStation
        }
      ]
    }
  };

  return (
    <div
      className={css({
        background: 'white',
        borderRadius: '6px',
        pt: '3',
        pr: '6',
        pb: '3',
        pl: '6',
        mt: '4',
        mb: '4'
      })}
    >
      <Heading as="h3" context="light">
        {firstName} {lastName} ({email})
      </Heading>
      {userType ? (
        <div className={css({ width: '100%', pt: '8px' })}>
          {cardFormat[userType.toLowerCase()][branch]?.map(
            ({ label, value }) => (
              <div key={label}>
                <Text size="s" context="light">
                  {label}:{' '}
                </Text>
                <Text context="light">{value}</Text>
              </div>
            )
          )}
        </div>
      ) : (
        <Text size="m" context="light">
          Onboarding not complete
        </Text>
      )}
    </div>
  );
};
