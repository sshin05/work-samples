import { isEmpty, get } from 'lodash';
import type { FindUserByIdQuery } from '@/api/codegen/graphql';
import { SideDrawerDetailsCard } from '../SideDrawer/components/SideDrawerDetailsCard';
import { css } from '@cerberus/styled-system/css';

interface UserDetailsSectionProps {
  user?: FindUserByIdQuery['findUserById'] | null;
  isLoading: boolean;
  staticDetailsDictionary: Record<string, string>;
  branchDetailsMapping: Record<string, Record<string, string>>;
}
export const UserDetailsSection: React.FC<UserDetailsSectionProps> = ({
  user,
  isLoading,
  staticDetailsDictionary,
  branchDetailsMapping
}) => {
  if (!user) return null;

  const renderDetailCards = (detailsDictionary: Record<string, string>) => {
    if (isEmpty(detailsDictionary)) return null;

    return Object.entries(detailsDictionary).map(([label, key]) => (
      <SideDrawerDetailsCard key={label} label={label} value={get(user, key)} />
    ));
  };

  const branchDetails = user.branch
    ? renderDetailCards(branchDetailsMapping[user.branch] || {})
    : null;

  return (
    <div
      aria-busy={isLoading}
      className={css({
        mb: 6,
        padding: 4,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'page.border.initial',
        borderRadius: 'md',
        rowGap: 4,
        gap: 15
      })}
    >
      {renderDetailCards(staticDetailsDictionary)}
      {branchDetails}
    </div>
  );
};
