export interface UserCardProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  branch?: string;
  userType?: string;
  grade?: string;
  metadata?: {
    command?: string;
    spaceDelta?: string;
    squadron?: string;
    wing?: string;
    dutyStation?: string;
  };
  sx?: React.CSSProperties;
}

interface CardFormatItem {
  label: string;
  value: string | number | undefined;
}

export type CardFormat = Record<string, Record<string, CardFormatItem[]>>;
