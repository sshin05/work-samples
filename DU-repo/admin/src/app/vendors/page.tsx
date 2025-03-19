'use client';
import ContentArea from '@/components_new/layout/ContentArea';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { UnderConstruction } from './components/UnderConstruction';

const VendorRootPage = () => {
  return (
    <MainContentVStack>
      <PageHeader>Vendor Admin Page</PageHeader>
      <ContentArea>
        <UnderConstruction />
      </ContentArea>
    </MainContentVStack>
  );
};

export default VendorRootPage;
