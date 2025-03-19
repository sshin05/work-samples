import { BevelCard, Button, Flex, Text } from '@digital-u/digital-ui';
import { BaseSkeleton } from '@/components_new/loaders';

interface TrainingLibraryCardProps {
  title: string;
  value: number;
  unit: string;
  href: string;
  buttonText: string;
  vendors: number;
  loading?: boolean;
}

export const TrainingLibraryCard = ({
  title,
  value,
  unit,
  href,
  buttonText,
  vendors,
  loading = false
}: TrainingLibraryCardProps) => {
  const convertToPlural = (unit: string): string =>
    value > 1 ? unit + 's' : unit;

  return (
    <BevelCard
      size="l"
      style={{
        backgroundColor: 'white',
        borderRadius: '6px',
        padding: '24px',
        flex: '1',
        textAlign: 'start'
      }}
    >
      <Flex direction="column" gap="24px" style={{ marginBottom: '2em' }}>
        <Text size="compact" fontWeight="medium">
          {title}
        </Text>
        {loading ? (
          <BaseSkeleton />
        ) : (
          <Flex gap="8px" alignItems="flex-end">
            <Text size="h4" fontWeight="bold">
              {value?.toLocaleString()}
            </Text>
            <Text size="compact" style={{ paddingBottom: '3px' }}>
              {convertToPlural(unit)}
            </Text>
          </Flex>
        )}
        {loading ? (
          <BaseSkeleton />
        ) : (
          <Flex gap="8px" alignItems="flex-end">
            <Text size="h4" fontWeight="bold">
              {vendors?.toLocaleString()}
            </Text>
            <Text size="compact" style={{ paddingBottom: '3px' }}>
              {vendors === 1 ? ' Vendor' : ' Vendors'}
            </Text>
          </Flex>
        )}
      </Flex>

      {/* TODO: Purple border hover */}
      <Button
        style={{ fontSize: '10px !important' }}
        kind="pill-secondary"
        href={href}
        disabled={loading}
      >
        {buttonText}
      </Button>
    </BevelCard>
  );
};
