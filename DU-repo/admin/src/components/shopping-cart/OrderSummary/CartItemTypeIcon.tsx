import { Avatar } from '@cerberus/react';
import {
  WatsonHealth3DCurveManual,
  Chemistry,
  Course,
  TestTool,
  CertificateCheck,
  Review
} from '@cerberus/icons';

type CartItemTypeIconProps = {
  type: string;
};

const typeIconMapping = {
  ForceMultiplier: WatsonHealth3DCurveManual,
  Skill: WatsonHealth3DCurveManual,
  LearningPath: WatsonHealth3DCurveManual,
  Lab: Chemistry,
  Course: Course,
  Exam: TestTool,
  Assessment: CertificateCheck,
  Survey: Review
};

export const CartItemTypeIcon = ({ type }: CartItemTypeIconProps) => {
  const Icon = typeIconMapping[type];

  return (
    <Avatar
      gradient="charon-light"
      ariaLabel=""
      size="xs"
      src=""
      icon={<Icon />}
    />
  );
};
