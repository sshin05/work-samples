'use client';
import { useRouteParams } from '@/hooks/useRouteParams';
import Link from 'next/link';
import { Flex, Text, colors, typography, spacing } from '@digital-u/digital-ui';
import styled from '@emotion/styled';
import { useFindVendorById } from '@/api/vendor';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { LicensesTable } from './components/LicensesTable';

const StyledBackButton = styled(Link)`
  color: ${colors.galaxy[700]} !important;
  font-size: ${typography.sizes[3.25]} !important;
  font-weight: ${typography.weights.regular} !important;
  text-transform: uppercase;
  width: fit-content;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const VendorNameText = styled(Text)`
  color: ${colors.galaxy[900]};
  font-weight: ${typography.weights.extraBold};
  font-size: ${typography.sizes[9]};
`;

const LicensesTitleText = styled(Text)`
  color: ${colors.purple[800]};
  font-weight: ${typography.weights.extraBold};
  font-size: ${typography.sizes[9]};
`;

const LicenseTotalsText = styled(Text)`
  color: ${colors.galaxy[900]};
  font-size: ${typography.sizes[3.75]};
  word-spacing: ${typography.sizes[1]};
`;

const ManageLicensePage = () => {
  const params = useRouteParams();

  const id = params.id;

  const { vendorLoading, vendor } = useFindVendorById(id);

  if (vendorLoading || !vendor) return null;

  const numberToCommas = (value: number) => value.toLocaleString('en-US');

  const provisioned =
    vendor.provisioned === -1
      ? 'Enterprise License'
      : `${numberToCommas(vendor.provisioned)} provisioned`;

  const assigned = `${numberToCommas(vendor.assigned)} assigned`;

  const available =
    vendor.provisioned === -1
      ? 'Unlimited available'
      : `${numberToCommas(vendor.provisioned - vendor.assigned)} available`;

  return (
    <>
      <StyledBackButton href={getRouteUrl(routeGenerators.ManageLicenses())}>
        {'<'} Back
      </StyledBackButton>
      <Flex direction="column" gap={spacing[0]}>
        <Flex direction="row" gap={spacing[2]}>
          <VendorNameText>{vendor.name}</VendorNameText>
          <LicensesTitleText>Licenses</LicensesTitleText>
        </Flex>
        <LicenseTotalsText>
          {provisioned} | {assigned} | {available}
        </LicenseTotalsText>
      </Flex>
      <LicensesTable vendor={vendor} />
    </>
  );
};

export default ManageLicensePage;
