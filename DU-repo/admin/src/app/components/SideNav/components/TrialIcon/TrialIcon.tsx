import { VStack } from '@cerberus/styled-system/jsx';
// all styles are very specific in comps
export const TrialIcon = () => {
  return (
    <VStack
      display="flex"
      alignItems="center"
      flexShrink={0}
      justifyContent="center"
      px={4}
      py={2}
      ml="auto"
      bgColor="warning.surface.200"
      color="warning.text.initial"
      fontSize="10px"
      fontWeight={400}
      letterSpacing=".32px"
      borderRadius="4"
      h="20px"
      w="31px"
    >
      Trial
    </VStack>
  );
};
