import PropTypes from 'prop-types';
import { Flex } from '@digital-u/digital-ui';
import { BaseSkeleton } from '@/components_new/loaders';
import { Text } from '@/components_new/deprecated/Text';

const DashboardCard = ({
  headingTitle,
  headingValue,
  footerTitle,
  footerValue,
  loading = false,
  sx
}) => {
  return loading ? (
    <Flex direction="column" style={{ ...sx }}>
      <BaseSkeleton height={90} />
    </Flex>
  ) : (
    <Flex direction="column" style={{ ...sx }}>
      <Text
        sx={{
          color: 'black',
          fontSize: '18px',
          fontWeight: 'bold',
          pb: '3px'
        }}
      >
        {headingTitle}
      </Text>

      <Text
        sx={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: 'black',
          pb: '3px'
        }}
      >
        {headingValue ? headingValue.toLocaleString('en-US') : 0}
      </Text>

      <Text
        sx={{
          fontSize: '18px',
          color: 'black'
        }}
      >
        <span style={{ fontWeight: 'bold' }}>
          {footerValue && footerValue !== 'NA'
            ? footerValue.toLocaleString('en-US')
            : footerValue
              ? ' '
              : 0}{' '}
        </span>
        {footerTitle}
      </Text>
    </Flex>
  );
};

DashboardCard.propTypes = {
  headingTitle: PropTypes.string.isRequired,
  headingValue: PropTypes.number,
  footerTitle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  footerValue: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number
  ]),
  sx: PropTypes.object
};
export default DashboardCard;
