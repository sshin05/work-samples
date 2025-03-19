import { Tabs, Tab, TabPanel, TabsList } from '@cerberus/react';
import { KsatTab } from './components/KsatTab';
import { CurriculumTab } from './components/CurriculumTab';
import { DomainTab } from './components/DomainTab';
import { RoleTab } from './components/RoleTab';
import { LearningObjectivesTab } from './components/LearningObjectivesTab';
import { tabStyles, tabPanelStyles } from './dcwf.styles';
import {
  KSAT_TAB,
  CURRICULUM_TAB,
  DOMAIN_TAB,
  ROLE_TAB,
  LEARNING_OBJECTIVES_TAB
} from './constants';

export const DcwfTabs = () => {
  return (
    <div className={tabStyles}>
      <Tabs defaultValue={KSAT_TAB}>
        <TabsList>
          <Tab value={KSAT_TAB}>{KSAT_TAB}</Tab>
          <Tab value={DOMAIN_TAB}>{DOMAIN_TAB}</Tab>
          {/* NOTE: Hiding this tab while curriculum is unavailable from the API */}
          {/* <Tab value={CURRICULUM_TAB}>{CURRICULUM_TAB}</Tab> */}
          <Tab value={ROLE_TAB}>{ROLE_TAB}</Tab>
          <Tab value={LEARNING_OBJECTIVES_TAB}>{LEARNING_OBJECTIVES_TAB}</Tab>
        </TabsList>
        <TabPanel value={KSAT_TAB} className={tabPanelStyles}>
          <KsatTab />
        </TabPanel>
        <TabPanel value={DOMAIN_TAB} className={tabPanelStyles}>
          <DomainTab />
        </TabPanel>
        <TabPanel value={CURRICULUM_TAB} className={tabPanelStyles}>
          <CurriculumTab />
        </TabPanel>
        <TabPanel value={ROLE_TAB} className={tabPanelStyles}>
          <RoleTab />
        </TabPanel>
        <TabPanel value={LEARNING_OBJECTIVES_TAB} className={tabPanelStyles}>
          <LearningObjectivesTab />
        </TabPanel>
      </Tabs>
    </div>
  );
};
