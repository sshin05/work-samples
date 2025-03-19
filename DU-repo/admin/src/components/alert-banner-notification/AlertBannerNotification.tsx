import { InlineNotification } from '@digital-u/digital-ui';

interface InlineAlertProps {
  heading: string;
  subheading: string;
  canClose?: boolean;
}

const EMPTY_LINK_INNER = '<p></p>\n';

const handleClose = canClose => {
  if (canClose) return () => undefined;
};

const AlertBannerNotification = ({
  heading,
  subheading,
  canClose = false
}: InlineAlertProps) => (
  <InlineNotification
    heading={heading}
    subheading={
      subheading === EMPTY_LINK_INNER ? 'Content goes here' : subheading
    }
    onClose={handleClose(canClose)}
    isContentRich
    variant="dark"
    style={{ filter: 'drop-shadow(rgba(0,0,0,0.25) 4px 6px 4px)' }}
  />
);

export default AlertBannerNotification;
