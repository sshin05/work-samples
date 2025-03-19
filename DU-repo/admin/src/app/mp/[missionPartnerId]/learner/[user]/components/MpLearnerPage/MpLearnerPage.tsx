import { useFindUserById } from '@/api/users';
import { BaseSkeleton } from '@/components_new/loaders/BaseSkeleton/BaseSkeleton';
import { LicensesTab } from '../LicensesTab';
import { CohortsLearnersTab } from '../CohortsLearnersTab';
import { MissionPartnersTab } from '../MissionPartnersTab';
import { Profile } from '../Profile';
import { IndividualTrainingPlanTab } from '../IndividualTrainingPlanTab';
import { TrainingPlansTab } from '../TrainingPlansTab';
import { AssessmentsTab } from '../AssessmentsTab';
import { AllowContractorAccessCheckbox } from '../AllowContractorAccessCheckbox';
import { css } from '@cerberus/styled-system/css';
import { Tab, TabPanel, Tabs, TabsList } from '@cerberus/react';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import Link from 'next/link';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { backButtonStyles } from '../../../../../../styles/BackButtonStyles';
import { useRouteParams } from '@/hooks/useRouteParams';
import { tabsFullWidth } from '@/components_new/table/styles/tableWidthStyles';
import { ErrorHandler } from '@/components_new/errors/ErrorHandler';
import { useIsDuAdmin } from '@/hooks/useCurrentSession/useCurrentSession';

export const MpLearnerPage = () => {
  const { user, ...rest } = useRouteParams();
  const missionPartnerId = rest.missionPartnerId || '';
  const { userByIdLoading, userById, userByIdError } = useFindUserById(user);
  const { isDuAdmin } = useIsDuAdmin();
  const isUserContractor = userById?.userType === 'contractor';

  return (
    <ErrorHandler errorDetails={userByIdError}>
      <div className={vstack({ gap: '4', alignItems: 'start' })}>
        <Link
          className={backButtonStyles}
          href={getRouteUrl(
            routeGenerators.MissionPartnerLearners({ missionPartnerId })
          )}
        >
          {'<'} BACK
        </Link>
        <div className={vstack({ gap: '0', alignItems: 'start', w: 'full' })}>
          <PageHeader>
            {userByIdLoading ? (
              <BaseSkeleton />
            ) : userById ? (
              `${userById.firstName} ${userById.lastName}`
            ) : null}
          </PageHeader>
          <div className={css({ textStyle: 'body-xl', mb: '2' })}>
            {userByIdLoading ? (
              <BaseSkeleton />
            ) : userById ? (
              userById.email
            ) : null}
          </div>
          {isUserContractor && (
            <div className={hstack({ justifyContent: 'start' })}>
              <AllowContractorAccessCheckbox
                userId={userById?.id}
                hasContractorAccess={userById?.canAccessFullDu}
                isDuAdmin={isDuAdmin}
              />
            </div>
          )}
          <Profile user={userById} loading={userByIdLoading} />
          <div className={tabsFullWidth}>
            <Tabs defaultValue="assessments">
              <TabsList>
                <Tab value="assessments">Assessments</Tab>
                <Tab value="individual training items">
                  Individual Training Items
                </Tab>
                <Tab value="training plans">Training Plans</Tab>
                <Tab value="licenses">Licenses</Tab>
                <Tab value="cohorts">Cohorts</Tab>
                <Tab value="mission partners">Mission Partners</Tab>
              </TabsList>
              <TabPanel value="assessments" className={tabsFullWidth}>
                <AssessmentsTab
                  user={userById}
                  missionPartnerId={missionPartnerId}
                  pageLoading={userByIdLoading}
                />
              </TabPanel>
              <TabPanel
                value="individual training items"
                className={tabsFullWidth}
              >
                <IndividualTrainingPlanTab
                  user={userById}
                  missionPartnerId={missionPartnerId}
                  pageLoading={userByIdLoading}
                />
              </TabPanel>
              <TabPanel value="training plans" className={tabsFullWidth}>
                <TrainingPlansTab
                  user={userById}
                  missionPartnerId={missionPartnerId}
                  pageLoading={userByIdLoading}
                />
              </TabPanel>
              <TabPanel value="licenses" className={tabsFullWidth}>
                <LicensesTab
                  user={userById}
                  pageLoading={userByIdLoading}
                  missionPartnerId={missionPartnerId}
                />
              </TabPanel>
              <TabPanel value="cohorts" className={tabsFullWidth}>
                <CohortsLearnersTab
                  user={userById}
                  missionPartnerId={missionPartnerId}
                  pageLoading={userByIdLoading}
                />
              </TabPanel>
              <TabPanel value="mission partners" className={tabsFullWidth}>
                <MissionPartnersTab
                  user={userById}
                  pageLoading={userByIdLoading}
                />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </ErrorHandler>
  );
};
