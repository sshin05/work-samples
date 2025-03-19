import { InlineNotification } from '@digital-u/digital-ui';
import { Button } from '@cerberus/react';
import { hstack } from '@cerberus/styled-system/patterns';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { btnStyles } from './licenseRequestModalContent.styles';
import { css } from '@cerberus/styled-system/css';

interface LicenseRequestProps {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userId: string;
  userOrganization: string;
  requestedAt: string;
  vendorName: string;
  vendorId: string;
  approvedAt: string;
  declinedAt: string;
  id: string;
  missionPartnerId: string;
  missionPartnerName: string;
}

interface LicenseRequestModalProps {
  request: LicenseRequestProps | null;
  onApprove: () => void;
  onDecline: () => void;
  onApproveLoading: boolean;
  onDeclineLoading: boolean;
  error: string;
  onClose: () => void;
}

export const LicenseRequestModalContent = ({
  request,
  onApprove,
  onDecline,
  onApproveLoading,
  onDeclineLoading,
  error,
  onClose
}: LicenseRequestModalProps) => {
  const buttonDisabled = Boolean(error);
  const errorMessage = error;

  if (!request) return null;

  return (
    <>
      {errorMessage && (
        <InlineNotification
          kind="error"
          variant="dark"
          heading="License request error"
          subheading={errorMessage}
          onClose={() => {
            onClose();
          }}
        />
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridRowGap: '2rem',
          gridColumnGap: '1.5rem'
        }}
      >
        <div>
          <p className={css({ fontWeight: 'bold' })}>Name</p>
          <p>
            {request.userFirstName} {request.userLastName}
          </p>
        </div>
        <div>
          <p className={css({ fontWeight: 'bold' })}>Type</p>
          <p>License Request</p>
        </div>
        <div>
          <p className={css({ fontWeight: 'bold' })}>Date</p>
          <p>{abbreviatedDayDate(request.requestedAt)}</p>
        </div>
        <div>
          <p className={css({ fontWeight: 'bold' })}>Email</p>
          <p>{request.userEmail}</p>
        </div>
        <div>
          <p className={css({ fontWeight: 'bold' })}>Vendor</p>
          <p>{request.vendorName || ''}</p>
        </div>
      </div>
      <div
        className={hstack({
          width: 'full',
          height: 'full',
          gap: '1',
          mt: '8'
        })}
      >
        <Button
          className={btnStyles}
          usage="filled"
          type="button"
          palette="action"
          shape="rounded"
          onClick={() => {
            onApprove();
          }}
          disabled={buttonDisabled || onDeclineLoading}
        >
          Approve
        </Button>
        <Button
          className={btnStyles}
          usage="outlined"
          type="button"
          palette="action"
          shape="rounded"
          onClick={() => {
            onDecline();
          }}
          disabled={buttonDisabled || onApproveLoading}
        >
          Deny
        </Button>
      </div>
    </>
  );
};
