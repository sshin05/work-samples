import {
  MP_SLUG,
  SYS_ADMIN_SLUG,
  MARKETPLACE_SLUG,
  VENDOR_ADMIN_SLUG
} from '../../routeConstants';
import type {
  CohortUrlParameters,
  CohortPlanUrlParameters,
  CohortPlanCourseUrlParameters,
  CohortPlanCoursesLearnersUrlParameters,
  CohortPlanCourseWithParametersUrlParameters,
  CohortsUrlParameters,
  CohortsGroupUrlParameters,
  CourseMetricsUrlParameters,
  CourseMetricsLearnersUrlParameters,
  CourseTextLessonUrlParameters,
  CreateCohortUrlParameters,
  CurriculumCatalogUrlParameters,
  CustomTrainingUrlParameters,
  CustomTrainingByTypeUrlParameters,
  CustomTrainingCourseUrlParameters,
  CustomTrainingCourseEditUrlParameters,
  CustomTrainingPlanUrlParameters,
  CustomTrainingWithParametersUrlParameters,
  CustomTrainingSurveyEdit,
  CustomTrainingSurveyEditQuestion,
  DcwfUrlParameters,
  DcwfKsatUrlParameters,
  EditQuestionUrlParameters,
  GradeBookUrlParameters,
  MissionPartnerBadgesUrlParameters,
  ManageLicenseUrlParameters,
  ManageTrainingLibraryManualItemUrlParameters,
  ManageTrainingLibraryManualItemsAddUrlParameters,
  ManageUserUrlParameters,
  MarketplaceUrlParameters,
  MissionPartnerDashboardUrlParameters,
  MissionPartnerUrlParameters,
  MissionPartnerLearnerUrlParameters,
  MissionPartnerLearnersUrlParameters,
  MissionPartnerVendorsParameters,
  MissionPartnerPortalManagerUrlParameters,
  MissionPartnerSettingsUrlParameters,
  MissionPartnerTrainingHubParameters,
  PlanMetricsUrlParameters,
  PlanMetricsLearnersUrlParameters,
  PlanMetricsPlanUrlParameters,
  PlanMetricsPlanLearnersUrlParameters,
  PlanMetricsPlanWithParametersUrlParameters,
  PlanMetricsPlanWithParametersFromSourceAUrlParameters,
  PlanMetricsPlanWithParametersFromSourceBUrlParameters,
  PlanMetricsPlanWithParametersUniqueMetricsUrlParameters,
  VendorUrlParameters,
  EditCourseQuizContentUrlParameters,
  ManageMarketplaceVendorUrlParameters,
  MarketPlaceOrderItemUrlParameters,
  MarketPlaceOrderUrlParameters,
  MarketPlaceCartOrderUrlParameters,
  MarketplaceVendorUrlParameters,
  MarketplaceCategoryUrlParameters,
  ManageMarketplaceVendorProductUrlParameters,
  ManageMarketplaceOrderUrlParameters,
  ManageMarketplaceOrderItemParameters,
  MarketplaceVendorProductDetailPageUrlParameters,
  ReportingAdminUrlParameters,
  CreateCohortByIdUrlParameters,
  CurriculumUrlParameters,
  CurriculumViewFirstItemUrlParameters,
  CurriculumCreateUrlParameters,
  CurriculumCreateByTypeUrlParameters,
  CurriculumViewPathUrlParameters,
  CurriculumViewUrlParameters
} from './routeGenerators.types';

/**
 * # routeGenerators
 *
 * - Use to generate a route's base url
 * - This injects the passed route parameters, but it does not append query parameters
 * - To ensure that the route uses the correct application version, wrap the call in `getRouteUrl`
 *
 * ## Example:
 *
 * ```ts
 * getRouteUrl(
 *   routeGenerators.Cohort({ missionPartnerId, corhortId }),
 *   queryParameters
 * )
 * ```
 */
