import {
  CarbonIconType,
  User,
  UserMultiple,
  UserSpeaker
} from '@carbon/icons-react';
import { Avatar } from '@cerberus/react';
import { Icon } from '@digital-u/services/block/types';

const iconMap: Record<Icon, CarbonIconType> = {
  user: User,
  user_group: UserMultiple,
  user_speaker: UserSpeaker
};

export const BlockIcon = ({
  icon,
  size = 24
}: {
  icon: Icon;
  size?: number;
}) => {
  const Icon = iconMap[icon];

  return (
    <Avatar
      gradient="charon-light"
      size="md"
      icon={<Icon size={size} />}
      ariaLabel=""
      src=""
    />
  );
};
