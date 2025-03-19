import { Box, Text, Flex } from '@digital-u/digital-ui';

export interface RingProgressBarProps {
  percentage?: number;
  provisionedLicenses: number;
}

export const RingProgressBar = ({
  percentage = 0,
  provisionedLicenses
}: RingProgressBarProps) => {
  const percentComplete = ((100 - percentage) / 100) * 68 * Math.PI;
  const percentIncomplete = (percentage / 100) * 68 * Math.PI;

  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      {provisionedLicenses === -1 ? (
        <Box>
          <Text
            variant="dark"
            size="h1"
            style={{ position: 'absolute', top: 40, left: 50 }}
          >
            ∞
          </Text>
        </Box>
      ) : (
        <Box>
          <Text
            variant="dark"
            fontWeight="semiBold"
            style={{ position: 'absolute', top: 50, left: 55 }}
          >
            {percentage}%
          </Text>
          <Text
            variant="dark"
            style={{ position: 'absolute', top: 65, left: 50 }}
          >
            used
          </Text>
        </Box>
      )}
      <svg height="100" width="100" viewBox="0 0 100 100">
        <g transform="rotate(-90 50 50)">
          <circle
            stroke="#e8e8e8"
            strokeWidth="8"
            fill="transparent"
            cx="50"
            cy="50"
            r="34"
            strokeDasharray={`${percentComplete} ${percentIncomplete}`}
          />
          <circle
            stroke="#070f58"
            strokeWidth="8"
            fill="transparent"
            cx="50"
            cy="50"
            r="34"
            strokeDasharray={`${percentIncomplete} ${percentComplete}`}
            transform="scale(1 -1) translate(0 -100)"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </Flex>
  );
};
