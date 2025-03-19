import { routeGenerators } from '.';

const MOCK_URL_PARAMS = {
  BATCH_ID: '__BATCH_ID__',
  BLOCK_ID: '__BLOCK_ID__',
  CONTENT_ID: '__CONTENT_ID__',
  CONTENT_TYPE: '__CONTENT_TYPE__',
  COURSE_ID: '__COURSE_ID__',
  CURRICULUM_TYPE: '__CURRICULUM_TYPE__',
  EXAM_ID: '__EXAM_ID__',
  GROUP_ID: '__GROUP_ID__',
  GROUP_NAME: '__GROUP_NAME__',
  GROUP: '__GROUP__',
  HOSTED_COURSE_ID: '__HOSTED_COURSE_ID__',
  ID: '__ID__',
  LEVEL: '__LEVEL__',
  MISSION_PARTNER_ID: '__MISSION_PARTNER_ID__',
  MISSION_PARTNER_NAME: '__MISSION_PARTNER_NAME__',
  PLAN_ID: '__PLAN_ID__',
  PLAN_SOURCE_ID: '__PLAN_SOURCE_ID__',
  PLAN_TYPE: '__PLAN_TYPE__',
  PLAN_VERSION: '__PLAN_VERSION__',
  QUESTION_ID: '__QUESTION_ID__',
  STATUS: '__STATUS__',
  SURVEY_ID: '__SURVEY_ID__',
  TAB: '__TAB__',
  TEXT_LESSON_ID: '__TEXT_LESSON_ID__',
  TITLE: '__TITLE__',
  USER_ID: '__USER_ID__',
  VENDOR_ID: '__VENDOR_ID__',
  QUIZ_ID: '__QUIZ_ID__'
};

