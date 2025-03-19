import * as React from 'react';
import { BaseSkeleton } from '@/components_new/loaders';
import { css } from '@cerberus/styled-system/css';
import {
  categoryStyles,
  containerStyles,
  dataStyles,
  profileStyles
} from './Profile.styles';
interface User {
  branch?: string;
  userType?: string;
  metadata?: {
    command?: string;
    wing?: string;
    dutyStation?: string;
  };
  grade?: string;
  occupationalCode?: string;
  currentCareer?: string;
}

interface ProfileProps {
  user: User;
  loading: boolean;
}

export const Profile = ({ user, loading }: ProfileProps) => {
  const profileData = [
    { Branch: user?.branch },
    { 'User Type': user?.userType },
    { MAJCOM: user?.metadata?.command },
    { 'Wing or equivalent': user?.metadata?.wing },
    { Grade: user?.grade },
    { 'Duty Station': user?.metadata?.dutyStation },
    { AFSC: user?.occupationalCode },
    { 'Current Career (Optional)': user?.currentCareer }
  ];

  return (
    <div className={css({ mt: '8', w: 'full' })}>
      <p className={profileStyles}>Profile Data</p>
      <div className={containerStyles}>
        {profileData.map((itemRow, index) => {
          return (
            <div key={index}>
              {Object.keys(itemRow).map(key => {
                return (
                  <div key={key}>
                    <p className={categoryStyles}>
                      {loading ? <BaseSkeleton /> : key}
                    </p>
                    <p className={dataStyles}>
                      {loading ? (
                        <BaseSkeleton />
                      ) : itemRow[key] ? (
                        itemRow[key]
                      ) : (
                        '-'
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
