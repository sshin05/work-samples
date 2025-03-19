import type { Ksat } from '@/api/codegen/graphql';
import { EnterKsatModal } from '@/app/sys/dcwf/components/DcwfPage/components/DcwfTabs/components/KsatTab/components/EnterKsatModal';
import { type UseModalReturnValue } from '@cerberus/react';

interface EditKsatModalProps {
  modal: UseModalReturnValue;
  ksat: Ksat;
}

export const EditKsatModal = ({ modal, ksat }: EditKsatModalProps) => {
  return <EnterKsatModal modal={modal} ksat={ksat} />;
};
