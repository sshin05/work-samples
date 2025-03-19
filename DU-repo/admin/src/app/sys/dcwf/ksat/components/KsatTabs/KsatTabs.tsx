import { Tabs, Tab, TabPanel, TabsList } from '@cerberus/react';
import { DomainTab } from './components/DomainTab';
import { RoleTab } from './components/RoleTab';
import { LearningObjectivesTab } from './components/LearningObjectivesTab';
import {
  DOMAIN_TAB,
  ROLE_TAB,
  LEARNING_OBJECTIVES_TAB
} from '../../../components/DcwfPage/components/DcwfTabs/constants';
import {
  tabPanelStyles,
  tabStyles
} from '../../../components/DcwfPage/components/DcwfTabs/dcwf.styles';

interface KsatTabsProps {
  ksatId: string;
}

export const KsatTabs = ({ ksatId }: KsatTabsProps) => {
  return (
    <div className={tabStyles}>
      <Tabs defaultValue={DOMAIN_TAB}>
        <TabsList>
          <Tab value={DOMAIN_TAB}>{DOMAIN_TAB}</Tab>
          <Tab value={LEARNING_OBJECTIVES_TAB}>{LEARNING_OBJECTIVES_TAB}</Tab>
          <Tab value={ROLE_TAB}>{ROLE_TAB}</Tab>
        </TabsList>
        <TabPanel value={DOMAIN_TAB} className={tabPanelStyles}>
          <DomainTab ksatId={ksatId} />
        </TabPanel>
        <TabPanel value={LEARNING_OBJECTIVES_TAB} className={tabPanelStyles}>
          <LearningObjectivesTab ksatId={ksatId} />
        </TabPanel>
        <TabPanel value={ROLE_TAB} className={tabPanelStyles}>
          <RoleTab ksatId={ksatId} />
        </TabPanel>
      </Tabs>
    </div>
  );
};
