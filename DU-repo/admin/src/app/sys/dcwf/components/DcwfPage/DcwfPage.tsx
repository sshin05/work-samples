'use client';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { DcwfTabs } from './components/DcwfTabs';

export const DcwfPage = () => {
  // TODO: Track current selected tab for the header?
  // const [currentTab, setCurrentTab] = useState(1);
  return (
    <MainContentVStack>
      <PageHeader>Content relationship mapping</PageHeader>
      <DcwfTabs />
    </MainContentVStack>
  );
};
