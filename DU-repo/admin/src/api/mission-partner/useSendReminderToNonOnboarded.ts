import { gql, useLazyQuery } from '@apollo/client';
import type {
  SendReminderToNonOnboardedQuery,
  SendReminderToNonOnboardedQueryVariables
} from '@/api/codegen/graphql';

export const useSendReminderToNonOnboarded = () => {
  const query = gql`
    query SendReminderToNonOnboarded($missionPartnerId: ID!) {
      sendReminderToNonOnboarded(missionPartnerId: $missionPartnerId) {
        successfulEmailsSent
        emailsNotSent
      }
    }
  `;
  const [sendReminderToNonOnboarded, { loading, error, data }] = useLazyQuery<
    SendReminderToNonOnboardedQuery,
    SendReminderToNonOnboardedQueryVariables
  >(query);
  return {
    sendReminderToNonOnboarded,
    sendReminderToNonOnboardedLoading: loading,
    sendReminderToNonOnboardedError: error,
    sendReminderToNonOnboardedData: data?.sendReminderToNonOnboarded
  };
};
