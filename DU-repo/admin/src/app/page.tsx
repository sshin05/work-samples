'use client';
import ContentArea from '@/components_new/layout/ContentArea';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { PageHeader } from '@/components_new/typography/PageHeader';

const RootPage = () => {
  return (
    <MainContentVStack>
      <PageHeader>Root Page Test</PageHeader>
      <ContentArea>
        <p>Testing. Woo hoo!</p>
      </ContentArea>
    </MainContentVStack>
  );
};

export default RootPage;