describe('routeGenerators', () => {
  it.each([
    {
      routeHandlerKey: 'Admin',
      url: routeGenerators.AdminHome(),
      expected: '/'
    },
    {
      routeHandlerKey: 'Cohort',
      url: routeGenerators.Cohort({
        missionPartnerId: '__MISSION_PARTNER_ID__',
        cohortId: '__COHORT_ID__'
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/cohorts/__COHORT_ID__'
    },
    {
      routeHandlerKey: 'CohortPlan',
      url: routeGenerators.CohortPlan({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/cohorts/plan'
    },
    {
      routeHandlerKey: 'CohortPlanCourse',
      url: routeGenerators.CohortPlanCourse({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        groupId: MOCK_URL_PARAMS.GROUP_ID
      }),
      expected:
        '/mp/__MISSION_PARTNER_ID__/cohorts/__GROUP_ID__/cohort-plan-courses'
    },
    {
      routeHandlerKey: 'CohortPlanCoursesLearners',
      url: routeGenerators.CohortPlanCoursesLearners({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        groupId: MOCK_URL_PARAMS.GROUP_ID
      }),
      expected:
        '/mp/__MISSION_PARTNER_ID__/cohorts/__GROUP_ID__/cohort-plan-courses/learners'
    },
    {
      routeHandlerKey: 'CohortPlanCourseWithParameters',
      url: routeGenerators.CohortPlanCourseWithParameters({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        groupId: MOCK_URL_PARAMS.GROUP_ID,
        status: MOCK_URL_PARAMS.STATUS,
        planVersion: MOCK_URL_PARAMS.PLAN_VERSION,
        planType: MOCK_URL_PARAMS.PLAN_TYPE,
        planSourceId: MOCK_URL_PARAMS.PLAN_SOURCE_ID,
        title: MOCK_URL_PARAMS.TITLE
      }),
      expected:
        '/mp/__MISSION_PARTNER_ID__/cohorts/__GROUP_ID__/cohort-plan-courses?planType=__PLAN_TYPE__&planSourceId=__PLAN_SOURCE_ID__&planVersion=__PLAN_VERSION__&status=__STATUS__&title=__TITLE__'
    },
    {
      routeHandlerKey: 'Cohorts',
      url: routeGenerators.Cohorts({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/cohorts'
    },
    {
      routeHandlerKey: 'CohortsGroup',
      url: routeGenerators.CohortsGroup({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        groupId: MOCK_URL_PARAMS.GROUP_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/cohorts/__GROUP_ID__'
    },
    {
      routeHandlerKey: 'CourseMetrics',
      url: routeGenerators.CourseMetrics({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/course-metrics'
    },
    {
      routeHandlerKey: 'CourseMetricsLearners',
      url: routeGenerators.CourseMetricsLearners({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/course-metrics/learners'
    },
    {
      routeHandlerKey: 'CourseTextLesson',
      url: routeGenerators.CourseTextLesson({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        hostedCourseId: MOCK_URL_PARAMS.HOSTED_COURSE_ID,
        textLessonId: MOCK_URL_PARAMS.TEXT_LESSON_ID
      }),
      expected:
        '/mp/__MISSION_PARTNER_ID__/training/course/__HOSTED_COURSE_ID__/edit-content/text-lesson/__TEXT_LESSON_ID__'
    },
    {
      routeHandlerKey: 'CurriculumCatalog',
      url: routeGenerators.CurriculumCatalog({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/curriculum-catalog'
    },
    {
      routeHandlerKey: 'CustomTraining',
      url: routeGenerators.CustomTraining({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/training'
    },
    {
      routeHandlerKey: 'Curriculum',
      url: routeGenerators.Curriculum({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/training-v2'
    },
    {
      routeHandlerKey: 'CurriculumCreate',
      url: routeGenerators.CurriculumCreate({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/training-v2/create'
    },
    {
      routeHandlerKey: 'CurriculumCreateByType',
      url: routeGenerators.CurriculumCreateByType({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        type: MOCK_URL_PARAMS.CURRICULUM_TYPE
      }),
      expected:
        '/mp/__MISSION_PARTNER_ID__/training-v2/create?type=__CURRICULUM_TYPE__'
    },
    {
      routeHandlerKey: 'CurriculumView',
      url: routeGenerators.CurriculumView({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/training-v2/view/'
    },
    {
      routeHandlerKey: 'CurriculumViewFirstItem',
      url: routeGenerators.CurriculumViewFirstItem({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        blockId: MOCK_URL_PARAMS.BLOCK_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/training-v2/view/__BLOCK_ID__'
    },
    {
      routeHandlerKey: 'CurriculumViewPath',
      url: routeGenerators.CurriculumViewPath({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        ids: [MOCK_URL_PARAMS.BLOCK_ID, MOCK_URL_PARAMS.BLOCK_ID]
      }),
      expected:
        '/mp/__MISSION_PARTNER_ID__/training-v2/view/__BLOCK_ID__/__BLOCK_ID__'
    },
    {
      routeHandlerKey: 'CustomTrainingByType',
      url: routeGenerators.CustomTrainingByType({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        type: MOCK_URL_PARAMS.CONTENT_TYPE,
        itemId: MOCK_URL_PARAMS.CONTENT_ID
      }),
      expected:
        '/mp/__MISSION_PARTNER_ID__/training/__CONTENT_TYPE__/__CONTENT_ID__'
    },
    {
      routeHandlerKey: 'CustomTrainingCourse',
      url: routeGenerators.CustomTrainingCourse({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        courseId: MOCK_URL_PARAMS.COURSE_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/training/course/__COURSE_ID__'
    },
    {
      routeHandlerKey: 'CustomTrainingCourseEdit',
      url: routeGenerators.CustomTrainingCourseEdit({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        courseId: MOCK_URL_PARAMS.COURSE_ID,
        contentType: MOCK_URL_PARAMS.CONTENT_TYPE,
        contentId: MOCK_URL_PARAMS.CONTENT_ID
      }),
      expected:
        '/mp/__MISSION_PARTNER_ID__/training/course/__COURSE_ID__/edit-content/__CONTENT_TYPE__/__CONTENT_ID__'
    },
    {
      routeHandlerKey: 'CustomTrainingPlan',
      url: routeGenerators.CustomTrainingPlan({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        planId: MOCK_URL_PARAMS.PLAN_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/training/plan/fm/__PLAN_ID__'
    },
    {
      routeHandlerKey: 'CustomTrainingWithParameters',
      url: routeGenerators.CustomTrainingWithParameters({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        tab: MOCK_URL_PARAMS.TAB
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/training?tab=__TAB__'
    },
    {
      routeHandlerKey: 'CustomTrainingSurveyEdit',
      url: routeGenerators.CustomTrainingSurveyEdit({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        surveyId: MOCK_URL_PARAMS.SURVEY_ID
      }),
      expected:
        '/mp/__MISSION_PARTNER_ID__/training/survey/__SURVEY_ID__/edit-question/new'
    },
    {
      routeHandlerKey: 'CustomTrainingSurveyEditQuestion',
      url: routeGenerators.CustomTrainingSurveyEditQuestion({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        surveyId: MOCK_URL_PARAMS.SURVEY_ID,
        questionId: MOCK_URL_PARAMS.QUESTION_ID
      }),
      expected:
        '/mp/__MISSION_PARTNER_ID__/training/survey/__SURVEY_ID__/edit-question/__QUESTION_ID__'
    },
    {
      routeHandlerKey: 'EditQuestion',
      url: routeGenerators.EditQuestion({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        examId: MOCK_URL_PARAMS.EXAM_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/training/exam/__EXAM_ID__'
    },
    {
      routeHandlerKey: 'GradeBook',
      url: routeGenerators.GradeBook({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/gradebook'
    },
    {
      routeHandlerKey: 'ManageLicense',
      url: routeGenerators.ManageLicense({ id: MOCK_URL_PARAMS.ID }),
      expected: '/sys/licenses/__ID__'
    },
    {
      routeHandlerKey: 'ManageLicenses',
      url: routeGenerators.ManageLicenses(),
      expected: '/sys/licenses'
    },
    {
      routeHandlerKey: 'ManageSettings',
      url: routeGenerators.ManageSettings(),
      expected: '/sys/settings'
    },
    {
      routeHandlerKey: 'ManageSettingsAlertBanner',
      url: routeGenerators.ManageSettingsAlertBanner(),
      expected: '/sys/settings/alert-banner'
    },
    {
      routeHandlerKey: 'ManageSettingsBanner',
      url: routeGenerators.ManageSettingsBanner(),
      expected: '/sys/settings/banner'
    },
    {
      routeHandlerKey: 'ManageTrainingLibrary',
      url: routeGenerators.ManageTrainingLibrary(),
      expected: '/sys/training-library'
    },
    {
      routeHandlerKey: 'ManageTrainingLibraryManualItem',
      url: routeGenerators.ManageTrainingLibraryManualItem({
        contentType: MOCK_URL_PARAMS.CONTENT_TYPE,
        contentId: MOCK_URL_PARAMS.CONTENT_ID
      }),
      expected: '/sys/manual-items/__CONTENT_TYPE__/__CONTENT_ID__'
    },
    {
      routeHandlerKey: 'ManageTrainingLibraryManualItems',
      url: routeGenerators.ManageTrainingLibraryManualItems(),
      expected: '/sys/manual-items'
    },
    {
      routeHandlerKey: 'ManageTrainingLibraryManualItemsAdd',
      url: routeGenerators.ManageTrainingLibraryManualItemsAdd({
        contentType: MOCK_URL_PARAMS.CONTENT_TYPE
      }),
      expected: '/sys/manual-items/__CONTENT_TYPE__/add'
    },
    {
      routeHandlerKey: 'ManageUser',
      url: routeGenerators.ManageUser({ userId: MOCK_URL_PARAMS.USER_ID }),
      expected: '/sys/users/__USER_ID__'
    },
    {
      routeHandlerKey: 'ManageUsers',
      url: routeGenerators.ManageUsers(),
      expected: '/sys/users'
    },
    {
      routeHandlerKey: 'Marketplace',
      url: routeGenerators.Marketplace({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/marketplace/mp/__MISSION_PARTNER_ID__'
    },
    {
      routeHandlerKey: 'MarketplaceVendorProductDetailPage',
      url: routeGenerators.MarketplaceVendorProductDetailPage({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        marketplaceVendorTag: MOCK_URL_PARAMS.VENDOR_ID,
        productId: MOCK_URL_PARAMS.ID
      }),
      expected:
        '/marketplace/mp/__MISSION_PARTNER_ID__/vendors/__VENDOR_ID__/products/__ID__'
    },
    {
      routeHandlerKey: 'MissionPartner',
      url: routeGenerators.MissionPartner({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__'
    },
    {
      routeHandlerKey: 'MissionPartnerLearner',
      url: routeGenerators.MissionPartnerLearner({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        userId: MOCK_URL_PARAMS.USER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/learner/__USER_ID__'
    },
    {
      routeHandlerKey: 'MissionPartnerLearners',
      url: routeGenerators.MissionPartnerLearners({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/learners'
    },
    {
      routeHandlerKey: 'MissionPartnerPortalManager',
      url: routeGenerators.MissionPartnerPortalManager({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        userId: MOCK_URL_PARAMS.USER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/portal-manager/__USER_ID__'
    },
    {
      routeHandlerKey: 'MissionPartners',
      url: routeGenerators.MissionPartners(),
      expected: '/mp'
    },
    {
      routeHandlerKey: 'PlanMetrics',
      url: routeGenerators.PlanMetrics({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/plan-metrics'
    },
    {
      routeHandlerKey: 'PlanMetricsLearners',
      url: routeGenerators.PlanMetricsLearners({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/plan-metrics/learners'
    },
    {
      routeHandlerKey: 'PlanMetricsPlan',
      url: routeGenerators.PlanMetricsPlan({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/plan-metrics/plan'
    },
    {
      routeHandlerKey: 'PlanMetricsPlanLearners',
      url: routeGenerators.PlanMetricsPlanLearners({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/plan-metrics/plan/learners'
    },
    {
      routeHandlerKey: 'PlanMetricsPlanWithParameters',
      url: routeGenerators.PlanMetricsPlanWithParameters({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        missionPartnerName: MOCK_URL_PARAMS.MISSION_PARTNER_NAME,
        planVersion: MOCK_URL_PARAMS.PLAN_VERSION,
        planType: MOCK_URL_PARAMS.PLAN_TYPE,
        planSourceId: MOCK_URL_PARAMS.PLAN_SOURCE_ID,
        groupName: MOCK_URL_PARAMS.GROUP_NAME,
        groupId: MOCK_URL_PARAMS.GROUP_ID,
        title: MOCK_URL_PARAMS.TITLE
      }),
      expected:
        '/mp/__MISSION_PARTNER_ID__/plan-metrics/plan?missionPartnerName=__MISSION_PARTNER_NAME__&planVersion=__PLAN_VERSION__&planType=__PLAN_TYPE__&planSourceId=__PLAN_SOURCE_ID__&groupId=__GROUP_ID__&groupName=__GROUP_NAME__&title=__TITLE__'
    },
    {
      routeHandlerKey: 'PlanMetricsPlanWithParametersFromSourceA',
      url: routeGenerators.PlanMetricsPlanWithParametersFromSourceA({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        missionPartnerName: MOCK_URL_PARAMS.MISSION_PARTNER_NAME,
        planVersion: MOCK_URL_PARAMS.PLAN_VERSION,
        planType: MOCK_URL_PARAMS.PLAN_TYPE,
        planSourceId: MOCK_URL_PARAMS.PLAN_SOURCE_ID,
        groupName: MOCK_URL_PARAMS.GROUP_NAME,
        groupId: MOCK_URL_PARAMS.GROUP_ID,
        title: MOCK_URL_PARAMS.TITLE
      }),
      expected:
        '/mp/__MISSION_PARTNER_ID__/plan-metrics/plan?missionPartnerName=__MISSION_PARTNER_NAME__&planVersion=__PLAN_VERSION__&planType=__PLAN_TYPE__&planSourceId=__PLAN_SOURCE_ID__&groupId=__GROUP_ID__&groupName=__GROUP_NAME__&title=__TITLE__'
    },
    {
      routeHandlerKey: 'PlanMetricsPlanWithParametersFromSourceB',
      url: routeGenerators.PlanMetricsPlanWithParametersFromSourceB({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        missionPartnerName: MOCK_URL_PARAMS.MISSION_PARTNER_NAME,
        planVersion: MOCK_URL_PARAMS.PLAN_VERSION,
        planType: MOCK_URL_PARAMS.PLAN_TYPE,
        planSourceId: MOCK_URL_PARAMS.PLAN_SOURCE_ID,
        groupName: MOCK_URL_PARAMS.GROUP_NAME,
        groupId: MOCK_URL_PARAMS.GROUP_ID,
        title: MOCK_URL_PARAMS.TITLE
      }),
      expected:
        '/mp/__MISSION_PARTNER_ID__/plan-metrics/plan?missionPartnerName=__MISSION_PARTNER_NAME__&planVersion=__PLAN_VERSION__&planType=__PLAN_TYPE__&planSourceId=__PLAN_SOURCE_ID__&groupId=__GROUP_ID__&groupName=__GROUP_NAME__&title=__TITLE__'
    },
    {
      routeHandlerKey: 'PlanMetricsPlanWithParametersUniqueMetrics',
      url: routeGenerators.PlanMetricsPlanWithParametersUniqueMetrics({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        missionPartnerName: MOCK_URL_PARAMS.MISSION_PARTNER_NAME,
        planType: MOCK_URL_PARAMS.PLAN_TYPE,
        planSourceId: MOCK_URL_PARAMS.PLAN_SOURCE_ID,
        title: MOCK_URL_PARAMS.TITLE
      }),
      expected:
        '/mp/__MISSION_PARTNER_ID__/plan-metrics/plan?missionPartnerId=__MISSION_PARTNER_ID__&missionPartnerName=__MISSION_PARTNER_NAME__&planType=__PLAN_TYPE__&planSourceId=__PLAN_SOURCE_ID__&title=__TITLE__'
    },
    {
      routeHandlerKey: 'ReportCenter',
      url: routeGenerators.ReportCenter(),
      expected: '/report-center'
    },
    {
      routeHandlerKey: 'Vendor',
      url: routeGenerators.Vendor({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        vendorId: MOCK_URL_PARAMS.VENDOR_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/lic/__VENDOR_ID__'
    },
    {
      routeHandlerKey: 'Vendors',
      url: routeGenerators.MissionPartnerVendors({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/lic'
    },
    {
      routeHandlerKey: 'TrainingHub',
      url: routeGenerators.MissionPartnerTrainingHub({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/hub'
    },
    {
      routeHandlerKey: 'MissionPartnerSettings',
      url: routeGenerators.MissionPartnerSettings({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/settings'
    },
    {
      routeHandlerKey: 'MissionPartnerDashboard',
      url: routeGenerators.MissionPartnerDashboard({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/dashboard'
    },
    {
      routeHandlerKey: 'SysHome',
      url: routeGenerators.SysHome(),
      expected: '/sys'
    },
    {
      routeHandlerKey: 'ReportingAdmin',
      url: routeGenerators.ReportingAdmin({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/reporting-admin'
    },
    {
      routeHandlerKey: 'MissionPartnerBadges',
      url: routeGenerators.MissionPartnerBadges({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/badges'
    },
    {
      routeHandlerKey: 'EditCourseQuizContent',
      url: routeGenerators.EditCourseQuizContent({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID,
        courseId: MOCK_URL_PARAMS.HOSTED_COURSE_ID,
        quizId: MOCK_URL_PARAMS.QUIZ_ID
      }),
      expected:
        '/mp/__MISSION_PARTNER_ID__/training/course/__HOSTED_COURSE_ID__/edit-content/quiz/__QUIZ_ID__'
    },
    {
      routeHandlerKey: 'MPSearch',
      url: routeGenerators.MPSearch(),
      expected: '/mp'
    },
    {
      routeHandlerKey: 'CreateCohort',
      url: routeGenerators.CreateCohort({
        missionPartnerId: MOCK_URL_PARAMS.MISSION_PARTNER_ID
      }),
      expected: '/mp/__MISSION_PARTNER_ID__/classroom/create'
    }
  ])(
    'injects the expected url parameters into $routeHandlerKey',
    ({ url, expected }) => {
      expect(url).toBe(expected);
    }
  );
});
