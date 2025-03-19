'use client';

import { useFindLearnersTotal } from '@/api/mission-partner/useFindLearnersTotal';
import { Text } from '@cerberus/react';

interface LearnersSubheadingProps {
  missionPartnerId: string;
}

const LearnersSubheading = (props: LearnersSubheadingProps) => {
  const { learnersTotal } = useFindLearnersTotal({
    missionPartnerId: props.missionPartnerId
  });

  return (
    <Text color="page.text.100" display="inline-flex">
      {learnersTotal.toLocaleString()} learners
    </Text>
  );
};

export default LearnersSubheading;
