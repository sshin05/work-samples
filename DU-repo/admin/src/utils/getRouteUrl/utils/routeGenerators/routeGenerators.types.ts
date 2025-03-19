export type CohortsUrlParameters = {
  missionPartnerId: string;
};

export type CohortUrlParameters = {
  missionPartnerId: string;
  cohortId: string;
};

export type CohortPlanUrlParameters = { missionPartnerId: string };

export type CohortPlanCourseUrlParameters = {
  missionPartnerId: string;
  groupId: string;
};

export type CohortPlanCoursesLearnersUrlParameters = {
  missionPartnerId: string;
  groupId: string;
};

export type CohortPlanCourseWithParametersUrlParameters = {
  missionPartnerId: string;
  groupId: string;
  planType: string;
  planSourceId: string;
  planVersion: string;
  status: string;
  title: string;
};

export type CreateCohortByIdUrlParameters = {
  missionPartnerId: string;
  cohortId: string;
};

export type CohortsGroupUrlParameters = {
  missionPartnerId: string;
  groupId: string;
};

export type CourseMetricsUrlParameters = { missionPartnerId: string };

export type CourseMetricsLearnersUrlParameters = { missionPartnerId: string };

export type CourseTextLessonUrlParameters = {
  missionPartnerId: string;
  hostedCourseId: string;
  textLessonId: string;
};

export type CreateCohortUrlParameters = { missionPartnerId: string };

export type CurriculumCatalogUrlParameters = { missionPartnerId: string };

export type CurriculumUrlParameters = { missionPartnerId: string };

export type CurriculumCreateUrlParameters = { missionPartnerId: string };

export type CurriculumCreateByTypeUrlParameters = {
  missionPartnerId: string;
  type: string;
};

export type CurriculumViewUrlParameters = {
  missionPartnerId: string;
};

export type CurriculumViewFirstItemUrlParameters = {
  missionPartnerId: string;
  blockId: string;
};

export type CurriculumViewPathUrlParameters = {
  missionPartnerId: string;
  ids: string[];
};

export type CustomTrainingUrlParameters = { missionPartnerId: string };

export type CustomTrainingByTypeUrlParameters = {
  missionPartnerId: string;
  type: string;
  itemId: string;
};

export type CustomTrainingCourseUrlParameters = {
  missionPartnerId: string;
  courseId: string;
};

export type CustomTrainingCourseEditUrlParameters = {
  missionPartnerId: string;
  courseId: string;
  contentId: string;
  contentType: string;
};

export type CustomTrainingPlanUrlParameters = {
  missionPartnerId: string;
  planId: string;
};

export type CustomTrainingWithParametersUrlParameters = {
  missionPartnerId: string;
  tab: string;
};

export type CustomTrainingSurveyEdit = {
  missionPartnerId: string;
  surveyId: string;
};

export type CustomTrainingSurveyEditQuestion = {
  missionPartnerId: string;
  surveyId: string;
  questionId: string;
};

export type DcwfUrlParameters = { tab: string };
export type DcwfKsatUrlParameters = { ksatId: string };

export type EditQuestionUrlParameters = {
  missionPartnerId: string;
  examId: string;
};

export type EditCourseQuizContentUrlParameters = {
  missionPartnerId: string;
  courseId: string;
  quizId: string;
};

export type GradeBookUrlParameters = { missionPartnerId: string };

export type ManageLicenseUrlParameters = { id: string };

export type ManageTrainingLibraryManualItemUrlParameters = {
  contentType: string;
  contentId: string;
};

export type ManageTrainingLibraryManualItemsAddUrlParameters = {
  contentType: string;
};

export type ManageUserUrlParameters = { userId: string };

export type MissionPartnerUrlParameters = { missionPartnerId: string };

export type MissionPartnerBadgesUrlParameters = { missionPartnerId: string };

export type MissionPartnerDashboardUrlParameters = { missionPartnerId: string };

export type MissionPartnerLearnerUrlParameters = {
  missionPartnerId: string;
  userId: string;
};

export type MissionPartnerLearnersUrlParameters = { missionPartnerId: string };

export type MissionPartnerVendorsParameters = { missionPartnerId: string };

export type MissionPartnerPortalManagerUrlParameters = {
  missionPartnerId: string;
  userId: string;
};

export type MissionPartnerSettingsUrlParameters = { missionPartnerId: string };

export type MissionPartnerTrainingHubParameters = { missionPartnerId: string };

export type ReportingAdminUrlParameters = { missionPartnerId: string };

export type PlanMetricsUrlParameters = { missionPartnerId: string };

export type PlanMetricsLearnersUrlParameters = { missionPartnerId: string };

export type PlanMetricsPlanUrlParameters = { missionPartnerId: string };

export type PlanMetricsPlanLearnersUrlParameters = { missionPartnerId: string };

export type PlanMetricsPlanWithParametersUrlParameters = {
  missionPartnerId: string;
  missionPartnerName: string;
  planType: string;
  planSourceId: string;
  title: string;
  planVersion: string;
  groupId: string;
  groupName: string;
};

export type PlanMetricsPlanWithParametersFromSourceAUrlParameters = {
  missionPartnerId: string;
  missionPartnerName: string;
  planType: string;
  planSourceId: string;
  title: string;
  planVersion: string;
  groupId: string;
  groupName: string;
};

export type PlanMetricsPlanWithParametersFromSourceBUrlParameters = {
  missionPartnerId: string;
  missionPartnerName: string;
  planType: string;
  planSourceId: string;
  title: string;
  planVersion: string;
  groupId: string;
  groupName: string;
};

export type PlanMetricsPlanWithParametersUniqueMetricsUrlParameters = {
  missionPartnerId: string;
  missionPartnerName: string;
  planType: string;
  planSourceId: string;
  title: string;
};

export type VendorUrlParameters = {
  missionPartnerId: string;
  vendorId: string;
};

export type MarketplaceUrlParameters = { missionPartnerId: string };

export type MarketplaceCategoryUrlParameters = MarketplaceUrlParameters & {
  categoryKey: string;
};

export type MarketplaceVendorUrlParameters = MarketplaceUrlParameters & {
  uniqueTag: string;
};

export type MarketPlaceCartOrderUrlParameters = MarketplaceUrlParameters & {
  orderItemId: string;
};

export type MarketPlaceOrderUrlParameters = MarketplaceUrlParameters & {
  orderId: string;
};

export type MarketPlaceOrderItemUrlParameters =
  MarketPlaceOrderUrlParameters & {
    orderItemId: string;
  };

export type ManageMarketplaceVendorUrlParameters = {
  marketplaceVendorTag: string;
};

export type MarketplaceVendorProductDetailPageUrlParameters =
  MarketplaceUrlParameters &
    ManageMarketplaceVendorUrlParameters & {
      productId: string;
    };

export type ManageMarketplaceVendorProductUrlParameters =
  ManageMarketplaceVendorUrlParameters & {
    productSku: string;
  };

export type ManageMarketplaceOrderUrlParameters = {
  orderId: string;
};

export type ManageMarketplaceOrderItemParameters =
  ManageMarketplaceOrderUrlParameters & {
    orderItemId: string;
  };