export const routeGenerators = {
  AdminHome: () => '/',
  MPSearch: (): string => `/${MP_SLUG}`,
  Classroom: ({ missionPartnerId, cohortId }: CohortUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/classroom/${cohortId}`,
  Classrooms: ({ missionPartnerId }: CohortsUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/classroom`,
  ClassroomPreview: ({
    missionPartnerId,
    cohortId
  }: CohortUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/classroom/${cohortId}/preview`,
  Cohort: ({ missionPartnerId, cohortId }: CohortUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/cohorts/${cohortId}`,
  CohortPlan: ({ missionPartnerId }: CohortPlanUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/cohorts/plan`,
  CohortPlanCourse: ({
    missionPartnerId,
    groupId
  }: CohortPlanCourseUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/cohorts/${groupId}/cohort-plan-courses`,
  CohortPlanCoursesLearners: ({
    missionPartnerId,
    groupId
  }: CohortPlanCoursesLearnersUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/cohorts/${groupId}/cohort-plan-courses/learners`,
  CohortPlanCourseWithParameters: ({
    missionPartnerId,
    groupId,
    planType,
    planSourceId,
    planVersion,
    status,
    title
  }: CohortPlanCourseWithParametersUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/cohorts/${groupId}/cohort-plan-courses?planType=${planType}&planSourceId=${planSourceId}&planVersion=${planVersion}&status=${status}&title=${title}`,
  Cohorts: ({ missionPartnerId }: CohortsUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/cohorts`,
  CohortsGroup: ({
    missionPartnerId,
    groupId
  }: CohortsGroupUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/cohorts/${groupId}`,
  CourseMetrics: ({ missionPartnerId }: CourseMetricsUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/course-metrics`,
  CourseMetricsLearners: ({
    missionPartnerId
  }: CourseMetricsLearnersUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/course-metrics/learners`,
  CourseTextLesson: ({
    missionPartnerId,
    hostedCourseId,
    textLessonId
  }: CourseTextLessonUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/training/course/${hostedCourseId}/edit-content/text-lesson/${textLessonId}`,
  CreateCohort: ({ missionPartnerId }: CreateCohortUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/classroom/create`,
  CreateCohortById: ({
    missionPartnerId,
    cohortId
  }: CreateCohortByIdUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/classroom/create/${cohortId}`,
  CurriculumCatalog: ({
    missionPartnerId
  }: CurriculumCatalogUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/curriculum-catalog`,
  CustomTraining: ({ missionPartnerId }: CustomTrainingUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/training`,
  Curriculum: ({ missionPartnerId }: CurriculumUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/training-v2`,
  CurriculumCreate: ({
    missionPartnerId
  }: CurriculumCreateUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/training-v2/create`,
  CurriculumCreateByType: ({
    missionPartnerId,
    type
  }: CurriculumCreateByTypeUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/training-v2/create?type=${type}`,
  CurriculumView: ({ missionPartnerId }: CurriculumViewUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/training-v2/view/`,
  CurriculumViewFirstItem: ({
    missionPartnerId,
    blockId
  }: CurriculumViewFirstItemUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/training-v2/view/${blockId}`,
  CurriculumViewPath: ({
    missionPartnerId,
    ids
  }: CurriculumViewPathUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/training-v2/view/${ids.join('/')}`,
  CustomTrainingByType: ({
    missionPartnerId,
    type,
    itemId
  }: CustomTrainingByTypeUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/training/${type}/${itemId}`,
  CustomTrainingCourse: ({
    missionPartnerId,
    courseId
  }: CustomTrainingCourseUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/training/course/${courseId}`,
  CustomTrainingCourseEdit: ({
    missionPartnerId,
    courseId,
    contentId,
    contentType
  }: CustomTrainingCourseEditUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/training/course/${courseId}/edit-content/${contentType}/${contentId}`,
  CustomTrainingPlan: ({
    missionPartnerId,
    planId
  }: CustomTrainingPlanUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/training/plan/fm/${planId}`,
  CustomTrainingWithParameters: ({
    missionPartnerId,
    tab
  }: CustomTrainingWithParametersUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/training?tab=${tab}`,
  CustomTrainingSurveyEdit: ({
    missionPartnerId,
    surveyId
  }: CustomTrainingSurveyEdit): string =>
    `/${MP_SLUG}/${missionPartnerId}/training/survey/${surveyId}/edit-question/new`,
  CustomTrainingSurveyEditQuestion: ({
    missionPartnerId,
    surveyId,
    questionId
  }: CustomTrainingSurveyEditQuestion): string =>
    `/${MP_SLUG}/${missionPartnerId}/training/survey/${surveyId}/edit-question/${questionId}`,
  Dcwf: ({ tab }: DcwfUrlParameters): string =>
    `/${SYS_ADMIN_SLUG}/dcwf/?tab=${tab}`,
  DcwfKsat: ({ ksatId }: DcwfKsatUrlParameters): string =>
    `/${SYS_ADMIN_SLUG}/dcwf/ksat/${ksatId}`,
  EditQuestion: ({
    //Although this route is called EditQuestion, the url appears to be only for the exam page.
    //This may been done with the intent of fixing it later after another feature is added.
    missionPartnerId,
    examId
  }: EditQuestionUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/training/exam/${examId}`,
  EditCourseQuizContent: ({
    missionPartnerId,
    courseId,
    quizId
  }: EditCourseQuizContentUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/training/course/${courseId}/edit-content/quiz/${quizId}`,
  GradeBook: ({ missionPartnerId }: GradeBookUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/gradebook`,
  ManageLicense: ({ id }: ManageLicenseUrlParameters): string =>
    `/${SYS_ADMIN_SLUG}/licenses/${id}`,
  ManageLicenses: (): string => `/${SYS_ADMIN_SLUG}/licenses`,
  ManageSettings: (): string => `/${SYS_ADMIN_SLUG}/settings`,
  ManageSettingsAlertBanner: (): string =>
    `/${SYS_ADMIN_SLUG}/settings/alert-banner`,
  ManageSettingsBanner: (): string => `/${SYS_ADMIN_SLUG}/settings/banner`,
  ManageTrainingLibrary: (): string => `/${SYS_ADMIN_SLUG}/training-library`,
  ManageTrainingLibraryManualItem: ({
    contentType,
    contentId
  }: ManageTrainingLibraryManualItemUrlParameters): string =>
    `/${SYS_ADMIN_SLUG}/manual-items/${contentType}/${contentId}`,
  ManageTrainingLibraryManualItems: (): string =>
    `/${SYS_ADMIN_SLUG}/manual-items`,
  ManageTrainingLibraryManualItemsAdd: ({
    contentType
  }: ManageTrainingLibraryManualItemsAddUrlParameters): string =>
    `/${SYS_ADMIN_SLUG}/manual-items/${contentType}/add`,
  ManageUser: ({ userId }: ManageUserUrlParameters): string =>
    `/${SYS_ADMIN_SLUG}/users/${userId}`,
  ManageUsers: (): string => `/${SYS_ADMIN_SLUG}/users`,

  //////////////////////////////////////////////////////////////////////
  // /manage-mission-partners/[missionPartnerId]/marketplace Routes
  //////////////////////////////////////////////////////////////////////
  Marketplace: ({ missionPartnerId }: MarketplaceUrlParameters): string =>
    `/${MARKETPLACE_SLUG}/${MP_SLUG}/${missionPartnerId}`,

  MarketplaceTokens: ({ missionPartnerId }: MarketplaceUrlParameters): string =>
    `/${MARKETPLACE_SLUG}/${MP_SLUG}/${missionPartnerId}/tokens`,

  MarketplaceCategory: ({
    missionPartnerId,
    categoryKey
  }: MarketplaceCategoryUrlParameters): string =>
    `/${MARKETPLACE_SLUG}/${MP_SLUG}/${missionPartnerId}/categories/${categoryKey}`,

  MarketplaceVendor: ({
    missionPartnerId,
    uniqueTag: uniqueTag
  }: MarketplaceVendorUrlParameters): string =>
    `/${MARKETPLACE_SLUG}/${MP_SLUG}/${missionPartnerId}/vendors/${uniqueTag}`,

  MarketplaceCart: ({ missionPartnerId }: MarketplaceUrlParameters): string =>
    `/${MARKETPLACE_SLUG}/${MP_SLUG}/${missionPartnerId}/cart`,
  MarketplaceCartOrder: ({
    missionPartnerId,
    orderItemId
  }: MarketPlaceCartOrderUrlParameters): string =>
    `/${MARKETPLACE_SLUG}/${MP_SLUG}/${missionPartnerId}/cart/${orderItemId}`,

  MarketplaceOrders: ({ missionPartnerId }: MarketplaceUrlParameters): string =>
    `/${MARKETPLACE_SLUG}/${MP_SLUG}/${missionPartnerId}/orders`,
  MarketplaceOrder: ({
    missionPartnerId,
    orderId
  }: MarketPlaceOrderUrlParameters): string =>
    `/${MARKETPLACE_SLUG}/${MP_SLUG}/${missionPartnerId}/orders/${orderId}`,
  MarketplaceOrderItem: ({
    missionPartnerId,
    orderId,
    orderItemId
  }: MarketPlaceOrderItemUrlParameters): string =>
    `/${MARKETPLACE_SLUG}/${MP_SLUG}/${missionPartnerId}/orders/${orderId}/${orderItemId}`,

  MarketplaceVendorProductDetailPage: ({
    missionPartnerId,
    marketplaceVendorTag,
    productId
  }: MarketplaceVendorProductDetailPageUrlParameters): string =>
    `/${MARKETPLACE_SLUG}/${MP_SLUG}/${missionPartnerId}/vendors/${marketplaceVendorTag}/products/${productId}`,

  //////////////////////////////////////////////////////////////////////
  // /manage-marketplace-vendors Routes
  //////////////////////////////////////////////////////////////////////
  ManageMarketplaceVendors: (): string => `/${MARKETPLACE_SLUG}/manage/vendors`,
  ManageMarketplaceVendorUpload: (): string =>
    `/${MARKETPLACE_SLUG}/manage/vendors/upload`,
  ManageMarketplaceVendor: ({
    marketplaceVendorTag
  }: ManageMarketplaceVendorUrlParameters): string =>
    `/${MARKETPLACE_SLUG}/manage/vendors/${marketplaceVendorTag}`,
  ManageMarketplaceVendorProducts: ({
    marketplaceVendorTag
  }: ManageMarketplaceVendorUrlParameters): string =>
    `/${MARKETPLACE_SLUG}/manage/vendors/${marketplaceVendorTag}/products`,
  ManageMarketplaceVendorProduct: ({
    marketplaceVendorTag,
    productSku
  }: ManageMarketplaceVendorProductUrlParameters): string =>
    `/${MARKETPLACE_SLUG}/manage/vendors/${marketplaceVendorTag}/products/${productSku}`,
  ManageMarketplaceVendorProductsUpload: ({
    marketplaceVendorTag
  }: ManageMarketplaceVendorUrlParameters): string =>
    `/${MARKETPLACE_SLUG}/manage/vendors/${marketplaceVendorTag}/products/upload`,

  //////////////////////////////////////////////////////////////////////
  // /manage-marketplace-orders Routes
  //////////////////////////////////////////////////////////////////////
  ManageMarketplaceOrders: (): string => `/${MARKETPLACE_SLUG}/manage/orders`,
  ManageMarketplaceOrder: ({
    orderId
  }: ManageMarketplaceOrderUrlParameters): string =>
    `/${MARKETPLACE_SLUG}/manage/orders/${orderId}`,
  ManageMarketplaceOrderItem: ({
    orderId,
    orderItemId
  }: ManageMarketplaceOrderItemParameters): string =>
    `/${MARKETPLACE_SLUG}/manage/orders/${orderId}/${orderItemId}`,

  //////////////////////////////////////////////////////////////////////
  // END: marketplace Routes
  //////////////////////////////////////////////////////////////////////

  MissionPartner: ({ missionPartnerId }: MissionPartnerUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}`,
  MissionPartnerBadges: ({
    missionPartnerId
  }: MissionPartnerBadgesUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/badges`,
  MissionPartnerDashboard: ({
    missionPartnerId
  }: MissionPartnerDashboardUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/dashboard`,
  MissionPartnerLearner: ({
    missionPartnerId,
    userId
  }: MissionPartnerLearnerUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/learner/${userId}`,
  MissionPartnerLearners: ({
    missionPartnerId
  }: MissionPartnerLearnersUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/learners`,
  MissionPartnerPortalManager: ({
    missionPartnerId,
    userId
  }: MissionPartnerPortalManagerUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/portal-manager/${userId}`,
  MissionPartnerSettings: ({
    missionPartnerId
  }: MissionPartnerSettingsUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/settings`,
  MissionPartnerTrainingHub: ({
    missionPartnerId
  }: MissionPartnerTrainingHubParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/hub`,
  MissionPartnerVendors: ({
    missionPartnerId
  }: MissionPartnerVendorsParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/lic`,
  MissionPartners: (): string => `/${MP_SLUG}`,
  PlanMetrics: ({ missionPartnerId }: PlanMetricsUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/plan-metrics`,
  PlanMetricsLearners: ({
    missionPartnerId
  }: PlanMetricsLearnersUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/plan-metrics/learners`,
  PlanMetricsPlan: ({
    missionPartnerId
  }: PlanMetricsPlanUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/plan-metrics/plan`,
  PlanMetricsPlanLearners: ({
    missionPartnerId
  }: PlanMetricsPlanLearnersUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/plan-metrics/plan/learners`,
  PlanMetricsPlanWithParameters: ({
    missionPartnerId,
    missionPartnerName,
    planType,
    planSourceId,
    title,
    planVersion,
    groupId,
    groupName
  }: PlanMetricsPlanWithParametersUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/plan-metrics/plan?missionPartnerName=${missionPartnerName}&planVersion=${planVersion}&planType=${planType}&planSourceId=${planSourceId}&groupId=${groupId}&groupName=${groupName}&title=${title}`,
  PlanMetricsPlanWithParametersFromSourceA: ({
    missionPartnerId,
    missionPartnerName,
    planType,
    planSourceId,
    title,
    planVersion,
    groupId,
    groupName
  }: PlanMetricsPlanWithParametersFromSourceAUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/plan-metrics/plan?missionPartnerName=${missionPartnerName}&planVersion=${planVersion}&planType=${planType}&planSourceId=${planSourceId}&groupId=${groupId}&groupName=${groupName}&title=${title}`,
  PlanMetricsPlanWithParametersFromSourceB: ({
    missionPartnerId,
    missionPartnerName,
    planType,
    planSourceId,
    title,
    planVersion,
    groupId,
    groupName
  }: PlanMetricsPlanWithParametersFromSourceBUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/plan-metrics/plan?missionPartnerName=${missionPartnerName}&planVersion=${planVersion}&planType=${planType}&planSourceId=${planSourceId}&groupId=${groupId}&groupName=${groupName}&title=${title}`,
  PlanMetricsPlanWithParametersUniqueMetrics: ({
    missionPartnerId,
    missionPartnerName,
    planType,
    planSourceId,
    title
  }: PlanMetricsPlanWithParametersUniqueMetricsUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/plan-metrics/plan?missionPartnerId=${missionPartnerId}&missionPartnerName=${missionPartnerName}&planType=${planType}&planSourceId=${planSourceId}&title=${title}`,
  ReportingAdmin: ({ missionPartnerId }: ReportingAdminUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/reporting-admin`,
  ReportCenter: (): string => `/report-center`,
  SysHome: () => `/${SYS_ADMIN_SLUG}`,
  SysLicenses: () => `/${SYS_ADMIN_SLUG}/licenses`,
  SysIndexing: () => `/${SYS_ADMIN_SLUG}/indexing`,
  SysSettings: () => `/${SYS_ADMIN_SLUG}/settings`,
  SysServices: () => `/${SYS_ADMIN_SLUG}/services`,
  SysDCWF: () => `/${SYS_ADMIN_SLUG}/dcwf`,
  SysManualItems: () => `/${SYS_ADMIN_SLUG}/manual-items`,
  TrialExpired: (): string => `/trial-expired`,
  Vendor: ({ missionPartnerId, vendorId }: VendorUrlParameters): string =>
    `/${MP_SLUG}/${missionPartnerId}/lic/${vendorId}`,
  VendorHome: () => `/${VENDOR_ADMIN_SLUG}`
};
