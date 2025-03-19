/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
  /** The `SafeInt` scalar type represents non-fractional signed whole numeric values that are considered safe as defined by the ECMAScript specification. */
  SafeInt: { input: any; output: any; }
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
  /** Represents NULL values */
  Void: { input: any; output: any; }
};

export type About = {
  __typename?: 'About';
  description?: Maybe<Array<Scalars['String']['output']>>;
  image: Scalars['String']['output'];
  imageAltText?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type AboutInput = {
  description?: InputMaybe<Array<Scalars['String']['input']>>;
  image: Scalars['String']['input'];
  imageAltText?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type AddGroupMembershipInput = {
  groupId: Scalars['ID']['input'];
  user: UserInput;
};

export type AddMissionPartnerMemberInput = {
  missionPartnerId: Scalars['ID']['input'];
  user: UserInput;
};

export type AddPlansInput = {
  planName?: InputMaybe<Scalars['String']['input']>;
  planSourceId: Scalars['ID']['input'];
  planType: Scalars['String']['input'];
  planVersion: Scalars['String']['input'];
};

export type AddTrainingCriteriaInput = {
  maxScore?: InputMaybe<Scalars['Int']['input']>;
  minScore?: InputMaybe<Scalars['Int']['input']>;
  ruleType?: InputMaybe<Scalars['String']['input']>;
  training?: InputMaybe<Array<InputMaybe<AssignedTrainingInput>>>;
};

export type Affiliate = {
  __typename?: 'Affiliate';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type AggregatedCourse = {
  __typename?: 'AggregatedCourse';
  completed: Scalars['Int']['output'];
  courseId: Scalars['String']['output'];
  courseTitle?: Maybe<Scalars['String']['output']>;
  markedCompleted: Scalars['Int']['output'];
  pendingReview: Scalars['Int']['output'];
  started: Scalars['Int']['output'];
  stopped: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  vendorName?: Maybe<Scalars['String']['output']>;
};

export type AggregatedTrainingPlan = {
  __typename?: 'AggregatedTrainingPlan';
  assigned: Scalars['Int']['output'];
  completed: Scalars['Int']['output'];
  planSourceId: Scalars['String']['output'];
  planTitle: Scalars['String']['output'];
  planType: Scalars['String']['output'];
  started: Scalars['Int']['output'];
  stopped: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AggregatedTrainingPlanItem = {
  __typename?: 'AggregatedTrainingPlanItem';
  completed?: Maybe<Scalars['Int']['output']>;
  itemId: Scalars['String']['output'];
  itemTitle?: Maybe<Scalars['String']['output']>;
  markedCompleted?: Maybe<Scalars['Int']['output']>;
  pendingReview?: Maybe<Scalars['Int']['output']>;
  started: Scalars['Int']['output'];
  stopped: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  vendorName?: Maybe<Scalars['String']['output']>;
};

export type AggregatedTranscriptCourses = {
  __typename?: 'AggregatedTranscriptCourses';
  count: Scalars['Int']['output'];
  data: Array<Maybe<AggregatedCourse>>;
};

export type AggregatedTranscriptTrainingPlans = {
  __typename?: 'AggregatedTranscriptTrainingPlans';
  records: Array<Maybe<AggregatedTrainingPlan>>;
  total: Scalars['Int']['output'];
};

export type AlertBannerAttributes = {
  __typename?: 'AlertBannerAttributes';
  content?: Maybe<Scalars['String']['output']>;
  isDismissable: Scalars['Boolean']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type AlertBannerContent = {
  __typename?: 'AlertBannerContent';
  content: AlertBannerAttributes;
  id: Scalars['ID']['output'];
};

export type Assessment = {
  __typename?: 'Assessment';
  assessmentDescription: Scalars['String']['output'];
  assessmentImage?: Maybe<Scalars['String']['output']>;
  assessmentTitle: Scalars['String']['output'];
  assessmentUrl: Scalars['String']['output'];
  dateAdded: Scalars['DateTime']['output'];
  dateUpdated?: Maybe<Scalars['DateTime']['output']>;
  durationInMinutes?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  source?: Maybe<Scalars['String']['output']>;
  vendorAssessmentId: Scalars['String']['output'];
  vendorId: Scalars['String']['output'];
  vendorName: Scalars['String']['output'];
};

/**
 * Used by the updateAssessment mutation to update an assessment.
 * Takes only the bare minimum of required fields from the assessment model.
 */
export type AssessmentInput = {
  assessmentDescription: Scalars['String']['input'];
  assessmentTitle: Scalars['String']['input'];
  assessmentUrl: Scalars['String']['input'];
  durationInMinutes?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  source: Scalars['String']['input'];
  vendorAssessmentId: Scalars['String']['input'];
  vendorId: Scalars['String']['input'];
  vendorName: Scalars['String']['input'];
};

export type AssessmentWithTranscriptData = {
  __typename?: 'AssessmentWithTranscriptData';
  assessmentDescription: Scalars['String']['output'];
  assessmentImage?: Maybe<Scalars['String']['output']>;
  assessmentTitle: Scalars['String']['output'];
  assessmentUrl: Scalars['String']['output'];
  assignedAt?: Maybe<Scalars['DateTime']['output']>;
  dateAdded: Scalars['DateTime']['output'];
  dateUpdated?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  markedCompletedAt?: Maybe<Scalars['DateTime']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: Scalars['String']['output'];
  vendorAssessmentId: Scalars['String']['output'];
  vendorId: Scalars['String']['output'];
  vendorName: Scalars['String']['output'];
};

export type AssignLicenseInput = {
  missionPartnerId: Scalars['ID']['input'];
  user: UserInput;
  vendorId: Scalars['ID']['input'];
};

export type AssignedLicensesCount = {
  __typename?: 'AssignedLicensesCount';
  count: Scalars['Int']['output'];
  vendorId: Scalars['ID']['output'];
};

export type AssignedTraining = {
  __typename?: 'AssignedTraining';
  assessmentId?: Maybe<Scalars['String']['output']>;
  assignedPlanId?: Maybe<Scalars['String']['output']>;
  courseId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  planSourceId?: Maybe<Scalars['String']['output']>;
  planType?: Maybe<Scalars['String']['output']>;
  planVersion?: Maybe<Scalars['String']['output']>;
  requiredLicenses?: Maybe<Array<Maybe<RequiredLicense>>>;
  title?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  vendors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type AssignedTrainingInput = {
  assessmentId?: InputMaybe<Scalars['String']['input']>;
  courseId?: InputMaybe<Scalars['String']['input']>;
  planSourceId?: InputMaybe<Scalars['String']['input']>;
  planType?: InputMaybe<Scalars['String']['input']>;
  planVersion?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type AwardedBadge = {
  __typename?: 'AwardedBadge';
  badgeId: Scalars['ID']['output'];
  description: Scalars['String']['output'];
  expiresAt: Scalars['DateTime']['output'];
  imageUrl: Scalars['String']['output'];
  issuedAt: Scalars['DateTime']['output'];
  jsonUrl: Scalars['String']['output'];
  pdfUrl: Scalars['String']['output'];
  recipient: Scalars['String']['output'];
  title: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type Badge = {
  __typename?: 'Badge';
  description: Scalars['String']['output'];
  displayType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type BadgesToBeNotified = {
  __typename?: 'BadgesToBeNotified';
  badgeId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  issuedAt: Scalars['DateTime']['output'];
};

export type BannerAttributes = {
  __typename?: 'BannerAttributes';
  body: Scalars['String']['output'];
  buttonLink: Scalars['String']['output'];
  buttonText: Scalars['String']['output'];
  logo: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type BannerContent = {
  __typename?: 'BannerContent';
  content: BannerAttributes;
  id: Scalars['ID']['output'];
};

export type CallToAction = {
  __typename?: 'CallToAction';
  title: Scalars['String']['output'];
};

export type CallToActionInput = {
  title: Scalars['String']['input'];
};

export type Caption = {
  __typename?: 'Caption';
  captionText: Scalars['String']['output'];
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type CatalogResult = Assessment | Course | ForceMultiplier | Lab | LearningPath | Skill | Survey;

export type CatalogResults = {
  __typename?: 'CatalogResults';
  hits?: Maybe<Array<Maybe<CatalogResult>>>;
  searchAfter?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type CategorizedSearchResults = {
  __typename?: 'CategorizedSearchResults';
  Assessment?: Maybe<UnifiedSearchResults>;
  Course?: Maybe<UnifiedSearchResults>;
  Lab?: Maybe<UnifiedSearchResults>;
  Plan?: Maybe<UnifiedSearchResults>;
  Program?: Maybe<UnifiedSearchResults>;
  Resource?: Maybe<UnifiedSearchResults>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Certification = {
  __typename?: 'Certification';
  _createdAt: Scalars['DateTime']['output'];
  _updatedAt: Scalars['DateTime']['output'];
  credentialId?: Maybe<Scalars['String']['output']>;
  credentialUrl?: Maybe<Scalars['String']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  fileUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  issuedAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  organization: Scalars['String']['output'];
  source: CertificationSource;
  trainingPrepItems?: Maybe<Array<Maybe<TrainingPrepItem>>>;
  trainingPrepType: TrainingPrepType;
  userId: Scalars['ID']['output'];
};

export enum CertificationSource {
  LinkedInSync = 'linked_in_sync',
  Manual = 'manual'
}

export type ChangeLog = {
  __typename?: 'ChangeLog';
  createdAt: Scalars['DateTime']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  revisionSummary: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  version: Scalars['String']['output'];
};

export type Collection = {
  __typename?: 'Collection';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  items: Array<Maybe<CollectionItem>>;
  name: Scalars['String']['output'];
};

export type CollectionItem = {
  __typename?: 'CollectionItem';
  assessmentId?: Maybe<Scalars['String']['output']>;
  courseId?: Maybe<Scalars['String']['output']>;
  dateAdded?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  planSourceId?: Maybe<Scalars['String']['output']>;
  planType?: Maybe<Scalars['String']['output']>;
  planVersion?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  vendors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type CollectionItemInput = {
  assessmentId?: InputMaybe<Scalars['ID']['input']>;
  courseId?: InputMaybe<Scalars['ID']['input']>;
  dateAdded?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  planSourceId?: InputMaybe<Scalars['ID']['input']>;
  planType?: InputMaybe<Scalars['String']['input']>;
  planVersion?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  vendors?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Content = {
  __typename?: 'Content';
  content: Scalars['JSONObject']['output'];
  id: Scalars['ID']['output'];
};

export type Course = {
  __typename?: 'Course';
  averageRating?: Maybe<Scalars['Float']['output']>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  courseDescription: Scalars['String']['output'];
  courseDuration: Scalars['Int']['output'];
  courseImage?: Maybe<Scalars['String']['output']>;
  courseInstructor?: Maybe<Scalars['String']['output']>;
  courseTitle: Scalars['String']['output'];
  courseUrl: Scalars['String']['output'];
  dateAdded: Scalars['DateTime']['output'];
  dateUpdated?: Maybe<Scalars['DateTime']['output']>;
  duCompetencies?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<Maybe<CourseItems>>>;
  markedCompletedAt?: Maybe<Scalars['DateTime']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  stoppedAt?: Maybe<Scalars['DateTime']['output']>;
  totalReviews?: Maybe<Scalars['Int']['output']>;
  vendorCourseId: Scalars['String']['output'];
  vendorId: Scalars['String']['output'];
  vendorName: Scalars['String']['output'];
  vendorRating?: Maybe<CourseRating>;
  vendorStatus?: Maybe<Scalars['String']['output']>;
};

export type CourseCount = {
  __typename?: 'CourseCount';
  total?: Maybe<Scalars['Int']['output']>;
};

export type CourseInput = {
  courseDescription: Scalars['String']['input'];
  courseDuration: Scalars['Int']['input'];
  courseTitle: Scalars['String']['input'];
  courseUrl: Scalars['String']['input'];
  vendorCourseId: Scalars['String']['input'];
  vendorId: Scalars['String']['input'];
};

export type CourseItems = {
  __typename?: 'CourseItems';
  itemId: Scalars['String']['output'];
  itemType: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type CourseProgress = {
  __typename?: 'CourseProgress';
  completed?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  inProgress?: Maybe<Scalars['Int']['output']>;
  notStarted?: Maybe<Scalars['Int']['output']>;
  pendingReview?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  vendorName: Scalars['String']['output'];
};

export type CourseRating = {
  __typename?: 'CourseRating';
  averageRating?: Maybe<Scalars['Float']['output']>;
  numberOfRatings?: Maybe<Scalars['Int']['output']>;
  ratingType?: Maybe<Scalars['String']['output']>;
};

export type CoursesQuarterReturn = {
  __typename?: 'CoursesQuarterReturn';
  completed: QuarterStatusReturn;
  markedCompleted: QuarterStatusReturn;
  pendingReview: QuarterStatusReturn;
  quarter: Scalars['String']['output'];
  started: QuarterStatusReturn;
  stopped: QuarterStatusReturn;
  total: Scalars['Int']['output'];
};

export type CreateCertificationInput = {
  credentialId?: InputMaybe<Scalars['String']['input']>;
  credentialUrl?: InputMaybe<Scalars['String']['input']>;
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileUrl?: InputMaybe<Scalars['String']['input']>;
  issuedAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  organization: Scalars['String']['input'];
  trainingPrepItems?: InputMaybe<Array<InputMaybe<TrainingPrepItemInput>>>;
  trainingPrepType: TrainingPrepType;
};

export type CreateCurriculumReviewInput = {
  itemId: Scalars['ID']['input'];
  itemType: CurriculumReviewItemType;
  rating: Scalars['Int']['input'];
  review: Scalars['String']['input'];
  title: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type CreateDomainInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  shortDescription: Scalars['String']['input'];
};

export type CreateJobRoleInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  roleId: Scalars['String']['input'];
};

export type CreateKsatInput = {
  code: Scalars['String']['input'];
  description: Scalars['String']['input'];
  domainId?: InputMaybe<Scalars['ID']['input']>;
  ksatType: KsatType;
};

export type CreateLearningObjectiveInput = {
  description: Scalars['String']['input'];
};

export type CreateMissionPartnerInput = {
  affiliateId: Scalars['ID']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  portalManagerUserId?: InputMaybe<Scalars['ID']['input']>;
  provisionedLicenses?: InputMaybe<Array<InputMaybe<ProvisionedLicensesInput>>>;
  sectionType?: InputMaybe<Scalars['String']['input']>;
};

export type CreateRoleInput = {
  missionPartnerId: Scalars['ID']['input'];
  name: RoleName;
  userId: Scalars['ID']['input'];
};

export type CreateVendorInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  isLicensed?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type CurriculumItem = {
  __typename?: 'CurriculumItem';
  title: Scalars['String']['output'];
};

export type CurriculumReview = {
  __typename?: 'CurriculumReview';
  _createdAt: Scalars['String']['output'];
  item?: Maybe<CurriculumItem>;
  itemId: Scalars['String']['output'];
  itemType: CurriculumReviewItemType;
  rating: Scalars['Int']['output'];
  review: Scalars['String']['output'];
  title: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export enum CurriculumReviewItemType {
  Course = 'course',
  ForceMultiplier = 'force_multiplier',
  HostedLab = 'hosted_lab',
  LearningPath = 'learning_path',
  TrainingPlan = 'training_plan'
}

export enum CurriculumType {
  Course = 'course',
  ForceMultiplier = 'force_multiplier',
  HostedLab = 'hosted_lab',
  LearningPath = 'learning_path',
  TrainingPlan = 'training_plan'
}

export type DeleteLibraryItemInput = {
  forceMultiplierId: Scalars['ID']['input'];
  libraryItemId: Scalars['ID']['input'];
  missionPartnerId: Scalars['String']['input'];
  version: Scalars['String']['input'];
};

export type DetailedForceMultiplierItem = Assessment | Course | Lab | Survey;

export type Domain = {
  __typename?: 'Domain';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  shortDescription: Scalars['String']['output'];
};

export type DomainFilter = {
  curriculumId?: InputMaybe<Scalars['String']['input']>;
  curriculumType?: InputMaybe<CurriculumType>;
  jobRoleId?: InputMaybe<Scalars['ID']['input']>;
  ksatId?: InputMaybe<Scalars['String']['input']>;
  learningObjectiveId?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export enum DomainSortBy {
  Description = 'description',
  Name = 'name',
  ShortDescription = 'shortDescription'
}

export type Download = {
  __typename?: 'Download';
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  parameters?: Maybe<Scalars['String']['output']>;
  requestedAt: Scalars['DateTime']['output'];
  status: DownloadStatus;
  title: Scalars['String']['output'];
  type: DownloadType;
  userId: Scalars['ID']['output'];
};

export enum DownloadStatus {
  Error = 'ERROR',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Success = 'SUCCESS'
}

export enum DownloadType {
  Badges = 'BADGES',
  BulkImportErrors = 'BULK_IMPORT_ERRORS',
  CourseLevelTrainingPlanMetrics = 'COURSE_LEVEL_TRAINING_PLAN_METRICS',
  GroupTrainingPlanTranscripts = 'GROUP_TRAINING_PLAN_TRANSCRIPTS',
  Licenses = 'LICENSES',
  MissionPartnerIndividualLearnerActivity = 'MISSION_PARTNER_INDIVIDUAL_LEARNER_ACTIVITY',
  MissionPartnerLearnerActivityEvents = 'MISSION_PARTNER_LEARNER_ACTIVITY_EVENTS',
  MissionPartnerLicenseRequests = 'MISSION_PARTNER_LICENSE_REQUESTS',
  MissionPartnerMembers = 'MISSION_PARTNER_MEMBERS',
  MissionPartnerQuizzesAndExams = 'MISSION_PARTNER_QUIZZES_AND_EXAMS',
  MissionPartnerSurveys = 'MISSION_PARTNER_SURVEYS',
  MissionPartnerTrainingPlanTranscripts = 'MISSION_PARTNER_TRAINING_PLAN_TRANSCRIPTS',
  MissionPartnerTranscriptCourseRecords = 'MISSION_PARTNER_TRANSCRIPT_COURSE_RECORDS',
  MissionPartnerVendorLicenses = 'MISSION_PARTNER_VENDOR_LICENSES',
  MitHorizonUserLoginEvents = 'MIT_HORIZON_USER_LOGIN_EVENTS',
  Users = 'USERS'
}

export type DuBadgeMetrics = {
  __typename?: 'DuBadgeMetrics';
  badgeId: Scalars['ID']['output'];
  badgeImage: Scalars['String']['output'];
  badgeTitle: Scalars['String']['output'];
  missionPartnerId?: Maybe<Scalars['ID']['output']>;
  missionPartnerMembersAwarded?: Maybe<Scalars['Int']['output']>;
  totalAwarded: Scalars['Int']['output'];
};

export type DutyStation = {
  __typename?: 'DutyStation';
  location: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type FmModuleItemInput = {
  itemId: Scalars['ID']['input'];
};

export type FeaturedTraining = {
  __typename?: 'FeaturedTraining';
  assessmentId?: Maybe<Scalars['String']['output']>;
  assigned: Scalars['Int']['output'];
  completed: Scalars['Int']['output'];
  courseId?: Maybe<Scalars['String']['output']>;
  dateAdded?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  labId?: Maybe<Scalars['String']['output']>;
  markedCompleted: Scalars['Int']['output'];
  pendingReview: Scalars['Int']['output'];
  planSourceId?: Maybe<Scalars['String']['output']>;
  planType?: Maybe<Scalars['String']['output']>;
  planVersion?: Maybe<Scalars['String']['output']>;
  required?: Maybe<Scalars['Boolean']['output']>;
  started: Scalars['Int']['output'];
  stopped: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  vendors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type FeaturedTrainingInput = {
  assessmentId?: InputMaybe<Scalars['ID']['input']>;
  courseId?: InputMaybe<Scalars['ID']['input']>;
  dateAdded?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  labId?: InputMaybe<Scalars['ID']['input']>;
  planSourceId?: InputMaybe<Scalars['ID']['input']>;
  planType?: InputMaybe<Scalars['String']['input']>;
  planVersion?: InputMaybe<Scalars['String']['input']>;
  required?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  vendors?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type FieldCommand = {
  __typename?: 'FieldCommand';
  title: Scalars['String']['output'];
};

export type FindCategorizedTimeSpentLearningResult = {
  __typename?: 'FindCategorizedTimeSpentLearningResult';
  categoryBreakpoints: Array<Maybe<Scalars['Float']['output']>>;
  usersPerCategory: Array<Maybe<Scalars['Int']['output']>>;
};

export type FindCertificationOutput = {
  __typename?: 'FindCertificationOutput';
  records?: Maybe<Array<Maybe<Certification>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type FindCertificationsFilterInput = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type FindCertificationsInput = {
  filter?: InputMaybe<FindCertificationsFilterInput>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<FindCertificationsSortInput>;
};

export type FindCertificationsSortInput = {
  direction?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
};

export type FindCurriculumReviewsInput = {
  itemFilter?: InputMaybe<ItemFilter>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type FindCurriculumReviewsOutput = {
  __typename?: 'FindCurriculumReviewsOutput';
  data?: Maybe<Array<Maybe<CurriculumReview>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type FindDomainsOutput = {
  __typename?: 'FindDomainsOutput';
  data?: Maybe<Array<Maybe<Domain>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type FindJobRolesOutput = {
  __typename?: 'FindJobRolesOutput';
  data?: Maybe<Array<Maybe<JobRole>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type FindKsatsOutput = {
  __typename?: 'FindKsatsOutput';
  data?: Maybe<Array<Maybe<Ksat>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type FindLearningObjectivesOutput = {
  __typename?: 'FindLearningObjectivesOutput';
  data?: Maybe<Array<Maybe<LearningObjective>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type FindPointEventsOutput = {
  __typename?: 'FindPointEventsOutput';
  records?: Maybe<Array<Maybe<PointEvent>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type ForceMultiplier = {
  __typename?: 'ForceMultiplier';
  _createdAt: Scalars['DateTime']['output'];
  _updatedAt: Scalars['DateTime']['output'];
  averageRating?: Maybe<Scalars['Float']['output']>;
  changeLog: Array<Maybe<ChangeLog>>;
  conditions?: Maybe<ForceMultiplierConditionAll>;
  content: ForceMultiplierContent;
  enrolledLearners?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<Maybe<ForceMultiplierItem>>>;
  learningPathUri?: Maybe<Scalars['String']['output']>;
  libraryItems?: Maybe<Array<Maybe<ForceMultiplierLibraryItem>>>;
  missionPartnerId?: Maybe<Scalars['String']['output']>;
  modules?: Maybe<Array<Maybe<ForceMultiplierModule>>>;
  requiredLicenses: Array<Maybe<RequiredLicense>>;
  status: StatusType;
  title: Scalars['String']['output'];
  totalDuration?: Maybe<Scalars['Int']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  totalReviews?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  unsequenced?: Maybe<Scalars['Boolean']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  vendors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  version: Scalars['String']['output'];
};

export type ForceMultiplierAbout = {
  __typename?: 'ForceMultiplierAbout';
  description?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  image?: Maybe<Scalars['String']['output']>;
  imageAltText?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ForceMultiplierBrand = {
  __typename?: 'ForceMultiplierBrand';
  image?: Maybe<Scalars['String']['output']>;
  imageAltText?: Maybe<Scalars['String']['output']>;
  imageDark?: Maybe<Scalars['String']['output']>;
  prefix?: Maybe<Scalars['String']['output']>;
};

export type ForceMultiplierCondition = {
  __typename?: 'ForceMultiplierCondition';
  fact?: Maybe<Scalars['String']['output']>;
  operator?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type ForceMultiplierConditionAll = {
  __typename?: 'ForceMultiplierConditionAll';
  all?: Maybe<Array<Maybe<ForceMultiplierCondition>>>;
};

export type ForceMultiplierConditionAllInput = {
  all?: InputMaybe<Array<InputMaybe<ForceMultiplierConditionInput>>>;
};

export type ForceMultiplierConditionInput = {
  fact?: InputMaybe<Scalars['String']['input']>;
  operator?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type ForceMultiplierContent = {
  __typename?: 'ForceMultiplierContent';
  about?: Maybe<ForceMultiplierAbout>;
  brand?: Maybe<ForceMultiplierBrand>;
  callToAction?: Maybe<CallToAction>;
  description?: Maybe<Array<Scalars['String']['output']>>;
  summary: Scalars['String']['output'];
};

export type ForceMultiplierContentInput = {
  about?: InputMaybe<AboutInput>;
  callToAction?: InputMaybe<CallToActionInput>;
  description?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  summary?: InputMaybe<Scalars['String']['input']>;
};

export type ForceMultiplierImage = {
  __typename?: 'ForceMultiplierImage';
  url: Scalars['String']['output'];
};

export type ForceMultiplierInput = {
  conditions?: InputMaybe<ForceMultiplierConditionAllInput>;
  id: Scalars['ID']['input'];
  items?: InputMaybe<Array<InputMaybe<ForceMultiplierItemInput>>>;
  libraryItems?: InputMaybe<Array<InputMaybe<LibraryItemInput>>>;
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  modules?: InputMaybe<Array<InputMaybe<ModuleInput>>>;
  newItems?: InputMaybe<Array<InputMaybe<ItemInput>>>;
  status?: InputMaybe<StatusType>;
  title?: InputMaybe<Scalars['String']['input']>;
  unsequenced?: InputMaybe<Scalars['Boolean']['input']>;
  version: Scalars['String']['input'];
};

export type ForceMultiplierItem = {
  __typename?: 'ForceMultiplierItem';
  id: Scalars['ID']['output'];
  item?: Maybe<DetailedForceMultiplierItem>;
  masteryLevel?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type ForceMultiplierItemInput = {
  duration?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  masteryLevel?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  vendorName?: InputMaybe<Scalars['String']['input']>;
};

export type ForceMultiplierLibraryItem = {
  __typename?: 'ForceMultiplierLibraryItem';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ForceMultiplierModule = {
  __typename?: 'ForceMultiplierModule';
  id: Scalars['ID']['output'];
  items?: Maybe<Array<Maybe<ForceMultiplierModuleItem>>>;
  title: Scalars['String']['output'];
};

export type ForceMultiplierModuleItem = {
  __typename?: 'ForceMultiplierModuleItem';
  itemId: Scalars['ID']['output'];
};

export type Grade = {
  __typename?: 'Grade';
  title: Scalars['String']['output'];
};

export type Group = {
  __typename?: 'Group';
  CREATED_AT?: Maybe<Scalars['DateTime']['output']>;
  SAVED_AT?: Maybe<Scalars['DateTime']['output']>;
  courses?: Maybe<Array<Maybe<GroupCourses>>>;
  groupMemberCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  missionPartnerId?: Maybe<Scalars['String']['output']>;
  missionPartnerName?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  totalItems?: Maybe<Scalars['Int']['output']>;
  trainingPlans?: Maybe<Array<Maybe<GroupTrainingPlans>>>;
};

export type GroupCourses = {
  __typename?: 'GroupCourses';
  courseId: Scalars['ID']['output'];
  courseTitle: Scalars['String']['output'];
  vendorName: Scalars['String']['output'];
};

export type GroupMember = {
  __typename?: 'GroupMember';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  groupId: Scalars['String']['output'];
  groupName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type GroupMetrics = {
  __typename?: 'GroupMetrics';
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  course?: Maybe<Course>;
  courseId: Scalars['String']['output'];
  markedCompletedAt?: Maybe<Scalars['DateTime']['output']>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: Scalars['String']['output'];
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
};

export type GroupTrainingPlans = {
  __typename?: 'GroupTrainingPlans';
  isLatestVersion: Scalars['Boolean']['output'];
  planSourceId: Scalars['ID']['output'];
  planType: Scalars['String']['output'];
  planVersion: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type HostedCourse = {
  __typename?: 'HostedCourse';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<Maybe<Scalars['JSONObject']['output']>>>;
  missionPartnerId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type HostedCourseImage = {
  __typename?: 'HostedCourseImage';
  url: Scalars['String']['output'];
};

export type HostedCourseItem = {
  __typename?: 'HostedCourseItem';
  item: Scalars['JSONObject']['output'];
  status: Scalars['String']['output'];
};

export type HostedCourseItemInput = {
  id: Scalars['ID']['input'];
  item: Scalars['JSONObject']['input'];
  missionPartnerId: Scalars['ID']['input'];
};

export type HostedCourseProgress = {
  __typename?: 'HostedCourseProgress';
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  hostedCourseId: Scalars['ID']['output'];
  items: Array<Maybe<Scalars['JSONObject']['output']>>;
  missionPartnerId: Scalars['ID']['output'];
  startedAt: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type HostedExam = {
  __typename?: 'HostedExam';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  durationInMinutes?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  maxAttempts?: Maybe<Scalars['Int']['output']>;
  missionPartnerId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  passingScore?: Maybe<Scalars['Int']['output']>;
  questions?: Maybe<Array<Maybe<Scalars['JSONObject']['output']>>>;
  status: Scalars['String']['output'];
  trainingCriteria?: Maybe<Array<Maybe<TrainingCriteria>>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type HostedExamProgress = {
  __typename?: 'HostedExamProgress';
  answers: Array<Maybe<Scalars['JSONObject']['output']>>;
  attemptNumber: Scalars['Int']['output'];
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  hostedExamId: Scalars['ID']['output'];
  missionPartnerId: Scalars['ID']['output'];
  score: Scalars['Int']['output'];
  startedAt: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type HostedScorm = {
  __typename?: 'HostedScorm';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  missionPartnerId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  scormFilename?: Maybe<Scalars['String']['output']>;
  scormUrl?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type HostedScormPackageInput = {
  file: Scalars['Upload']['input'];
  id: Scalars['ID']['input'];
};

export type HostedScormProgress = {
  __typename?: 'HostedScormProgress';
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  hostedScormId: Scalars['ID']['output'];
  missionPartnerId: Scalars['ID']['output'];
  scormData?: Maybe<Scalars['JSONObject']['output']>;
  startedAt: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type HostedVideoInput = {
  file: Scalars['Upload']['input'];
  id: Scalars['ID']['input'];
  videoLessonId: Scalars['ID']['input'];
};

export type IncludedIn = {
  __typename?: 'IncludedIn';
  title: Scalars['String']['output'];
};

export type IndexedTranscriptCourse = {
  __typename?: 'IndexedTranscriptCourse';
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  course: IndexedTranscriptCourse_Course;
  courseId: Scalars['String']['output'];
  markedCompletedAt?: Maybe<Scalars['DateTime']['output']>;
  pendingReviewAt?: Maybe<Scalars['DateTime']['output']>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: Scalars['String']['output'];
  stoppedAt?: Maybe<Scalars['DateTime']['output']>;
  user: IndexedTranscriptCourse_User;
  userId: Scalars['String']['output'];
};

export type IndexedTranscriptCourse_Course = {
  __typename?: 'IndexedTranscriptCourse_Course';
  courseTitle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  vendorCourseId: Scalars['String']['output'];
  vendorId: Scalars['String']['output'];
};

export type IndexedTranscriptCourse_User = {
  __typename?: 'IndexedTranscriptCourse_User';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
};

export type IndexedTranscriptTrainingPlan = {
  __typename?: 'IndexedTranscriptTrainingPlan';
  assignedAt?: Maybe<Scalars['DateTime']['output']>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: Scalars['String']['output'];
  stoppedAt?: Maybe<Scalars['DateTime']['output']>;
  trainingPlan: IndexedTranscriptTrainingPlan_TrainingPlan;
  trainingPlanId: Scalars['String']['output'];
  user: IndexedTranscriptTrainingPlan_User;
  userId: Scalars['String']['output'];
};

export type IndexedTranscriptTrainingPlan_TrainingPlan = {
  __typename?: 'IndexedTranscriptTrainingPlan_TrainingPlan';
  planSourceId: Scalars['String']['output'];
  planType: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type IndexedTranscriptTrainingPlan_User = {
  __typename?: 'IndexedTranscriptTrainingPlan_User';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
};

export type IndexingBatch = {
  __typename?: 'IndexingBatch';
  id: Scalars['ID']['output'];
  items?: Maybe<Array<Maybe<IndexingBatchItem>>>;
};

export type IndexingBatchItem = {
  __typename?: 'IndexingBatchItem';
  errors: Scalars['Int']['output'];
  fetched: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  indexed: Scalars['Int']['output'];
  indexingBatchId: Scalars['ID']['output'];
  table: Scalars['String']['output'];
  warnings: Scalars['Int']['output'];
};

export type IndexingBatches = {
  __typename?: 'IndexingBatches';
  records?: Maybe<Array<Maybe<IndexingBatch>>>;
  total: Scalars['Int']['output'];
};

export type IndividualCourseComplete = {
  __typename?: 'IndividualCourseComplete';
  courseId?: Maybe<Scalars['String']['output']>;
  markedCompletedAt?: Maybe<Scalars['DateTime']['output']>;
  searchQuery?: Maybe<Scalars['String']['output']>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type IsUserLicensedResponse = {
  __typename?: 'IsUserLicensedResponse';
  isLicensed: Scalars['Boolean']['output'];
};

export type ItemFilter = {
  itemId: Scalars['String']['input'];
  itemType: CurriculumReviewItemType;
};

export type ItemInput = {
  id: Scalars['ID']['input'];
  type: ItemType;
};

export enum ItemType {
  Assessment = 'Assessment',
  Course = 'Course',
  Lab = 'Lab',
  Survey = 'Survey'
}

export type JobRole = {
  __typename?: 'JobRole';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  roleId: Scalars['ID']['output'];
};

export type JobRoleFilter = {
  domainIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  ksatId?: InputMaybe<Scalars['String']['input']>;
  ksatTypes?: InputMaybe<Array<KsatType>>;
  learningObjectiveId?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export enum JobRoleSortBy {
  Description = 'description',
  Name = 'name',
  RoleId = 'roleId'
}

export type Ksat = {
  __typename?: 'Ksat';
  code: Scalars['String']['output'];
  description: Scalars['String']['output'];
  domain?: Maybe<Domain>;
  id: Scalars['ID']['output'];
  ksatType: KsatType;
};

export type KsatFilter = {
  code?: InputMaybe<Scalars['String']['input']>;
  curriculumId?: InputMaybe<Scalars['String']['input']>;
  curriculumType?: InputMaybe<CurriculumType>;
  domainIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  jobRoleId?: InputMaybe<Scalars['ID']['input']>;
  ksatTypes?: InputMaybe<Array<KsatType>>;
  learningObjectiveId?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export enum KsatSortBy {
  Code = 'code',
  Description = 'description',
  Domain = 'domain',
  KsatType = 'ksatType'
}

export enum KsatType {
  Ability = 'Ability',
  Knowledge = 'Knowledge',
  Skill = 'Skill',
  Task = 'Task'
}

export type Lab = {
  __typename?: 'Lab';
  averageRating?: Maybe<Scalars['Float']['output']>;
  content?: Maybe<Array<Maybe<LabContent>>>;
  coreConceptItems?: Maybe<Array<Maybe<LabItem>>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  durationInMinutes?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  instructions?: Maybe<Array<Maybe<LabInstruction>>>;
  launchConfig?: Maybe<LabLaunchConfig>;
  missionPartner?: Maybe<MissionPartner>;
  missionPartnerId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  previewImageUrl?: Maybe<Scalars['String']['output']>;
  progress?: Maybe<TranscriptLab>;
  relevantLearningPaths?: Maybe<Array<Maybe<LabItem>>>;
  status?: Maybe<Scalars['String']['output']>;
  totalReviews?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type LabContent = {
  __typename?: 'LabContent';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type LabContentInput = {
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
};

export type LabInstruction = {
  __typename?: 'LabInstruction';
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  videoFilename?: Maybe<Scalars['String']['output']>;
  videoUrl?: Maybe<Scalars['String']['output']>;
};

export type LabInstructionImage = {
  __typename?: 'LabInstructionImage';
  url: Scalars['String']['output'];
};

export type LabInstructionInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
  videoFilename?: InputMaybe<Scalars['String']['input']>;
  videoUrl?: InputMaybe<Scalars['String']['input']>;
};

export type LabItem = {
  __typename?: 'LabItem';
  itemId: Scalars['String']['output'];
  itemTitle: Scalars['String']['output'];
  itemType: Scalars['String']['output'];
  itemVersion?: Maybe<Scalars['String']['output']>;
};

export type LabItemInput = {
  itemId: Scalars['String']['input'];
  itemTitle: Scalars['String']['input'];
  itemType: Scalars['String']['input'];
  itemVersion?: InputMaybe<Scalars['String']['input']>;
};

export type LabLaunchConfig = {
  __typename?: 'LabLaunchConfig';
  path?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type LabLaunchConfigInput = {
  path?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type LeaderboardRank = {
  __typename?: 'LeaderboardRank';
  firstName: Scalars['String']['output'];
  isSelf?: Maybe<Scalars['Boolean']['output']>;
  lastName: Scalars['String']['output'];
  photoUrl?: Maybe<Scalars['String']['output']>;
  points: Scalars['SafeInt']['output'];
  rank: Scalars['SafeInt']['output'];
  totalTimeTrained?: Maybe<Scalars['SafeInt']['output']>;
};

export type LearningObjective = {
  __typename?: 'LearningObjective';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type LearningObjectiveFilter = {
  curriculumId?: InputMaybe<Scalars['String']['input']>;
  curriculumType?: InputMaybe<CurriculumType>;
  domainIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  jobRoleId?: InputMaybe<Scalars['ID']['input']>;
  ksatId?: InputMaybe<Scalars['String']['input']>;
  ksatTypes?: InputMaybe<Array<InputMaybe<KsatType>>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export enum LearningObjectiveSortBy {
  Description = 'description'
}

export type LearningPath = {
  __typename?: 'LearningPath';
  averageRating?: Maybe<Scalars['Float']['output']>;
  content: LearningPathContent;
  enrolledLearners?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  requiredLicenses: Array<Maybe<RequiredLicense>>;
  schoolId: Scalars['ID']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  totalDuration?: Maybe<Scalars['Int']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  totalReviews?: Maybe<Scalars['Int']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  vendors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  version: Scalars['String']['output'];
};

export type LearningPathContent = {
  __typename?: 'LearningPathContent';
  about: About;
  callToAction: CallToAction;
  description?: Maybe<Array<Scalars['String']['output']>>;
  learningPathSummary: LearningPathSummary;
  opportunities?: Maybe<Opportunities>;
  skillTree?: Maybe<SkillTree>;
  summary: Scalars['String']['output'];
  testimonial?: Maybe<Testimonial>;
  valuePropositions?: Maybe<Array<ValueProposition>>;
};

export type LearningPathSummary = {
  __typename?: 'LearningPathSummary';
  caption: Caption;
  eyebrowTitle: Scalars['String']['output'];
  image: Scalars['String']['output'];
  imageAltText?: Maybe<Scalars['String']['output']>;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
  valueText?: Maybe<Array<Scalars['String']['output']>>;
};

export type LibraryItemInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type License = {
  __typename?: 'License';
  assignedAt: Scalars['DateTime']['output'];
  lastUsedAt?: Maybe<Scalars['DateTime']['output']>;
  missionPartnerId: Scalars['String']['output'];
  missionPartnerName: Scalars['String']['output'];
  user?: Maybe<User>;
  userEmail: Scalars['String']['output'];
  userFirstName: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
  userLastName: Scalars['String']['output'];
  vendorId: Scalars['ID']['output'];
  vendorName: Scalars['String']['output'];
};

export type LicenseAvailability = {
  __typename?: 'LicenseAvailability';
  availability: Scalars['String']['output'];
  missionPartnerId?: Maybe<Scalars['ID']['output']>;
  missionPartnerName?: Maybe<Scalars['String']['output']>;
  vendorId: Scalars['ID']['output'];
  vendorName: Scalars['String']['output'];
};

export type LicenseRequest = {
  __typename?: 'LicenseRequest';
  approvedAt?: Maybe<Scalars['DateTime']['output']>;
  declinedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  missionPartnerId: Scalars['String']['output'];
  missionPartnerName: Scalars['String']['output'];
  requestedAt: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  userEmail: Scalars['String']['output'];
  userFirstName: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
  userLastName: Scalars['String']['output'];
  userOrganization: Scalars['String']['output'];
  vendorId: Scalars['ID']['output'];
  vendorName: Scalars['String']['output'];
};

export type LicenseResponse = {
  __typename?: 'LicenseResponse';
  records: Array<Maybe<License>>;
  total: Scalars['Int']['output'];
};

export type LicenseStatusCount = {
  __typename?: 'LicenseStatusCount';
  active: Scalars['Int']['output'];
  available: Scalars['Int']['output'];
  inactive: Scalars['Int']['output'];
  provisioned: Scalars['Int']['output'];
  vendorId: Scalars['ID']['output'];
  vendorName: Scalars['String']['output'];
};

export type Location = {
  __typename?: 'Location';
  location: Scalars['String']['output'];
  organization: Scalars['String']['output'];
  prefix: Scalars['String']['output'];
  summary: Scalars['String']['output'];
};

export type MarkCompleteModal = {
  __typename?: 'MarkCompleteModal';
  itemId?: Maybe<Scalars['ID']['output']>;
  trainingPlanId?: Maybe<Scalars['ID']['output']>;
};

export type MissionPartner = {
  __typename?: 'MissionPartner';
  accessCode?: Maybe<Scalars['String']['output']>;
  affiliateId: Scalars['ID']['output'];
  collections?: Maybe<Array<Maybe<Collection>>>;
  courses: Array<Maybe<HostedCourse>>;
  customTrainingEnabled: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  enabledReports?: Maybe<Array<Maybe<Report>>>;
  exams: Array<Maybe<HostedExam>>;
  featuredTraining?: Maybe<Array<Maybe<FeaturedTraining>>>;
  forceMultipliers: Array<Maybe<ForceMultiplier>>;
  id: Scalars['ID']['output'];
  isArchived?: Maybe<Scalars['Boolean']['output']>;
  isMarketplaceEnabled?: Maybe<Scalars['Boolean']['output']>;
  labs: Array<Maybe<Lab>>;
  logoUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  provisionedLicenses?: Maybe<Array<Maybe<ProvisionedLicenses>>>;
  scorms: Array<Maybe<HostedScorm>>;
  sectionType?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  surveys: Array<Maybe<Survey>>;
  trialEnabled: Scalars['Boolean']['output'];
  trialEndDate?: Maybe<Scalars['DateTime']['output']>;
  trialStartDate?: Maybe<Scalars['DateTime']['output']>;
};

export type MissionPartnerBadgeMetrics = {
  __typename?: 'MissionPartnerBadgeMetrics';
  badgeId: Scalars['ID']['output'];
  badgeImage: Scalars['String']['output'];
  badgeTitle: Scalars['String']['output'];
  displayType: Scalars['String']['output'];
  missionPartnerId?: Maybe<Scalars['ID']['output']>;
  missionPartnerMembersAwarded?: Maybe<Scalars['Int']['output']>;
  totalAwarded: Scalars['Int']['output'];
};

export type MissionPartnerLogo = {
  __typename?: 'MissionPartnerLogo';
  url?: Maybe<Scalars['String']['output']>;
};

export type MissionPartnerMember = {
  __typename?: 'MissionPartnerMember';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  missionPartnerId: Scalars['String']['output'];
  missionPartnerName: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type MissionPartnerMinDetails = {
  __typename?: 'MissionPartnerMinDetails';
  accessCode?: Maybe<Scalars['String']['output']>;
  affiliateId: Scalars['ID']['output'];
  customTrainingEnabled: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isArchived?: Maybe<Scalars['Boolean']['output']>;
  isMarketplaceEnabled?: Maybe<Scalars['Boolean']['output']>;
  logoUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  sectionType?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  trialEnabled: Scalars['Boolean']['output'];
  trialEndDate?: Maybe<Scalars['DateTime']['output']>;
  trialStartDate?: Maybe<Scalars['DateTime']['output']>;
};

export type MissionPartnerRequest = {
  __typename?: 'MissionPartnerRequest';
  approvedAt?: Maybe<Scalars['DateTime']['output']>;
  declinedAt?: Maybe<Scalars['DateTime']['output']>;
  missionPartnerId: Scalars['ID']['output'];
  missionPartnerName: Scalars['String']['output'];
  requestedAt: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  userEmail: Scalars['String']['output'];
  userFirstName: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
  userLastName: Scalars['String']['output'];
};

export type MissionPartnerTrialStatus = {
  __typename?: 'MissionPartnerTrialStatus';
  hasExpiredTrial: Scalars['Boolean']['output'];
  missionPartner?: Maybe<MissionPartner>;
};

export type MissionPartnerUnauth = {
  __typename?: 'MissionPartnerUnauth';
  description?: Maybe<Scalars['String']['output']>;
  featuredTraining?: Maybe<Array<Maybe<FeaturedTraining>>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ModuleInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  items: Array<InputMaybe<FmModuleItemInput>>;
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAssessmentsToUser?: Maybe<Scalars['Void']['output']>;
  addCollectionItems?: Maybe<MissionPartner>;
  addCoursesToGroup?: Maybe<Scalars['Void']['output']>;
  addCoursesToUser?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  addFeaturedTrainingItems?: Maybe<MissionPartner>;
  addGroupMembership?: Maybe<User>;
  addHostedCourseItem?: Maybe<Scalars['JSONObject']['output']>;
  addHostedCourseProgressItemQuizComment?: Maybe<HostedCourseProgress>;
  addHostedExamProgressComment?: Maybe<HostedExamProgress>;
  addHostedExamQuestion?: Maybe<Scalars['Void']['output']>;
  addItemsToTrainingCriteria?: Maybe<HostedExam>;
  addLabsToUser?: Maybe<Scalars['Void']['output']>;
  addLicenseToUsers?: Maybe<UploadRecord>;
  addMissionPartnerMembership?: Maybe<User>;
  addTrainingCriteria?: Maybe<HostedExam>;
  addTrainingPlansToGroup?: Maybe<Scalars['Void']['output']>;
  addTrainingPlansToUser: Array<Maybe<TrainingPlan>>;
  approveLicenseRequest?: Maybe<LicenseRequest>;
  approveMissionPartnerRequest?: Maybe<MissionPartnerRequest>;
  assignLicense?: Maybe<UploadRecord>;
  assignTranscriptAssessmentById?: Maybe<TranscriptAssessment>;
  associateDomainToKsat?: Maybe<Scalars['Void']['output']>;
  associateDomainsToCurriculum?: Maybe<Scalars['Void']['output']>;
  associateDomainsToJobRole?: Maybe<Scalars['Void']['output']>;
  associateDomainsToLearningObjective?: Maybe<Scalars['Void']['output']>;
  associateJobRolesToKsat?: Maybe<Scalars['Void']['output']>;
  associateKsatsToCurriculum?: Maybe<Scalars['Void']['output']>;
  associateKsatsToDomain?: Maybe<Scalars['Void']['output']>;
  associateKsatsToJobRole?: Maybe<Scalars['Void']['output']>;
  associateKsatsToLearningObjective?: Maybe<Scalars['Void']['output']>;
  associateLearningObjectivesToCurriculum?: Maybe<Scalars['Void']['output']>;
  associateLearningObjectivesToDomain?: Maybe<Scalars['Void']['output']>;
  associateLearningObjectivesToJobRole?: Maybe<Scalars['Void']['output']>;
  associateLearningObjectivesToKsat?: Maybe<Scalars['Void']['output']>;
  awardBadges?: Maybe<Array<Maybe<AwardedBadge>>>;
  completeIndividualCourseById?: Maybe<IndividualCourseComplete>;
  createAdminManagedCourse?: Maybe<Course>;
  createCertification?: Maybe<Certification>;
  createCollection?: Maybe<MissionPartner>;
  createCurriculumReview?: Maybe<CurriculumReview>;
  createDomain?: Maybe<Domain>;
  createExportByTypeAndMissionPartnerId?: Maybe<Download>;
  createForceMultiplier?: Maybe<ForceMultiplier>;
  createGroup?: Maybe<Group>;
  createHostedCourse?: Maybe<HostedCourse>;
  createHostedCourseProgress?: Maybe<HostedCourseProgress>;
  createHostedExam?: Maybe<HostedExam>;
  createHostedExamProgress?: Maybe<HostedExamProgress>;
  createHostedScorm?: Maybe<HostedScorm>;
  createHostedScormProgress?: Maybe<HostedScormProgress>;
  createIndexingBatch?: Maybe<IndexingBatch>;
  createJobRole?: Maybe<JobRole>;
  createKsat?: Maybe<Ksat>;
  createLab?: Maybe<Lab>;
  createLearningObjective?: Maybe<LearningObjective>;
  createLicenseRequests?: Maybe<Array<Maybe<LicenseRequest>>>;
  /** Adds or updates an assessment. Typically called on the add manual items page in the admin portal. */
  createManualAssessment?: Maybe<Assessment>;
  createMissionPartner?: Maybe<MissionPartner>;
  createMissionPartnerRequest?: Maybe<MissionPartnerRequest>;
  createNewForceMultiplierVersion?: Maybe<ForceMultiplier>;
  createResetOtpRequest?: Maybe<Scalars['Void']['output']>;
  createRole?: Maybe<Role>;
  createSurvey?: Maybe<Survey>;
  createSurveyProgress?: Maybe<SurveyProgress>;
  createTrainingPlan?: Maybe<TrainingPlan>;
  createVendor?: Maybe<Vendor>;
  createWorkExperience?: Maybe<Array<Maybe<WorkExperience>>>;
  declineLicenseRequest?: Maybe<LicenseRequest>;
  declineMissionPartnerRequest?: Maybe<MissionPartnerRequest>;
  deleteAlertBanner?: Maybe<Scalars['Void']['output']>;
  deleteBanner?: Maybe<Scalars['Void']['output']>;
  deleteCertification?: Maybe<Scalars['Void']['output']>;
  deleteDomainCurriculumAssociation?: Maybe<Scalars['Void']['output']>;
  deleteDomainKsatAssociation?: Maybe<Scalars['Void']['output']>;
  deleteDomainLearningObjectiveAssociation?: Maybe<Scalars['Void']['output']>;
  deleteDownload?: Maybe<Scalars['Void']['output']>;
  deleteGroup?: Maybe<Scalars['Void']['output']>;
  deleteIndexingBatch?: Maybe<Scalars['Void']['output']>;
  deleteJobRoleDomainAssociation?: Maybe<Scalars['Void']['output']>;
  deleteJobRoleKsatAssociation?: Maybe<Scalars['Void']['output']>;
  deleteJobRoleLearningObjectiveAssociation?: Maybe<Scalars['Void']['output']>;
  deleteKsatCurriculumAssociation?: Maybe<Scalars['Void']['output']>;
  deleteKsatDomainAssociation?: Maybe<Scalars['Void']['output']>;
  deleteKsatJobRoleAssociation?: Maybe<Scalars['Void']['output']>;
  deleteKsatLearningObjectiveAssociation?: Maybe<Scalars['Void']['output']>;
  deleteLab?: Maybe<Scalars['String']['output']>;
  deleteLearningObjectiveCurriculumAssociation?: Maybe<Scalars['Void']['output']>;
  deleteLearningObjectiveDomainAssociation?: Maybe<Scalars['Void']['output']>;
  deleteLearningObjectiveKsatAssociation?: Maybe<Scalars['Void']['output']>;
  deleteLibraryItem?: Maybe<ForceMultiplier>;
  deleteMissionPartner?: Maybe<Scalars['ID']['output']>;
  deleteRoles?: Maybe<Scalars['Void']['output']>;
  deleteTrainingCriteria?: Maybe<HostedExam>;
  deleteUpload?: Maybe<Scalars['Void']['output']>;
  deleteWorkExperience?: Maybe<Array<Maybe<WorkExperience>>>;
  disableExportsByTypesForMissionPartner?: Maybe<MissionPartner>;
  disableSetting?: Maybe<Setting>;
  dismissBadgeNotification?: Maybe<Scalars['Void']['output']>;
  enableExportsByTypesForMissionPartner?: Maybe<MissionPartner>;
  enableSetting?: Maybe<Setting>;
  exportBadges?: Maybe<Scalars['Void']['output']>;
  exportLicenses?: Maybe<Scalars['Void']['output']>;
  exportMissionPartnerLicenseRequests?: Maybe<Scalars['Void']['output']>;
  exportMissionPartnerLicensesForVendor?: Maybe<Scalars['Void']['output']>;
  exportUsers?: Maybe<Scalars['Void']['output']>;
  importBulkUsers?: Maybe<UploadRecord>;
  importSingleUser?: Maybe<User>;
  launchLab?: Maybe<Scalars['String']['output']>;
  markLabCompleted?: Maybe<Lab>;
  markTrainingPlanAssessmentCompleted?: Maybe<TrainingPlan>;
  markTrainingPlanCourseCompleted?: Maybe<TrainingPlan>;
  markTrainingPlanLabCompleted?: Maybe<TrainingPlan>;
  publishHostedCourse?: Maybe<HostedCourse>;
  publishHostedExam?: Maybe<HostedExam>;
  publishHostedScorm?: Maybe<HostedScorm>;
  publishLab?: Maybe<Lab>;
  publishSurvey?: Maybe<Survey>;
  removeCertificationFile?: Maybe<Scalars['Void']['output']>;
  removeCollection?: Maybe<MissionPartner>;
  removeCollectionItems?: Maybe<MissionPartner>;
  removeFeaturedTrainingItems?: Maybe<MissionPartner>;
  removeGroupMemberships?: Maybe<Scalars['Void']['output']>;
  removeHostedExamQuestion?: Maybe<Scalars['Void']['output']>;
  removeItemFromForceMultiplier?: Maybe<ForceMultiplier>;
  removeLicenses?: Maybe<Scalars['Void']['output']>;
  removeMissionPartnerMemberships?: Maybe<Scalars['Void']['output']>;
  removeProfileImage?: Maybe<User>;
  removeUsersFromMissionPartner?: Maybe<UploadRecord>;
  resetHostedExamProgress?: Maybe<HostedExamProgress>;
  resetLab?: Maybe<Scalars['String']['output']>;
  resumeTrainingPlan?: Maybe<Scalars['Void']['output']>;
  revokeVendorLicensesForUsers?: Maybe<UploadRecord>;
  sendSupportRequest?: Maybe<Scalars['Void']['output']>;
  sendVerificationEmail?: Maybe<Scalars['Void']['output']>;
  startAssessmentById?: Maybe<Assessment>;
  startIndividualCourseById?: Maybe<Course>;
  startTrainingPlanAssessment?: Maybe<TrainingPlan>;
  startTrainingPlanCourse?: Maybe<TrainingPlan>;
  startTrainingPlanLab?: Maybe<TrainingPlan>;
  startTrainingPlanSurvey?: Maybe<TrainingPlan>;
  stopIndividualCourseById?: Maybe<Course>;
  submitAccessCode?: Maybe<MissionPartnerMember>;
  toggleAllowContractorAccess?: Maybe<User>;
  toggleMissionPartnerTrial?: Maybe<MissionPartner>;
  toggleRequiredFeaturedTraining?: Maybe<MissionPartner>;
  toggleTrainingPlanStatus?: Maybe<TrainingPlan>;
  updateAdminManagedCourse?: Maybe<Course>;
  updateAlertBanner?: Maybe<AlertBannerContent>;
  updateAssessment?: Maybe<Assessment>;
  updateBanner?: Maybe<BannerContent>;
  updateCertification?: Maybe<Certification>;
  updateCollection?: Maybe<MissionPartner>;
  updateCustomTrainingEnabled?: Maybe<MissionPartner>;
  updateDomain?: Maybe<Domain>;
  updateForceMultiplier?: Maybe<ForceMultiplier>;
  updateForceMultiplierContent?: Maybe<ForceMultiplier>;
  updateGroup?: Maybe<Group>;
  updateHostedCourse?: Maybe<HostedCourse>;
  updateHostedCourseItem?: Maybe<Scalars['Void']['output']>;
  updateHostedCourseProgressItemQuizAnswers?: Maybe<HostedCourseProgress>;
  updateHostedCourseProgressItemStatus?: Maybe<HostedCourseProgress>;
  updateHostedCourseProgressItemSurveyResponses?: Maybe<HostedCourseProgress>;
  updateHostedExam?: Maybe<HostedExam>;
  updateHostedExamProgressAnswers?: Maybe<HostedExamProgress>;
  updateHostedExamProgressStatus?: Maybe<HostedExamProgress>;
  updateHostedExamQuestion?: Maybe<Scalars['Void']['output']>;
  updateHostedScorm?: Maybe<HostedScorm>;
  updateHostedScormProgressData?: Maybe<HostedScormProgress>;
  updateHostedScormProgressStatus?: Maybe<HostedScormProgress>;
  updateIsMarketplaceEnabled?: Maybe<MissionPartner>;
  updateJobRole?: Maybe<JobRole>;
  updateKsat?: Maybe<Ksat>;
  updateLab?: Maybe<Lab>;
  updateLearningObjective?: Maybe<LearningObjective>;
  updateLibraryItems?: Maybe<ForceMultiplier>;
  updateLicenseLastUsedAt?: Maybe<Scalars['Void']['output']>;
  updateMissionPartner?: Maybe<MissionPartner>;
  updateOTP?: Maybe<Scalars['Void']['output']>;
  updatePassword?: Maybe<Scalars['Void']['output']>;
  updatePointEvent?: Maybe<PointEvent>;
  updateRecentMissionPartner?: Maybe<Scalars['Void']['output']>;
  updateRecentTraining?: Maybe<Scalars['Void']['output']>;
  updateShowMarkCompleteModalFor?: Maybe<Scalars['Void']['output']>;
  updateSurvey?: Maybe<Survey>;
  updateSurveyProgressResponses?: Maybe<SurveyProgress>;
  updateSurveyProgressStatus?: Maybe<SurveyProgress>;
  updateTrainingCriteria?: Maybe<HostedExam>;
  updateTrainingPlanSpecialization?: Maybe<TrainingPlan>;
  updateTrainingPlanVersion?: Maybe<TrainingPlan>;
  updateUser?: Maybe<User>;
  updateVendor?: Maybe<Vendor>;
  updateWorkExperience?: Maybe<Array<Maybe<WorkExperience>>>;
  uploadCertificationFile?: Maybe<Scalars['String']['output']>;
  uploadForceMultiplierImage?: Maybe<ForceMultiplierImage>;
  uploadHostedCourseImage?: Maybe<HostedCourseImage>;
  uploadHostedScormPackage?: Maybe<HostedScorm>;
  uploadHostedVideo?: Maybe<HostedCourse>;
  uploadLibraryItem?: Maybe<ForceMultiplier>;
  uploadMissionPartnerLogo?: Maybe<MissionPartnerLogo>;
  uploadOfficeFile?: Maybe<HostedCourse>;
  uploadPreviewImage?: Maybe<Lab>;
  uploadProfileImage?: Maybe<User>;
  uploadTextInstructionImage?: Maybe<LabInstructionImage>;
  uploadVideoInstruction?: Maybe<Lab>;
  validateExamTrainingCriteria?: Maybe<Array<Maybe<AssignedTraining>>>;
};


export type MutationAddAssessmentsToUserArgs = {
  assessmentIds: Array<InputMaybe<Scalars['ID']['input']>>;
  missionPartnerId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationAddCollectionItemsArgs = {
  id: Scalars['ID']['input'];
  items: Array<CollectionItemInput>;
  missionPartnerId: Scalars['ID']['input'];
};


export type MutationAddCoursesToGroupArgs = {
  courseIds: Array<InputMaybe<Scalars['ID']['input']>>;
  groupId: Scalars['ID']['input'];
  missionPartnerId: Scalars['ID']['input'];
};


export type MutationAddCoursesToUserArgs = {
  courseIds: Array<InputMaybe<Scalars['ID']['input']>>;
  missionPartnerId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationAddFeaturedTrainingItemsArgs = {
  input: UpdateMissionPartnerInput;
};


export type MutationAddGroupMembershipArgs = {
  input: AddGroupMembershipInput;
};


export type MutationAddHostedCourseItemArgs = {
  input: HostedCourseItemInput;
};


export type MutationAddHostedCourseProgressItemQuizCommentArgs = {
  comment: Scalars['String']['input'];
  hostedCourseId: Scalars['ID']['input'];
  lessonId: Scalars['ID']['input'];
  questionId?: InputMaybe<Scalars['ID']['input']>;
  userId: Scalars['ID']['input'];
};


export type MutationAddHostedExamProgressCommentArgs = {
  comment: Scalars['String']['input'];
  hostedExamId: Scalars['ID']['input'];
  questionId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationAddHostedExamQuestionArgs = {
  hostedExamId: Scalars['ID']['input'];
  questionInput: Scalars['JSONObject']['input'];
};


export type MutationAddItemsToTrainingCriteriaArgs = {
  assignedTrainingInput: Array<InputMaybe<AssignedTrainingInput>>;
  hostedExamId: Scalars['ID']['input'];
  trainingCriteriaId: Scalars['ID']['input'];
};


export type MutationAddLabsToUserArgs = {
  labIds: Array<Scalars['ID']['input']>;
  userId: Scalars['ID']['input'];
};


export type MutationAddLicenseToUsersArgs = {
  file: Scalars['Upload']['input'];
  missionPartnerId: Scalars['ID']['input'];
  vendorId: Scalars['ID']['input'];
};


export type MutationAddMissionPartnerMembershipArgs = {
  input: AddMissionPartnerMemberInput;
};


export type MutationAddTrainingCriteriaArgs = {
  hostedExamId: Scalars['ID']['input'];
  trainingCriteriaInput: AddTrainingCriteriaInput;
};


export type MutationAddTrainingPlansToGroupArgs = {
  groupId: Scalars['ID']['input'];
  missionPartnerId: Scalars['ID']['input'];
  plans: Array<AddPlansInput>;
};


export type MutationAddTrainingPlansToUserArgs = {
  missionPartnerId: Scalars['ID']['input'];
  plans: Array<InputMaybe<AddPlansInput>>;
  userId: Scalars['ID']['input'];
};


export type MutationApproveLicenseRequestArgs = {
  id: Scalars['ID']['input'];
};


export type MutationApproveMissionPartnerRequestArgs = {
  missionPartnerId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationAssignLicenseArgs = {
  input: AssignLicenseInput;
};


export type MutationAssignTranscriptAssessmentByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAssociateDomainToKsatArgs = {
  domainId: Scalars['ID']['input'];
  ksatId: Scalars['ID']['input'];
};


export type MutationAssociateDomainsToCurriculumArgs = {
  curriculumId: Scalars['ID']['input'];
  curriculumType: CurriculumType;
  domainIds: Array<Scalars['ID']['input']>;
};


export type MutationAssociateDomainsToJobRoleArgs = {
  domainIds: Array<Scalars['ID']['input']>;
  jobRoleId: Scalars['ID']['input'];
};


export type MutationAssociateDomainsToLearningObjectiveArgs = {
  domainIds: Array<Scalars['ID']['input']>;
  learningObjectiveId: Scalars['ID']['input'];
};


export type MutationAssociateJobRolesToKsatArgs = {
  jobRoleIds: Array<Scalars['ID']['input']>;
  ksatId: Scalars['ID']['input'];
};


export type MutationAssociateKsatsToCurriculumArgs = {
  curriculumId: Scalars['ID']['input'];
  curriculumType: CurriculumType;
  ksatIds: Array<Scalars['ID']['input']>;
};


export type MutationAssociateKsatsToDomainArgs = {
  domainId: Scalars['ID']['input'];
  ksatIds: Array<Scalars['ID']['input']>;
};


export type MutationAssociateKsatsToJobRoleArgs = {
  jobRoleId: Scalars['ID']['input'];
  ksatIds: Array<Scalars['ID']['input']>;
};


export type MutationAssociateKsatsToLearningObjectiveArgs = {
  ksatIds: Array<Scalars['ID']['input']>;
  learningObjectiveId: Scalars['ID']['input'];
};


export type MutationAssociateLearningObjectivesToCurriculumArgs = {
  curriculumId: Scalars['ID']['input'];
  curriculumType: CurriculumType;
  learningObjectiveIds: Array<Scalars['ID']['input']>;
};


export type MutationAssociateLearningObjectivesToDomainArgs = {
  domainId: Scalars['ID']['input'];
  learningObjectiveIds: Array<Scalars['ID']['input']>;
};


export type MutationAssociateLearningObjectivesToJobRoleArgs = {
  jobRoleId: Scalars['ID']['input'];
  learningObjectiveIds: Array<Scalars['ID']['input']>;
};


export type MutationAssociateLearningObjectivesToKsatArgs = {
  ksatId: Scalars['ID']['input'];
  learningObjectiveIds: Array<Scalars['ID']['input']>;
};


export type MutationCompleteIndividualCourseByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCreateAdminManagedCourseArgs = {
  course: CourseInput;
};


export type MutationCreateCertificationArgs = {
  input: CreateCertificationInput;
};


export type MutationCreateCollectionArgs = {
  description: Scalars['String']['input'];
  missionPartnerId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateCurriculumReviewArgs = {
  input: CreateCurriculumReviewInput;
};


export type MutationCreateDomainArgs = {
  input: CreateDomainInput;
};


export type MutationCreateExportByTypeAndMissionPartnerIdArgs = {
  downloadType: Scalars['String']['input'];
  missionPartnerId: Scalars['String']['input'];
};


export type MutationCreateForceMultiplierArgs = {
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  summary: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateGroupArgs = {
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationCreateHostedCourseArgs = {
  hostedCourseInput: NewHostedCourseInput;
};


export type MutationCreateHostedCourseProgressArgs = {
  hostedCourseId: Scalars['ID']['input'];
};


export type MutationCreateHostedExamArgs = {
  hostedExamInput: NewHostedExamInput;
};


export type MutationCreateHostedExamProgressArgs = {
  hostedExamId: Scalars['ID']['input'];
};


export type MutationCreateHostedScormArgs = {
  input: NewHostedScormInput;
};


export type MutationCreateHostedScormProgressArgs = {
  hostedScormId: Scalars['ID']['input'];
};


export type MutationCreateIndexingBatchArgs = {
  tables: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationCreateJobRoleArgs = {
  input: CreateJobRoleInput;
};


export type MutationCreateKsatArgs = {
  input: CreateKsatInput;
};


export type MutationCreateLabArgs = {
  input: NewLabInput;
};


export type MutationCreateLearningObjectiveArgs = {
  input: CreateLearningObjectiveInput;
};


export type MutationCreateLicenseRequestsArgs = {
  vendorIds: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationCreateManualAssessmentArgs = {
  assessment: AssessmentInput;
};


export type MutationCreateMissionPartnerArgs = {
  input: CreateMissionPartnerInput;
};


export type MutationCreateMissionPartnerRequestArgs = {
  missionPartnerId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreateNewForceMultiplierVersionArgs = {
  id: Scalars['String']['input'];
};


export type MutationCreateResetOtpRequestArgs = {
  email: Scalars['String']['input'];
};


export type MutationCreateRoleArgs = {
  input: CreateRoleInput;
};


export type MutationCreateSurveyArgs = {
  input: NewSurveyInput;
};


export type MutationCreateSurveyProgressArgs = {
  surveyId: Scalars['ID']['input'];
};


export type MutationCreateTrainingPlanArgs = {
  planSourceId: Scalars['ID']['input'];
  planType: Scalars['String']['input'];
  planVersion?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateVendorArgs = {
  input: CreateVendorInput;
};


export type MutationCreateWorkExperienceArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  organization: Scalars['String']['input'];
  responsibilities: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};


export type MutationDeclineLicenseRequestArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeclineMissionPartnerRequestArgs = {
  missionPartnerId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationDeleteCertificationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteDomainCurriculumAssociationArgs = {
  curriculumId: Scalars['ID']['input'];
  curriculumType: CurriculumType;
  domainId: Scalars['ID']['input'];
};


export type MutationDeleteDomainKsatAssociationArgs = {
  domainId: Scalars['ID']['input'];
  ksatId: Scalars['ID']['input'];
};


export type MutationDeleteDomainLearningObjectiveAssociationArgs = {
  domainId: Scalars['ID']['input'];
  learningObjectiveId: Scalars['ID']['input'];
};


export type MutationDeleteDownloadArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteGroupArgs = {
  groupId: Scalars['ID']['input'];
};


export type MutationDeleteIndexingBatchArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteJobRoleDomainAssociationArgs = {
  domainId: Scalars['ID']['input'];
  jobRoleId: Scalars['ID']['input'];
};


export type MutationDeleteJobRoleKsatAssociationArgs = {
  jobRoleId: Scalars['ID']['input'];
  ksatId: Scalars['ID']['input'];
};


export type MutationDeleteJobRoleLearningObjectiveAssociationArgs = {
  jobRoleId: Scalars['ID']['input'];
  learningObjectiveId: Scalars['ID']['input'];
};


export type MutationDeleteKsatCurriculumAssociationArgs = {
  curriculumId: Scalars['ID']['input'];
  curriculumType: CurriculumType;
  ksatId: Scalars['ID']['input'];
};


export type MutationDeleteKsatDomainAssociationArgs = {
  domainId: Scalars['ID']['input'];
  ksatId: Scalars['ID']['input'];
};


export type MutationDeleteKsatJobRoleAssociationArgs = {
  jobRoleId: Scalars['ID']['input'];
  ksatId: Scalars['ID']['input'];
};


export type MutationDeleteKsatLearningObjectiveAssociationArgs = {
  ksatId: Scalars['ID']['input'];
  learningObjectiveId: Scalars['ID']['input'];
};


export type MutationDeleteLabArgs = {
  labId: Scalars['ID']['input'];
};


export type MutationDeleteLearningObjectiveCurriculumAssociationArgs = {
  curriculumId: Scalars['ID']['input'];
  curriculumType: CurriculumType;
  learningObjectiveId: Scalars['ID']['input'];
};


export type MutationDeleteLearningObjectiveDomainAssociationArgs = {
  domainId: Scalars['ID']['input'];
  learningObjectiveId: Scalars['ID']['input'];
};


export type MutationDeleteLearningObjectiveKsatAssociationArgs = {
  ksatId: Scalars['ID']['input'];
  learningObjectiveId: Scalars['ID']['input'];
};


export type MutationDeleteLibraryItemArgs = {
  input: DeleteLibraryItemInput;
};


export type MutationDeleteMissionPartnerArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRolesArgs = {
  missionPartnerId: Scalars['ID']['input'];
  name: RoleName;
  userIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationDeleteTrainingCriteriaArgs = {
  hostedExamId: Scalars['ID']['input'];
  trainingCriteriaId: Scalars['ID']['input'];
};


export type MutationDeleteUploadArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteWorkExperienceArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDisableExportsByTypesForMissionPartnerArgs = {
  downloadTypes: Array<InputMaybe<Scalars['String']['input']>>;
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDisableSettingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDismissBadgeNotificationArgs = {
  badgeId: Scalars['ID']['input'];
};


export type MutationEnableExportsByTypesForMissionPartnerArgs = {
  downloadTypes: Array<Scalars['String']['input']>;
  missionPartnerId: Scalars['String']['input'];
};


export type MutationEnableSettingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationExportBadgesArgs = {
  badgeId?: InputMaybe<Scalars['String']['input']>;
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationExportMissionPartnerLicenseRequestsArgs = {
  branch?: InputMaybe<Scalars['String']['input']>;
  missionPartnerId: Scalars['ID']['input'];
  missionPartnerName: Scalars['String']['input'];
  vendorName?: InputMaybe<Scalars['String']['input']>;
};


export type MutationExportMissionPartnerLicensesForVendorArgs = {
  missionPartnerId: Scalars['ID']['input'];
  missionPartnerName: Scalars['String']['input'];
  vendorId: Scalars['ID']['input'];
  vendorName: Scalars['String']['input'];
};


export type MutationExportUsersArgs = {
  branch?: InputMaybe<Scalars['String']['input']>;
};


export type MutationImportBulkUsersArgs = {
  file: Scalars['Upload']['input'];
  groupId?: InputMaybe<Scalars['ID']['input']>;
  missionPartnerId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationImportSingleUserArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  groupId?: InputMaybe<Scalars['ID']['input']>;
  lastName: Scalars['String']['input'];
  missionPartnerId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationLaunchLabArgs = {
  labId: Scalars['String']['input'];
};


export type MutationMarkLabCompletedArgs = {
  labId: Scalars['ID']['input'];
};


export type MutationMarkTrainingPlanAssessmentCompletedArgs = {
  assessmentId: Scalars['ID']['input'];
  completed: Scalars['Boolean']['input'];
  trainingPlanId: Scalars['ID']['input'];
};


export type MutationMarkTrainingPlanCourseCompletedArgs = {
  completed: Scalars['Boolean']['input'];
  courseId: Scalars['ID']['input'];
  trainingPlanId: Scalars['ID']['input'];
};


export type MutationMarkTrainingPlanLabCompletedArgs = {
  completed: Scalars['Boolean']['input'];
  labId: Scalars['ID']['input'];
  trainingPlanId: Scalars['ID']['input'];
};


export type MutationPublishHostedCourseArgs = {
  id: Scalars['ID']['input'];
  missionPartnerId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationPublishHostedExamArgs = {
  hostedExamId: Scalars['ID']['input'];
};


export type MutationPublishHostedScormArgs = {
  id: Scalars['ID']['input'];
  missionPartnerId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationPublishLabArgs = {
  labId: Scalars['String']['input'];
};


export type MutationPublishSurveyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCertificationFileArgs = {
  key: Scalars['String']['input'];
};


export type MutationRemoveCollectionArgs = {
  id: Scalars['ID']['input'];
  missionPartnerId: Scalars['ID']['input'];
};


export type MutationRemoveCollectionItemsArgs = {
  id: Scalars['ID']['input'];
  items: Array<RemoveCollectionItemInput>;
  missionPartnerId: Scalars['ID']['input'];
};


export type MutationRemoveFeaturedTrainingItemsArgs = {
  input: Array<InputMaybe<RemoveFeaturedTrainingItemsInput>>;
  missionPartnerId: Scalars['ID']['input'];
};


export type MutationRemoveGroupMembershipsArgs = {
  groupId: Scalars['ID']['input'];
  missionPartnerId: Scalars['ID']['input'];
  userIds: Array<Scalars['ID']['input']>;
};


export type MutationRemoveHostedExamQuestionArgs = {
  hostedExamId: Scalars['ID']['input'];
  questionId: Scalars['ID']['input'];
};


export type MutationRemoveItemFromForceMultiplierArgs = {
  input: RemoveItemFromForceMultiplierInput;
};


export type MutationRemoveLicensesArgs = {
  input: RemoveLicensesInput;
};


export type MutationRemoveMissionPartnerMembershipsArgs = {
  missionPartnerId: Scalars['ID']['input'];
  userIds: Array<Scalars['ID']['input']>;
};


export type MutationRemoveUsersFromMissionPartnerArgs = {
  file: Scalars['Upload']['input'];
  missionPartnerId: Scalars['ID']['input'];
};


export type MutationResetHostedExamProgressArgs = {
  hostedExamId: Scalars['ID']['input'];
};


export type MutationResetLabArgs = {
  labId: Scalars['String']['input'];
};


export type MutationResumeTrainingPlanArgs = {
  trainingPlanId: Scalars['ID']['input'];
};


export type MutationRevokeVendorLicensesForUsersArgs = {
  file: Scalars['Upload']['input'];
  missionPartnerId: Scalars['ID']['input'];
  vendorId: Scalars['ID']['input'];
};


export type MutationSendSupportRequestArgs = {
  dutyStation: Scalars['String']['input'];
  email: Scalars['String']['input'];
  message: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  subject: Scalars['String']['input'];
};


export type MutationStartAssessmentByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationStartIndividualCourseByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationStartTrainingPlanAssessmentArgs = {
  assessmentId: Scalars['ID']['input'];
  trainingPlanId: Scalars['ID']['input'];
};


export type MutationStartTrainingPlanCourseArgs = {
  courseId: Scalars['ID']['input'];
  trainingPlanId: Scalars['ID']['input'];
};


export type MutationStartTrainingPlanLabArgs = {
  labId: Scalars['ID']['input'];
  trainingPlanId: Scalars['ID']['input'];
};


export type MutationStartTrainingPlanSurveyArgs = {
  surveyId: Scalars['ID']['input'];
  trainingPlanId: Scalars['ID']['input'];
};


export type MutationStopIndividualCourseByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSubmitAccessCodeArgs = {
  accessCode: Scalars['String']['input'];
  missionPartnerId: Scalars['ID']['input'];
};


export type MutationToggleAllowContractorAccessArgs = {
  allow?: InputMaybe<Scalars['Boolean']['input']>;
  userId: Scalars['ID']['input'];
};


export type MutationToggleMissionPartnerTrialArgs = {
  enable: Scalars['Boolean']['input'];
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  missionPartnerId: Scalars['ID']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};


export type MutationToggleRequiredFeaturedTrainingArgs = {
  assessmentId?: InputMaybe<Scalars['ID']['input']>;
  courseId?: InputMaybe<Scalars['ID']['input']>;
  labId?: InputMaybe<Scalars['ID']['input']>;
  missionPartnerId: Scalars['ID']['input'];
  planSourceId?: InputMaybe<Scalars['String']['input']>;
  planType?: InputMaybe<Scalars['String']['input']>;
  planVersion?: InputMaybe<Scalars['String']['input']>;
};


export type MutationToggleTrainingPlanStatusArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateAdminManagedCourseArgs = {
  course: CourseInput;
};


export type MutationUpdateAlertBannerArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  isDismissable: Scalars['Boolean']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateAssessmentArgs = {
  assessment: AssessmentInput;
};


export type MutationUpdateBannerArgs = {
  body: Scalars['String']['input'];
  buttonLink: Scalars['String']['input'];
  buttonText: Scalars['String']['input'];
  logo: Scalars['Upload']['input'];
  title: Scalars['String']['input'];
};


export type MutationUpdateCertificationArgs = {
  input: UpdateCertificationInput;
};


export type MutationUpdateCollectionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  missionPartnerId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateCustomTrainingEnabledArgs = {
  input: UpdateCustomTrainingEnabledInput;
};


export type MutationUpdateDomainArgs = {
  id: Scalars['ID']['input'];
  input: UpdateDomainInput;
};


export type MutationUpdateForceMultiplierArgs = {
  input: ForceMultiplierInput;
};


export type MutationUpdateForceMultiplierContentArgs = {
  input: UpdateForceMultiplierContentInput;
};


export type MutationUpdateGroupArgs = {
  groupId: Scalars['ID']['input'];
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationUpdateHostedCourseArgs = {
  input: UpdatedHostedCourseInput;
};


export type MutationUpdateHostedCourseItemArgs = {
  input: HostedCourseItemInput;
};


export type MutationUpdateHostedCourseProgressItemQuizAnswersArgs = {
  answers: Array<InputMaybe<Scalars['JSONObject']['input']>>;
  hostedCourseId: Scalars['ID']['input'];
  lessonId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationUpdateHostedCourseProgressItemStatusArgs = {
  hostedCourseId: Scalars['ID']['input'];
  lessonId: Scalars['ID']['input'];
  status: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationUpdateHostedCourseProgressItemSurveyResponsesArgs = {
  hostedCourseId: Scalars['ID']['input'];
  lessonId: Scalars['ID']['input'];
  responses: Array<InputMaybe<Scalars['JSONObject']['input']>>;
  userId: Scalars['ID']['input'];
};


export type MutationUpdateHostedExamArgs = {
  hostedExamInput: UpdatedHostedExamInput;
};


export type MutationUpdateHostedExamProgressAnswersArgs = {
  answers: Array<InputMaybe<Scalars['JSONObject']['input']>>;
  hostedExamId: Scalars['ID']['input'];
  lockInAnswers?: InputMaybe<Scalars['Boolean']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUpdateHostedExamProgressStatusArgs = {
  hostedExamId: Scalars['ID']['input'];
  lockInAnswers?: InputMaybe<Scalars['Boolean']['input']>;
  status: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUpdateHostedExamQuestionArgs = {
  hostedExamId: Scalars['ID']['input'];
  questionInput: Scalars['JSONObject']['input'];
};


export type MutationUpdateHostedScormArgs = {
  input: UpdatedHostedScormInput;
};


export type MutationUpdateHostedScormProgressDataArgs = {
  hostedScormId: Scalars['ID']['input'];
  scormData: Scalars['JSONObject']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationUpdateHostedScormProgressStatusArgs = {
  hostedScormId: Scalars['ID']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};


export type MutationUpdateIsMarketplaceEnabledArgs = {
  input: UpdateIsMarketplaceEnabledInput;
};


export type MutationUpdateJobRoleArgs = {
  id: Scalars['ID']['input'];
  input: UpdateJobRoleInput;
};


export type MutationUpdateKsatArgs = {
  id: Scalars['ID']['input'];
  input: UpdateKsatInput;
};


export type MutationUpdateLabArgs = {
  input: UpdatedLabInput;
};


export type MutationUpdateLearningObjectiveArgs = {
  id: Scalars['ID']['input'];
  input: UpdateLearningObjectiveInput;
};


export type MutationUpdateLibraryItemsArgs = {
  input: UpdateLibraryItemsInput;
};


export type MutationUpdateLicenseLastUsedAtArgs = {
  trainingItemTitle?: InputMaybe<Scalars['String']['input']>;
  vendorId: Scalars['ID']['input'];
};


export type MutationUpdateMissionPartnerArgs = {
  input: UpdateMissionPartnerInput;
};


export type MutationUpdateOtpArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdatePointEventArgs = {
  input: UpdatePointEventInput;
};


export type MutationUpdateRecentMissionPartnerArgs = {
  missionPartnerId: Scalars['ID']['input'];
};


export type MutationUpdateRecentTrainingArgs = {
  itemId: Scalars['ID']['input'];
  itemType: Scalars['String']['input'];
};


export type MutationUpdateShowMarkCompleteModalForArgs = {
  itemId?: InputMaybe<Scalars['ID']['input']>;
  trainingPlanId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUpdateSurveyArgs = {
  input: UpdatedSurveyInput;
};


export type MutationUpdateSurveyProgressResponsesArgs = {
  responses: Array<InputMaybe<Scalars['JSONObject']['input']>>;
  surveyId: Scalars['ID']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUpdateSurveyProgressStatusArgs = {
  status: Scalars['String']['input'];
  surveyId: Scalars['ID']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUpdateTrainingCriteriaArgs = {
  hostedExamId: Scalars['ID']['input'];
  trainingCriteriaInput: TrainingCriteriaInput;
};


export type MutationUpdateTrainingPlanSpecializationArgs = {
  choice: Scalars['String']['input'];
  specializationId: Scalars['ID']['input'];
  trainingPlanId: Scalars['ID']['input'];
};


export type MutationUpdateTrainingPlanVersionArgs = {
  trainingPlanId: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateVendorArgs = {
  input: UpdateVendorInput;
};


export type MutationUpdateWorkExperienceArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  organization: Scalars['String']['input'];
  responsibilities: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};


export type MutationUploadCertificationFileArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationUploadForceMultiplierImageArgs = {
  file: Scalars['Upload']['input'];
  id: Scalars['ID']['input'];
};


export type MutationUploadHostedCourseImageArgs = {
  file: Scalars['Upload']['input'];
  missionPartnerId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUploadHostedScormPackageArgs = {
  input: HostedScormPackageInput;
  missionPartnerId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUploadHostedVideoArgs = {
  input: HostedVideoInput;
  missionPartnerId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUploadLibraryItemArgs = {
  input: UploadLibraryItemInput;
};


export type MutationUploadMissionPartnerLogoArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  missionPartnerId: Scalars['ID']['input'];
};


export type MutationUploadOfficeFileArgs = {
  input: OfficeFileInput;
  missionPartnerId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUploadPreviewImageArgs = {
  file: Scalars['Upload']['input'];
  labId: Scalars['ID']['input'];
};


export type MutationUploadProfileImageArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationUploadTextInstructionImageArgs = {
  file: Scalars['Upload']['input'];
  labId: Scalars['ID']['input'];
};


export type MutationUploadVideoInstructionArgs = {
  file: Scalars['Upload']['input'];
  labId: Scalars['ID']['input'];
  labInstructionId: Scalars['ID']['input'];
};


export type MutationValidateExamTrainingCriteriaArgs = {
  hostedExamId: Scalars['ID']['input'];
};

export type NewHostedCourseInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  items?: InputMaybe<Array<InputMaybe<Scalars['JSONObject']['input']>>>;
  missionPartnerId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type NewHostedExamInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  missionPartnerId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type NewHostedScormInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  missionPartnerId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type NewLabInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  missionPartnerId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type NewSurveyInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  missionPartnerId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type OccupationalCode = {
  __typename?: 'OccupationalCode';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type OfficeFileInput = {
  file: Scalars['Upload']['input'];
  id: Scalars['ID']['input'];
  officeFileLessonId: Scalars['ID']['input'];
};

export type Opportunities = {
  __typename?: 'Opportunities';
  locations?: Maybe<Array<Location>>;
  title: Scalars['String']['output'];
};

export type Organization = {
  __typename?: 'Organization';
  title: Scalars['String']['output'];
};

export type PaginatedLicenseRequestResponse = {
  __typename?: 'PaginatedLicenseRequestResponse';
  records: Array<Maybe<LicenseRequest>>;
  total: Scalars['Int']['output'];
};

export type PaginatedLicensesByVendorIdResponse = {
  __typename?: 'PaginatedLicensesByVendorIdResponse';
  records: Array<Maybe<License>>;
  total: Scalars['Int']['output'];
};

export type PaginatedLicensesResponse = {
  __typename?: 'PaginatedLicensesResponse';
  records: Array<Maybe<License>>;
  total: Scalars['Int']['output'];
};

export type PaginatedQuizExamStatusCountsResult = {
  __typename?: 'PaginatedQuizExamStatusCountsResult';
  records: Array<Maybe<QuizExamStatusCounts>>;
  total: Scalars['SafeInt']['output'];
};

export type PaginatedResults = {
  __typename?: 'PaginatedResults';
  data?: Maybe<Array<Maybe<Course>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedSkillsResult = {
  __typename?: 'PaginatedSkillsResult';
  cursor?: Maybe<Scalars['ID']['output']>;
  skills?: Maybe<Array<Maybe<Skill>>>;
};

export type PaginatedSurveyStatusCountsResult = {
  __typename?: 'PaginatedSurveyStatusCountsResult';
  records: Array<Maybe<SurveyStatusCounts>>;
  total: Scalars['SafeInt']['output'];
};

export type PaginatedTranscriptCourses = {
  __typename?: 'PaginatedTranscriptCourses';
  count: Scalars['Int']['output'];
  data: Array<Maybe<IndexedTranscriptCourse>>;
};

export type PaginatedTranscriptTrainingPlans = {
  __typename?: 'PaginatedTranscriptTrainingPlans';
  records: Array<Maybe<IndexedTranscriptTrainingPlan>>;
  total: Scalars['Int']['output'];
};

export type PaginatedUsersResult = {
  __typename?: 'PaginatedUsersResult';
  records: Array<Maybe<User>>;
  total: Scalars['SafeInt']['output'];
};

export type PlansQuarterReturn = {
  __typename?: 'PlansQuarterReturn';
  assigned: QuarterStatusReturn;
  completed: QuarterStatusReturn;
  quarter: Scalars['String']['output'];
  started: QuarterStatusReturn;
  stopped: QuarterStatusReturn;
  total: Scalars['SafeInt']['output'];
};

export type PointEvent = {
  __typename?: 'PointEvent';
  _createdAt: Scalars['DateTime']['output'];
  _updatedAt: Scalars['DateTime']['output'];
  event: PointEventsType;
  id: Scalars['ID']['output'];
  value: Scalars['Int']['output'];
};

export type PointEventInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export enum PointEventsType {
  BadgeEarned = 'BADGE_EARNED',
  CourseCompleted = 'COURSE_COMPLETED',
  CourseStarted = 'COURSE_STARTED',
  TrainingPlanCompleted = 'TRAINING_PLAN_COMPLETED',
  TrainingPlanStarted = 'TRAINING_PLAN_STARTED',
  UserJoined = 'USER_JOINED',
  UserLoggedIn = 'USER_LOGGED_IN'
}

export type PointsActivity = {
  __typename?: 'PointsActivity';
  awardedAt?: Maybe<Scalars['DateTime']['output']>;
  badge?: Maybe<Badge>;
  course?: Maybe<Course>;
  event?: Maybe<Scalars['String']['output']>;
  trainingPlan?: Maybe<TrainingPlan>;
  value?: Maybe<Scalars['Int']['output']>;
};

export type PointsInformation = {
  __typename?: 'PointsInformation';
  event: Scalars['String']['output'];
  numberOfEvents: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
};

export type PrivacySettings = {
  __typename?: 'PrivacySettings';
  emailSubscriptionStatus?: Maybe<Scalars['Boolean']['output']>;
  profileIsPublic?: Maybe<Scalars['Boolean']['output']>;
  showBadges?: Maybe<Scalars['Boolean']['output']>;
  showEmail?: Maybe<Scalars['Boolean']['output']>;
  showOnLeaderboard?: Maybe<Scalars['Boolean']['output']>;
  showRecentActivity?: Maybe<Scalars['Boolean']['output']>;
  showSkills?: Maybe<Scalars['Boolean']['output']>;
  showTimeSpentTraining?: Maybe<Scalars['Boolean']['output']>;
};

export type PrivacySettingsInput = {
  emailSubscriptionStatus: Scalars['Boolean']['input'];
  profileIsPublic: Scalars['Boolean']['input'];
  showBadges: Scalars['Boolean']['input'];
  showEmail: Scalars['Boolean']['input'];
  showOnLeaderboard: Scalars['Boolean']['input'];
  showRecentActivity: Scalars['Boolean']['input'];
  showSkills: Scalars['Boolean']['input'];
  showTimeSpentTraining: Scalars['Boolean']['input'];
};

export type ProvisionedLicenses = {
  __typename?: 'ProvisionedLicenses';
  autoAssignmentEnabled?: Maybe<Scalars['Boolean']['output']>;
  provisioned: Scalars['SafeInt']['output'];
  vendorId: Scalars['String']['output'];
  vendorName: Scalars['String']['output'];
};

export type ProvisionedLicensesInput = {
  autoAssignmentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  provisioned: Scalars['SafeInt']['input'];
  vendorId: Scalars['String']['input'];
  vendorName: Scalars['String']['input'];
};

export type QuarterStatusReturn = {
  __typename?: 'QuarterStatusReturn';
  numberOfUsers: Scalars['Int']['output'];
  percentageOfUsers: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  aggregateTrainingPlanVersions?: Maybe<TrainingPlanVersionData>;
  aggregateTranscriptCourses?: Maybe<AggregatedTranscriptCourses>;
  aggregateTranscriptItemsForTrainingPlan?: Maybe<Array<Maybe<AggregatedTrainingPlanItem>>>;
  aggregateTranscriptTrainingPlans?: Maybe<AggregatedTranscriptTrainingPlans>;
  aggregateTranscriptTrainingPlansForGroup?: Maybe<Array<Maybe<AggregatedTrainingPlan>>>;
  checkAccessCode?: Maybe<Scalars['Boolean']['output']>;
  countActiveUsersByMissionPartnerId?: Maybe<Scalars['Int']['output']>;
  countAllCourses?: Maybe<CourseCount>;
  countAllHostedCourseProgress: Scalars['SafeInt']['output'];
  countAllMissionPartners?: Maybe<Scalars['SafeInt']['output']>;
  countAllUsers?: Maybe<Scalars['SafeInt']['output']>;
  countAllVendors?: Maybe<Scalars['SafeInt']['output']>;
  countAssignedLicensesForMissionPartner?: Maybe<Array<Maybe<AssignedLicensesCount>>>;
  countCacEnabledUsers?: Maybe<Scalars['SafeInt']['output']>;
  countGroupsByMissionPartnerId?: Maybe<Scalars['Int']['output']>;
  countNewUsers?: Maybe<Scalars['SafeInt']['output']>;
  countOnboardedUsersByMissionPartnerId?: Maybe<Scalars['Int']['output']>;
  countRolesByMissionPartnerId?: Maybe<Scalars['Int']['output']>;
  countTranscriptTrainingPlansAggregatedByStatus?: Maybe<TranscriptTrainingPlanCountsByStatus>;
  countUniqueItemsAndVendorsBySource?: Maybe<UniqueItemsAndVendorsResponse>;
  countUsersByMissionPartnerId?: Maybe<Scalars['Int']['output']>;
  exportCourseLevelMetricsForTrainingPlan?: Maybe<Download>;
  exportIndividualLearnerActivity?: Maybe<Download>;
  exportLearners?: Maybe<Download>;
  exportQuizExams?: Maybe<Download>;
  exportSurveys?: Maybe<Download>;
  exportTrainingPlanCoursesForMissionPartner?: Maybe<Download>;
  exportTrainingPlanTranscriptsForGroup?: Maybe<Download>;
  exportTrainingPlanTranscriptsForMissionPartner?: Maybe<Download>;
  fetchRelevantLabInformation?: Maybe<RelevantLabInformation>;
  findAirForceJobCodes?: Maybe<Array<Maybe<OccupationalCode>>>;
  findAllAffiliates?: Maybe<Array<Maybe<Affiliate>>>;
  findAllForceMultipliers?: Maybe<Array<Maybe<ForceMultiplier>>>;
  findAllMissionPartners?: Maybe<Array<Maybe<MissionPartner>>>;
  findAllMissionPartnersAdminPortal?: Maybe<Array<Maybe<MissionPartner>>>;
  findAllMissionPartnersMinDetails?: Maybe<Array<Maybe<MissionPartnerMinDetails>>>;
  findAllMissionPartnersUnauth?: Maybe<Array<Maybe<MissionPartnerUnauth>>>;
  findAllResources?: Maybe<Array<Maybe<Resource>>>;
  findAllSchools?: Maybe<Array<Maybe<School>>>;
  findAllSettings?: Maybe<Array<Maybe<Setting>>>;
  findAllSkills?: Maybe<PaginatedSkillsResult>;
  findAllVendors?: Maybe<Array<Maybe<Vendor>>>;
  findArmyCommands?: Maybe<Array<Maybe<Organization>>>;
  findArmyJobCodes?: Maybe<Array<Maybe<OccupationalCode>>>;
  findAssessmentsBySource?: Maybe<Array<Maybe<Assessment>>>;
  findAssessmentsByUserId: Array<Maybe<AssessmentWithTranscriptData>>;
  findAwardedBadge?: Maybe<AwardedBadge>;
  findAwardedBadges?: Maybe<Array<Maybe<AwardedBadge>>>;
  findBadgeById?: Maybe<Badge>;
  findBadges?: Maybe<Array<Maybe<Badge>>>;
  findCatalogResults?: Maybe<CatalogResults>;
  findCategorizedTimeSpentLearning?: Maybe<FindCategorizedTimeSpentLearningResult>;
  findCertifications?: Maybe<FindCertificationOutput>;
  findContentById?: Maybe<Content>;
  findCourseById?: Maybe<Course>;
  findCoursesBySearch?: Maybe<PaginatedResults>;
  findCoursesBySource?: Maybe<PaginatedResults>;
  findCurriculumReviews?: Maybe<FindCurriculumReviewsOutput>;
  findDomains?: Maybe<FindDomainsOutput>;
  findDutyStations?: Maybe<Array<Maybe<DutyStation>>>;
  findFieldCommands?: Maybe<Array<Maybe<FieldCommand>>>;
  findForceMultiplierByIdAndVersion?: Maybe<ForceMultiplier>;
  findGrades?: Maybe<Array<Maybe<Grade>>>;
  findGroupById?: Maybe<Group>;
  findGroupsByMissionPartnerId?: Maybe<Array<Maybe<Group>>>;
  findHostedCourseById?: Maybe<HostedCourse>;
  findHostedCourseItem?: Maybe<HostedCourseItem>;
  findHostedCourseProgressById?: Maybe<HostedCourseProgress>;
  findHostedExamById?: Maybe<HostedExam>;
  findHostedExamProgressByExamIdUserId?: Maybe<HostedExamProgress>;
  findHostedScormById?: Maybe<HostedScorm>;
  findHostedScormProgressById?: Maybe<HostedScormProgress>;
  findIndexingBatches?: Maybe<IndexingBatches>;
  findJobRoles?: Maybe<FindJobRolesOutput>;
  findKsats?: Maybe<FindKsatsOutput>;
  findLabById?: Maybe<Lab>;
  findLatestForceMultiplierById?: Maybe<ForceMultiplier>;
  findLatestForceMultiplierByIdAdmin?: Maybe<ForceMultiplier>;
  findLatestPublishedForceMultiplierById?: Maybe<ForceMultiplier>;
  findLearnersBySearch?: Maybe<PaginatedUsersResult>;
  findLearningObjectives?: Maybe<FindLearningObjectivesOutput>;
  findLearningPathById?: Maybe<LearningPath>;
  findLicenseById?: Maybe<License>;
  findLicenseRequestById?: Maybe<LicenseRequest>;
  findLicenseStatusCounts?: Maybe<Array<Maybe<LicenseStatusCount>>>;
  findLicensedVendors?: Maybe<Array<Maybe<Vendor>>>;
  findLicensesByMissionPartnerAndVendor?: Maybe<LicenseResponse>;
  findLicensesByMissionPartnerIdAndVendorId?: Maybe<PaginatedLicensesResponse>;
  findLicensesByUserId?: Maybe<Array<Maybe<License>>>;
  findMarineCorpsCommands?: Maybe<Array<Maybe<Organization>>>;
  findMarineCorpsJobCodes?: Maybe<Array<Maybe<OccupationalCode>>>;
  findMissionPartnerById?: Maybe<MissionPartner>;
  findMissionPartnerByName?: Maybe<MissionPartner>;
  findMissionPartnerBySlug?: Maybe<MissionPartner>;
  findMissionPartnerMembersByUserId?: Maybe<Array<Maybe<MissionPartnerMember>>>;
  findMissionPartnerMinDetails?: Maybe<MissionPartnerMinDetails>;
  findMissionPartnerRequestById?: Maybe<MissionPartnerRequest>;
  findNavyCommands?: Maybe<Array<Maybe<Organization>>>;
  findNavyJobCodes?: Maybe<Array<Maybe<OccupationalCode>>>;
  findNonUserMissionPartnerMemberships?: Maybe<Array<Maybe<MissionPartner>>>;
  findOccupationalCodes?: Maybe<Array<Maybe<OccupationalCode>>>;
  findOpenAndWaitlistLicenseRequests?: Maybe<PaginatedLicenseRequestResponse>;
  findOpenForMissionPartner?: Maybe<Array<Maybe<MissionPartnerRequest>>>;
  findOpenLicenseRequests?: Maybe<PaginatedLicenseRequestResponse>;
  findOrganizations?: Maybe<Array<Maybe<Organization>>>;
  findPointEvents?: Maybe<FindPointEventsOutput>;
  findQuizAndExamsBySearch?: Maybe<PaginatedQuizExamStatusCountsResult>;
  findRanks?: Maybe<Array<Maybe<Rank>>>;
  findRolesByMissionPartnerId?: Maybe<Array<Maybe<RoleWithUserData>>>;
  findSchoolById?: Maybe<School>;
  findSettingById?: Maybe<Setting>;
  findSkillById?: Maybe<Skill>;
  findSkillsBySchool?: Maybe<PaginatedSkillsResult>;
  findSpaceDeltas?: Maybe<Array<Maybe<SpaceDelta>>>;
  findSpaceForceJobCodes?: Maybe<Array<Maybe<OccupationalCode>>>;
  findSquadrons?: Maybe<Array<Maybe<Squadron>>>;
  findSurveyById?: Maybe<Survey>;
  findSurveyProgressByUserIdAndSurveyId?: Maybe<SurveyProgress>;
  findSurveysBySearch?: Maybe<PaginatedSurveyStatusCountsResult>;
  findTranscriptCourses?: Maybe<PaginatedTranscriptCourses>;
  findTranscriptCoursesByUserId?: Maybe<PaginatedResults>;
  findTranscriptIndividualCourses?: Maybe<PaginatedResults>;
  findTranscriptLabsByUserId?: Maybe<Array<Maybe<UserLab>>>;
  findTranscriptTrainingPlans?: Maybe<PaginatedTranscriptTrainingPlans>;
  findUnifiedSearchResults?: Maybe<CategorizedSearchResults>;
  findUserById?: Maybe<User>;
  findUserMissionPartnerMemberships?: Maybe<Array<Maybe<UserMissionPartnerMembership>>>;
  findUserMissionPartnerRequests?: Maybe<Array<Maybe<MissionPartnerRequest>>>;
  findUsersByGroupId?: Maybe<Array<Maybe<User>>>;
  findUsersBySearchText?: Maybe<PaginatedUsersResult>;
  findVendorById?: Maybe<Vendor>;
  findWings?: Maybe<Array<Maybe<Wing>>>;
  getAllAwardedBadgesByMissionPartnerMembership?: Maybe<Array<Maybe<DuBadgeMetrics>>>;
  getAllTrainingPlans?: Maybe<Array<Maybe<TrainingPlan>>>;
  getAssessmentById?: Maybe<Assessment>;
  getBadgesToBeNotified?: Maybe<Array<Maybe<BadgesToBeNotified>>>;
  getBranchesForOpenLicenseRequests?: Maybe<Array<Scalars['String']['output']>>;
  getCertification?: Maybe<Certification>;
  getCourseProgress?: Maybe<Array<Maybe<CourseProgress>>>;
  getCoursesQuarterlyByMissionPartner?: Maybe<Array<Maybe<CoursesQuarterReturn>>>;
  getCurriculumReview?: Maybe<CurriculumReview>;
  getDomain?: Maybe<Domain>;
  getIndexableTableNames?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  getIndexingBatch?: Maybe<IndexingBatch>;
  getJobRole?: Maybe<JobRole>;
  getKsat?: Maybe<Ksat>;
  getLeaderboard?: Maybe<Array<Maybe<LeaderboardRank>>>;
  getLeaderboardByUser?: Maybe<Array<Maybe<LeaderboardRank>>>;
  getLeaderboardRank?: Maybe<LeaderboardRank>;
  getLearningObjective?: Maybe<LearningObjective>;
  getLicensesByVendorId?: Maybe<PaginatedLicensesByVendorIdResponse>;
  getMetricsByGroupIdCourseId?: Maybe<Array<Maybe<GroupMetrics>>>;
  getMissionPartnerOwnedBadges?: Maybe<Array<Maybe<MissionPartnerBadgeMetrics>>>;
  getPlansQuarterlyByMissionPartner?: Maybe<Array<Maybe<PlansQuarterReturn>>>;
  getPointEvent?: Maybe<PointEvent>;
  getPointsInformation?: Maybe<Array<Maybe<PointsInformation>>>;
  getPublicMissionPartnerExports?: Maybe<Array<Maybe<Report>>>;
  getRecentProfilePointsActivity?: Maybe<Array<Maybe<PointsActivity>>>;
  getServiceHealth: ServiceHealthResponse;
  getTopCourses?: Maybe<Array<Maybe<TopCourse>>>;
  getTopPlans?: Maybe<Array<Maybe<TopPlan>>>;
  getTrainingPlanById?: Maybe<TrainingPlan>;
  getTrainingPlanMetrics?: Maybe<TrainingPlanMetrics>;
  getTrainingPlanProgress?: Maybe<Array<Maybe<TrainingPlanProgress>>>;
  getTrainingPlanUpgradeStatusById?: Maybe<TrainingPlanUpgradeStatus>;
  getTrainingPlansByUserId?: Maybe<Array<Maybe<TrainingPlan>>>;
  getTranscriptAssessmentById?: Maybe<TranscriptAssessment>;
  getTranscriptAssessmentMetrics?: Maybe<TranscriptAssessmentMetrics>;
  getTranscriptCourseById?: Maybe<TranscriptCourse>;
  getTranscriptCourseMetrics?: Maybe<TranscriptCourseMetrics>;
  getUser?: Maybe<User>;
  getUserCohorts?: Maybe<Array<Maybe<UserCohorts>>>;
  getUserContractorStatus?: Maybe<Scalars['Boolean']['output']>;
  getUserDownloads?: Maybe<Array<Maybe<Download>>>;
  getUserEmailVerifiedStatus?: Maybe<UserEmailVerifiedStatus>;
  getUserLicenseRequests?: Maybe<Array<Maybe<LicenseRequest>>>;
  getUserLicenseStatus?: Maybe<Array<Maybe<UserLicenseStatus>>>;
  getUserLicenses?: Maybe<Array<Maybe<License>>>;
  getUserMissionPartnerTrialStatus?: Maybe<MissionPartnerTrialStatus>;
  getUserOnboardingStatus?: Maybe<UserOnboardingStatus>;
  getUserUploads?: Maybe<Array<Maybe<UploadRecord>>>;
  getVendorLicenseAvailability?: Maybe<VendorLicenseAvailability>;
  getVendorsForAggregateTranscriptCourses?: Maybe<Array<Maybe<VendorsByAggregateTranscriptCourses>>>;
  getVendorsForOpenLicenseRequests?: Maybe<Array<Scalars['String']['output']>>;
  isUserLicensed?: Maybe<IsUserLicensedResponse>;
  sendReminderToNonOnboarded?: Maybe<SendReminderToNonOnboardedOutput>;
};


export type QueryAggregateTrainingPlanVersionsArgs = {
  planSourceId: Scalars['String']['input'];
  planType: Scalars['String']['input'];
};


export type QueryAggregateTranscriptCoursesArgs = {
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  vendorId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAggregateTranscriptItemsForTrainingPlanArgs = {
  groupId?: InputMaybe<Scalars['String']['input']>;
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  planSourceId: Scalars['String']['input'];
  planType: Scalars['String']['input'];
  planVersion?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAggregateTranscriptTrainingPlansArgs = {
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['SafeInt']['input']>;
  pageSize?: InputMaybe<Scalars['SafeInt']['input']>;
  planType?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAggregateTranscriptTrainingPlansForGroupArgs = {
  groupId: Scalars['String']['input'];
  missionPartnerId: Scalars['String']['input'];
};


export type QueryCheckAccessCodeArgs = {
  accessCode: Scalars['String']['input'];
  missionPartnerId: Scalars['ID']['input'];
};


export type QueryCountActiveUsersByMissionPartnerIdArgs = {
  missionPartnerId: Scalars['ID']['input'];
};


export type QueryCountAllUsersArgs = {
  branch?: InputMaybe<Scalars['String']['input']>;
  fieldCommand?: InputMaybe<Scalars['String']['input']>;
  onboardingComplete?: InputMaybe<Scalars['Boolean']['input']>;
  organization?: InputMaybe<Scalars['String']['input']>;
  spaceDelta?: InputMaybe<Scalars['String']['input']>;
  squadron?: InputMaybe<Scalars['String']['input']>;
  trainingGroup?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCountAssignedLicensesForMissionPartnerArgs = {
  missionPartnerId: Scalars['ID']['input'];
};


export type QueryCountCacEnabledUsersArgs = {
  branch?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCountGroupsByMissionPartnerIdArgs = {
  missionPartnerId: Scalars['ID']['input'];
};


export type QueryCountNewUsersArgs = {
  branch?: InputMaybe<Scalars['String']['input']>;
  dayRange?: InputMaybe<Scalars['SafeInt']['input']>;
};


export type QueryCountOnboardedUsersByMissionPartnerIdArgs = {
  missionPartnerId: Scalars['ID']['input'];
};


export type QueryCountRolesByMissionPartnerIdArgs = {
  missionPartnerId: Scalars['ID']['input'];
};


export type QueryCountTranscriptTrainingPlansAggregatedByStatusArgs = {
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCountUniqueItemsAndVendorsBySourceArgs = {
  source: Scalars['String']['input'];
};


export type QueryCountUsersByMissionPartnerIdArgs = {
  missionPartnerId: Scalars['ID']['input'];
};


export type QueryExportCourseLevelMetricsForTrainingPlanArgs = {
  groupId?: InputMaybe<Scalars['ID']['input']>;
  missionPartnerId: Scalars['ID']['input'];
  planSourceId: Scalars['ID']['input'];
  planVersion?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type QueryExportIndividualLearnerActivityArgs = {
  missionPartnerId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type QueryExportLearnersArgs = {
  missionPartnerId: Scalars['ID']['input'];
  missionPartnerName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryExportQuizExamsArgs = {
  missionPartnerId: Scalars['ID']['input'];
  missionPartnerName: Scalars['String']['input'];
  quizOrExamId: Scalars['String']['input'];
  quizOrExamName: Scalars['String']['input'];
};


export type QueryExportSurveysArgs = {
  missionPartnerId: Scalars['ID']['input'];
  missionPartnerName: Scalars['String']['input'];
  surveyId: Scalars['String']['input'];
  surveyName: Scalars['String']['input'];
};


export type QueryExportTrainingPlanCoursesForMissionPartnerArgs = {
  missionPartnerId: Scalars['ID']['input'];
  missionPartnerName: Scalars['String']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
  vendorName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryExportTrainingPlanTranscriptsForGroupArgs = {
  groupId: Scalars['ID']['input'];
  groupName?: InputMaybe<Scalars['String']['input']>;
  missionPartnerId: Scalars['ID']['input'];
};


export type QueryExportTrainingPlanTranscriptsForMissionPartnerArgs = {
  missionPartnerId: Scalars['ID']['input'];
  missionPartnerName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFetchRelevantLabInformationArgs = {
  labId: Scalars['ID']['input'];
};


export type QueryFindAllSkillsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFindAssessmentsBySourceArgs = {
  source: Scalars['String']['input'];
};


export type QueryFindAssessmentsByUserIdArgs = {
  missionPartnerId?: InputMaybe<Scalars['ID']['input']>;
  userId: Scalars['ID']['input'];
};


export type QueryFindAwardedBadgeArgs = {
  badgeId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type QueryFindAwardedBadgesArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryFindBadgeByIdArgs = {
  badgeId: Scalars['ID']['input'];
};


export type QueryFindCatalogResultsArgs = {
  excludeCustomContent?: InputMaybe<Scalars['Boolean']['input']>;
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  planType?: InputMaybe<Scalars['String']['input']>;
  search: Scalars['String']['input'];
  searchAfter?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type?: InputMaybe<Scalars['String']['input']>;
  vendorId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindCategorizedTimeSpentLearningArgs = {
  categoryPercentileBreakpoints?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  missionPartnerId: Scalars['ID']['input'];
  roundToHour?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryFindCertificationsArgs = {
  input: FindCertificationsInput;
};


export type QueryFindContentByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindCourseByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindCoursesBySearchArgs = {
  exclude?: InputMaybe<Scalars['JSONObject']['input']>;
  search: Scalars['String']['input'];
  source?: InputMaybe<Scalars['String']['input']>;
  vendorId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindCoursesBySourceArgs = {
  source: Scalars['String']['input'];
};


export type QueryFindCurriculumReviewsArgs = {
  input: FindCurriculumReviewsInput;
};


export type QueryFindDomainsArgs = {
  filter?: InputMaybe<DomainFilter>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<DomainSortBy>;
  sortByMostRelevant?: InputMaybe<SortByMostRelevant>;
  sortDirection?: InputMaybe<SortDirection>;
};


export type QueryFindForceMultiplierByIdAndVersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryFindGroupByIdArgs = {
  groupId: Scalars['ID']['input'];
};


export type QueryFindGroupsByMissionPartnerIdArgs = {
  missionPartnerId: Scalars['ID']['input'];
};


export type QueryFindHostedCourseByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindHostedCourseItemArgs = {
  id: Scalars['ID']['input'];
  itemId: Scalars['ID']['input'];
};


export type QueryFindHostedCourseProgressByIdArgs = {
  hostedCourseId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type QueryFindHostedExamByIdArgs = {
  hostedExamId: Scalars['ID']['input'];
};


export type QueryFindHostedExamProgressByExamIdUserIdArgs = {
  hostedExamId: Scalars['ID']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryFindHostedScormByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindHostedScormProgressByIdArgs = {
  hostedScormId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type QueryFindJobRolesArgs = {
  filter?: InputMaybe<JobRoleFilter>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<JobRoleSortBy>;
  sortDirection?: InputMaybe<SortDirection>;
};


export type QueryFindKsatsArgs = {
  filter?: InputMaybe<KsatFilter>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<KsatSortBy>;
  sortDirection?: InputMaybe<SortDirection>;
};


export type QueryFindLabByIdArgs = {
  labId: Scalars['ID']['input'];
};


export type QueryFindLatestForceMultiplierByIdArgs = {
  betaAccess?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
};


export type QueryFindLatestForceMultiplierByIdAdminArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindLatestPublishedForceMultiplierByIdArgs = {
  betaAccess?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
};


export type QueryFindLearnersBySearchArgs = {
  missionPartnerId: Scalars['ID']['input'];
  onboardingComplete?: InputMaybe<Scalars['Boolean']['input']>;
  pageNumber?: InputMaybe<Scalars['SafeInt']['input']>;
  pageSize?: InputMaybe<Scalars['SafeInt']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
  sortKey?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindLearningObjectivesArgs = {
  filter?: InputMaybe<LearningObjectiveFilter>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<LearningObjectiveSortBy>;
  sortDirection?: InputMaybe<SortDirection>;
};


export type QueryFindLearningPathByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindLicenseByIdArgs = {
  userId: Scalars['ID']['input'];
  vendorId: Scalars['ID']['input'];
};


export type QueryFindLicenseRequestByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindLicenseStatusCountsArgs = {
  missionPartnerId: Scalars['ID']['input'];
};


export type QueryFindLicensesByMissionPartnerAndVendorArgs = {
  missionPartnerId: Scalars['ID']['input'];
  pageNumber?: InputMaybe<Scalars['SafeInt']['input']>;
  pageSize?: InputMaybe<Scalars['SafeInt']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  vendorId: Scalars['ID']['input'];
};


export type QueryFindLicensesByMissionPartnerIdAndVendorIdArgs = {
  missionPartnerId: Scalars['ID']['input'];
  pageNumber?: InputMaybe<Scalars['SafeInt']['input']>;
  pageSize?: InputMaybe<Scalars['SafeInt']['input']>;
  vendorId: Scalars['ID']['input'];
};


export type QueryFindLicensesByUserIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryFindMissionPartnerByIdArgs = {
  bypassAuth?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
};


export type QueryFindMissionPartnerByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryFindMissionPartnerBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryFindMissionPartnerMembersByUserIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryFindMissionPartnerMinDetailsArgs = {
  bypassAuth?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
};


export type QueryFindMissionPartnerRequestByIdArgs = {
  missionPartnerId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type QueryFindOpenAndWaitlistLicenseRequestsArgs = {
  branch?: InputMaybe<Scalars['String']['input']>;
  missionPartnerId: Scalars['ID']['input'];
  pageNumber?: InputMaybe<Scalars['SafeInt']['input']>;
  pageSize?: InputMaybe<Scalars['SafeInt']['input']>;
  vendorName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindOpenForMissionPartnerArgs = {
  missionPartnerId: Scalars['ID']['input'];
};


export type QueryFindOpenLicenseRequestsArgs = {
  branch?: InputMaybe<Scalars['String']['input']>;
  missionPartnerId: Scalars['ID']['input'];
  pageNumber?: InputMaybe<Scalars['SafeInt']['input']>;
  pageSize?: InputMaybe<Scalars['SafeInt']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  vendorName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindPointEventsArgs = {
  input: PointEventInput;
};


export type QueryFindQuizAndExamsBySearchArgs = {
  missionPartnerId: Scalars['ID']['input'];
  pageNumber?: InputMaybe<Scalars['SafeInt']['input']>;
  pageSize?: InputMaybe<Scalars['SafeInt']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
  sortKey?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindRolesByMissionPartnerIdArgs = {
  missionPartnerId: Scalars['ID']['input'];
};


export type QueryFindSchoolByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindSettingByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindSkillByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindSkillsBySchoolArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  schoolId: Scalars['ID']['input'];
};


export type QueryFindSurveyByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindSurveyProgressByUserIdAndSurveyIdArgs = {
  surveyId: Scalars['ID']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryFindSurveysBySearchArgs = {
  missionPartnerId: Scalars['ID']['input'];
  pageNumber?: InputMaybe<Scalars['SafeInt']['input']>;
  pageSize?: InputMaybe<Scalars['SafeInt']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
  sortKey?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindTranscriptCoursesArgs = {
  branch?: InputMaybe<Scalars['String']['input']>;
  courseId?: InputMaybe<Scalars['String']['input']>;
  courseTitleSearch?: InputMaybe<Scalars['String']['input']>;
  groupId?: InputMaybe<Scalars['String']['input']>;
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  planSourceId?: InputMaybe<Scalars['String']['input']>;
  planType?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  userSearch?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindTranscriptCoursesByUserIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryFindTranscriptLabsByUserIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryFindTranscriptTrainingPlansArgs = {
  groupId?: InputMaybe<Scalars['String']['input']>;
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['SafeInt']['input']>;
  pageSize?: InputMaybe<Scalars['SafeInt']['input']>;
  planSourceId?: InputMaybe<Scalars['String']['input']>;
  planType?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindUnifiedSearchResultsArgs = {
  excludeCustomContent?: InputMaybe<Scalars['Boolean']['input']>;
  excludeItemsWithVendorStatus?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  planType?: InputMaybe<Scalars['String']['input']>;
  search: Scalars['String']['input'];
  searchAfter?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type?: InputMaybe<Scalars['String']['input']>;
  vendorId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindUserByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindUsersByGroupIdArgs = {
  groupId: Scalars['String']['input'];
};


export type QueryFindUsersBySearchTextArgs = {
  branch?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['SafeInt']['input']>;
  pageSize?: InputMaybe<Scalars['SafeInt']['input']>;
  searchText: Scalars['String']['input'];
};


export type QueryFindVendorByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAllAwardedBadgesByMissionPartnerMembershipArgs = {
  missionPartnerId: Scalars['ID']['input'];
};


export type QueryGetAssessmentByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetBranchesForOpenLicenseRequestsArgs = {
  missionPartnerId: Scalars['ID']['input'];
};


export type QueryGetCertificationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCourseProgressArgs = {
  groupId: Scalars['ID']['input'];
};


export type QueryGetCoursesQuarterlyByMissionPartnerArgs = {
  maxNumberofQuarters?: InputMaybe<Scalars['SafeInt']['input']>;
  missionPartnerId: Scalars['ID']['input'];
};


export type QueryGetCurriculumReviewArgs = {
  itemId: Scalars['ID']['input'];
  itemType: CurriculumReviewItemType;
  userId: Scalars['ID']['input'];
};


export type QueryGetDomainArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetIndexingBatchArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetJobRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetKsatArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetLearningObjectiveArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetLicensesByVendorIdArgs = {
  branch?: InputMaybe<Scalars['String']['input']>;
  missionPartnerName?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['SafeInt']['input']>;
  pageSize?: InputMaybe<Scalars['SafeInt']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['String']['input']>;
  vendorId: Scalars['ID']['input'];
};


export type QueryGetMetricsByGroupIdCourseIdArgs = {
  courseId: Scalars['String']['input'];
  groupId: Scalars['String']['input'];
};


export type QueryGetMissionPartnerOwnedBadgesArgs = {
  missionPartnerId: Scalars['ID']['input'];
};


export type QueryGetPlansQuarterlyByMissionPartnerArgs = {
  maxNumberofQuarters?: InputMaybe<Scalars['SafeInt']['input']>;
  missionPartnerId: Scalars['ID']['input'];
};


export type QueryGetPointEventArgs = {
  eventId: Scalars['ID']['input'];
};


export type QueryGetPublicMissionPartnerExportsArgs = {
  missionPartnerId: Scalars['ID']['input'];
};


export type QueryGetRecentProfilePointsActivityArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetTopCoursesArgs = {
  limit?: InputMaybe<Scalars['SafeInt']['input']>;
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTopPlansArgs = {
  limit?: InputMaybe<Scalars['SafeInt']['input']>;
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTrainingPlanByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTrainingPlanMetricsArgs = {
  dayRange?: InputMaybe<Scalars['SafeInt']['input']>;
};


export type QueryGetTrainingPlanProgressArgs = {
  groupId: Scalars['ID']['input'];
  planSourceId: Scalars['ID']['input'];
  planType: Scalars['String']['input'];
  planVersion: Scalars['String']['input'];
};


export type QueryGetTrainingPlanUpgradeStatusByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTrainingPlansByUserIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetTranscriptAssessmentByIdArgs = {
  assessmentId: Scalars['ID']['input'];
};


export type QueryGetTranscriptAssessmentMetricsArgs = {
  since?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTranscriptCourseByIdArgs = {
  courseId: Scalars['ID']['input'];
};


export type QueryGetTranscriptCourseMetricsArgs = {
  branch?: InputMaybe<Scalars['String']['input']>;
  dayRange?: InputMaybe<Scalars['SafeInt']['input']>;
  fieldCommand?: InputMaybe<Scalars['String']['input']>;
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  organization?: InputMaybe<Scalars['String']['input']>;
  spaceDelta?: InputMaybe<Scalars['String']['input']>;
  squadron?: InputMaybe<Scalars['String']['input']>;
  trainingGroup?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetUserCohortsArgs = {
  missionPartnerId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type QueryGetUserLicenseStatusArgs = {
  vendorIds: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type QueryGetVendorsForAggregateTranscriptCoursesArgs = {
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetVendorsForOpenLicenseRequestsArgs = {
  missionPartnerId: Scalars['ID']['input'];
};


export type QueryIsUserLicensedArgs = {
  vendorId: Scalars['ID']['input'];
};


export type QuerySendReminderToNonOnboardedArgs = {
  missionPartnerId: Scalars['ID']['input'];
};

export type QuizExamStatusCounts = {
  __typename?: 'QuizExamStatusCounts';
  completed: Scalars['Int']['output'];
  itemId: Scalars['String']['output'];
  itemName: Scalars['String']['output'];
  itemType: Scalars['String']['output'];
  missionPartnerId: Scalars['ID']['output'];
  started: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Rank = {
  __typename?: 'Rank';
  title: Scalars['String']['output'];
};

export type RecentMissionPartner = {
  __typename?: 'RecentMissionPartner';
  missionPartnerId: Scalars['ID']['output'];
  missionPartnerName: Scalars['String']['output'];
  visitedAt: Scalars['DateTime']['output'];
};

export type RecentTraining = {
  __typename?: 'RecentTraining';
  courseUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  percentComplete?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  vendor?: Maybe<Scalars['String']['output']>;
};

export type RelevantLabInformation = {
  __typename?: 'RelevantLabInformation';
  coreConcepts?: Maybe<Array<Maybe<CoreConceptItemWithDetail>>>;
  relevantLearningPaths?: Maybe<Array<Maybe<LearningPathItemWithDetail>>>;
};

export type RemoveCollectionItemInput = {
  assessmentId?: InputMaybe<Scalars['ID']['input']>;
  courseId?: InputMaybe<Scalars['ID']['input']>;
  planSourceId?: InputMaybe<Scalars['ID']['input']>;
  planType?: InputMaybe<Scalars['String']['input']>;
  planVersion?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type RemoveFeaturedTrainingItemsInput = {
  assessmentId?: InputMaybe<Scalars['ID']['input']>;
  courseId?: InputMaybe<Scalars['ID']['input']>;
  labId?: InputMaybe<Scalars['ID']['input']>;
  planSourceId?: InputMaybe<Scalars['ID']['input']>;
  planType?: InputMaybe<Scalars['String']['input']>;
  planVersion?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type RemoveItemFromForceMultiplierInput = {
  id: Scalars['ID']['input'];
  removeItems: Array<InputMaybe<ItemInput>>;
  version: Scalars['String']['input'];
};

export type RemoveLicensesInput = {
  missionPartnerId: Scalars['ID']['input'];
  userIds: Array<InputMaybe<Scalars['ID']['input']>>;
  vendorId: Scalars['ID']['input'];
};

export type Report = {
  __typename?: 'Report';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ReportInput = {
  description: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type RequiredLicense = {
  __typename?: 'RequiredLicense';
  vendorId: Scalars['String']['output'];
  vendorName: Scalars['String']['output'];
};

export type Resource = {
  __typename?: 'Resource';
  description: Scalars['String']['output'];
  heroText: Scalars['String']['output'];
  href: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Role = {
  __typename?: 'Role';
  missionPartnerId: Scalars['ID']['output'];
  name: RoleName;
  userId: Scalars['ID']['output'];
};

export enum RoleName {
  PortalManager = 'PORTAL_MANAGER',
  PortalViewer = 'PORTAL_VIEWER'
}

export type RoleWithUserData = {
  __typename?: 'RoleWithUserData';
  missionPartnerId: Scalars['ID']['output'];
  name: RoleName;
  userDate?: Maybe<Scalars['DateTime']['output']>;
  userEmail: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
  userName: Scalars['String']['output'];
};

export type School = {
  __typename?: 'School';
  content: SchoolContent;
  id: Scalars['ID']['output'];
  learningPaths?: Maybe<Array<Maybe<LearningPath>>>;
  title: Scalars['String']['output'];
};

export type SchoolContent = {
  __typename?: 'SchoolContent';
  about: About;
  description?: Maybe<Array<Scalars['String']['output']>>;
  summary: Scalars['String']['output'];
  valuePropositions?: Maybe<Array<ValueProposition>>;
};

export type SendReminderToNonOnboardedOutput = {
  __typename?: 'SendReminderToNonOnboardedOutput';
  emailsNotSent?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  successfulEmailsSent?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
};

export type ServiceHealth = {
  __typename?: 'ServiceHealth';
  name: Scalars['String']['output'];
  status: ServiceStatus;
};

export type ServiceHealthResponse = {
  __typename?: 'ServiceHealthResponse';
  services: Array<ServiceHealth>;
};

export enum ServiceStatus {
  Error = 'ERROR',
  Running = 'RUNNING'
}

export type Setting = {
  __typename?: 'Setting';
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Skill = {
  __typename?: 'Skill';
  content: SkillContent;
  enrolledLearners?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  learningPaths?: Maybe<Array<Maybe<LearningPath>>>;
  requiredLicenses: Array<Maybe<RequiredLicense>>;
  schools?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  totalDuration?: Maybe<Scalars['Int']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  vendors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  version: Scalars['String']['output'];
};

export type SkillContent = {
  __typename?: 'SkillContent';
  about: About;
  callToAction: CallToAction;
  description?: Maybe<Array<Scalars['String']['output']>>;
  includedIn: IncludedIn;
  skillTree: SkillTree;
  summary: Scalars['String']['output'];
  valuePropositions?: Maybe<Array<ValueProposition>>;
};

export type SkillTree = {
  __typename?: 'SkillTree';
  description?: Maybe<Array<Scalars['String']['output']>>;
  image?: Maybe<Scalars['String']['output']>;
  imageAltText?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export enum SortByMostRelevant {
  JobRole = 'jobRole',
  Ksat = 'ksat',
  LearningObjective = 'learningObjective'
}

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type SpaceDelta = {
  __typename?: 'SpaceDelta';
  title: Scalars['String']['output'];
};

export type Specialization = {
  __typename?: 'Specialization';
  id: Scalars['ID']['output'];
  instructions: Scalars['String']['output'];
  options?: Maybe<Array<Maybe<SpecializationOption>>>;
  title: Scalars['String']['output'];
};

export type SpecializationOption = {
  __typename?: 'SpecializationOption';
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type Squadron = {
  __typename?: 'Squadron';
  title: Scalars['String']['output'];
};

export enum StatusType {
  Archived = 'Archived',
  Draft = 'Draft',
  Published = 'Published'
}

export type Survey = {
  __typename?: 'Survey';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  durationInMinutes?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  missionPartner?: Maybe<MissionPartner>;
  missionPartnerId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  questions?: Maybe<Array<Maybe<Scalars['JSONObject']['output']>>>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type SurveyProgress = {
  __typename?: 'SurveyProgress';
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  missionPartner?: Maybe<MissionPartner>;
  responses?: Maybe<Array<Maybe<Scalars['JSONObject']['output']>>>;
  startedAt: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  surveyId: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId: Scalars['ID']['output'];
};

export type SurveyStatusCounts = {
  __typename?: 'SurveyStatusCounts';
  completed: Scalars['Int']['output'];
  hostedSurveyId: Scalars['ID']['output'];
  hostedSurveyName: Scalars['String']['output'];
  missionPartnerId: Scalars['ID']['output'];
  started: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Testimonial = {
  __typename?: 'Testimonial';
  caption: Caption;
  description?: Maybe<Array<Scalars['String']['output']>>;
  image: Scalars['String']['output'];
  imageAltText?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type TopCourse = {
  __typename?: 'TopCourse';
  count: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type TopPlan = {
  __typename?: 'TopPlan';
  count: Scalars['Int']['output'];
  planSourceId: Scalars['String']['output'];
  planType: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type TrainingCriteria = {
  __typename?: 'TrainingCriteria';
  id: Scalars['ID']['output'];
  maxScore?: Maybe<Scalars['Int']['output']>;
  minScore?: Maybe<Scalars['Int']['output']>;
  ruleType?: Maybe<Scalars['String']['output']>;
  training?: Maybe<Array<Maybe<AssignedTraining>>>;
};

export type TrainingCriteriaInput = {
  id: Scalars['ID']['input'];
  maxScore?: InputMaybe<Scalars['Int']['input']>;
  minScore?: InputMaybe<Scalars['Int']['input']>;
  ruleType?: InputMaybe<Scalars['String']['input']>;
  training?: InputMaybe<Array<InputMaybe<AssignedTrainingInput>>>;
};

export type TrainingPlan = {
  __typename?: 'TrainingPlan';
  activities?: Maybe<Array<Maybe<TrainingPlanActivity>>>;
  assignedAt?: Maybe<Scalars['DateTime']['output']>;
  averageRating?: Maybe<Scalars['Float']['output']>;
  brand?: Maybe<Scalars['JSONObject']['output']>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  nextActivity?: Maybe<TrainingPlanActivity>;
  planSourceId: Scalars['String']['output'];
  planType: Scalars['String']['output'];
  planVersion?: Maybe<Scalars['String']['output']>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  stats?: Maybe<Array<Maybe<TrainingPlanStats>>>;
  stoppedAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  totalReviews?: Maybe<Scalars['Int']['output']>;
  unsequenced?: Maybe<Scalars['Boolean']['output']>;
  userId: Scalars['ID']['output'];
};

export type TrainingPlanActivity = {
  __typename?: 'TrainingPlanActivity';
  activityType: Scalars['String']['output'];
  assessment?: Maybe<Assessment>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  course?: Maybe<Course>;
  lab?: Maybe<Lab>;
  markedCompletedAt?: Maybe<Scalars['DateTime']['output']>;
  masteryLevel?: Maybe<Scalars['String']['output']>;
  pendingReviewAt?: Maybe<Scalars['DateTime']['output']>;
  specialization?: Maybe<Specialization>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  stoppedAt?: Maybe<Scalars['DateTime']['output']>;
  survey?: Maybe<Survey>;
  value?: Maybe<Scalars['String']['output']>;
};

export type TrainingPlanMetrics = {
  __typename?: 'TrainingPlanMetrics';
  plansAssigned: Scalars['Int']['output'];
  plansCompleted: Scalars['Int']['output'];
  plansInProgress: Scalars['Int']['output'];
  plansStopped: Scalars['Int']['output'];
  totalPlans: Scalars['Int']['output'];
};

export type TrainingPlanProgress = {
  __typename?: 'TrainingPlanProgress';
  completed?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  inProgress?: Maybe<Scalars['Int']['output']>;
  items?: Maybe<Array<Maybe<TrainingPlanProgress>>>;
  notStarted?: Maybe<Scalars['Int']['output']>;
  pendingReview?: Maybe<Scalars['Int']['output']>;
  source: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type TrainingPlanStats = {
  __typename?: 'TrainingPlanStats';
  completed: Scalars['Int']['output'];
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  completedPercentage: Scalars['Int']['output'];
  duration: Scalars['Int']['output'];
  group: Scalars['String']['output'];
  total: Scalars['Int']['output'];
};

export type TrainingPlanUpgradeStatus = {
  __typename?: 'TrainingPlanUpgradeStatus';
  isUpgradable: Scalars['Boolean']['output'];
  planId: Scalars['ID']['output'];
  planType?: Maybe<Scalars['String']['output']>;
  planVersion?: Maybe<Scalars['String']['output']>;
  sourcePlanVersion?: Maybe<Scalars['String']['output']>;
};

export type TrainingPlanVersionData = {
  __typename?: 'TrainingPlanVersionData';
  versionEnabled: Scalars['Boolean']['output'];
  versions: Array<Maybe<Scalars['String']['output']>>;
};

export type TrainingPrepItem = {
  __typename?: 'TrainingPrepItem';
  id: Scalars['String']['output'];
  type: TrainingPrepItemType;
};

export type TrainingPrepItemInput = {
  id: Scalars['String']['input'];
  type: TrainingPrepItemType;
};

export enum TrainingPrepItemType {
  TranscriptAssessment = 'transcript_assessment',
  TranscriptCourse = 'transcript_course',
  TranscriptLab = 'transcript_lab',
  TranscriptTrainingPlan = 'transcript_training_plan'
}

export enum TrainingPrepType {
  Combination = 'combination',
  Du = 'du',
  External = 'external'
}

export type TranscriptAssessment = {
  __typename?: 'TranscriptAssessment';
  assessment?: Maybe<Assessment>;
  assessmentId: Scalars['ID']['output'];
  assignedAt?: Maybe<Scalars['DateTime']['output']>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  markedCompletedAt?: Maybe<Scalars['DateTime']['output']>;
  pendingReviewAt?: Maybe<Scalars['DateTime']['output']>;
  result?: Maybe<Scalars['String']['output']>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: Scalars['String']['output'];
  stoppedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId: Scalars['ID']['output'];
};

export type TranscriptAssessmentMetrics = {
  __typename?: 'TranscriptAssessmentMetrics';
  completed: Scalars['Int']['output'];
  markedCompleted: Scalars['Int']['output'];
  pendingReview: Scalars['Int']['output'];
  started: Scalars['Int']['output'];
  stopped: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type TranscriptCourse = {
  __typename?: 'TranscriptCourse';
  aetcLrsRecordPosted?: Maybe<Scalars['Boolean']['output']>;
  awardedPoints?: Maybe<Scalars['Float']['output']>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  courseId: Scalars['ID']['output'];
  lastActivityAt?: Maybe<Scalars['DateTime']['output']>;
  markedCompletedAt?: Maybe<Scalars['DateTime']['output']>;
  minutesInCourse?: Maybe<Scalars['Float']['output']>;
  pendingReviewAt?: Maybe<Scalars['DateTime']['output']>;
  percentComplete?: Maybe<Scalars['Float']['output']>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: Scalars['String']['output'];
  stoppedAt?: Maybe<Scalars['DateTime']['output']>;
  userId: Scalars['ID']['output'];
};

export type TranscriptCourseMetrics = {
  __typename?: 'TranscriptCourseMetrics';
  coursesCompleted: Scalars['Int']['output'];
  coursesInProgress: Scalars['Int']['output'];
  coursesMarkedCompleted: Scalars['Int']['output'];
  coursesPendingReview: Scalars['Int']['output'];
  coursesStopped: Scalars['Int']['output'];
  totalCourses: Scalars['Int']['output'];
  totalHoursCompleted: Scalars['Float']['output'];
};

export type TranscriptLab = {
  __typename?: 'TranscriptLab';
  labId: Scalars['String']['output'];
  markedCompletedAt?: Maybe<Scalars['DateTime']['output']>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type TranscriptTrainingPlan = {
  __typename?: 'TranscriptTrainingPlan';
  brand?: Maybe<Scalars['JSONObject']['output']>;
  planSourceId: Scalars['String']['output'];
  planType: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type TranscriptTrainingPlanCountsByStatus = {
  __typename?: 'TranscriptTrainingPlanCountsByStatus';
  assigned: Scalars['Int']['output'];
  completed: Scalars['Int']['output'];
  started: Scalars['Int']['output'];
  stopped: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type UnifiedSearchResult = {
  __typename?: 'UnifiedSearchResult';
  affiliateId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  durationInMinutes?: Maybe<Scalars['String']['output']>;
  externalLink?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  locked?: Maybe<Scalars['Boolean']['output']>;
  logoUrl?: Maybe<Scalars['String']['output']>;
  numOfLearningPathItems?: Maybe<Scalars['Int']['output']>;
  numOfLearningPaths?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  vendorNames?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type UnifiedSearchResults = {
  __typename?: 'UnifiedSearchResults';
  hits?: Maybe<Array<Maybe<UnifiedSearchResult>>>;
  searchAfter?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type UniqueItemsAndVendorsResponse = {
  __typename?: 'UniqueItemsAndVendorsResponse';
  items?: Maybe<Scalars['Int']['output']>;
  vendors?: Maybe<Scalars['Int']['output']>;
};

export type UpdateCertificationInput = {
  credentialId?: InputMaybe<Scalars['String']['input']>;
  credentialUrl?: InputMaybe<Scalars['String']['input']>;
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileUrl?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  issuedAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organization?: InputMaybe<Scalars['String']['input']>;
  trainingPrepItems?: InputMaybe<Array<InputMaybe<TrainingPrepItemInput>>>;
  trainingPrepType?: InputMaybe<TrainingPrepType>;
};

export type UpdateCustomTrainingEnabledInput = {
  customTrainingEnabled: Scalars['Boolean']['input'];
  id: Scalars['String']['input'];
};

export type UpdateDomainInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateForceMultiplierContentInput = {
  content?: InputMaybe<ForceMultiplierContentInput>;
  id: Scalars['ID']['input'];
};

export type UpdateIsMarketplaceEnabledInput = {
  id: Scalars['String']['input'];
  isMarketplaceEnabled: Scalars['Boolean']['input'];
};

export type UpdateJobRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  roleId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateKsatInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  domainId?: InputMaybe<Scalars['ID']['input']>;
  ksatType?: InputMaybe<KsatType>;
};

export type UpdateLearningObjectiveInput = {
  description?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateLibraryItemsInput = {
  id: Scalars['ID']['input'];
  libraryItems: Array<InputMaybe<LibraryItemInput>>;
  missionPartnerId: Scalars['String']['input'];
};

export type UpdateMissionPartnerInput = {
  accessCode?: InputMaybe<Scalars['String']['input']>;
  affiliateId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabledReports?: InputMaybe<Array<InputMaybe<ReportInput>>>;
  featuredTraining?: InputMaybe<Array<InputMaybe<FeaturedTrainingInput>>>;
  id: Scalars['ID']['input'];
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  provisionedLicenses?: InputMaybe<Array<InputMaybe<ProvisionedLicensesInput>>>;
  sectionType?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePointEventInput = {
  event?: InputMaybe<PointEventsType>;
  id: Scalars['ID']['input'];
  value?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  branch?: InputMaybe<Scalars['String']['input']>;
  currentCareer?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  grade?: InputMaybe<Scalars['String']['input']>;
  groupMemberships?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  licenseOnboardingCompletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  linkedInUrl?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSONObject']['input']>;
  occupationalCode?: InputMaybe<Scalars['String']['input']>;
  onboardingCompletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  onboardingWalkthroughCompletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  photoUrl?: InputMaybe<Scalars['String']['input']>;
  privacySettings?: InputMaybe<PrivacySettingsInput>;
  showThirdPartySiteWarning?: InputMaybe<Scalars['Boolean']['input']>;
  trainingGroup?: InputMaybe<Scalars['String']['input']>;
  userType?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVendorInput = {
  id: Scalars['ID']['input'];
  isLicensed?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type UpdatedHostedCourseInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  items?: InputMaybe<Array<InputMaybe<Scalars['JSONObject']['input']>>>;
  missionPartnerId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdatedHostedExamInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  maxAttempts?: InputMaybe<Scalars['Int']['input']>;
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  passingScore?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdatedHostedScormInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  missionPartnerId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UpdatedLabInput = {
  content?: InputMaybe<Array<InputMaybe<LabContentInput>>>;
  coreConceptItems?: InputMaybe<Array<InputMaybe<LabItemInput>>>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  durationInMinutes?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  instructions?: InputMaybe<Array<InputMaybe<LabInstructionInput>>>;
  launchConfig?: InputMaybe<LabLaunchConfigInput>;
  missionPartnerId: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  previewImageUrl?: InputMaybe<Scalars['String']['input']>;
  relevantLearningPaths?: InputMaybe<Array<InputMaybe<LabItemInput>>>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdatedSurveyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  durationInMinutes?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  questions?: InputMaybe<Array<InputMaybe<Scalars['JSONObject']['input']>>>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UploadLibraryItemInput = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  forceMultiplierId: Scalars['ID']['input'];
  linkUrl?: InputMaybe<Scalars['String']['input']>;
  missionPartnerId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
  version: Scalars['String']['input'];
};

export type UploadRecord = {
  __typename?: 'UploadRecord';
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  parameters?: Maybe<Scalars['String']['output']>;
  requestedAt: Scalars['DateTime']['output'];
  status: UploadStatus;
  title: Scalars['String']['output'];
  type: UploadType;
  userId: Scalars['ID']['output'];
};

export enum UploadStatus {
  Error = 'ERROR',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Success = 'SUCCESS'
}

export enum UploadType {
  AddLicenseToUsers = 'ADD_LICENSE_TO_USERS',
  ImportUsersToCohort = 'IMPORT_USERS_TO_COHORT',
  ImportUsersToLicense = 'IMPORT_USERS_TO_LICENSE',
  ImportUsersToMissionPartner = 'IMPORT_USERS_TO_MISSION_PARTNER',
  RemoveUsersFromMissionPartner = 'REMOVE_USERS_FROM_MISSION_PARTNER',
  RevokeLicensesFromUsers = 'REVOKE_LICENSES_FROM_USERS'
}

export type User = {
  __typename?: 'User';
  badgeNotifications?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  bio?: Maybe<Scalars['String']['output']>;
  branch?: Maybe<Scalars['String']['output']>;
  canAccessFullDu?: Maybe<Scalars['Boolean']['output']>;
  currentCareer?: Maybe<Scalars['String']['output']>;
  dodId?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  grade?: Maybe<Scalars['String']['output']>;
  groupMemberships?: Maybe<Array<Maybe<GroupMember>>>;
  groups?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id: Scalars['ID']['output'];
  keycloakUserCreatedAt?: Maybe<Scalars['DateTime']['output']>;
  lastLoginAt?: Maybe<Scalars['DateTime']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  licenseOnboardingCompletedAt?: Maybe<Scalars['DateTime']['output']>;
  linkedInUrl?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSONObject']['output']>;
  missionPartnerMemberships?: Maybe<Array<Maybe<MissionPartnerMember>>>;
  occupationalCode?: Maybe<Scalars['String']['output']>;
  onboardingCompletedAt?: Maybe<Scalars['DateTime']['output']>;
  onboardingWalkthroughCompletedAt?: Maybe<Scalars['DateTime']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  photoUrl?: Maybe<Scalars['String']['output']>;
  privacySettings?: Maybe<PrivacySettings>;
  profileUpdatedAt?: Maybe<Scalars['DateTime']['output']>;
  recentMissionPartners?: Maybe<Array<Maybe<RecentMissionPartner>>>;
  recentTraining?: Maybe<Array<Maybe<RecentTraining>>>;
  roles?: Maybe<Array<Maybe<Role>>>;
  showMarkCompleteModalFor?: Maybe<MarkCompleteModal>;
  showThirdPartySiteWarning?: Maybe<Scalars['Boolean']['output']>;
  skills?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  testRecord?: Maybe<Scalars['String']['output']>;
  totalTimeTrained?: Maybe<Scalars['Int']['output']>;
  trainingGroup?: Maybe<Scalars['String']['output']>;
  trainingPlanCheckCompletedAt?: Maybe<Scalars['DateTime']['output']>;
  trainingPlans?: Maybe<Array<Maybe<TrainingPlan>>>;
  userType?: Maybe<Scalars['String']['output']>;
  workExperience?: Maybe<Array<Maybe<WorkExperience>>>;
};

export type UserCohortResult = {
  __typename?: 'UserCohortResult';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type UserCohorts = {
  __typename?: 'UserCohorts';
  count: Scalars['Int']['output'];
  group: UserCohortResult;
  missionPartner: UserCohortResult;
};

export type UserEmailVerifiedStatus = {
  __typename?: 'UserEmailVerifiedStatus';
  deferralExpirationDate?: Maybe<Scalars['DateTime']['output']>;
  hasEmailVerified: Scalars['Boolean']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type UserLab = {
  __typename?: 'UserLab';
  lab: Lab;
  progress?: Maybe<TranscriptLab>;
};

export type UserLicenseStatus = {
  __typename?: 'UserLicenseStatus';
  autoAssignmentAvailable: Scalars['Boolean']['output'];
  hasLicense: Scalars['Boolean']['output'];
  hasOpenRequest: Scalars['Boolean']['output'];
  vendorId: Scalars['ID']['output'];
};

export type UserMissionPartnerMembership = {
  __typename?: 'UserMissionPartnerMembership';
  affiliateId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  featuredTraining?: Maybe<Array<Maybe<FeaturedTraining>>>;
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  logoUrl?: Maybe<Scalars['String']['output']>;
  missionPartnerId: Scalars['String']['output'];
  missionPartnerName: Scalars['String']['output'];
  trialEnabled: Scalars['Boolean']['output'];
  trialEndDate?: Maybe<Scalars['DateTime']['output']>;
  trialStartDate?: Maybe<Scalars['DateTime']['output']>;
  userId: Scalars['String']['output'];
};

export type UserOnboardingStatus = {
  __typename?: 'UserOnboardingStatus';
  licenseOnboardingCompletedAt?: Maybe<Scalars['DateTime']['output']>;
  onboardingCompletedAt?: Maybe<Scalars['DateTime']['output']>;
  onboardingWalkthroughCompletedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ValueProposition = {
  __typename?: 'ValueProposition';
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Vendor = {
  __typename?: 'Vendor';
  assigned?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  isLicensed?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  provisioned?: Maybe<Scalars['Int']['output']>;
};

export type VendorLicenseAvailability = {
  __typename?: 'VendorLicenseAvailability';
  licenseAvailability?: Maybe<Array<Maybe<LicenseAvailability>>>;
  licenseProviders?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type VendorsByAggregateTranscriptCourses = {
  __typename?: 'VendorsByAggregateTranscriptCourses';
  vendorId: Scalars['ID']['output'];
  vendorName: Scalars['String']['output'];
};

export type Wing = {
  __typename?: 'Wing';
  title: Scalars['String']['output'];
};

export type WorkExperience = {
  __typename?: 'WorkExperience';
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  organization?: Maybe<Scalars['String']['output']>;
  responsibilities?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type CoreConceptItemWithDetail = {
  __typename?: 'coreConceptItemWithDetail';
  href: Scalars['String']['output'];
  id: Scalars['String']['output'];
  itemType: Scalars['String']['output'];
  source?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type LearningPathItemWithDetail = {
  __typename?: 'learningPathItemWithDetail';
  id?: Maybe<Scalars['String']['output']>;
  itemType: Scalars['String']['output'];
  schoolId?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  version: Scalars['String']['output'];
};

export type FindAllAffiliatesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllAffiliatesQuery = { __typename?: 'Query', findAllAffiliates?: Array<{ __typename?: 'Affiliate', id: string, name: string } | null> | null };

export type CreateManualAssessmentMutationVariables = Exact<{
  assessment: AssessmentInput;
}>;


export type CreateManualAssessmentMutation = { __typename?: 'Mutation', createManualAssessment?: { __typename?: 'Assessment', id: string, vendorId: string, vendorAssessmentId: string, vendorName: string, assessmentTitle: string, assessmentDescription: string, assessmentUrl: string, assessmentImage?: string | null, source?: string | null } | null };

export type FindAssessmentsBySourceQueryVariables = Exact<{
  source: Scalars['String']['input'];
}>;


export type FindAssessmentsBySourceQuery = { __typename?: 'Query', findAssessmentsBySource?: Array<{ __typename?: 'Assessment', id: string, assessmentTitle: string, assessmentDescription: string, assessmentImage?: string | null, dateUpdated?: any | null, vendorName: string } | null> | null };

export type FindLearnerAssessmentsQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  missionPartnerId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type FindLearnerAssessmentsQuery = { __typename?: 'Query', findAssessmentsByUserId: Array<{ __typename?: 'AssessmentWithTranscriptData', id: string, assessmentTitle: string, vendorName: string, vendorAssessmentId: string, vendorId: string, startedAt?: any | null, markedCompletedAt?: any | null, status: string } | null> };

export type GetAssessmentByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetAssessmentByIdQuery = { __typename?: 'Query', getAssessmentById?: { __typename?: 'Assessment', id: string, assessmentTitle: string, assessmentDescription: string, assessmentImage?: string | null, assessmentUrl: string, durationInMinutes?: number | null, dateUpdated?: any | null, vendorName: string, vendorAssessmentId: string, vendorId: string } | null };

export type UpdateAssessmentMutationVariables = Exact<{
  assessment: AssessmentInput;
}>;


export type UpdateAssessmentMutation = { __typename?: 'Mutation', updateAssessment?: { __typename?: 'Assessment', id: string, vendorId: string, vendorAssessmentId: string, vendorName: string, assessmentTitle: string, assessmentDescription: string, assessmentUrl: string, assessmentImage?: string | null, source?: string | null } | null };

export type ExportBadgesMutationVariables = Exact<{
  ownerId?: InputMaybe<Scalars['String']['input']>;
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  badgeId?: InputMaybe<Scalars['String']['input']>;
}>;


export type ExportBadgesMutation = { __typename?: 'Mutation', exportBadges?: any | null };

export type GetAllAwardedBadgesByMissionPartnerMembershipQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
}>;


export type GetAllAwardedBadgesByMissionPartnerMembershipQuery = { __typename?: 'Query', getAllAwardedBadgesByMissionPartnerMembership?: Array<{ __typename?: 'DuBadgeMetrics', missionPartnerId?: string | null, id: string, imageUrl: string, title: string, missionPartnerCount?: number | null } | null> | null };

export type GetMissionPartnerOwnedBadgesQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
}>;


export type GetMissionPartnerOwnedBadgesQuery = { __typename?: 'Query', getMissionPartnerOwnedBadges?: Array<{ __typename?: 'MissionPartnerBadgeMetrics', missionPartnerId?: string | null, id: string, imageUrl: string, title: string, count: number, missionPartnerCount?: number | null } | null> | null };

export type FindCatalogResultsQueryVariables = Exact<{
  search: Scalars['String']['input'];
  searchAfter?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  vendorId?: InputMaybe<Scalars['String']['input']>;
  planType?: InputMaybe<Scalars['String']['input']>;
  excludeCustomContent?: InputMaybe<Scalars['Boolean']['input']>;
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindCatalogResultsQuery = { __typename?: 'Query', findCatalogResults?: { __typename?: 'CatalogResults', searchAfter?: Array<string | null> | null, total?: number | null, hits?: Array<{ __typename: 'Assessment', id: string, vendorId: string, vendorAssessmentId: string, vendorName: string, assessmentTitle: string, assessmentDescription: string, assessmentUrl: string, assessmentImage?: string | null, durationInMinutes?: number | null, source?: string | null } | { __typename: 'Course', id: string, vendorId: string, vendorCourseId: string, vendorName: string, courseDescription: string, courseDuration: number, courseTitle: string, courseUrl: string, status?: string | null, source?: string | null, averageRating?: number | null, totalReviews?: number | null } | { __typename: 'ForceMultiplier', id: string, version: string, title: string, learningPathUri?: string | null, totalDuration?: number | null, unsequenced?: boolean | null, type?: string | null, vendors?: Array<string | null> | null, averageRating?: number | null, totalReviews?: number | null, fmStatus: StatusType, content: { __typename?: 'ForceMultiplierContent', description?: Array<string> | null, summary: string } } | { __typename: 'Lab', id: string, name: string, description?: string | null, durationInMinutes?: number | null, missionPartnerId: string, status?: string | null, averageRating?: number | null, totalReviews?: number | null, missionPartner?: { __typename?: 'MissionPartner', name: string } | null, instructions?: Array<{ __typename?: 'LabInstruction', id: string, title: string, type: string } | null> | null } | { __typename: 'LearningPath', id: string, title: string, schoolId: string, version: string, vendors?: Array<string | null> | null, totalItems?: number | null, totalDuration?: number | null, enrolledLearners?: number | null, averageRating?: number | null, totalReviews?: number | null, content: { __typename?: 'LearningPathContent', description?: Array<string> | null, summary: string } } | { __typename: 'Skill', id: string, title: string, vendors?: Array<string | null> | null, version: string, totalItems?: number | null, totalDuration?: number | null, enrolledLearners?: number | null, content: { __typename?: 'SkillContent', summary: string, description?: Array<string> | null } } | { __typename: 'Survey', id: string, name: string, description?: string | null, durationInMinutes?: number | null, missionPartnerId: string, status?: string | null } | null> | null } | null };

export type FindContentByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindContentByIdQuery = { __typename?: 'Query', findContentById?: { __typename?: 'Content', id: string, content: any } | null };

export type DeleteBannerMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteBannerMutation = { __typename?: 'Mutation', deleteBanner?: any | null };

export type DeleteAlertBannerMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAlertBannerMutation = { __typename?: 'Mutation', deleteAlertBanner?: any | null };

export type UpdateGlobalBannerMutationVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  isDismissable: Scalars['Boolean']['input'];
}>;


export type UpdateGlobalBannerMutation = { __typename?: 'Mutation', updateAlertBanner?: { __typename?: 'AlertBannerContent', id: string, content: { __typename?: 'AlertBannerAttributes', title?: string | null, content?: string | null, isDismissable: boolean } } | null };

export type UpdateBannerMutationVariables = Exact<{
  title: Scalars['String']['input'];
  body: Scalars['String']['input'];
  buttonText: Scalars['String']['input'];
  buttonLink: Scalars['String']['input'];
  logo: Scalars['Upload']['input'];
}>;


export type UpdateBannerMutation = { __typename?: 'Mutation', updateBanner?: { __typename?: 'BannerContent', id: string, content: { __typename?: 'BannerAttributes', title: string, body: string, buttonText: string, buttonLink: string, logo: string } } | null };

export type FindCourseByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindCourseByIdQuery = { __typename?: 'Query', findCourseById?: { __typename?: 'Course', id: string, courseTitle: string, courseDescription: string, courseDuration: number, courseImage?: string | null, dateUpdated?: any | null, courseUrl: string, vendorName: string, vendorCourseId: string, vendorId: string, source?: string | null } | null };

export type AggregateTrainingPlanVersionsQueryVariables = Exact<{
  planType: Scalars['String']['input'];
  planSourceId: Scalars['String']['input'];
}>;


export type AggregateTrainingPlanVersionsQuery = { __typename?: 'Query', aggregateTrainingPlanVersions?: { __typename?: 'TrainingPlanVersionData', versions: Array<string | null>, versionEnabled: boolean } | null };

export type AggregateTranscriptCoursesQueryVariables = Exact<{
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  vendorId?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['String']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AggregateTranscriptCoursesQuery = { __typename?: 'Query', aggregateTranscriptCourses?: { __typename?: 'AggregatedTranscriptCourses', count: number, data: Array<{ __typename?: 'AggregatedCourse', courseId: string, courseTitle?: string | null, vendorName?: string | null, total: number, started: number, stopped: number, pendingReview: number, markedCompleted: number, completed: number } | null> } | null };

export type AggregateTranscriptItemsForTrainingPlanQueryVariables = Exact<{
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  groupId?: InputMaybe<Scalars['String']['input']>;
  planType: Scalars['String']['input'];
  planSourceId: Scalars['String']['input'];
  planVersion?: InputMaybe<Scalars['String']['input']>;
}>;


export type AggregateTranscriptItemsForTrainingPlanQuery = { __typename?: 'Query', aggregateTranscriptItemsForTrainingPlan?: Array<{ __typename?: 'AggregatedTrainingPlanItem', itemId: string, itemTitle?: string | null, vendorName?: string | null, total: number, started: number, stopped: number, pendingReview?: number | null, markedCompleted?: number | null, completed?: number | null } | null> | null };

export type CreateAdminManagedCourseMutationVariables = Exact<{
  course: CourseInput;
}>;


export type CreateAdminManagedCourseMutation = { __typename?: 'Mutation', createAdminManagedCourse?: { __typename?: 'Course', id: string, vendorId: string, vendorCourseId: string, vendorName: string, courseDescription: string, courseDuration: number, courseTitle: string, courseUrl: string } | null };

export type FindCoursesBySourceQueryVariables = Exact<{
  source: Scalars['String']['input'];
}>;


export type FindCoursesBySourceQuery = { __typename?: 'Query', findCoursesBySource?: { __typename?: 'PaginatedResults', total?: number | null, data?: Array<{ __typename?: 'Course', id: string, courseTitle: string, courseDescription: string, vendorName: string, vendorCourseId: string } | null> | null } | null };

export type FindTranscriptCoursesQueryVariables = Exact<{
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  groupId?: InputMaybe<Scalars['String']['input']>;
  courseId?: InputMaybe<Scalars['String']['input']>;
  planType?: InputMaybe<Scalars['String']['input']>;
  planSourceId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  userSearch?: InputMaybe<Scalars['String']['input']>;
  courseTitleSearch?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['String']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  branch?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindTranscriptCoursesQuery = { __typename?: 'Query', findTranscriptCourses?: { __typename?: 'PaginatedTranscriptCourses', count: number, data: Array<{ __typename?: 'IndexedTranscriptCourse', userId: string, courseId: string, status: string, startedAt?: any | null, stoppedAt?: any | null, pendingReviewAt?: any | null, markedCompletedAt?: any | null, completedAt?: any | null, course: { __typename?: 'IndexedTranscriptCourse_Course', id: string, courseTitle: string, vendorId: string, vendorCourseId: string }, user: { __typename?: 'IndexedTranscriptCourse_User', id: string, email: string, firstName: string, lastName: string } } | null> } | null };

export type FindTranscriptCoursesByUserIdQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type FindTranscriptCoursesByUserIdQuery = { __typename?: 'Query', findTranscriptCoursesByUserId?: { __typename?: 'PaginatedResults', total?: number | null, data?: Array<{ __typename?: 'Course', id: string, courseTitle: string, courseDescription: string, courseDuration: number, courseImage?: string | null, dateUpdated?: any | null, courseUrl: string, startedAt?: any | null, markedCompletedAt?: any | null, completedAt?: any | null, vendorName: string, status?: string | null } | null> | null } | null };

export type GetMetricsByGroupIdCourseIdQueryVariables = Exact<{
  groupId: Scalars['String']['input'];
  courseId: Scalars['String']['input'];
}>;


export type GetMetricsByGroupIdCourseIdQuery = { __typename?: 'Query', getMetricsByGroupIdCourseId?: Array<{ __typename?: 'GroupMetrics', startedAt?: any | null, completedAt?: any | null, status: string, user?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, email?: string | null } | null } | null> | null };

export type GetVendorsForAggregateTranscriptCoursesQueryVariables = Exact<{
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetVendorsForAggregateTranscriptCoursesQuery = { __typename?: 'Query', getVendorsForAggregateTranscriptCourses?: Array<{ __typename?: 'VendorsByAggregateTranscriptCourses', vendorName: string, vendorId: string } | null> | null };

export type StartIndividualCourseByIdMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type StartIndividualCourseByIdMutation = { __typename?: 'Mutation', startIndividualCourseById?: { __typename?: 'Course', id: string, courseTitle: string, courseDescription: string, courseDuration: number, courseImage?: string | null, dateUpdated?: any | null, courseUrl: string } | null };

export type StopIndividualCourseByIdMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type StopIndividualCourseByIdMutation = { __typename?: 'Mutation', stopIndividualCourseById?: { __typename?: 'Course', id: string, courseTitle: string, courseDescription: string, courseDuration: number, courseImage?: string | null, dateUpdated?: any | null, courseUrl: string } | null };

export type UpdateAdminManagedCourseMutationVariables = Exact<{
  course: CourseInput;
}>;


export type UpdateAdminManagedCourseMutation = { __typename?: 'Mutation', updateAdminManagedCourse?: { __typename?: 'Course', id: string, vendorId: string, vendorCourseId: string, vendorName: string, courseDescription: string, courseDuration: number, courseTitle: string, courseUrl: string } | null };

export type AssociateDomainToKsatMutationVariables = Exact<{
  ksatId: Scalars['ID']['input'];
  domainId: Scalars['ID']['input'];
}>;


export type AssociateDomainToKsatMutation = { __typename?: 'Mutation', associateDomainToKsat?: any | null };

export type AssociateJobRolesToKsatMutationVariables = Exact<{
  ksatId: Scalars['ID']['input'];
  jobRoleIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type AssociateJobRolesToKsatMutation = { __typename?: 'Mutation', associateJobRolesToKsat?: any | null };

export type AssociateLearningObjectivesToKsatMutationVariables = Exact<{
  ksatId: Scalars['ID']['input'];
  learningObjectiveIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type AssociateLearningObjectivesToKsatMutation = { __typename?: 'Mutation', associateLearningObjectivesToKsat?: any | null };

export type CreateDomainMutationVariables = Exact<{
  input: CreateDomainInput;
}>;


export type CreateDomainMutation = { __typename?: 'Mutation', createDomain?: { __typename?: 'Domain', id: string, name: string, shortDescription: string, description: string } | null };

export type FindDomainsQueryVariables = Exact<{
  filter?: InputMaybe<DomainFilter>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  sortByMostRelevant?: InputMaybe<SortByMostRelevant>;
  sortDirection?: InputMaybe<SortDirection>;
  sortBy?: InputMaybe<DomainSortBy>;
}>;


export type FindDomainsQuery = { __typename?: 'Query', findDomains?: { __typename?: 'FindDomainsOutput', total?: number | null, data?: Array<{ __typename?: 'Domain', id: string, name: string, shortDescription: string, description: string } | null> | null } | null };

export type FindDomainsLazyQueryVariables = Exact<{
  filter?: InputMaybe<DomainFilter>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  sortByMostRelevant?: InputMaybe<SortByMostRelevant>;
  sortDirection?: InputMaybe<SortDirection>;
  sortBy?: InputMaybe<DomainSortBy>;
}>;


export type FindDomainsLazyQuery = { __typename?: 'Query', findDomains?: { __typename?: 'FindDomainsOutput', total?: number | null, data?: Array<{ __typename?: 'Domain', id: string, name: string, shortDescription: string, description: string } | null> | null } | null };

export type GetDomainQueryVariables = Exact<{
  getDomainId: Scalars['ID']['input'];
}>;


export type GetDomainQuery = { __typename?: 'Query', getDomain?: { __typename?: 'Domain', id: string, name: string, shortDescription: string, description: string } | null };

export type UpdateDomainMutationVariables = Exact<{
  updateDomainId: Scalars['ID']['input'];
  input: UpdateDomainInput;
}>;


export type UpdateDomainMutation = { __typename?: 'Mutation', updateDomain?: { __typename?: 'Domain', id: string, name: string, shortDescription: string, description: string } | null };

export type CreateKsatMutationVariables = Exact<{
  input: CreateKsatInput;
}>;


export type CreateKsatMutation = { __typename?: 'Mutation', createKsat?: { __typename?: 'Ksat', code: string, id: string, ksatType: KsatType, domain?: { __typename?: 'Domain', id: string, name: string, shortDescription: string, description: string } | null } | null };

export type FindKsatsQueryVariables = Exact<{
  filter?: InputMaybe<KsatFilter>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
  sortBy?: InputMaybe<KsatSortBy>;
}>;


export type FindKsatsQuery = { __typename?: 'Query', findKsats?: { __typename?: 'FindKsatsOutput', total?: number | null, data?: Array<{ __typename?: 'Ksat', ksatType: KsatType, id: string, code: string, description: string, domain?: { __typename?: 'Domain', description: string, id: string, name: string, shortDescription: string } | null } | null> | null } | null };

export type GetKsatQueryVariables = Exact<{
  getKsatId: Scalars['ID']['input'];
}>;


export type GetKsatQuery = { __typename?: 'Query', getKsat?: { __typename?: 'Ksat', id: string, code: string, ksatType: KsatType, description: string, domain?: { __typename?: 'Domain', id: string, name: string, shortDescription: string, description: string } | null } | null };

export type UpdateKsatMutationVariables = Exact<{
  updateKsatId: Scalars['ID']['input'];
  input: UpdateKsatInput;
}>;


export type UpdateKsatMutation = { __typename?: 'Mutation', updateKsat?: { __typename?: 'Ksat', id: string, code: string, ksatType: KsatType, description: string, domain?: { __typename?: 'Domain', id: string, name: string, shortDescription: string, description: string } | null } | null };

export type CreateLearningObjectiveMutationVariables = Exact<{
  input: CreateLearningObjectiveInput;
}>;


export type CreateLearningObjectiveMutation = { __typename?: 'Mutation', createLearningObjective?: { __typename?: 'LearningObjective', id: string, description: string } | null };

export type FindLearningObjectivesQueryVariables = Exact<{
  filter?: InputMaybe<LearningObjectiveFilter>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
  sortBy?: InputMaybe<LearningObjectiveSortBy>;
}>;


export type FindLearningObjectivesQuery = { __typename?: 'Query', findLearningObjectives?: { __typename?: 'FindLearningObjectivesOutput', total?: number | null, data?: Array<{ __typename?: 'LearningObjective', id: string, description: string } | null> | null } | null };

export type GetLearningObjectiveQueryVariables = Exact<{
  getLearningObjectiveId: Scalars['ID']['input'];
}>;


export type GetLearningObjectiveQuery = { __typename?: 'Query', getLearningObjective?: { __typename?: 'LearningObjective', id: string, description: string } | null };

export type UpdateLearningObjectiveMutationVariables = Exact<{
  updateLearningObjectiveId: Scalars['ID']['input'];
  input: UpdateLearningObjectiveInput;
}>;


export type UpdateLearningObjectiveMutation = { __typename?: 'Mutation', updateLearningObjective?: { __typename?: 'LearningObjective', id: string, description: string } | null };

export type CreateJobRoleMutationVariables = Exact<{
  input: CreateJobRoleInput;
}>;


export type CreateJobRoleMutation = { __typename?: 'Mutation', createJobRole?: { __typename?: 'JobRole', id: string, roleId: string, name: string, description: string } | null };

export type FindJobRolesQueryVariables = Exact<{
  filter?: InputMaybe<JobRoleFilter>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
  sortBy?: InputMaybe<JobRoleSortBy>;
}>;


export type FindJobRolesQuery = { __typename?: 'Query', findJobRoles?: { __typename?: 'FindJobRolesOutput', total?: number | null, data?: Array<{ __typename?: 'JobRole', id: string, roleId: string, name: string, description: string } | null> | null } | null };

export type GetJobRoleQueryVariables = Exact<{
  getJobRoleId: Scalars['ID']['input'];
}>;


export type GetJobRoleQuery = { __typename?: 'Query', getJobRole?: { __typename?: 'JobRole', id: string, roleId: string, name: string, description: string } | null };

export type UpdateJobRoleMutationVariables = Exact<{
  updateJobRoleId: Scalars['ID']['input'];
  input: UpdateJobRoleInput;
}>;


export type UpdateJobRoleMutation = { __typename?: 'Mutation', updateJobRole?: { __typename?: 'JobRole', id: string, roleId: string, name: string, description: string } | null };

export type GetUserDownloadsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserDownloadsQuery = { __typename?: 'Query', getUserDownloads?: Array<{ __typename?: 'Download', id: string, userId: string, type: DownloadType, requestedAt: any, completedAt?: any | null, title: string, parameters?: string | null, status: DownloadStatus, error?: string | null } | null> | null };

export type DeleteDownloadMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteDownloadMutation = { __typename?: 'Mutation', deleteDownload?: any | null };

export type CreateForceMultiplierMutationVariables = Exact<{
  title: Scalars['String']['input'];
  summary: Scalars['String']['input'];
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateForceMultiplierMutation = { __typename?: 'Mutation', createForceMultiplier?: { __typename?: 'ForceMultiplier', id: string, missionPartnerId?: string | null, title: string, status: StatusType, version: string } | null };

export type CreateNewForceMultiplierVersionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type CreateNewForceMultiplierVersionMutation = { __typename?: 'Mutation', createNewForceMultiplierVersion?: { __typename?: 'ForceMultiplier', id: string, version: string, title: string, status: StatusType, learningPathUri?: string | null, missionPartnerId?: string | null, content: { __typename?: 'ForceMultiplierContent', description?: Array<string> | null, summary: string, about?: { __typename?: 'ForceMultiplierAbout', title?: string | null, description?: Array<string | null> | null, image?: string | null, imageAltText?: string | null } | null }, items?: Array<{ __typename?: 'ForceMultiplierItem', id: string } | null> | null, conditions?: { __typename?: 'ForceMultiplierConditionAll', all?: Array<{ __typename?: 'ForceMultiplierCondition', value?: string | null, operator?: string | null, fact?: string | null } | null> | null } | null } | null };

export type DeleteLibraryItemMutationVariables = Exact<{
  input: DeleteLibraryItemInput;
}>;


export type DeleteLibraryItemMutation = { __typename?: 'Mutation', deleteLibraryItem?: { __typename?: 'ForceMultiplier', id: string, libraryItems?: Array<{ __typename?: 'ForceMultiplierLibraryItem', id: string, type: string, name: string, url: string } | null> | null } | null };

export type FetchForceMultiplierHeaderDataQueryVariables = Exact<{
  forceMultiplerId: Scalars['ID']['input'];
}>;


export type FetchForceMultiplierHeaderDataQuery = { __typename?: 'Query', findLatestForceMultiplierByIdAdmin?: { __typename?: 'ForceMultiplier', id: string, title: string, status: StatusType, version: string } | null };

export type FindLatestForceMultiplierByIdQueryVariables = Exact<{
  forceMultiplerId: Scalars['ID']['input'];
}>;


export type FindLatestForceMultiplierByIdQuery = { __typename?: 'Query', findLatestForceMultiplierById?: { __typename?: 'ForceMultiplier', id: string, version: string, title: string, status: StatusType, learningPathUri?: string | null, totalDuration?: number | null, unsequenced?: boolean | null, missionPartnerId?: string | null, type?: string | null, modules?: Array<{ __typename?: 'ForceMultiplierModule', id: string, title: string, items?: Array<{ __typename?: 'ForceMultiplierModuleItem', itemId: string } | null> | null } | null> | null, content: { __typename?: 'ForceMultiplierContent', description?: Array<string> | null, summary: string, about?: { __typename?: 'ForceMultiplierAbout', title?: string | null, description?: Array<string | null> | null, image?: string | null, imageAltText?: string | null } | null }, items?: Array<{ __typename?: 'ForceMultiplierItem', id: string, item?: { __typename: 'Assessment', vendorAssessmentId: string, vendorName: string, assessmentTitle: string, assessmentUrl: string, durationInMinutes?: number | null, source?: string | null } | { __typename: 'Course', vendorCourseId: string, vendorName: string, courseTitle: string, courseUrl: string, courseDuration: number, source?: string | null } | { __typename: 'Lab', id: string, name: string, durationInMinutes?: number | null, missionPartner?: { __typename?: 'MissionPartner', id: string, name: string } | null } | { __typename: 'Survey', id: string, name: string, durationInMinutes?: number | null, missionPartner?: { __typename?: 'MissionPartner', id: string, name: string } | null } | null } | null> | null, libraryItems?: Array<{ __typename?: 'ForceMultiplierLibraryItem', id: string, type: string, name: string, url: string } | null> | null, conditions?: { __typename?: 'ForceMultiplierConditionAll', all?: Array<{ __typename?: 'ForceMultiplierCondition', value?: string | null, operator?: string | null, fact?: string | null } | null> | null } | null } | null };

export type FindLatestForceMultiplierByIdAdminQueryVariables = Exact<{
  forceMultiplerId: Scalars['ID']['input'];
}>;


export type FindLatestForceMultiplierByIdAdminQuery = { __typename?: 'Query', findLatestForceMultiplierByIdAdmin?: { __typename?: 'ForceMultiplier', id: string, version: string, title: string, status: StatusType, learningPathUri?: string | null, totalDuration?: number | null, unsequenced?: boolean | null, missionPartnerId?: string | null, type?: string | null, modules?: Array<{ __typename?: 'ForceMultiplierModule', id: string, title: string, items?: Array<{ __typename?: 'ForceMultiplierModuleItem', itemId: string } | null> | null } | null> | null, content: { __typename?: 'ForceMultiplierContent', description?: Array<string> | null, summary: string, about?: { __typename?: 'ForceMultiplierAbout', title?: string | null, description?: Array<string | null> | null, image?: string | null, imageAltText?: string | null } | null }, items?: Array<{ __typename?: 'ForceMultiplierItem', id: string, item?: { __typename: 'Assessment', vendorAssessmentId: string, vendorName: string, assessmentTitle: string, assessmentUrl: string, durationInMinutes?: number | null, source?: string | null } | { __typename: 'Course', vendorCourseId: string, vendorName: string, courseTitle: string, courseUrl: string, courseDuration: number, source?: string | null } | { __typename: 'Lab', id: string, name: string, durationInMinutes?: number | null, missionPartner?: { __typename?: 'MissionPartner', id: string, name: string } | null } | { __typename: 'Survey', id: string, name: string, durationInMinutes?: number | null, missionPartner?: { __typename?: 'MissionPartner', id: string, name: string } | null } | null } | null> | null, libraryItems?: Array<{ __typename?: 'ForceMultiplierLibraryItem', id: string, type: string, name: string, url: string } | null> | null, conditions?: { __typename?: 'ForceMultiplierConditionAll', all?: Array<{ __typename?: 'ForceMultiplierCondition', value?: string | null, operator?: string | null, fact?: string | null } | null> | null } | null } | null };

export type RemoveItemFromForceMultiplierMutationVariables = Exact<{
  input: RemoveItemFromForceMultiplierInput;
}>;


export type RemoveItemFromForceMultiplierMutation = { __typename?: 'Mutation', removeItemFromForceMultiplier?: { __typename?: 'ForceMultiplier', id: string, version: string, title: string, items?: Array<{ __typename?: 'ForceMultiplierItem', id: string } | null> | null } | null };

export type UpdateForceMultiplierMutationVariables = Exact<{
  input: ForceMultiplierInput;
}>;


export type UpdateForceMultiplierMutation = { __typename?: 'Mutation', updateForceMultiplier?: { __typename?: 'ForceMultiplier', id: string, version: string, title: string, status: StatusType, learningPathUri?: string | null, missionPartnerId?: string | null, modules?: Array<{ __typename?: 'ForceMultiplierModule', id: string, title: string, items?: Array<{ __typename?: 'ForceMultiplierModuleItem', itemId: string } | null> | null } | null> | null, content: { __typename?: 'ForceMultiplierContent', description?: Array<string> | null, summary: string, about?: { __typename?: 'ForceMultiplierAbout', title?: string | null, description?: Array<string | null> | null, image?: string | null, imageAltText?: string | null } | null }, items?: Array<{ __typename?: 'ForceMultiplierItem', id: string } | null> | null, libraryItems?: Array<{ __typename?: 'ForceMultiplierLibraryItem', id: string } | null> | null, conditions?: { __typename?: 'ForceMultiplierConditionAll', all?: Array<{ __typename?: 'ForceMultiplierCondition', value?: string | null, operator?: string | null, fact?: string | null } | null> | null } | null } | null };

export type UpdateForceMultiplierContentMutationVariables = Exact<{
  input: UpdateForceMultiplierContentInput;
}>;


export type UpdateForceMultiplierContentMutation = { __typename?: 'Mutation', updateForceMultiplierContent?: { __typename?: 'ForceMultiplier', id: string, version: string, title: string, status: StatusType, learningPathUri?: string | null, missionPartnerId?: string | null, content: { __typename?: 'ForceMultiplierContent', description?: Array<string> | null, summary: string, about?: { __typename?: 'ForceMultiplierAbout', title?: string | null, description?: Array<string | null> | null, image?: string | null, imageAltText?: string | null } | null }, items?: Array<{ __typename?: 'ForceMultiplierItem', id: string } | null> | null, conditions?: { __typename?: 'ForceMultiplierConditionAll', all?: Array<{ __typename?: 'ForceMultiplierCondition', value?: string | null, operator?: string | null, fact?: string | null } | null> | null } | null } | null };

export type UpdateLibraryItemsMutationVariables = Exact<{
  input: UpdateLibraryItemsInput;
}>;


export type UpdateLibraryItemsMutation = { __typename?: 'Mutation', updateLibraryItems?: { __typename?: 'ForceMultiplier', id: string, libraryItems?: Array<{ __typename?: 'ForceMultiplierLibraryItem', id: string, type: string, name: string, url: string } | null> | null } | null };

export type UploadForceMultiplierImageMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
  id: Scalars['ID']['input'];
}>;


export type UploadForceMultiplierImageMutation = { __typename?: 'Mutation', uploadForceMultiplierImage?: { __typename?: 'ForceMultiplierImage', url: string } | null };

export type UploadLibraryItemMutationVariables = Exact<{
  input: UploadLibraryItemInput;
}>;


export type UploadLibraryItemMutation = { __typename?: 'Mutation', uploadLibraryItem?: { __typename?: 'ForceMultiplier', id: string, libraryItems?: Array<{ __typename?: 'ForceMultiplierLibraryItem', id: string, type: string, name: string, url: string } | null> | null } | null };

export type AddCoursesToGroupMutationVariables = Exact<{
  groupId: Scalars['ID']['input'];
  courseIds: Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>;
  missionPartnerId: Scalars['ID']['input'];
}>;


export type AddCoursesToGroupMutation = { __typename?: 'Mutation', addCoursesToGroup?: any | null };

export type AddTrainingPlansToGroupMutationVariables = Exact<{
  groupId: Scalars['ID']['input'];
  plans: Array<AddPlansInput> | AddPlansInput;
  missionPartnerId: Scalars['ID']['input'];
}>;


export type AddTrainingPlansToGroupMutation = { __typename?: 'Mutation', addTrainingPlansToGroup?: any | null };

export type CreateGroupMutationVariables = Exact<{
  name: Scalars['String']['input'];
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup?: { __typename?: 'Group', id: string, name: string, groupMemberCount: number } | null };

export type DeleteGroupMutationVariables = Exact<{
  groupId: Scalars['ID']['input'];
}>;


export type DeleteGroupMutation = { __typename?: 'Mutation', deleteGroup?: any | null };

export type FindGroupByIdQueryVariables = Exact<{
  groupId: Scalars['ID']['input'];
}>;


export type FindGroupByIdQuery = { __typename?: 'Query', findGroupById?: { __typename?: 'Group', id: string, name: string, missionPartnerId?: string | null, missionPartnerName?: string | null, groupMemberCount: number, trainingPlans?: Array<{ __typename?: 'GroupTrainingPlans', planSourceId: string, planType: string, planVersion: string, title?: string | null, isLatestVersion: boolean } | null> | null, courses?: Array<{ __typename?: 'GroupCourses', courseId: string, vendorName: string, courseTitle: string } | null> | null } | null };

export type FindGroupsByMissionPartnerIdQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
}>;


export type FindGroupsByMissionPartnerIdQuery = { __typename?: 'Query', findGroupsByMissionPartnerId?: Array<{ __typename?: 'Group', id: string, name: string, groupMemberCount: number, missionPartnerName?: string | null, missionPartnerId?: string | null, totalItems?: number | null, CREATED_AT?: any | null, SAVED_AT?: any | null, trainingPlans?: Array<{ __typename?: 'GroupTrainingPlans', planSourceId: string, planType: string, planVersion: string, title?: string | null, isLatestVersion: boolean } | null> | null, courses?: Array<{ __typename?: 'GroupCourses', courseId: string, vendorName: string, courseTitle: string } | null> | null } | null> | null };

export type GetCourseProgressQueryVariables = Exact<{
  groupId: Scalars['ID']['input'];
}>;


export type GetCourseProgressQuery = { __typename?: 'Query', getCourseProgress?: Array<{ __typename?: 'CourseProgress', id: string, title: string, type: string, vendorName: string, notStarted?: number | null, inProgress?: number | null, pendingReview?: number | null, completed?: number | null } | null> | null };

export type CoreTrainingPlanProgressFragment = { __typename: 'TrainingPlanProgress', id: string, title: string, type: string, source: string, notStarted?: number | null, inProgress?: number | null, pendingReview?: number | null, completed?: number | null };

export type GetTrainingPlanProgressQueryVariables = Exact<{
  groupId: Scalars['ID']['input'];
  planSourceId: Scalars['ID']['input'];
  planType: Scalars['String']['input'];
  planVersion: Scalars['String']['input'];
}>;


export type GetTrainingPlanProgressQuery = { __typename?: 'Query', getTrainingPlanProgress?: Array<{ __typename: 'TrainingPlanProgress', id: string, title: string, type: string, source: string, notStarted?: number | null, inProgress?: number | null, pendingReview?: number | null, completed?: number | null, items?: Array<{ __typename: 'TrainingPlanProgress', id: string, title: string, type: string, source: string, notStarted?: number | null, inProgress?: number | null, pendingReview?: number | null, completed?: number | null } | null> | null } | null> | null };

export type UpdateGroupMutationVariables = Exact<{
  groupId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateGroupMutation = { __typename?: 'Mutation', updateGroup?: { __typename?: 'Group', id: string, name: string, groupMemberCount: number, missionPartnerId?: string | null } | null };

export type AddHostedCourseProgressItemQuizCommentMutationVariables = Exact<{
  hostedCourseId: Scalars['ID']['input'];
  lessonId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
  questionId: Scalars['ID']['input'];
  comment: Scalars['String']['input'];
}>;


export type AddHostedCourseProgressItemQuizCommentMutation = { __typename?: 'Mutation', addHostedCourseProgressItemQuizComment?: { __typename?: 'HostedCourseProgress', userId: string, hostedCourseId: string, items: Array<any | null> } | null };

export type FindHostedCourseProgressByIdQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  hostedCourseId: Scalars['ID']['input'];
}>;


export type FindHostedCourseProgressByIdQuery = { __typename?: 'Query', findHostedCourseProgressById?: { __typename?: 'HostedCourseProgress', completedAt?: any | null, hostedCourseId: string, items: Array<any | null>, startedAt: any, status: string, userId: string } | null };

export type UpdateHostedCourseProgressItemQuizAnswersMutationVariables = Exact<{
  hostedCourseId: Scalars['ID']['input'];
  lessonId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
  answers: Array<InputMaybe<Scalars['JSONObject']['input']>> | InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type UpdateHostedCourseProgressItemQuizAnswersMutation = { __typename?: 'Mutation', updateHostedCourseProgressItemQuizAnswers?: { __typename?: 'HostedCourseProgress', completedAt?: any | null, hostedCourseId: string, items: Array<any | null>, startedAt: any, status: string, userId: string } | null };

export type AddHostedCourseItemMutationVariables = Exact<{
  input: HostedCourseItemInput;
}>;


export type AddHostedCourseItemMutation = { __typename?: 'Mutation', addHostedCourseItem?: any | null };

export type CreateHostedCourseMutationVariables = Exact<{
  hostedCourseInput: NewHostedCourseInput;
}>;


export type CreateHostedCourseMutation = { __typename?: 'Mutation', createHostedCourse?: { __typename?: 'HostedCourse', id: string, name: string } | null };

export type FindHostedCourseByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindHostedCourseByIdQuery = { __typename?: 'Query', findHostedCourseById?: { __typename: 'HostedCourse', id: string, name: string, description?: string | null, duration?: number | null, missionPartnerId: string, createdAt: any, updatedAt: any, items?: Array<any | null> | null, status: string } | null };

export type FindHostedCourseItemQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  itemId: Scalars['ID']['input'];
}>;


export type FindHostedCourseItemQuery = { __typename?: 'Query', findHostedCourseItem?: { __typename?: 'HostedCourseItem', item: any, status: string } | null };

export type PublishHostedCourseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  missionPartnerId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type PublishHostedCourseMutation = { __typename?: 'Mutation', publishHostedCourse?: { __typename?: 'HostedCourse', id: string, name: string, createdAt: any, updatedAt: any, missionPartnerId: string, description?: string | null, duration?: number | null, items?: Array<any | null> | null, status: string } | null };

export type UpdateHostedCourseMutationVariables = Exact<{
  input: UpdatedHostedCourseInput;
}>;


export type UpdateHostedCourseMutation = { __typename?: 'Mutation', updateHostedCourse?: { __typename?: 'HostedCourse', id: string, name: string, createdAt: any, updatedAt: any, missionPartnerId: string, description?: string | null, duration?: number | null, items?: Array<any | null> | null, status: string } | null };

export type UpdateHostedCourseItemMutationVariables = Exact<{
  input: HostedCourseItemInput;
}>;


export type UpdateHostedCourseItemMutation = { __typename?: 'Mutation', updateHostedCourseItem?: any | null };

export type UploadHostedCourseImageMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
  missionPartnerId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type UploadHostedCourseImageMutation = { __typename?: 'Mutation', uploadHostedCourseImage?: { __typename?: 'HostedCourseImage', url: string } | null };

export type UploadHostedVideoMutationVariables = Exact<{
  input: HostedVideoInput;
  missionPartnerId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type UploadHostedVideoMutation = { __typename?: 'Mutation', uploadHostedVideo?: { __typename?: 'HostedCourse', id: string, name: string, description?: string | null, duration?: number | null, missionPartnerId: string, createdAt: any, updatedAt: any, items?: Array<any | null> | null, status: string } | null };

export type UploadOfficeFileMutationVariables = Exact<{
  input: OfficeFileInput;
  missionPartnerId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type UploadOfficeFileMutation = { __typename?: 'Mutation', uploadOfficeFile?: { __typename?: 'HostedCourse', id: string, name: string, description?: string | null, duration?: number | null, missionPartnerId: string, createdAt: any, updatedAt: any, items?: Array<any | null> | null, status: string } | null };

export type AddHostedExamProgressCommentMutationVariables = Exact<{
  hostedExamId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
  questionId: Scalars['ID']['input'];
  comment: Scalars['String']['input'];
}>;


export type AddHostedExamProgressCommentMutation = { __typename?: 'Mutation', addHostedExamProgressComment?: { __typename?: 'HostedExamProgress', userId: string } | null };

export type CreateHostedExamProgressMutationVariables = Exact<{
  hostedExamId: Scalars['ID']['input'];
}>;


export type CreateHostedExamProgressMutation = { __typename?: 'Mutation', createHostedExamProgress?: { __typename?: 'HostedExamProgress', score: number, answers: Array<any | null>, status: string, startedAt: any } | null };

export type FindHostedExamProgressByExamIdUserIdQueryVariables = Exact<{
  hostedExamId: Scalars['ID']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type FindHostedExamProgressByExamIdUserIdQuery = { __typename?: 'Query', findHostedExamProgressByExamIdUserId?: { __typename?: 'HostedExamProgress', status: string, score: number, answers: Array<any | null> } | null };

export type UpdateHostedExamProgressAnswersMutationVariables = Exact<{
  hostedExamId: Scalars['ID']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
  answers: Array<InputMaybe<Scalars['JSONObject']['input']>> | InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type UpdateHostedExamProgressAnswersMutation = { __typename?: 'Mutation', updateHostedExamProgressAnswers?: { __typename?: 'HostedExamProgress', score: number, answers: Array<any | null>, status: string, startedAt: any, completedAt?: any | null } | null };

export type UpdateHostedExamProgressStatusMutationVariables = Exact<{
  hostedExamId: Scalars['ID']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
  status: Scalars['String']['input'];
}>;


export type UpdateHostedExamProgressStatusMutation = { __typename?: 'Mutation', updateHostedExamProgressStatus?: { __typename?: 'HostedExamProgress', score: number, answers: Array<any | null>, status: string, startedAt: any, completedAt?: any | null } | null };

export type AddHostedExamQuestionMutationVariables = Exact<{
  hostedExamId: Scalars['ID']['input'];
  questionInput: Scalars['JSONObject']['input'];
}>;


export type AddHostedExamQuestionMutation = { __typename?: 'Mutation', addHostedExamQuestion?: any | null };

export type AddItemsToTrainingCriteriaMutationVariables = Exact<{
  hostedExamId: Scalars['ID']['input'];
  trainingCriteriaId: Scalars['ID']['input'];
  assignedTrainingInput: Array<InputMaybe<AssignedTrainingInput>> | InputMaybe<AssignedTrainingInput>;
}>;


export type AddItemsToTrainingCriteriaMutation = { __typename?: 'Mutation', addItemsToTrainingCriteria?: { __typename?: 'HostedExam', id: string, missionPartnerId: string, trainingCriteria?: Array<{ __typename?: 'TrainingCriteria', id: string, maxScore?: number | null, minScore?: number | null, ruleType?: string | null, training?: Array<{ __typename?: 'AssignedTraining', type: string, courseId?: string | null, assessmentId?: string | null, planType?: string | null, planSourceId?: string | null, planVersion?: string | null, title?: string | null, vendors?: Array<string | null> | null, requiredLicenses?: Array<{ __typename?: 'RequiredLicense', vendorId: string, vendorName: string } | null> | null } | null> | null } | null> | null } | null };

export type AddTrainingCriteriaMutationVariables = Exact<{
  hostedExamId: Scalars['ID']['input'];
  trainingCriteriaInput: AddTrainingCriteriaInput;
}>;


export type AddTrainingCriteriaMutation = { __typename?: 'Mutation', addTrainingCriteria?: { __typename?: 'HostedExam', id: string, missionPartnerId: string, trainingCriteria?: Array<{ __typename?: 'TrainingCriteria', id: string, minScore?: number | null, maxScore?: number | null, ruleType?: string | null } | null> | null } | null };

export type CreateHostedExamMutationVariables = Exact<{
  hostedExamInput: NewHostedExamInput;
}>;


export type CreateHostedExamMutation = { __typename?: 'Mutation', createHostedExam?: { __typename?: 'HostedExam', id: string, name: string } | null };

export type DeleteTrainingCriteriaMutationVariables = Exact<{
  hostedExamId: Scalars['ID']['input'];
  trainingCriteriaId: Scalars['ID']['input'];
}>;


export type DeleteTrainingCriteriaMutation = { __typename?: 'Mutation', deleteTrainingCriteria?: { __typename?: 'HostedExam', id: string, missionPartnerId: string, trainingCriteria?: Array<{ __typename?: 'TrainingCriteria', id: string, minScore?: number | null, maxScore?: number | null, ruleType?: string | null } | null> | null } | null };

export type FindHostedExamByIdQueryVariables = Exact<{
  hostedExamId: Scalars['ID']['input'];
}>;


export type FindHostedExamByIdQuery = { __typename?: 'Query', findHostedExamById?: { __typename: 'HostedExam', id: string, name: string, description?: string | null, durationInMinutes?: number | null, missionPartnerId: string, createdAt: any, updatedAt: any, questions?: Array<any | null> | null, status: string, maxAttempts?: number | null, passingScore?: number | null, trainingCriteria?: Array<{ __typename?: 'TrainingCriteria', id: string, maxScore?: number | null, minScore?: number | null, ruleType?: string | null, training?: Array<{ __typename?: 'AssignedTraining', type: string, courseId?: string | null, assessmentId?: string | null, planType?: string | null, planSourceId?: string | null, planVersion?: string | null, title?: string | null, vendors?: Array<string | null> | null, requiredLicenses?: Array<{ __typename?: 'RequiredLicense', vendorId: string, vendorName: string } | null> | null } | null> | null } | null> | null } | null };

export type PublishHostedExamMutationVariables = Exact<{
  hostedExamId: Scalars['ID']['input'];
}>;


export type PublishHostedExamMutation = { __typename?: 'Mutation', publishHostedExam?: { __typename?: 'HostedExam', id: string, name: string, createdAt: any, missionPartnerId: string, description?: string | null, durationInMinutes?: number | null, questions?: Array<any | null> | null, maxAttempts?: number | null, passingScore?: number | null } | null };

export type RemoveHostedExamQuestionMutationVariables = Exact<{
  hostedExamId: Scalars['ID']['input'];
  questionId: Scalars['ID']['input'];
}>;


export type RemoveHostedExamQuestionMutation = { __typename?: 'Mutation', removeHostedExamQuestion?: any | null };

export type UpdateHostedExamMutationVariables = Exact<{
  hostedExamInput: UpdatedHostedExamInput;
}>;


export type UpdateHostedExamMutation = { __typename?: 'Mutation', updateHostedExam?: { __typename?: 'HostedExam', id: string, name: string, createdAt: any, missionPartnerId: string, description?: string | null, durationInMinutes?: number | null, questions?: Array<any | null> | null, maxAttempts?: number | null, passingScore?: number | null } | null };

export type UpdateHostedExamQuestionMutationVariables = Exact<{
  hostedExamId: Scalars['ID']['input'];
  questionInput: Scalars['JSONObject']['input'];
}>;


export type UpdateHostedExamQuestionMutation = { __typename?: 'Mutation', updateHostedExamQuestion?: any | null };

export type UpdateTrainingCriteriaMutationVariables = Exact<{
  hostedExamId: Scalars['ID']['input'];
  trainingCriteriaInput: TrainingCriteriaInput;
}>;


export type UpdateTrainingCriteriaMutation = { __typename?: 'Mutation', updateTrainingCriteria?: { __typename?: 'HostedExam', id: string, missionPartnerId: string, trainingCriteria?: Array<{ __typename?: 'TrainingCriteria', id: string, minScore?: number | null, maxScore?: number | null, ruleType?: string | null } | null> | null } | null };

export type CreateHostedScormMutationVariables = Exact<{
  hostedScormInput: NewHostedScormInput;
}>;


export type CreateHostedScormMutation = { __typename?: 'Mutation', createHostedScorm?: { __typename?: 'HostedScorm', id: string, missionPartnerId: string, name: string, description?: string | null, duration?: number | null, status?: string | null, scormFilename?: string | null, scormUrl?: string | null, createdAt: any, updatedAt: any } | null };

export type FindHostedScormByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindHostedScormByIdQuery = { __typename?: 'Query', findHostedScormById?: { __typename: 'HostedScorm', id: string, missionPartnerId: string, name: string, description?: string | null, duration?: number | null, status?: string | null, scormFilename?: string | null, scormUrl?: string | null, createdAt: any, updatedAt: any } | null };

export type PublishHostedScormMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  missionPartnerId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type PublishHostedScormMutation = { __typename?: 'Mutation', publishHostedScorm?: { __typename?: 'HostedScorm', id: string, name: string, missionPartnerId: string, description?: string | null, status?: string | null, scormFilename?: string | null, scormUrl?: string | null } | null };

export type UpdateHostedScormMutationVariables = Exact<{
  hostedScormInput: UpdatedHostedScormInput;
}>;


export type UpdateHostedScormMutation = { __typename?: 'Mutation', updateHostedScorm?: { __typename?: 'HostedScorm', id: string, missionPartnerId: string, name: string, description?: string | null, duration?: number | null, status?: string | null, scormFilename?: string | null, scormUrl?: string | null, createdAt: any, updatedAt: any } | null };

export type UploadHostedScormPackageMutationVariables = Exact<{
  packageInput: HostedScormPackageInput;
  missionPartnerId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type UploadHostedScormPackageMutation = { __typename?: 'Mutation', uploadHostedScormPackage?: { __typename?: 'HostedScorm', id: string, missionPartnerId: string, name: string, description?: string | null, duration?: number | null, status?: string | null, scormFilename?: string | null, scormUrl?: string | null, createdAt: any, updatedAt: any } | null };

export type AddLabsToUserMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  labIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type AddLabsToUserMutation = { __typename?: 'Mutation', addLabsToUser?: any | null };

export type CreateLabMutationVariables = Exact<{
  input: NewLabInput;
}>;


export type CreateLabMutation = { __typename?: 'Mutation', createLab?: { __typename?: 'Lab', id: string } | null };

export type DeleteLabMutationVariables = Exact<{
  labId: Scalars['ID']['input'];
}>;


export type DeleteLabMutation = { __typename?: 'Mutation', deleteLab?: string | null };

export type FindLabAndInfoByIdQueryVariables = Exact<{
  labId: Scalars['ID']['input'];
}>;


export type FindLabAndInfoByIdQuery = { __typename?: 'Query', findLabById?: { __typename?: 'Lab', id: string, missionPartnerId: string, status?: string | null, name: string, description?: string | null, durationInMinutes?: number | null, previewImageUrl?: string | null, type?: string | null, createdAt: any, updatedAt: any, missionPartner?: { __typename?: 'MissionPartner', id: string, name: string } | null, content?: Array<{ __typename?: 'LabContent', id: string, title: string, description: string } | null> | null, coreConceptItems?: Array<{ __typename?: 'LabItem', itemId: string, itemType: string, itemTitle: string, itemVersion?: string | null } | null> | null, relevantLearningPaths?: Array<{ __typename?: 'LabItem', itemId: string, itemType: string, itemTitle: string, itemVersion?: string | null } | null> | null, instructions?: Array<{ __typename?: 'LabInstruction', id: string, type: string, title: string, content?: string | null, videoFilename?: string | null, videoUrl?: string | null } | null> | null, launchConfig?: { __typename?: 'LabLaunchConfig', type?: string | null, path?: string | null } | null } | null, fetchRelevantLabInformation?: { __typename?: 'RelevantLabInformation', coreConcepts?: Array<{ __typename?: 'coreConceptItemWithDetail', href: string, id: string, itemType: string, source?: string | null, title: string } | null> | null, relevantLearningPaths?: Array<{ __typename?: 'learningPathItemWithDetail', id?: string | null, itemType: string, schoolId?: string | null, title: string, version: string } | null> | null } | null };

export type FindLabByIdQueryVariables = Exact<{
  labId: Scalars['ID']['input'];
}>;


export type FindLabByIdQuery = { __typename?: 'Query', findLabById?: { __typename: 'Lab', id: string, missionPartnerId: string, status?: string | null, name: string, description?: string | null, durationInMinutes?: number | null, previewImageUrl?: string | null, type?: string | null, createdAt: any, updatedAt: any, missionPartner?: { __typename?: 'MissionPartner', id: string, name: string } | null, content?: Array<{ __typename?: 'LabContent', id: string, title: string, description: string } | null> | null, coreConceptItems?: Array<{ __typename?: 'LabItem', itemId: string, itemType: string, itemTitle: string, itemVersion?: string | null } | null> | null, relevantLearningPaths?: Array<{ __typename?: 'LabItem', itemId: string, itemType: string, itemTitle: string, itemVersion?: string | null } | null> | null, instructions?: Array<{ __typename?: 'LabInstruction', id: string, type: string, title: string, content?: string | null, videoFilename?: string | null, videoUrl?: string | null } | null> | null, launchConfig?: { __typename?: 'LabLaunchConfig', type?: string | null, path?: string | null } | null } | null };

export type FindTranscriptLabsByUserIdQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type FindTranscriptLabsByUserIdQuery = { __typename?: 'Query', findTranscriptLabsByUserId?: Array<{ __typename?: 'UserLab', lab: { __typename?: 'Lab', id: string, name: string, description?: string | null, previewImageUrl?: string | null, durationInMinutes?: number | null, type?: string | null, status?: string | null, createdAt: any, updatedAt: any, launchConfig?: { __typename?: 'LabLaunchConfig', type?: string | null, path?: string | null } | null }, progress?: { __typename?: 'TranscriptLab', userId: string, labId: string, status: string, startedAt?: any | null, markedCompletedAt?: any | null } | null } | null> | null };

export type UpdateLabMutationVariables = Exact<{
  input: UpdatedLabInput;
}>;


export type UpdateLabMutation = { __typename?: 'Mutation', updateLab?: { __typename?: 'Lab', id: string, missionPartnerId: string, status?: string | null, name: string, description?: string | null, durationInMinutes?: number | null, previewImageUrl?: string | null, type?: string | null, createdAt: any, updatedAt: any, missionPartner?: { __typename?: 'MissionPartner', id: string, name: string } | null, content?: Array<{ __typename?: 'LabContent', id: string, title: string, description: string } | null> | null, coreConceptItems?: Array<{ __typename?: 'LabItem', itemId: string, itemType: string, itemTitle: string, itemVersion?: string | null } | null> | null, relevantLearningPaths?: Array<{ __typename?: 'LabItem', itemId: string, itemType: string, itemTitle: string, itemVersion?: string | null } | null> | null, instructions?: Array<{ __typename?: 'LabInstruction', id: string, type: string, title: string, content?: string | null, videoFilename?: string | null, videoUrl?: string | null } | null> | null, launchConfig?: { __typename?: 'LabLaunchConfig', type?: string | null, path?: string | null } | null } | null };

export type UploadPreviewImageMutationVariables = Exact<{
  labId: Scalars['ID']['input'];
  file: Scalars['Upload']['input'];
}>;


export type UploadPreviewImageMutation = { __typename?: 'Mutation', uploadPreviewImage?: { __typename?: 'Lab', id: string, previewImageUrl?: string | null } | null };

export type UploadTextInstructionImageMutationVariables = Exact<{
  labId: Scalars['ID']['input'];
  file: Scalars['Upload']['input'];
}>;


export type UploadTextInstructionImageMutation = { __typename?: 'Mutation', uploadTextInstructionImage?: { __typename?: 'LabInstructionImage', url: string } | null };

export type UploadVideoInstructionMutationVariables = Exact<{
  labId: Scalars['ID']['input'];
  labInstructionId: Scalars['ID']['input'];
  file: Scalars['Upload']['input'];
}>;


export type UploadVideoInstructionMutation = { __typename?: 'Mutation', uploadVideoInstruction?: { __typename?: 'Lab', id: string } | null };

export type FindLearningPathByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindLearningPathByIdQuery = { __typename?: 'Query', findLearningPathById?: { __typename?: 'LearningPath', id: string, title: string, schoolId: string, content: { __typename?: 'LearningPathContent', description?: Array<string> | null, summary: string, valuePropositions?: Array<{ __typename?: 'ValueProposition', title: string, summary: string }> | null, about: { __typename?: 'About', title: string, description?: Array<string> | null, image: string }, learningPathSummary: { __typename?: 'LearningPathSummary', eyebrowTitle: string, title: string, summary: string, valueText?: Array<string> | null, image: string, caption: { __typename?: 'Caption', captionText: string, name: string, title: string } }, testimonial?: { __typename?: 'Testimonial', title: string, description?: Array<string> | null, image: string, caption: { __typename?: 'Caption', captionText: string, name: string, title: string } } | null, opportunities?: { __typename?: 'Opportunities', title: string, locations?: Array<{ __typename?: 'Location', prefix: string, organization: string, location: string, summary: string }> | null } | null, skillTree?: { __typename?: 'SkillTree', title: string, description?: Array<string> | null, image?: string | null } | null, callToAction: { __typename?: 'CallToAction', title: string } } } | null };

export type ApproveLicenseRequestMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ApproveLicenseRequestMutation = { __typename?: 'Mutation', approveLicenseRequest?: { __typename?: 'LicenseRequest', id: string, vendorId: string, vendorName: string, userId: string, userFirstName: string, userLastName: string, userEmail: string, userOrganization: string, missionPartnerId: string, missionPartnerName: string, status: string, requestedAt: any, approvedAt?: any | null, declinedAt?: any | null } | null };

export type DeclineLicenseRequestMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeclineLicenseRequestMutation = { __typename?: 'Mutation', declineLicenseRequest?: { __typename?: 'LicenseRequest', id: string, vendorId: string, vendorName: string, userId: string, userFirstName: string, userLastName: string, userEmail: string, userOrganization: string, missionPartnerId: string, missionPartnerName: string, status: string, requestedAt: any, approvedAt?: any | null, declinedAt?: any | null } | null };

export type ExportMissionPartnerLicenseRequestsMutationVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  missionPartnerName: Scalars['String']['input'];
  vendorName?: InputMaybe<Scalars['String']['input']>;
  branch?: InputMaybe<Scalars['String']['input']>;
}>;


export type ExportMissionPartnerLicenseRequestsMutation = { __typename?: 'Mutation', exportMissionPartnerLicenseRequests?: any | null };

export type FindLicenseRequestByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindLicenseRequestByIdQuery = { __typename?: 'Query', findLicenseRequestById?: { __typename?: 'LicenseRequest', vendorId: string, vendorName: string, userId: string, userFirstName: string, userLastName: string, userEmail: string, userOrganization: string, status: string, requestedAt: any, approvedAt?: any | null, declinedAt?: any | null } | null };

export type FindOpenLicenseRequestsQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
}>;


export type FindOpenLicenseRequestsQuery = { __typename?: 'Query', findOpenLicenseRequests?: { __typename?: 'PaginatedLicenseRequestResponse', total: number, records: Array<{ __typename?: 'LicenseRequest', missionPartnerId: string, missionPartnerName: string, vendorId: string, vendorName: string, userId: string, userFirstName: string, userLastName: string, userEmail: string, userOrganization: string, id: string, status: string, requestedAt: any, approvedAt?: any | null, declinedAt?: any | null } | null> } | null };

export type FindOpenLicenseRequestsFilterQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  sortDirection?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['SafeInt']['input']>;
  pageSize?: InputMaybe<Scalars['SafeInt']['input']>;
  branch?: InputMaybe<Scalars['String']['input']>;
  vendorName?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindOpenLicenseRequestsFilterQuery = { __typename?: 'Query', findOpenLicenseRequests?: { __typename?: 'PaginatedLicenseRequestResponse', total: number, records: Array<{ __typename?: 'LicenseRequest', missionPartnerId: string, missionPartnerName: string, vendorId: string, vendorName: string, userId: string, userFirstName: string, userLastName: string, userEmail: string, userOrganization: string, id: string, status: string, requestedAt: any, approvedAt?: any | null, declinedAt?: any | null } | null> } | null };

export type GetBranchesForOpenLicenseRequestsQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
}>;


export type GetBranchesForOpenLicenseRequestsQuery = { __typename?: 'Query', getBranchesForOpenLicenseRequests?: Array<string> | null };

export type GetVendorsForOpenLicenseRequestQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
}>;


export type GetVendorsForOpenLicenseRequestQuery = { __typename?: 'Query', getVendorsForOpenLicenseRequests?: Array<string> | null };

export type AssignLicenseMutationVariables = Exact<{
  input: AssignLicenseInput;
}>;


export type AssignLicenseMutation = { __typename?: 'Mutation', assignLicense?: { __typename?: 'UploadRecord', id: string, status: UploadStatus, error?: string | null } | null };

export type CountAssignedLicensesForMissionPartnerQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
}>;


export type CountAssignedLicensesForMissionPartnerQuery = { __typename?: 'Query', countAssignedLicensesForMissionPartner?: Array<{ __typename?: 'AssignedLicensesCount', vendorId: string, count: number } | null> | null };

export type ExportLicensesMutationVariables = Exact<{ [key: string]: never; }>;


export type ExportLicensesMutation = { __typename?: 'Mutation', exportLicenses?: any | null };

export type ExportMissionPartnerLicensesForVendorMutationVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  missionPartnerName: Scalars['String']['input'];
  vendorId: Scalars['ID']['input'];
  vendorName: Scalars['String']['input'];
}>;


export type ExportMissionPartnerLicensesForVendorMutation = { __typename?: 'Mutation', exportMissionPartnerLicensesForVendor?: any | null };

export type FindLicensesByUserIdQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  missionPartnerId: Scalars['ID']['input'];
}>;


export type FindLicensesByUserIdQuery = { __typename?: 'Query', licenses?: Array<{ __typename?: 'License', vendorId: string, vendorName: string, userId: string, missionPartnerId: string, missionPartnerName: string, assignedAt: any } | null> | null, licenseStatusCounts?: Array<{ __typename?: 'LicenseStatusCount', active: number, inactive: number, available: number, provisioned: number, vendorId: string, vendorName: string } | null> | null };

export type FindLicenseStatusCountsQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
}>;


export type FindLicenseStatusCountsQuery = { __typename?: 'Query', findLicenseStatusCounts?: Array<{ __typename?: 'LicenseStatusCount', active: number, inactive: number, available: number, provisioned: number, vendorId: string, vendorName: string } | null> | null };

export type FindLicensesByMissionPartnerAndVendorQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  vendorId: Scalars['ID']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['String']['input']>;
  pageSize?: InputMaybe<Scalars['SafeInt']['input']>;
  pageNumber?: InputMaybe<Scalars['SafeInt']['input']>;
}>;


export type FindLicensesByMissionPartnerAndVendorQuery = { __typename?: 'Query', findLicensesByMissionPartnerAndVendor?: { __typename?: 'LicenseResponse', total: number, records: Array<{ __typename?: 'License', vendorId: string, vendorName: string, userId: string, userFirstName: string, userLastName: string, userEmail: string, missionPartnerId: string, missionPartnerName: string, assignedAt: any, lastUsedAt?: any | null } | null> } | null };

export type GetLicensesByVendorIdQueryVariables = Exact<{
  vendorId: Scalars['ID']['input'];
  missionPartnerName?: InputMaybe<Scalars['String']['input']>;
  branch?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['String']['input']>;
  pageSize?: InputMaybe<Scalars['SafeInt']['input']>;
  pageNumber?: InputMaybe<Scalars['SafeInt']['input']>;
}>;


export type GetLicensesByVendorIdQuery = { __typename?: 'Query', getLicensesByVendorId?: { __typename?: 'PaginatedLicensesByVendorIdResponse', total: number, records: Array<{ __typename?: 'License', vendorId: string, vendorName: string, userId: string, userFirstName: string, userLastName: string, userEmail: string, missionPartnerId: string, missionPartnerName: string, assignedAt: any, lastUsedAt?: any | null, user?: { __typename?: 'User', branch?: string | null, trainingGroup?: string | null, metadata?: any | null } | null } | null> } | null };

export type RemoveLicensesMutationVariables = Exact<{
  input: RemoveLicensesInput;
}>;


export type RemoveLicensesMutation = { __typename?: 'Mutation', removeLicenses?: any | null };

export type ApproveMissionPartnerRequestMutationVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type ApproveMissionPartnerRequestMutation = { __typename?: 'Mutation', approveMissionPartnerRequest?: { __typename?: 'MissionPartnerRequest', missionPartnerId: string, missionPartnerName: string, userId: string, userFirstName: string, userLastName: string, userEmail: string, status: string, requestedAt: any, approvedAt?: any | null, declinedAt?: any | null } | null };

export type DeclineMissionPartnerRequestMutationVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type DeclineMissionPartnerRequestMutation = { __typename?: 'Mutation', declineMissionPartnerRequest?: { __typename?: 'MissionPartnerRequest', missionPartnerId: string, missionPartnerName: string, userId: string, userFirstName: string, userLastName: string, userEmail: string, status: string, requestedAt: any, approvedAt?: any | null, declinedAt?: any | null } | null };

export type FindMissionPartnerRequestByIdQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type FindMissionPartnerRequestByIdQuery = { __typename?: 'Query', findMissionPartnerRequestById?: { __typename?: 'MissionPartnerRequest', missionPartnerId: string, missionPartnerName: string, userId: string, userFirstName: string, userLastName: string, userEmail: string, status: string, requestedAt: any, approvedAt?: any | null, declinedAt?: any | null } | null };

export type FindOpenForMissionPartnerQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
}>;


export type FindOpenForMissionPartnerQuery = { __typename?: 'Query', findOpenForMissionPartner?: Array<{ __typename?: 'MissionPartnerRequest', missionPartnerId: string, missionPartnerName: string, userId: string, userFirstName: string, userLastName: string, userEmail: string, status: string, requestedAt: any, approvedAt?: any | null, declinedAt?: any | null } | null> | null };

export type FindLearnersBySearchQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  searchText?: InputMaybe<Scalars['String']['input']>;
  onboardingComplete?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
  pageNumber?: InputMaybe<Scalars['SafeInt']['input']>;
  pageSize?: InputMaybe<Scalars['SafeInt']['input']>;
}>;


export type FindLearnersBySearchQuery = { __typename?: 'Query', findLearnersBySearch?: { __typename?: 'PaginatedUsersResult', total: any, records: Array<{ __typename?: 'User', id: string, email?: string | null, firstName?: string | null, lastName?: string | null, onboardingCompletedAt?: any | null, keycloakUserCreatedAt?: any | null, userType?: string | null, lastLoginAt?: any | null } | null> } | null };

export type AddCollectionItemsMutationVariables = Exact<{
  ID: Scalars['ID']['input'];
  items: Array<CollectionItemInput> | CollectionItemInput;
  missionPartnerId: Scalars['ID']['input'];
}>;


export type AddCollectionItemsMutation = { __typename?: 'Mutation', addCollectionItems?: { __typename?: 'MissionPartner', collections?: Array<{ __typename?: 'Collection', id: string, name: string, description?: string | null, items: Array<{ __typename?: 'CollectionItem', assessmentId?: string | null, courseId?: string | null, dateAdded?: any | null, type: string, planType?: string | null, planSourceId?: string | null, planVersion?: string | null, title?: string | null, description?: string | null, vendors?: Array<string | null> | null } | null> } | null> | null } | null };

export type AddFeaturedTrainingItemsMutationVariables = Exact<{
  input: UpdateMissionPartnerInput;
}>;


export type AddFeaturedTrainingItemsMutation = { __typename?: 'Mutation', addFeaturedTrainingItems?: { __typename?: 'MissionPartner', id: string, name: string, affiliateId: string, logoUrl?: string | null, slug?: string | null, provisionedLicenses?: Array<{ __typename?: 'ProvisionedLicenses', vendorId: string, vendorName: string, provisioned: any } | null> | null, featuredTraining?: Array<{ __typename?: 'FeaturedTraining', type: string, courseId?: string | null, assessmentId?: string | null, labId?: string | null, planType?: string | null, planSourceId?: string | null, planVersion?: string | null, title?: string | null, description?: string | null, vendors?: Array<string | null> | null, dateAdded?: any | null, required?: boolean | null } | null> | null } | null };

export type AggregateTranscriptTrainingPlansQueryVariables = Exact<{
  missionPartnerId: Scalars['String']['input'];
  planType?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['String']['input']>;
  pageSize?: InputMaybe<Scalars['SafeInt']['input']>;
  pageNumber?: InputMaybe<Scalars['SafeInt']['input']>;
}>;


export type AggregateTranscriptTrainingPlansQuery = { __typename?: 'Query', aggregateTranscriptTrainingPlans?: { __typename?: 'AggregatedTranscriptTrainingPlans', total: number, records: Array<{ __typename?: 'AggregatedTrainingPlan', planType: string, planSourceId: string, planTitle: string, total: number, assigned: number, started: number, stopped: number, completed: number } | null> } | null };

export type AggregateTranscriptTrainingPlansForGroupQueryVariables = Exact<{
  missionPartnerId: Scalars['String']['input'];
  groupId: Scalars['String']['input'];
}>;


export type AggregateTranscriptTrainingPlansForGroupQuery = { __typename?: 'Query', aggregateTranscriptTrainingPlansForGroup?: Array<{ __typename?: 'AggregatedTrainingPlan', planType: string, planSourceId: string, planTitle: string, total: number, assigned: number, started: number, stopped: number, completed: number } | null> | null };

export type CreateCollectionMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
  missionPartnerId: Scalars['ID']['input'];
}>;


export type CreateCollectionMutation = { __typename?: 'Mutation', createCollection?: { __typename?: 'MissionPartner', collections?: Array<{ __typename?: 'Collection', name: string, description?: string | null } | null> | null } | null };

export type CreateExportByTypeAndMissionPartnerIdMutationVariables = Exact<{
  downloadType: Scalars['String']['input'];
  missionPartnerId: Scalars['String']['input'];
}>;


export type CreateExportByTypeAndMissionPartnerIdMutation = { __typename?: 'Mutation', createExportByTypeAndMissionPartnerId?: { __typename?: 'Download', id: string, userId: string, type: DownloadType, requestedAt: any, completedAt?: any | null, title: string, parameters?: string | null, status: DownloadStatus, error?: string | null } | null };

export type CreateMissionPartnerMutationVariables = Exact<{
  input: CreateMissionPartnerInput;
}>;


export type CreateMissionPartnerMutation = { __typename?: 'Mutation', createMissionPartner?: { __typename?: 'MissionPartner', id: string, name: string, affiliateId: string, sectionType?: string | null, logoUrl?: string | null, slug?: string | null, provisionedLicenses?: Array<{ __typename?: 'ProvisionedLicenses', vendorId: string, vendorName: string, provisioned: any } | null> | null } | null };

export type DisableExportsByTypesForMissionPartnerMutationVariables = Exact<{
  downloadTypes: Array<Scalars['String']['input']> | Scalars['String']['input'];
  missionPartnerId: Scalars['String']['input'];
}>;


export type DisableExportsByTypesForMissionPartnerMutation = { __typename?: 'Mutation', disableExportsByTypesForMissionPartner?: { __typename?: 'MissionPartner', id: string, name: string, affiliateId: string, logoUrl?: string | null, slug?: string | null, enabledReports?: Array<{ __typename?: 'Report', id: string, name: string, description: string } | null> | null } | null };

export type EnableExportsByTypesForMissionPartnerMutationVariables = Exact<{
  downloadTypes: Array<Scalars['String']['input']> | Scalars['String']['input'];
  missionPartnerId: Scalars['String']['input'];
}>;


export type EnableExportsByTypesForMissionPartnerMutation = { __typename?: 'Mutation', enableExportsByTypesForMissionPartner?: { __typename?: 'MissionPartner', id: string, name: string, affiliateId: string, logoUrl?: string | null, slug?: string | null, enabledReports?: Array<{ __typename?: 'Report', id: string, name: string, description: string } | null> | null } | null };

export type ExportCourseLevelMetricsForTrainingPlanQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  groupId?: InputMaybe<Scalars['ID']['input']>;
  planSourceId: Scalars['ID']['input'];
  planVersion?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
}>;


export type ExportCourseLevelMetricsForTrainingPlanQuery = { __typename?: 'Query', exportCourseLevelMetricsForTrainingPlan?: { __typename?: 'Download', id: string } | null };

export type ExportIndividualLearnerActivityQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type ExportIndividualLearnerActivityQuery = { __typename?: 'Query', exportIndividualLearnerActivity?: { __typename?: 'Download', id: string, userId: string, type: DownloadType, requestedAt: any, completedAt?: any | null, title: string, parameters?: string | null, status: DownloadStatus, error?: string | null } | null };

export type ExportLearnersQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  missionPartnerName?: InputMaybe<Scalars['String']['input']>;
}>;


export type ExportLearnersQuery = { __typename?: 'Query', exportLearners?: { __typename?: 'Download', id: string } | null };

export type ExportQuizExamsQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  missionPartnerName: Scalars['String']['input'];
  quizOrExamId: Scalars['String']['input'];
  quizOrExamName: Scalars['String']['input'];
}>;


export type ExportQuizExamsQuery = { __typename?: 'Query', exportQuizExams?: { __typename?: 'Download', id: string } | null };

export type ExportSurveysQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  missionPartnerName: Scalars['String']['input'];
  surveyId: Scalars['String']['input'];
  surveyName: Scalars['String']['input'];
}>;


export type ExportSurveysQuery = { __typename?: 'Query', exportSurveys?: { __typename?: 'Download', id: string } | null };

export type ExportTrainingPlanCoursesForMissionPartnerQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  missionPartnerName: Scalars['String']['input'];
  vendorName?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
}>;


export type ExportTrainingPlanCoursesForMissionPartnerQuery = { __typename?: 'Query', exportTrainingPlanCoursesForMissionPartner?: { __typename?: 'Download', id: string } | null };

export type ExportTrainingPlanTranscriptsForGroupQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  groupId: Scalars['ID']['input'];
  groupName?: InputMaybe<Scalars['String']['input']>;
}>;


export type ExportTrainingPlanTranscriptsForGroupQuery = { __typename?: 'Query', exportTrainingPlanTranscriptsForGroup?: { __typename?: 'Download', id: string } | null };

export type ExportTrainingPlanTranscriptsForMissionPartnerQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  missionPartnerName?: InputMaybe<Scalars['String']['input']>;
}>;


export type ExportTrainingPlanTranscriptsForMissionPartnerQuery = { __typename?: 'Query', exportTrainingPlanTranscriptsForMissionPartner?: { __typename?: 'Download', id: string } | null };

export type FindAllMissionPartnersAdminPortalQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllMissionPartnersAdminPortalQuery = { __typename?: 'Query', findAllMissionPartnersAdminPortal?: Array<{ __typename?: 'MissionPartner', id: string, name: string, affiliateId: string, logoUrl?: string | null, slug?: string | null, provisionedLicenses?: Array<{ __typename?: 'ProvisionedLicenses', vendorId: string, vendorName: string, provisioned: any } | null> | null, exams: Array<{ __typename?: 'HostedExam', id: string, name: string, durationInMinutes?: number | null, createdAt: any, updatedAt: any, status: string } | null>, courses: Array<{ __typename?: 'HostedCourse', id: string, name: string, duration?: number | null, createdAt: any, updatedAt: any, status: string } | null>, scorms: Array<{ __typename?: 'HostedScorm', id: string, name: string, duration?: number | null, status?: string | null, createdAt: any, updatedAt: any } | null>, surveys: Array<{ __typename?: 'Survey', id: string, name: string, durationInMinutes?: number | null, status?: string | null, createdAt: any, updatedAt: any } | null>, enabledReports?: Array<{ __typename?: 'Report', id: string, name: string } | null> | null } | null> | null };

export type FindAllMissionPartnersMinDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllMissionPartnersMinDetailsQuery = { __typename?: 'Query', findAllMissionPartnersMinDetails?: Array<{ __typename?: 'MissionPartnerMinDetails', id: string, name: string, slug?: string | null, description?: string | null, affiliateId: string, logoUrl?: string | null, accessCode?: string | null, customTrainingEnabled: boolean, trialEnabled: boolean, trialEndDate?: any | null, sectionType?: string | null, isMarketplaceEnabled?: boolean | null } | null> | null };

export type FindCategorizedTimeSpentLearningQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  categoryPercentileBreakpoints?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
  roundToHour?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type FindCategorizedTimeSpentLearningQuery = { __typename?: 'Query', findCategorizedTimeSpentLearning?: { __typename?: 'FindCategorizedTimeSpentLearningResult', categoryBreakpoints: Array<number | null>, usersPerCategory: Array<number | null> } | null };

export type FindFeaturedTrainingIdsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindFeaturedTrainingIdsQuery = { __typename?: 'Query', findMissionPartnerById?: { __typename?: 'MissionPartner', id: string, featuredTraining?: Array<{ __typename?: 'FeaturedTraining', type: string, courseId?: string | null, assessmentId?: string | null, labId?: string | null, planSourceId?: string | null } | null> | null } | null };

export type FindLearnersTotalQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
}>;


export type FindLearnersTotalQuery = { __typename?: 'Query', findLearnersBySearch?: { __typename?: 'PaginatedUsersResult', total: any } | null };

export type FindMissionPartnerByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindMissionPartnerByIdQuery = { __typename?: 'Query', findMissionPartnerById?: { __typename?: 'MissionPartner', id: string, name: string, description?: string | null, accessCode?: string | null, affiliateId: string, sectionType?: string | null, logoUrl?: string | null, slug?: string | null, customTrainingEnabled: boolean, isMarketplaceEnabled?: boolean | null, trialEnabled: boolean, trialStartDate?: any | null, trialEndDate?: any | null, enabledReports?: Array<{ __typename?: 'Report', description: string, id: string, name: string } | null> | null, provisionedLicenses?: Array<{ __typename?: 'ProvisionedLicenses', vendorId: string, vendorName: string, provisioned: any, autoAssignmentEnabled?: boolean | null } | null> | null, featuredTraining?: Array<{ __typename?: 'FeaturedTraining', type: string, courseId?: string | null, assessmentId?: string | null, labId?: string | null, planType?: string | null, planSourceId?: string | null, planVersion?: string | null, title?: string | null, description?: string | null, vendors?: Array<string | null> | null, dateAdded?: any | null, required?: boolean | null, assigned: number, started: number, completed: number, stopped: number } | null> | null, exams: Array<{ __typename?: 'HostedExam', id: string, name: string, durationInMinutes?: number | null, createdAt: any, updatedAt: any, status: string } | null>, courses: Array<{ __typename?: 'HostedCourse', id: string, name: string, duration?: number | null, createdAt: any, updatedAt: any, status: string } | null>, scorms: Array<{ __typename?: 'HostedScorm', id: string, name: string, duration?: number | null, status?: string | null, createdAt: any, updatedAt: any } | null>, surveys: Array<{ __typename?: 'Survey', id: string, name: string, durationInMinutes?: number | null, status?: string | null, createdAt: any, updatedAt: any } | null>, labs: Array<{ __typename?: 'Lab', id: string, name: string, durationInMinutes?: number | null, status?: string | null, createdAt: any, updatedAt: any } | null>, forceMultipliers: Array<{ __typename?: 'ForceMultiplier', id: string, title: string, status: StatusType, version: string, enrolledLearners?: number | null, totalDuration?: number | null, _createdAt: any, _updatedAt: any, changeLog: Array<{ __typename?: 'ChangeLog', createdAt: any } | null> } | null>, collections?: Array<{ __typename?: 'Collection', id: string, name: string, description?: string | null, items: Array<{ __typename?: 'CollectionItem', type: string, courseId?: string | null, assessmentId?: string | null, planType?: string | null, planSourceId?: string | null, planVersion?: string | null, title?: string | null, description?: string | null, vendors?: Array<string | null> | null, dateAdded?: any | null } | null> } | null> | null } | null };

export type FindMissionPartnerMembersByUserIdQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type FindMissionPartnerMembersByUserIdQuery = { __typename?: 'Query', findMissionPartnerMembersByUserId?: Array<{ __typename?: 'MissionPartnerMember', missionPartnerId: string, missionPartnerName: string, createdAt: any } | null> | null };

export type FindMissionPartnerMinDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindMissionPartnerMinDetailsQuery = { __typename?: 'Query', findMissionPartnerMinDetails?: { __typename?: 'MissionPartnerMinDetails', id: string, name: string, slug?: string | null, description?: string | null, affiliateId: string, logoUrl?: string | null, accessCode?: string | null, customTrainingEnabled: boolean, trialEnabled: boolean, trialStartDate?: any | null, trialEndDate?: any | null, isMarketplaceEnabled?: boolean | null } | null };

export type FindQuizAndExamsBySearchQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  sortKey?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
  pageNumber?: InputMaybe<Scalars['SafeInt']['input']>;
  pageSize?: InputMaybe<Scalars['SafeInt']['input']>;
}>;


export type FindQuizAndExamsBySearchQuery = { __typename?: 'Query', findQuizAndExamsBySearch?: { __typename?: 'PaginatedQuizExamStatusCountsResult', total: any, records: Array<{ __typename?: 'QuizExamStatusCounts', completed: number, itemId: string, itemName: string, itemType: string, missionPartnerId: string, started: number, total: number } | null> } | null };

export type FindSurveysBySearchQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  sortKey?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
  pageNumber?: InputMaybe<Scalars['SafeInt']['input']>;
  pageSize?: InputMaybe<Scalars['SafeInt']['input']>;
}>;


export type FindSurveysBySearchQuery = { __typename?: 'Query', findSurveysBySearch?: { __typename?: 'PaginatedSurveyStatusCountsResult', total: any, records: Array<{ __typename?: 'SurveyStatusCounts', missionPartnerId: string, hostedSurveyId: string, hostedSurveyName: string, total: number, started: number, completed: number } | null> } | null };

export type FindUserMissionPartnerMembershipsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindUserMissionPartnerMembershipsQuery = { __typename?: 'Query', findUserMissionPartnerMemberships?: Array<{ __typename?: 'UserMissionPartnerMembership', userId: string, missionPartnerId: string, email: string, firstName: string, lastName: string, missionPartnerName: string, logoUrl?: string | null, affiliateId?: string | null, description?: string | null, createdAt: any, trialEnabled: boolean, trialStartDate?: any | null, trialEndDate?: any | null, featuredTraining?: Array<{ __typename?: 'FeaturedTraining', type: string, courseId?: string | null, assessmentId?: string | null, labId?: string | null, planType?: string | null, planSourceId?: string | null, planVersion?: string | null, title?: string | null, dateAdded?: any | null, required?: boolean | null } | null> | null } | null> | null };

export type GetCoursesQuarterlyByMissionPartnerQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  maxNumberofQuarters?: InputMaybe<Scalars['SafeInt']['input']>;
}>;


export type GetCoursesQuarterlyByMissionPartnerQuery = { __typename?: 'Query', getCoursesQuarterlyByMissionPartner?: Array<{ __typename?: 'CoursesQuarterReturn', quarter: string, total: number, started: { __typename?: 'QuarterStatusReturn', numberOfUsers: number, percentageOfUsers: number }, stopped: { __typename?: 'QuarterStatusReturn', numberOfUsers: number, percentageOfUsers: number }, completed: { __typename?: 'QuarterStatusReturn', numberOfUsers: number, percentageOfUsers: number } } | null> | null };

export type GetMissionPartnerByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetMissionPartnerByIdQuery = { __typename?: 'Query', findMissionPartnerById?: { __typename?: 'MissionPartner', id: string, name: string } | null };

export type GetPlansQuarterlyByMissionPartnerQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  maxNumberofQuarters?: InputMaybe<Scalars['SafeInt']['input']>;
}>;


export type GetPlansQuarterlyByMissionPartnerQuery = { __typename?: 'Query', getPlansQuarterlyByMissionPartner?: Array<{ __typename?: 'PlansQuarterReturn', quarter: string, total: any, assigned: { __typename?: 'QuarterStatusReturn', numberOfUsers: number, percentageOfUsers: number }, started: { __typename?: 'QuarterStatusReturn', numberOfUsers: number, percentageOfUsers: number }, stopped: { __typename?: 'QuarterStatusReturn', numberOfUsers: number, percentageOfUsers: number }, completed: { __typename?: 'QuarterStatusReturn', numberOfUsers: number, percentageOfUsers: number } } | null> | null };

export type GetPublicMissionPartnerExportsQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
}>;


export type GetPublicMissionPartnerExportsQuery = { __typename?: 'Query', getPublicMissionPartnerExports?: Array<{ __typename?: 'Report', id: string, name: string, description: string } | null> | null };

export type RemoveCollectionMutationVariables = Exact<{
  Id: Scalars['ID']['input'];
  missionPartnerId: Scalars['ID']['input'];
}>;


export type RemoveCollectionMutation = { __typename?: 'Mutation', removeCollection?: { __typename?: 'MissionPartner', collections?: Array<{ __typename?: 'Collection', id: string, name: string, description?: string | null, items: Array<{ __typename?: 'CollectionItem', assessmentId?: string | null, courseId?: string | null, dateAdded?: any | null, type: string, planType?: string | null, planSourceId?: string | null, planVersion?: string | null, title?: string | null, description?: string | null, vendors?: Array<string | null> | null } | null> } | null> | null } | null };

export type RemoveCollectionItemsMutationVariables = Exact<{
  ID: Scalars['ID']['input'];
  items: Array<RemoveCollectionItemInput> | RemoveCollectionItemInput;
  missionPartnerId: Scalars['ID']['input'];
}>;


export type RemoveCollectionItemsMutation = { __typename?: 'Mutation', removeCollectionItems?: { __typename?: 'MissionPartner', collections?: Array<{ __typename?: 'Collection', id: string, name: string, description?: string | null, items: Array<{ __typename?: 'CollectionItem', assessmentId?: string | null, courseId?: string | null, dateAdded?: any | null, type: string, planType?: string | null, planSourceId?: string | null, planVersion?: string | null, title?: string | null, description?: string | null, vendors?: Array<string | null> | null } | null> } | null> | null } | null };

export type RemoveFeaturedTrainingItemsMutationVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  input: Array<InputMaybe<RemoveFeaturedTrainingItemsInput>> | InputMaybe<RemoveFeaturedTrainingItemsInput>;
}>;


export type RemoveFeaturedTrainingItemsMutation = { __typename?: 'Mutation', removeFeaturedTrainingItems?: { __typename?: 'MissionPartner', featuredTraining?: Array<{ __typename?: 'FeaturedTraining', type: string, courseId?: string | null, assessmentId?: string | null, labId?: string | null, planType?: string | null, planSourceId?: string | null, planVersion?: string | null } | null> | null } | null };

export type SendReminderToNonOnboardedQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
}>;


export type SendReminderToNonOnboardedQuery = { __typename?: 'Query', sendReminderToNonOnboarded?: { __typename?: 'SendReminderToNonOnboardedOutput', successfulEmailsSent?: Array<string | null> | null, emailsNotSent?: Array<string | null> | null } | null };

export type ToggleMissionPartnerTrialMutationVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  enable: Scalars['Boolean']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type ToggleMissionPartnerTrialMutation = { __typename?: 'Mutation', toggleMissionPartnerTrial?: { __typename?: 'MissionPartner', trialEnabled: boolean, trialStartDate?: any | null, trialEndDate?: any | null } | null };

export type ToggleRequiredFeaturedTrainingMutationVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
  courseId?: InputMaybe<Scalars['ID']['input']>;
  assessmentId?: InputMaybe<Scalars['ID']['input']>;
  labId?: InputMaybe<Scalars['ID']['input']>;
  planType?: InputMaybe<Scalars['String']['input']>;
  planSourceId?: InputMaybe<Scalars['String']['input']>;
  planVersion?: InputMaybe<Scalars['String']['input']>;
}>;


export type ToggleRequiredFeaturedTrainingMutation = { __typename?: 'Mutation', toggleRequiredFeaturedTraining?: { __typename?: 'MissionPartner', id: string } | null };

export type UpdateCollectionItemsMutationVariables = Exact<{
  Id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  missionPartnerId: Scalars['ID']['input'];
}>;


export type UpdateCollectionItemsMutation = { __typename?: 'Mutation', updateCollection?: { __typename?: 'MissionPartner', collections?: Array<{ __typename?: 'Collection', id: string, name: string, description?: string | null } | null> | null } | null };

export type UpdateCustomTrainingEnabledMutationVariables = Exact<{
  input: UpdateCustomTrainingEnabledInput;
}>;


export type UpdateCustomTrainingEnabledMutation = { __typename?: 'Mutation', updateCustomTrainingEnabled?: { __typename?: 'MissionPartner', id: string, name: string, customTrainingEnabled: boolean } | null };

export type UpdateIsMarketplaceEnabledMutationVariables = Exact<{
  input: UpdateIsMarketplaceEnabledInput;
}>;


export type UpdateIsMarketplaceEnabledMutation = { __typename?: 'Mutation', updateIsMarketplaceEnabled?: { __typename?: 'MissionPartner', id: string, name: string, isMarketplaceEnabled?: boolean | null } | null };

export type UpdateMissionPartnerMutationVariables = Exact<{
  input: UpdateMissionPartnerInput;
}>;


export type UpdateMissionPartnerMutation = { __typename?: 'Mutation', updateMissionPartner?: { __typename?: 'MissionPartner', id: string, name: string, description?: string | null, affiliateId: string, sectionType?: string | null, logoUrl?: string | null, slug?: string | null, provisionedLicenses?: Array<{ __typename?: 'ProvisionedLicenses', vendorId: string, vendorName: string, provisioned: any } | null> | null, featuredTraining?: Array<{ __typename?: 'FeaturedTraining', type: string, courseId?: string | null, assessmentId?: string | null, labId?: string | null, planType?: string | null, planSourceId?: string | null, planVersion?: string | null, title?: string | null, dateAdded?: any | null, required?: boolean | null } | null> | null } | null };

export type UploadMissionPartnerLogoMutationVariables = Exact<{
  file?: InputMaybe<Scalars['Upload']['input']>;
  missionPartnerId: Scalars['ID']['input'];
}>;


export type UploadMissionPartnerLogoMutation = { __typename?: 'Mutation', uploadMissionPartnerLogo?: { __typename?: 'MissionPartnerLogo', url?: string | null } | null };

export type CreateRoleMutationVariables = Exact<{
  input: CreateRoleInput;
}>;


export type CreateRoleMutation = { __typename?: 'Mutation', createRole?: { __typename?: 'Role', userId: string, missionPartnerId: string, name: RoleName } | null };

export type DeleteRolesMutationVariables = Exact<{
  userIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  missionPartnerId: Scalars['ID']['input'];
  name: RoleName;
}>;


export type DeleteRolesMutation = { __typename?: 'Mutation', deleteRoles?: any | null };

export type FindRolesByMissionPartnerIdQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
}>;


export type FindRolesByMissionPartnerIdQuery = { __typename?: 'Query', findRolesByMissionPartnerId?: Array<{ __typename?: 'RoleWithUserData', userId: string, userName: string, userEmail: string, userDate?: any | null, name: RoleName } | null> | null };

export type GetUserForRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserForRolesQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', roles?: Array<{ __typename?: 'Role', name: RoleName, missionPartnerId: string } | null> | null } | null };

export type GetServiceHealthQueryVariables = Exact<{ [key: string]: never; }>;


export type GetServiceHealthQuery = { __typename?: 'Query', getServiceHealth: { __typename?: 'ServiceHealthResponse', services: Array<{ __typename?: 'ServiceHealth', name: string, status: ServiceStatus }> } };

export type DisableSettingMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DisableSettingMutation = { __typename?: 'Mutation', disableSetting?: { __typename?: 'Setting', id: string, name: string, enabled: boolean } | null };

export type EnableSettingMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EnableSettingMutation = { __typename?: 'Mutation', enableSetting?: { __typename?: 'Setting', id: string, name: string, enabled: boolean } | null };

export type FindAllSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllSettingsQuery = { __typename?: 'Query', findAllSettings?: Array<{ __typename?: 'Setting', id: string, name: string, enabled: boolean } | null> | null };

export type FindSettingByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindSettingByIdQuery = { __typename?: 'Query', findSettingById?: { __typename?: 'Setting', id: string, name: string, enabled: boolean } | null };

export type FindSkillByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindSkillByIdQuery = { __typename?: 'Query', findSkillById?: { __typename?: 'Skill', id: string, title: string, vendors?: Array<string | null> | null, totalItems?: number | null, totalDuration?: number | null, enrolledLearners?: number | null, learningPaths?: Array<{ __typename?: 'LearningPath', id: string, title: string, schoolId: string, content: { __typename?: 'LearningPathContent', summary: string } } | null> | null, content: { __typename?: 'SkillContent', summary: string, description?: Array<string> | null, valuePropositions?: Array<{ __typename?: 'ValueProposition', title: string, summary: string }> | null, about: { __typename?: 'About', title: string, description?: Array<string> | null, image: string }, skillTree: { __typename?: 'SkillTree', title: string, description?: Array<string> | null, image?: string | null }, callToAction: { __typename?: 'CallToAction', title: string } } } | null };

export type CreateSurveyMutationVariables = Exact<{
  surveyInput: NewSurveyInput;
}>;


export type CreateSurveyMutation = { __typename?: 'Mutation', createSurvey?: { __typename?: 'Survey', id: string, missionPartnerId: string, name: string, description?: string | null, durationInMinutes?: number | null, status?: string | null, questions?: Array<any | null> | null, createdAt: any, updatedAt: any, missionPartner?: { __typename?: 'MissionPartner', name: string } | null } | null };

export type FindSurveyByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindSurveyByIdQuery = { __typename?: 'Query', findSurveyById?: { __typename: 'Survey', id: string, missionPartnerId: string, name: string, description?: string | null, durationInMinutes?: number | null, status?: string | null, questions?: Array<any | null> | null, createdAt: any, updatedAt: any, missionPartner?: { __typename?: 'MissionPartner', name: string } | null } | null };

export type PublishSurveyMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PublishSurveyMutation = { __typename?: 'Mutation', publishSurvey?: { __typename?: 'Survey', id: string, missionPartnerId: string, name: string, description?: string | null, durationInMinutes?: number | null, status?: string | null, questions?: Array<any | null> | null, createdAt: any, updatedAt: any, missionPartner?: { __typename?: 'MissionPartner', name: string } | null } | null };

export type UpdateSurveyMutationVariables = Exact<{
  input: UpdatedSurveyInput;
}>;


export type UpdateSurveyMutation = { __typename?: 'Mutation', updateSurvey?: { __typename?: 'Survey', id: string, missionPartnerId: string, name: string, description?: string | null, durationInMinutes?: number | null, status?: string | null, questions?: Array<any | null> | null, createdAt: any, updatedAt: any, missionPartner?: { __typename?: 'MissionPartner', name: string } | null } | null };

export type CountAllCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type CountAllCoursesQuery = { __typename?: 'Query', countAllCourses?: { __typename?: 'CourseCount', total?: number | null } | null };

export type GetTrainingPlanMetricsQueryVariables = Exact<{
  dayRange?: InputMaybe<Scalars['SafeInt']['input']>;
}>;


export type GetTrainingPlanMetricsQuery = { __typename?: 'Query', getTrainingPlanMetrics?: { __typename?: 'TrainingPlanMetrics', totalPlans: number, plansInProgress: number, plansCompleted: number } | null };

export type GetTranscriptCourseMetricsQueryVariables = Exact<{
  branch: Scalars['String']['input'];
  dayRange?: InputMaybe<Scalars['SafeInt']['input']>;
}>;


export type GetTranscriptCourseMetricsQuery = { __typename?: 'Query', getTranscriptCourseMetrics?: { __typename?: 'TranscriptCourseMetrics', totalCourses: number, coursesInProgress: number, coursesCompleted: number, coursesStopped: number, coursesPendingReview: number, totalHoursCompleted: number } | null };

export type GetTrainingPlanMetricsAllQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTrainingPlanMetricsAllQuery = { __typename?: 'Query', getTrainingPlanMetrics?: { __typename?: 'TrainingPlanMetrics', totalPlans: number, plansInProgress: number, plansCompleted: number, plansStopped: number, plansAssigned: number } | null };

export type GetTranscriptCourseMetricsExtraQueryVariables = Exact<{
  branch: Scalars['String']['input'];
  trainingGroup?: InputMaybe<Scalars['String']['input']>;
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  fieldCommand?: InputMaybe<Scalars['String']['input']>;
  spaceDelta?: InputMaybe<Scalars['String']['input']>;
  squadron?: InputMaybe<Scalars['String']['input']>;
  organization?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTranscriptCourseMetricsExtraQuery = { __typename?: 'Query', getTranscriptCourseMetrics?: { __typename?: 'TranscriptCourseMetrics', totalCourses: number, coursesInProgress: number, coursesCompleted: number, coursesStopped: number, coursesPendingReview: number, totalHoursCompleted: number } | null };

export type GetTrainingPlansByUserIdQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetTrainingPlansByUserIdQuery = { __typename?: 'Query', getTrainingPlansByUserId?: Array<{ __typename?: 'TrainingPlan', id: string, userId: string, planType: string, planSourceId: string, title: string, startedAt?: any | null, completedAt?: any | null, activities?: Array<{ __typename?: 'TrainingPlanActivity', activityType: string, masteryLevel?: string | null, startedAt?: any | null, markedCompletedAt?: any | null, completedAt?: any | null, value?: string | null, course?: { __typename?: 'Course', id: string, vendorId: string, vendorCourseId: string, courseTitle: string, courseUrl: string, courseDescription: string, courseDuration: number } | null, specialization?: { __typename?: 'Specialization', id: string, title: string, instructions: string, options?: Array<{ __typename?: 'SpecializationOption', title: string, text: string, value: string } | null> | null } | null } | null> | null, stats?: Array<{ __typename?: 'TrainingPlanStats', group: string, total: number, completed: number, completedPercentage: number, duration: number, completedAt?: any | null } | null> | null, nextActivity?: { __typename?: 'TrainingPlanActivity', activityType: string, masteryLevel?: string | null, startedAt?: any | null, markedCompletedAt?: any | null, completedAt?: any | null, value?: string | null, course?: { __typename?: 'Course', id: string, vendorId: string, vendorCourseId: string, courseTitle: string, courseUrl: string, courseDescription: string, courseDuration: number } | null, specialization?: { __typename?: 'Specialization', id: string, title: string, instructions: string, options?: Array<{ __typename?: 'SpecializationOption', title: string, text: string, value: string } | null> | null } | null } | null } | null> | null };

export type FindTranscriptTrainingPlansQueryVariables = Exact<{
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  groupId?: InputMaybe<Scalars['String']['input']>;
  planType?: InputMaybe<Scalars['String']['input']>;
  planSourceId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['String']['input']>;
  pageSize?: InputMaybe<Scalars['SafeInt']['input']>;
  pageNumber?: InputMaybe<Scalars['SafeInt']['input']>;
}>;


export type FindTranscriptTrainingPlansQuery = { __typename?: 'Query', findTranscriptTrainingPlans?: { __typename?: 'PaginatedTranscriptTrainingPlans', total: number, records: Array<{ __typename?: 'IndexedTranscriptTrainingPlan', userId: string, trainingPlanId: string, status: string, assignedAt?: any | null, startedAt?: any | null, stoppedAt?: any | null, completedAt?: any | null, trainingPlan: { __typename?: 'IndexedTranscriptTrainingPlan_TrainingPlan', planType: string, planSourceId: string, title: string }, user: { __typename?: 'IndexedTranscriptTrainingPlan_User', id: string, firstName: string, lastName: string, email: string } } | null> } | null };

export type GetAllTrainingPlansQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTrainingPlansQuery = { __typename?: 'Query', getAllTrainingPlans?: Array<{ __typename?: 'TrainingPlan', id: string, userId: string, planType: string, planSourceId: string, title: string, startedAt?: any | null, completedAt?: any | null, activities?: Array<{ __typename?: 'TrainingPlanActivity', activityType: string, masteryLevel?: string | null, startedAt?: any | null, markedCompletedAt?: any | null, completedAt?: any | null, value?: string | null, course?: { __typename?: 'Course', id: string, vendorId: string, vendorCourseId: string, courseTitle: string, courseUrl: string, courseDescription: string, courseDuration: number } | null, specialization?: { __typename?: 'Specialization', id: string, title: string, instructions: string, options?: Array<{ __typename?: 'SpecializationOption', title: string, text: string, value: string } | null> | null } | null } | null> | null, stats?: Array<{ __typename?: 'TrainingPlanStats', group: string, total: number, completed: number, completedPercentage: number, duration: number, completedAt?: any | null } | null> | null, nextActivity?: { __typename?: 'TrainingPlanActivity', activityType: string, masteryLevel?: string | null, startedAt?: any | null, markedCompletedAt?: any | null, completedAt?: any | null, value?: string | null, course?: { __typename?: 'Course', id: string, vendorId: string, vendorCourseId: string, courseTitle: string, courseUrl: string, courseDescription: string, courseDuration: number } | null, specialization?: { __typename?: 'Specialization', id: string, title: string, instructions: string, options?: Array<{ __typename?: 'SpecializationOption', title: string, text: string, value: string } | null> | null } | null } | null } | null> | null };

export type LearnerTrainingPlanQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type LearnerTrainingPlanQuery = { __typename?: 'Query', getTrainingPlansByUserId?: Array<{ __typename?: 'TrainingPlan', id: string, userId: string, planType: string, planSourceId: string, title: string, assignedAt?: any | null, startedAt?: any | null, completedAt?: any | null, stoppedAt?: any | null } | null> | null };

export type GetTopCoursesQueryVariables = Exact<{
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['SafeInt']['input']>;
}>;


export type GetTopCoursesQuery = { __typename?: 'Query', getTopCourses?: Array<{ __typename?: 'TopCourse', count: number, id: string, title: string } | null> | null };

export type GetTopPlansQueryVariables = Exact<{
  missionPartnerId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['SafeInt']['input']>;
}>;


export type GetTopPlansQuery = { __typename?: 'Query', getTopPlans?: Array<{ __typename?: 'TopPlan', title: string, planType: string, planSourceId: string, count: number } | null> | null };

export type GetUserUploadsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserUploadsQuery = { __typename?: 'Query', getUserUploads?: Array<{ __typename?: 'UploadRecord', id: string, userId: string, type: UploadType, requestedAt: any, completedAt?: any | null, title: string, parameters?: string | null, status: UploadStatus, error?: string | null } | null> | null };

export type DeleteUploadMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteUploadMutation = { __typename?: 'Mutation', deleteUpload?: any | null };

export type AddAssessmentsToUserMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  assessmentIds: Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>;
  missionPartnerId: Scalars['ID']['input'];
}>;


export type AddAssessmentsToUserMutation = { __typename?: 'Mutation', addAssessmentsToUser?: any | null };

export type AddCoursesToUserMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  courseIds: Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>;
  missionPartnerId: Scalars['ID']['input'];
}>;


export type AddCoursesToUserMutation = { __typename?: 'Mutation', addCoursesToUser?: Array<string | null> | null };

export type AddGroupMembershipMutationVariables = Exact<{
  input: AddGroupMembershipInput;
}>;


export type AddGroupMembershipMutation = { __typename?: 'Mutation', addGroupMembership?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email?: string | null, groupMemberships?: Array<{ __typename?: 'GroupMember', groupName: string } | null> | null } | null };

export type AddLicenseToUsersMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
  missionPartnerId: Scalars['ID']['input'];
  vendorId: Scalars['ID']['input'];
}>;


export type AddLicenseToUsersMutation = { __typename?: 'Mutation', addLicenseToUsers?: { __typename?: 'UploadRecord', id: string, status: UploadStatus, error?: string | null } | null };

export type UpdateRecentMissionPartnerMutationVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
}>;


export type UpdateRecentMissionPartnerMutation = { __typename?: 'Mutation', updateRecentMissionPartner?: any | null };

export type CountAllUsersQueryVariables = Exact<{
  branch?: InputMaybe<Scalars['String']['input']>;
  trainingGroup?: InputMaybe<Scalars['String']['input']>;
  fieldCommand?: InputMaybe<Scalars['String']['input']>;
  spaceDelta?: InputMaybe<Scalars['String']['input']>;
  squadron?: InputMaybe<Scalars['String']['input']>;
  organization?: InputMaybe<Scalars['String']['input']>;
}>;


export type CountAllUsersQuery = { __typename?: 'Query', countAllUsers?: any | null };

export type CountCacEnabledUsersQueryVariables = Exact<{
  branch: Scalars['String']['input'];
}>;


export type CountCacEnabledUsersQuery = { __typename?: 'Query', countCacEnabledUsers?: any | null };

export type CountNewUsersQueryVariables = Exact<{
  branch: Scalars['String']['input'];
  dayRange?: InputMaybe<Scalars['SafeInt']['input']>;
}>;


export type CountNewUsersQuery = { __typename?: 'Query', countNewUsers?: any | null };

export type ExportUsersMutationVariables = Exact<{
  branch?: InputMaybe<Scalars['String']['input']>;
}>;


export type ExportUsersMutation = { __typename?: 'Mutation', exportUsers?: any | null };

export type FindAwardedBadgesQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type FindAwardedBadgesQuery = { __typename?: 'Query', findAwardedBadges?: Array<{ __typename?: 'AwardedBadge', badgeId: string, title: string, description: string, recipient: string, imageUrl: string, jsonUrl: string, issuedAt: any, expiresAt: any } | null> | null };

export type FindLearnerCohortsQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  missionPartnerId: Scalars['ID']['input'];
}>;


export type FindLearnerCohortsQuery = { __typename?: 'Query', getUserCohorts?: Array<{ __typename?: 'UserCohorts', count: number, group: { __typename?: 'UserCohortResult', id: string, name: string, createdAt?: any | null }, missionPartner: { __typename?: 'UserCohortResult', id: string, name: string } } | null> | null };

export type FindUsersByGroupIdQueryVariables = Exact<{
  groupId: Scalars['String']['input'];
}>;


export type FindUsersByGroupIdQuery = { __typename?: 'Query', findUsersByGroupId?: Array<{ __typename?: 'User', id: string, email?: string | null, firstName?: string | null, lastName?: string | null } | null> | null };

export type FindUsersBySearchTextQueryVariables = Exact<{
  searchText: Scalars['String']['input'];
  branch?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['SafeInt']['input']>;
  pageSize?: InputMaybe<Scalars['SafeInt']['input']>;
}>;


export type FindUsersBySearchTextQuery = { __typename?: 'Query', findUsersBySearchText?: { __typename?: 'PaginatedUsersResult', total: any, records: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email?: string | null, photoUrl?: string | null, branch?: string | null, userType?: string | null, grade?: string | null, occupationalCode?: string | null, metadata?: any | null, currentCareer?: string | null, onboardingCompletedAt?: any | null, licenseOnboardingCompletedAt?: any | null, showThirdPartySiteWarning?: boolean | null, badgeNotifications?: Array<string | null> | null } | null> } | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, phoneNumber?: string | null, email?: string | null, photoUrl?: string | null, userType?: string | null, branch?: string | null, grade?: string | null, occupationalCode?: string | null, metadata?: any | null, trainingGroup?: string | null, currentCareer?: string | null, onboardingCompletedAt?: any | null, licenseOnboardingCompletedAt?: any | null, showThirdPartySiteWarning?: boolean | null, badgeNotifications?: Array<string | null> | null } | null };

export type GetRecentMissionPartnersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecentMissionPartnersQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', recentMissionPartners?: Array<{ __typename?: 'RecentMissionPartner', missionPartnerId: string, missionPartnerName: string, visitedAt: any } | null> | null } | null };

export type ImportBulkUsersMutationVariables = Exact<{
  bulkUploadFile: Scalars['Upload']['input'];
  missionPartnerId?: InputMaybe<Scalars['ID']['input']>;
  groupId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type ImportBulkUsersMutation = { __typename?: 'Mutation', importBulkUsers?: { __typename?: 'UploadRecord', id: string, status: UploadStatus, error?: string | null } | null };

export type ImportSingleUserMutationVariables = Exact<{
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  missionPartnerId?: InputMaybe<Scalars['ID']['input']>;
  groupId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type ImportSingleUserMutation = { __typename?: 'Mutation', importSingleUser?: { __typename?: 'User', id: string } | null };

export type RemoveGroupMembershipsMutationVariables = Exact<{
  groupId: Scalars['ID']['input'];
  userIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  missionPartnerId: Scalars['ID']['input'];
}>;


export type RemoveGroupMembershipsMutation = { __typename?: 'Mutation', removeGroupMemberships?: any | null };

export type RemoveMissionPartnerMembershipsMutationVariables = Exact<{
  userIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  missionPartnerId: Scalars['ID']['input'];
}>;


export type RemoveMissionPartnerMembershipsMutation = { __typename?: 'Mutation', removeMissionPartnerMemberships?: any | null };

export type ToggleAllowContractorAccessMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  allow?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type ToggleAllowContractorAccessMutation = { __typename?: 'Mutation', toggleAllowContractorAccess?: { __typename?: 'User', id: string, canAccessFullDu?: boolean | null } | null };

export type AddTrainingPlansToUserMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  plans: Array<InputMaybe<AddPlansInput>> | InputMaybe<AddPlansInput>;
  missionPartnerId: Scalars['ID']['input'];
}>;


export type AddTrainingPlansToUserMutation = { __typename?: 'Mutation', addTrainingPlansToUser: Array<{ __typename?: 'TrainingPlan', id: string, userId: string, planType: string, planSourceId: string } | null> };

export type CountActiveUsersByMissionPartnerIdQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
}>;


export type CountActiveUsersByMissionPartnerIdQuery = { __typename?: 'Query', countActiveUsersByMissionPartnerId?: number | null };

export type CountOnboardedUsersByMissionPartnerIdQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
}>;


export type CountOnboardedUsersByMissionPartnerIdQuery = { __typename?: 'Query', countOnboardedUsersByMissionPartnerId?: number | null };

export type CountUsersByMissionPartnerIdQueryVariables = Exact<{
  missionPartnerId: Scalars['ID']['input'];
}>;


export type CountUsersByMissionPartnerIdQuery = { __typename?: 'Query', countUsersByMissionPartnerId?: number | null };

export type FindFieldCommandsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindFieldCommandsQuery = { __typename?: 'Query', findFieldCommands?: Array<{ __typename?: 'FieldCommand', title: string } | null> | null };

export type FindOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindOrganizationsQuery = { __typename?: 'Query', findOrganizations?: Array<{ __typename?: 'Organization', title: string } | null> | null };

export type FindSpaceDeltasQueryVariables = Exact<{ [key: string]: never; }>;


export type FindSpaceDeltasQuery = { __typename?: 'Query', findSpaceDeltas?: Array<{ __typename?: 'SpaceDelta', title: string } | null> | null };

export type FindSquadronsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindSquadronsQuery = { __typename?: 'Query', findSquadrons?: Array<{ __typename?: 'Squadron', title: string } | null> | null };

export type FindUserByIdQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type FindUserByIdQuery = { __typename?: 'Query', findUserById?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email?: string | null, userType?: string | null, branch?: string | null, grade?: string | null, metadata?: any | null, testRecord?: string | null, canAccessFullDu?: boolean | null, occupationalCode?: string | null, photoUrl?: string | null, lastLoginAt?: any | null, keycloakUserCreatedAt?: any | null, totalTimeTrained?: number | null, skills?: Array<string | null> | null, groupMemberships?: Array<{ __typename?: 'GroupMember', groupName: string, userId: string, groupId: string } | null> | null } | null };

export type GetUserMissionPartnerTrialStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserMissionPartnerTrialStatusQuery = { __typename?: 'Query', getUserMissionPartnerTrialStatus?: { __typename?: 'MissionPartnerTrialStatus', hasExpiredTrial: boolean, missionPartner?: { __typename?: 'MissionPartner', id: string, name: string, trialStartDate?: any | null, trialEndDate?: any | null, trialEnabled: boolean } | null } | null };

export type RemoveUsersFromMissionPartnerMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
  missionPartnerId: Scalars['ID']['input'];
}>;


export type RemoveUsersFromMissionPartnerMutation = { __typename?: 'Mutation', removeUsersFromMissionPartner?: { __typename?: 'UploadRecord', id: string, status: UploadStatus, error?: string | null } | null };

export type RevokeVendorLicensesForUsersMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
  missionPartnerId: Scalars['ID']['input'];
  vendorId: Scalars['ID']['input'];
}>;


export type RevokeVendorLicensesForUsersMutation = { __typename?: 'Mutation', revokeVendorLicensesForUsers?: { __typename?: 'UploadRecord', id: string, status: UploadStatus, error?: string | null } | null };

export type CountAllVendorsQueryVariables = Exact<{ [key: string]: never; }>;


export type CountAllVendorsQuery = { __typename?: 'Query', countAllVendors?: any | null };

export type CountUniqueItemsAndVendorsBySourceQueryVariables = Exact<{
  source: Scalars['String']['input'];
}>;


export type CountUniqueItemsAndVendorsBySourceQuery = { __typename?: 'Query', countUniqueItemsAndVendorsBySource?: { __typename?: 'UniqueItemsAndVendorsResponse', items?: number | null, vendors?: number | null } | null };

export type CreateVendorMutationVariables = Exact<{
  input: CreateVendorInput;
}>;


export type CreateVendorMutation = { __typename?: 'Mutation', createVendor?: { __typename?: 'Vendor', id: string, name: string, isLicensed?: boolean | null } | null };

export type FindAllVendorsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllVendorsQuery = { __typename?: 'Query', findAllVendors?: Array<{ __typename?: 'Vendor', id: string, name: string, provisioned?: number | null, assigned?: number | null, isLicensed?: boolean | null } | null> | null };

export type FindLicensedVendorsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindLicensedVendorsQuery = { __typename?: 'Query', findLicensedVendors?: Array<{ __typename?: 'Vendor', id: string, name: string, provisioned?: number | null, assigned?: number | null, isLicensed?: boolean | null } | null> | null };

export type FindVendorByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindVendorByIdQuery = { __typename?: 'Query', findVendorById?: { __typename?: 'Vendor', id: string, name: string, provisioned?: number | null, assigned?: number | null } | null };

export type UpdateVendorMutationVariables = Exact<{
  input: UpdateVendorInput;
}>;


export type UpdateVendorMutation = { __typename?: 'Mutation', updateVendor?: { __typename?: 'Vendor', id: string, name: string } | null };

export const CoreTrainingPlanProgressFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"coreTrainingPlanProgress"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TrainingPlanProgress"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"notStarted"}},{"kind":"Field","name":{"kind":"Name","value":"inProgress"}},{"kind":"Field","name":{"kind":"Name","value":"pendingReview"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode<CoreTrainingPlanProgressFragment, unknown>;
export const FindAllAffiliatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllAffiliates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllAffiliates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<FindAllAffiliatesQuery, FindAllAffiliatesQueryVariables>;
export const CreateManualAssessmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateManualAssessment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessment"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssessmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createManualAssessment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessment"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorAssessmentId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTitle"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentDescription"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentUrl"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentImage"}},{"kind":"Field","name":{"kind":"Name","value":"source"}}]}}]}}]} as unknown as DocumentNode<CreateManualAssessmentMutation, CreateManualAssessmentMutationVariables>;
export const FindAssessmentsBySourceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAssessmentsBySource"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAssessmentsBySource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTitle"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentDescription"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentImage"}},{"kind":"Field","name":{"kind":"Name","value":"dateUpdated"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}}]}}]}}]} as unknown as DocumentNode<FindAssessmentsBySourceQuery, FindAssessmentsBySourceQueryVariables>;
export const FindLearnerAssessmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findLearnerAssessments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAssessmentsByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTitle"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"vendorAssessmentId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"markedCompletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<FindLearnerAssessmentsQuery, FindLearnerAssessmentsQueryVariables>;
export const GetAssessmentByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAssessmentById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAssessmentById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTitle"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentDescription"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentImage"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentUrl"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"dateUpdated"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"vendorAssessmentId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}}]}}]}}]} as unknown as DocumentNode<GetAssessmentByIdQuery, GetAssessmentByIdQueryVariables>;
export const UpdateAssessmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAssessment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessment"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssessmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAssessment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessment"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorAssessmentId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTitle"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentDescription"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentUrl"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentImage"}},{"kind":"Field","name":{"kind":"Name","value":"source"}}]}}]}}]} as unknown as DocumentNode<UpdateAssessmentMutation, UpdateAssessmentMutationVariables>;
export const ExportBadgesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ExportBadges"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ownerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"badgeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exportBadges"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ownerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ownerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"badgeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"badgeId"}}}]}]}}]} as unknown as DocumentNode<ExportBadgesMutation, ExportBadgesMutationVariables>;
export const GetAllAwardedBadgesByMissionPartnerMembershipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllAwardedBadgesByMissionPartnerMembership"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllAwardedBadgesByMissionPartnerMembership"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"id"},"name":{"kind":"Name","value":"badgeId"}},{"kind":"Field","alias":{"kind":"Name","value":"imageUrl"},"name":{"kind":"Name","value":"badgeImage"}},{"kind":"Field","alias":{"kind":"Name","value":"title"},"name":{"kind":"Name","value":"badgeTitle"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","alias":{"kind":"Name","value":"missionPartnerCount"},"name":{"kind":"Name","value":"missionPartnerMembersAwarded"}}]}}]}}]} as unknown as DocumentNode<GetAllAwardedBadgesByMissionPartnerMembershipQuery, GetAllAwardedBadgesByMissionPartnerMembershipQueryVariables>;
export const GetMissionPartnerOwnedBadgesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMissionPartnerOwnedBadges"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMissionPartnerOwnedBadges"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"id"},"name":{"kind":"Name","value":"badgeId"}},{"kind":"Field","alias":{"kind":"Name","value":"imageUrl"},"name":{"kind":"Name","value":"badgeImage"}},{"kind":"Field","alias":{"kind":"Name","value":"title"},"name":{"kind":"Name","value":"badgeTitle"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","alias":{"kind":"Name","value":"count"},"name":{"kind":"Name","value":"totalAwarded"}},{"kind":"Field","alias":{"kind":"Name","value":"missionPartnerCount"},"name":{"kind":"Name","value":"missionPartnerMembersAwarded"}}]}}]}}]} as unknown as DocumentNode<GetMissionPartnerOwnedBadgesQuery, GetMissionPartnerOwnedBadgesQueryVariables>;
export const FindCatalogResultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCatalogResults"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchAfter"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"excludeCustomContent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCatalogResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchAfter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchAfter"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"vendorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"planType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planType"}}},{"kind":"Argument","name":{"kind":"Name","value":"excludeCustomContent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"excludeCustomContent"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorCourseId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"courseDescription"}},{"kind":"Field","name":{"kind":"Name","value":"courseDuration"}},{"kind":"Field","name":{"kind":"Name","value":"courseTitle"}},{"kind":"Field","name":{"kind":"Name","value":"courseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}},{"kind":"Field","name":{"kind":"Name","value":"totalReviews"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Assessment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorAssessmentId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTitle"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentDescription"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentUrl"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentImage"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"source"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LearningPath"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"schoolId"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"vendors"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"enrolledLearners"}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}},{"kind":"Field","name":{"kind":"Name","value":"totalReviews"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ForceMultiplier"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","alias":{"kind":"Name","value":"fmStatus"},"name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"learningPathUri"}},{"kind":"Field","name":{"kind":"Name","value":"totalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"unsequenced"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"totalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"vendors"}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}},{"kind":"Field","name":{"kind":"Name","value":"totalReviews"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Skill"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vendors"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"enrolledLearners"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Survey"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lab"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}},{"kind":"Field","name":{"kind":"Name","value":"totalReviews"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchAfter"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FindCatalogResultsQuery, FindCatalogResultsQueryVariables>;
export const FindContentByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindContentById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findContentById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<FindContentByIdQuery, FindContentByIdQueryVariables>;
export const DeleteBannerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteBanner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBanner"}}]}}]} as unknown as DocumentNode<DeleteBannerMutation, DeleteBannerMutationVariables>;
export const DeleteAlertBannerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteAlertBanner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAlertBanner"}}]}}]} as unknown as DocumentNode<DeleteAlertBannerMutation, DeleteAlertBannerMutationVariables>;
export const UpdateGlobalBannerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateGlobalBanner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isDismissable"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAlertBanner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}},{"kind":"Argument","name":{"kind":"Name","value":"isDismissable"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isDismissable"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"isDismissable"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateGlobalBannerMutation, UpdateGlobalBannerMutationVariables>;
export const UpdateBannerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateBanner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"buttonText"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"buttonLink"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"logo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBanner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}},{"kind":"Argument","name":{"kind":"Name","value":"buttonText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"buttonText"}}},{"kind":"Argument","name":{"kind":"Name","value":"buttonLink"},"value":{"kind":"Variable","name":{"kind":"Name","value":"buttonLink"}}},{"kind":"Argument","name":{"kind":"Name","value":"logo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"logo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"buttonText"}},{"kind":"Field","name":{"kind":"Name","value":"buttonLink"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateBannerMutation, UpdateBannerMutationVariables>;
export const FindCourseByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCourseById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCourseById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"courseTitle"}},{"kind":"Field","name":{"kind":"Name","value":"courseDescription"}},{"kind":"Field","name":{"kind":"Name","value":"courseDuration"}},{"kind":"Field","name":{"kind":"Name","value":"courseImage"}},{"kind":"Field","name":{"kind":"Name","value":"dateUpdated"}},{"kind":"Field","name":{"kind":"Name","value":"courseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"vendorCourseId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"source"}}]}}]}}]} as unknown as DocumentNode<FindCourseByIdQuery, FindCourseByIdQueryVariables>;
export const AggregateTrainingPlanVersionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AggregateTrainingPlanVersions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planSourceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregateTrainingPlanVersions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"planType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planType"}}},{"kind":"Argument","name":{"kind":"Name","value":"planSourceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planSourceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"versions"}},{"kind":"Field","name":{"kind":"Name","value":"versionEnabled"}}]}}]}}]} as unknown as DocumentNode<AggregateTrainingPlanVersionsQuery, AggregateTrainingPlanVersionsQueryVariables>;
export const AggregateTranscriptCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AggregateTranscriptCourses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortField"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregateTranscriptCourses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"vendorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortField"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortField"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courseId"}},{"kind":"Field","name":{"kind":"Name","value":"courseTitle"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"started"}},{"kind":"Field","name":{"kind":"Name","value":"stopped"}},{"kind":"Field","name":{"kind":"Name","value":"pendingReview"}},{"kind":"Field","name":{"kind":"Name","value":"markedCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}}]}}]}}]} as unknown as DocumentNode<AggregateTranscriptCoursesQuery, AggregateTranscriptCoursesQueryVariables>;
export const AggregateTranscriptItemsForTrainingPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AggregateTranscriptItemsForTrainingPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planSourceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planVersion"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregateTranscriptItemsForTrainingPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"planType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planType"}}},{"kind":"Argument","name":{"kind":"Name","value":"planSourceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planSourceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"planVersion"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planVersion"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"itemTitle"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"started"}},{"kind":"Field","name":{"kind":"Name","value":"stopped"}},{"kind":"Field","name":{"kind":"Name","value":"pendingReview"}},{"kind":"Field","name":{"kind":"Name","value":"markedCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}}]}}]} as unknown as DocumentNode<AggregateTranscriptItemsForTrainingPlanQuery, AggregateTranscriptItemsForTrainingPlanQueryVariables>;
export const CreateAdminManagedCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAdminManagedCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"course"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CourseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAdminManagedCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"course"},"value":{"kind":"Variable","name":{"kind":"Name","value":"course"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorCourseId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"courseDescription"}},{"kind":"Field","name":{"kind":"Name","value":"courseDuration"}},{"kind":"Field","name":{"kind":"Name","value":"courseTitle"}},{"kind":"Field","name":{"kind":"Name","value":"courseUrl"}}]}}]}}]} as unknown as DocumentNode<CreateAdminManagedCourseMutation, CreateAdminManagedCourseMutationVariables>;
export const FindCoursesBySourceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findCoursesBySource"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCoursesBySource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"courseTitle"}},{"kind":"Field","name":{"kind":"Name","value":"courseDescription"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"vendorCourseId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FindCoursesBySourceQuery, FindCoursesBySourceQueryVariables>;
export const FindTranscriptCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindTranscriptCourses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planSourceId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userSearch"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseTitleSearch"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortField"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branch"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findTranscriptCourses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}},{"kind":"Argument","name":{"kind":"Name","value":"planType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planType"}}},{"kind":"Argument","name":{"kind":"Name","value":"planSourceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planSourceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"userSearch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userSearch"}}},{"kind":"Argument","name":{"kind":"Name","value":"courseTitleSearch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseTitleSearch"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortField"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortField"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"branch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branch"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"courseId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"stoppedAt"}},{"kind":"Field","name":{"kind":"Name","value":"pendingReviewAt"}},{"kind":"Field","name":{"kind":"Name","value":"markedCompletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"courseTitle"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorCourseId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FindTranscriptCoursesQuery, FindTranscriptCoursesQueryVariables>;
export const FindTranscriptCoursesByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findTranscriptCoursesByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findTranscriptCoursesByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"courseTitle"}},{"kind":"Field","name":{"kind":"Name","value":"courseDescription"}},{"kind":"Field","name":{"kind":"Name","value":"courseDuration"}},{"kind":"Field","name":{"kind":"Name","value":"courseImage"}},{"kind":"Field","name":{"kind":"Name","value":"dateUpdated"}},{"kind":"Field","name":{"kind":"Name","value":"courseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"markedCompletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FindTranscriptCoursesByUserIdQuery, FindTranscriptCoursesByUserIdQueryVariables>;
export const GetMetricsByGroupIdCourseIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMetricsByGroupIdCourseId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMetricsByGroupIdCourseId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<GetMetricsByGroupIdCourseIdQuery, GetMetricsByGroupIdCourseIdQueryVariables>;
export const GetVendorsForAggregateTranscriptCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVendorsForAggregateTranscriptCourses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVendorsForAggregateTranscriptCourses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}}]}}]}}]} as unknown as DocumentNode<GetVendorsForAggregateTranscriptCoursesQuery, GetVendorsForAggregateTranscriptCoursesQueryVariables>;
export const StartIndividualCourseByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"startIndividualCourseById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startIndividualCourseById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"courseTitle"}},{"kind":"Field","name":{"kind":"Name","value":"courseDescription"}},{"kind":"Field","name":{"kind":"Name","value":"courseDuration"}},{"kind":"Field","name":{"kind":"Name","value":"courseImage"}},{"kind":"Field","name":{"kind":"Name","value":"dateUpdated"}},{"kind":"Field","name":{"kind":"Name","value":"courseUrl"}}]}}]}}]} as unknown as DocumentNode<StartIndividualCourseByIdMutation, StartIndividualCourseByIdMutationVariables>;
export const StopIndividualCourseByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"stopIndividualCourseById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopIndividualCourseById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"courseTitle"}},{"kind":"Field","name":{"kind":"Name","value":"courseDescription"}},{"kind":"Field","name":{"kind":"Name","value":"courseDuration"}},{"kind":"Field","name":{"kind":"Name","value":"courseImage"}},{"kind":"Field","name":{"kind":"Name","value":"dateUpdated"}},{"kind":"Field","name":{"kind":"Name","value":"courseUrl"}}]}}]}}]} as unknown as DocumentNode<StopIndividualCourseByIdMutation, StopIndividualCourseByIdMutationVariables>;
export const UpdateAdminManagedCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAdminManagedCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"course"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CourseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAdminManagedCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"course"},"value":{"kind":"Variable","name":{"kind":"Name","value":"course"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorCourseId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"courseDescription"}},{"kind":"Field","name":{"kind":"Name","value":"courseDuration"}},{"kind":"Field","name":{"kind":"Name","value":"courseTitle"}},{"kind":"Field","name":{"kind":"Name","value":"courseUrl"}}]}}]}}]} as unknown as DocumentNode<UpdateAdminManagedCourseMutation, UpdateAdminManagedCourseMutationVariables>;
export const AssociateDomainToKsatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssociateDomainToKsat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ksatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"domainId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"associateDomainToKsat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ksatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ksatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"domainId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"domainId"}}}]}]}}]} as unknown as DocumentNode<AssociateDomainToKsatMutation, AssociateDomainToKsatMutationVariables>;
export const AssociateJobRolesToKsatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssociateJobRolesToKsat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ksatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobRoleIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"associateJobRolesToKsat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ksatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ksatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"jobRoleIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobRoleIds"}}}]}]}}]} as unknown as DocumentNode<AssociateJobRolesToKsatMutation, AssociateJobRolesToKsatMutationVariables>;
export const AssociateLearningObjectivesToKsatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssociateLearningObjectivesToKsat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ksatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"learningObjectiveIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"associateLearningObjectivesToKsat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ksatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ksatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"learningObjectiveIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"learningObjectiveIds"}}}]}]}}]} as unknown as DocumentNode<AssociateLearningObjectivesToKsatMutation, AssociateLearningObjectivesToKsatMutationVariables>;
export const CreateDomainDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDomain"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateDomainInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDomain"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<CreateDomainMutation, CreateDomainMutationVariables>;
export const FindDomainsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindDomains"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DomainFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortByMostRelevant"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortByMostRelevant"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortDirection"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DomainSortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findDomains"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortByMostRelevant"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortByMostRelevant"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FindDomainsQuery, FindDomainsQueryVariables>;
export const FindDomainsLazyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindDomainsLazy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DomainFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortByMostRelevant"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortByMostRelevant"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortDirection"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DomainSortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findDomains"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortByMostRelevant"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortByMostRelevant"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FindDomainsLazyQuery, FindDomainsLazyQueryVariables>;
export const GetDomainDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDomain"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getDomainId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDomain"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getDomainId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetDomainQuery, GetDomainQueryVariables>;
export const UpdateDomainDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDomain"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateDomainId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDomainInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDomain"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateDomainId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateDomainMutation, UpdateDomainMutationVariables>;
export const CreateKsatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateKsat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateKsatInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createKsat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"domain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ksatType"}}]}}]}}]} as unknown as DocumentNode<CreateKsatMutation, CreateKsatMutationVariables>;
export const FindKsatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindKsats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"KsatFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortDirection"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"KsatSortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findKsats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ksatType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"domain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<FindKsatsQuery, FindKsatsQueryVariables>;
export const GetKsatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetKsat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getKsatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getKsat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getKsatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"ksatType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"domain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<GetKsatQuery, GetKsatQueryVariables>;
export const UpdateKsatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateKsat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateKsatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateKsatInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateKsat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateKsatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"ksatType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"domain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateKsatMutation, UpdateKsatMutationVariables>;
export const CreateLearningObjectiveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLearningObjective"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateLearningObjectiveInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLearningObjective"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<CreateLearningObjectiveMutation, CreateLearningObjectiveMutationVariables>;
export const FindLearningObjectivesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindLearningObjectives"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LearningObjectiveFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortDirection"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LearningObjectiveSortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findLearningObjectives"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FindLearningObjectivesQuery, FindLearningObjectivesQueryVariables>;
export const GetLearningObjectiveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLearningObjective"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getLearningObjectiveId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLearningObjective"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getLearningObjectiveId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetLearningObjectiveQuery, GetLearningObjectiveQueryVariables>;
export const UpdateLearningObjectiveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLearningObjective"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateLearningObjectiveId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateLearningObjectiveInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLearningObjective"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateLearningObjectiveId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateLearningObjectiveMutation, UpdateLearningObjectiveMutationVariables>;
export const CreateJobRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateJobRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateJobRoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createJobRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roleId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<CreateJobRoleMutation, CreateJobRoleMutationVariables>;
export const FindJobRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindJobRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JobRoleFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortDirection"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JobRoleSortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findJobRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roleId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FindJobRolesQuery, FindJobRolesQueryVariables>;
export const GetJobRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetJobRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getJobRoleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getJobRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getJobRoleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roleId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetJobRoleQuery, GetJobRoleQueryVariables>;
export const UpdateJobRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateJobRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateJobRoleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateJobRoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateJobRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateJobRoleId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roleId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateJobRoleMutation, UpdateJobRoleMutationVariables>;
export const GetUserDownloadsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserDownloads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserDownloads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"requestedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"parameters"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<GetUserDownloadsQuery, GetUserDownloadsQueryVariables>;
export const DeleteDownloadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteDownload"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteDownload"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteDownloadMutation, DeleteDownloadMutationVariables>;
export const CreateForceMultiplierDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateForceMultiplier"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"summary"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createForceMultiplier"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"summary"},"value":{"kind":"Variable","name":{"kind":"Name","value":"summary"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]}}]} as unknown as DocumentNode<CreateForceMultiplierMutation, CreateForceMultiplierMutationVariables>;
export const CreateNewForceMultiplierVersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateNewForceMultiplierVersion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createNewForceMultiplierVersion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"learningPathUri"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"about"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"imageAltText"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conditions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"all"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"operator"}},{"kind":"Field","name":{"kind":"Name","value":"fact"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateNewForceMultiplierVersionMutation, CreateNewForceMultiplierVersionMutationVariables>;
export const DeleteLibraryItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteLibraryItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteLibraryItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteLibraryItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"libraryItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteLibraryItemMutation, DeleteLibraryItemMutationVariables>;
export const FetchForceMultiplierHeaderDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchForceMultiplierHeaderData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"forceMultiplerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findLatestForceMultiplierByIdAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"forceMultiplerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]}}]} as unknown as DocumentNode<FetchForceMultiplierHeaderDataQuery, FetchForceMultiplierHeaderDataQueryVariables>;
export const FindLatestForceMultiplierByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindLatestForceMultiplierById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"forceMultiplerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findLatestForceMultiplierById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"forceMultiplerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"learningPathUri"}},{"kind":"Field","name":{"kind":"Name","value":"totalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"unsequenced"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"about"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"imageAltText"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendorCourseId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"courseTitle"}},{"kind":"Field","name":{"kind":"Name","value":"courseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"courseDuration"}},{"kind":"Field","name":{"kind":"Name","value":"source"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Assessment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendorAssessmentId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTitle"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentUrl"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"source"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Survey"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lab"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"libraryItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conditions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"all"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"operator"}},{"kind":"Field","name":{"kind":"Name","value":"fact"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"totalDuration"}}]}}]}}]} as unknown as DocumentNode<FindLatestForceMultiplierByIdQuery, FindLatestForceMultiplierByIdQueryVariables>;
export const FindLatestForceMultiplierByIdAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindLatestForceMultiplierByIdAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"forceMultiplerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findLatestForceMultiplierByIdAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"forceMultiplerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"learningPathUri"}},{"kind":"Field","name":{"kind":"Name","value":"totalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"unsequenced"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"about"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"imageAltText"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendorCourseId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"courseTitle"}},{"kind":"Field","name":{"kind":"Name","value":"courseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"courseDuration"}},{"kind":"Field","name":{"kind":"Name","value":"source"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Assessment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendorAssessmentId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentTitle"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentUrl"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"source"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Survey"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lab"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"libraryItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conditions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"all"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"operator"}},{"kind":"Field","name":{"kind":"Name","value":"fact"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"totalDuration"}}]}}]}}]} as unknown as DocumentNode<FindLatestForceMultiplierByIdAdminQuery, FindLatestForceMultiplierByIdAdminQueryVariables>;
export const RemoveItemFromForceMultiplierDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveItemFromForceMultiplier"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveItemFromForceMultiplierInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeItemFromForceMultiplier"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveItemFromForceMultiplierMutation, RemoveItemFromForceMultiplierMutationVariables>;
export const UpdateForceMultiplierDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateForceMultiplier"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ForceMultiplierInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateForceMultiplier"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"learningPathUri"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"modules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"about"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"imageAltText"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"libraryItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conditions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"all"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"operator"}},{"kind":"Field","name":{"kind":"Name","value":"fact"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateForceMultiplierMutation, UpdateForceMultiplierMutationVariables>;
export const UpdateForceMultiplierContentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateForceMultiplierContent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateForceMultiplierContentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateForceMultiplierContent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"learningPathUri"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"about"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"imageAltText"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conditions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"all"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"operator"}},{"kind":"Field","name":{"kind":"Name","value":"fact"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateForceMultiplierContentMutation, UpdateForceMultiplierContentMutationVariables>;
export const UpdateLibraryItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLibraryItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateLibraryItemsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLibraryItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"libraryItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateLibraryItemsMutation, UpdateLibraryItemsMutationVariables>;
export const UploadForceMultiplierImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadForceMultiplierImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadForceMultiplierImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<UploadForceMultiplierImageMutation, UploadForceMultiplierImageMutationVariables>;
export const UploadLibraryItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadLibraryItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadLibraryItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadLibraryItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"libraryItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<UploadLibraryItemMutation, UploadLibraryItemMutationVariables>;
export const AddCoursesToGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddCoursesToGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCoursesToGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"courseIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}]}]}}]} as unknown as DocumentNode<AddCoursesToGroupMutation, AddCoursesToGroupMutationVariables>;
export const AddTrainingPlansToGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddTrainingPlansToGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"plans"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddPlansInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTrainingPlansToGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"plans"},"value":{"kind":"Variable","name":{"kind":"Name","value":"plans"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}]}]}}]} as unknown as DocumentNode<AddTrainingPlansToGroupMutation, AddTrainingPlansToGroupMutationVariables>;
export const CreateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"groupMemberCount"}}]}}]}}]} as unknown as DocumentNode<CreateGroupMutation, CreateGroupMutationVariables>;
export const DeleteGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}]}]}}]} as unknown as DocumentNode<DeleteGroupMutation, DeleteGroupMutationVariables>;
export const FindGroupByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findGroupById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findGroupById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerName"}},{"kind":"Field","name":{"kind":"Name","value":"groupMemberCount"}},{"kind":"Field","name":{"kind":"Name","value":"trainingPlans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"planType"}},{"kind":"Field","name":{"kind":"Name","value":"planVersion"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isLatestVersion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courseId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"courseTitle"}}]}}]}}]}}]} as unknown as DocumentNode<FindGroupByIdQuery, FindGroupByIdQueryVariables>;
export const FindGroupsByMissionPartnerIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findGroupsByMissionPartnerId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findGroupsByMissionPartnerId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"groupMemberCount"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerName"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"trainingPlans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"planType"}},{"kind":"Field","name":{"kind":"Name","value":"planVersion"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isLatestVersion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courseId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"courseTitle"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"CREATED_AT"}},{"kind":"Field","name":{"kind":"Name","value":"SAVED_AT"}}]}}]}}]} as unknown as DocumentNode<FindGroupsByMissionPartnerIdQuery, FindGroupsByMissionPartnerIdQueryVariables>;
export const GetCourseProgressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCourseProgress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCourseProgress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"notStarted"}},{"kind":"Field","name":{"kind":"Name","value":"inProgress"}},{"kind":"Field","name":{"kind":"Name","value":"pendingReview"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}}]}}]} as unknown as DocumentNode<GetCourseProgressQuery, GetCourseProgressQueryVariables>;
export const GetTrainingPlanProgressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTrainingPlanProgress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planSourceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planVersion"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTrainingPlanProgress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"planSourceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planSourceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"planType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planType"}}},{"kind":"Argument","name":{"kind":"Name","value":"planVersion"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planVersion"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"coreTrainingPlanProgress"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"notStarted"}},{"kind":"Field","name":{"kind":"Name","value":"inProgress"}},{"kind":"Field","name":{"kind":"Name","value":"pendingReview"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"coreTrainingPlanProgress"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TrainingPlanProgress"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"notStarted"}},{"kind":"Field","name":{"kind":"Name","value":"inProgress"}},{"kind":"Field","name":{"kind":"Name","value":"pendingReview"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode<GetTrainingPlanProgressQuery, GetTrainingPlanProgressQueryVariables>;
export const UpdateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"groupMemberCount"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}}]}}]}}]} as unknown as DocumentNode<UpdateGroupMutation, UpdateGroupMutationVariables>;
export const AddHostedCourseProgressItemQuizCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addHostedCourseProgressItemQuizComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedCourseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lessonId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addHostedCourseProgressItemQuizComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostedCourseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedCourseId"}}},{"kind":"Argument","name":{"kind":"Name","value":"lessonId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lessonId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"questionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"hostedCourseId"}},{"kind":"Field","name":{"kind":"Name","value":"items"}}]}}]}}]} as unknown as DocumentNode<AddHostedCourseProgressItemQuizCommentMutation, AddHostedCourseProgressItemQuizCommentMutationVariables>;
export const FindHostedCourseProgressByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindHostedCourseProgressById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedCourseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findHostedCourseProgressById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"hostedCourseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedCourseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"hostedCourseId"}},{"kind":"Field","name":{"kind":"Name","value":"items"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<FindHostedCourseProgressByIdQuery, FindHostedCourseProgressByIdQueryVariables>;
export const UpdateHostedCourseProgressItemQuizAnswersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateHostedCourseProgressItemQuizAnswers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedCourseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lessonId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"answers"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateHostedCourseProgressItemQuizAnswers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostedCourseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedCourseId"}}},{"kind":"Argument","name":{"kind":"Name","value":"lessonId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lessonId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"answers"},"value":{"kind":"Variable","name":{"kind":"Name","value":"answers"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"hostedCourseId"}},{"kind":"Field","name":{"kind":"Name","value":"items"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<UpdateHostedCourseProgressItemQuizAnswersMutation, UpdateHostedCourseProgressItemQuizAnswersMutationVariables>;
export const AddHostedCourseItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddHostedCourseItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HostedCourseItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addHostedCourseItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<AddHostedCourseItemMutation, AddHostedCourseItemMutationVariables>;
export const CreateHostedCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateHostedCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedCourseInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewHostedCourseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createHostedCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostedCourseInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedCourseInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateHostedCourseMutation, CreateHostedCourseMutationVariables>;
export const FindHostedCourseByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindHostedCourseById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findHostedCourseById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"items"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<FindHostedCourseByIdQuery, FindHostedCourseByIdQueryVariables>;
export const FindHostedCourseItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindHostedCourseItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findHostedCourseItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<FindHostedCourseItemQuery, FindHostedCourseItemQueryVariables>;
export const PublishHostedCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PublishHostedCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishHostedCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"items"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<PublishHostedCourseMutation, PublishHostedCourseMutationVariables>;
export const UpdateHostedCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateHostedCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatedHostedCourseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateHostedCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"items"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateHostedCourseMutation, UpdateHostedCourseMutationVariables>;
export const UpdateHostedCourseItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateHostedCourseItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HostedCourseItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateHostedCourseItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<UpdateHostedCourseItemMutation, UpdateHostedCourseItemMutationVariables>;
export const UploadHostedCourseImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadHostedCourseImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadHostedCourseImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<UploadHostedCourseImageMutation, UploadHostedCourseImageMutationVariables>;
export const UploadHostedVideoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadHostedVideo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HostedVideoInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadHostedVideo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"items"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UploadHostedVideoMutation, UploadHostedVideoMutationVariables>;
export const UploadOfficeFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadOfficeFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficeFileInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadOfficeFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"items"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UploadOfficeFileMutation, UploadOfficeFileMutationVariables>;
export const AddHostedExamProgressCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addHostedExamProgressComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addHostedExamProgressComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostedExamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"questionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<AddHostedExamProgressCommentMutation, AddHostedExamProgressCommentMutationVariables>;
export const CreateHostedExamProgressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createHostedExamProgress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createHostedExamProgress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostedExamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"answers"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}}]}}]}}]} as unknown as DocumentNode<CreateHostedExamProgressMutation, CreateHostedExamProgressMutationVariables>;
export const FindHostedExamProgressByExamIdUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findHostedExamProgressByExamIdUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findHostedExamProgressByExamIdUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostedExamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"answers"}}]}}]}}]} as unknown as DocumentNode<FindHostedExamProgressByExamIdUserIdQuery, FindHostedExamProgressByExamIdUserIdQueryVariables>;
export const UpdateHostedExamProgressAnswersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateHostedExamProgressAnswers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"answers"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateHostedExamProgressAnswers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostedExamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"answers"},"value":{"kind":"Variable","name":{"kind":"Name","value":"answers"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"answers"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateHostedExamProgressAnswersMutation, UpdateHostedExamProgressAnswersMutationVariables>;
export const UpdateHostedExamProgressStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateHostedExamProgressStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateHostedExamProgressStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostedExamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"answers"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateHostedExamProgressStatusMutation, UpdateHostedExamProgressStatusMutationVariables>;
export const AddHostedExamQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addHostedExamQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addHostedExamQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostedExamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"questionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionInput"}}}]}]}}]} as unknown as DocumentNode<AddHostedExamQuestionMutation, AddHostedExamQuestionMutationVariables>;
export const AddItemsToTrainingCriteriaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addItemsToTrainingCriteria"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trainingCriteriaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assignedTrainingInput"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssignedTrainingInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addItemsToTrainingCriteria"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostedExamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"trainingCriteriaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trainingCriteriaId"}}},{"kind":"Argument","name":{"kind":"Name","value":"assignedTrainingInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assignedTrainingInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"trainingCriteria"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maxScore"}},{"kind":"Field","name":{"kind":"Name","value":"minScore"}},{"kind":"Field","name":{"kind":"Name","value":"ruleType"}},{"kind":"Field","name":{"kind":"Name","value":"training"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"courseId"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentId"}},{"kind":"Field","name":{"kind":"Name","value":"planType"}},{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"planVersion"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"requiredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vendors"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddItemsToTrainingCriteriaMutation, AddItemsToTrainingCriteriaMutationVariables>;
export const AddTrainingCriteriaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addTrainingCriteria"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trainingCriteriaInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddTrainingCriteriaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTrainingCriteria"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostedExamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"trainingCriteriaInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trainingCriteriaInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"trainingCriteria"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minScore"}},{"kind":"Field","name":{"kind":"Name","value":"maxScore"}},{"kind":"Field","name":{"kind":"Name","value":"ruleType"}}]}}]}}]}}]} as unknown as DocumentNode<AddTrainingCriteriaMutation, AddTrainingCriteriaMutationVariables>;
export const CreateHostedExamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateHostedExam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewHostedExamInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createHostedExam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostedExamInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateHostedExamMutation, CreateHostedExamMutationVariables>;
export const DeleteTrainingCriteriaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTrainingCriteria"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trainingCriteriaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTrainingCriteria"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostedExamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"trainingCriteriaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trainingCriteriaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"trainingCriteria"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minScore"}},{"kind":"Field","name":{"kind":"Name","value":"maxScore"}},{"kind":"Field","name":{"kind":"Name","value":"ruleType"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteTrainingCriteriaMutation, DeleteTrainingCriteriaMutationVariables>;
export const FindHostedExamByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindHostedExamById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findHostedExamById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostedExamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"questions"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"passingScore"}},{"kind":"Field","name":{"kind":"Name","value":"trainingCriteria"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maxScore"}},{"kind":"Field","name":{"kind":"Name","value":"minScore"}},{"kind":"Field","name":{"kind":"Name","value":"ruleType"}},{"kind":"Field","name":{"kind":"Name","value":"training"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"courseId"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentId"}},{"kind":"Field","name":{"kind":"Name","value":"planType"}},{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"planVersion"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"requiredLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vendors"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<FindHostedExamByIdQuery, FindHostedExamByIdQueryVariables>;
export const PublishHostedExamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PublishHostedExam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishHostedExam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostedExamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"questions"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"passingScore"}}]}}]}}]} as unknown as DocumentNode<PublishHostedExamMutation, PublishHostedExamMutationVariables>;
export const RemoveHostedExamQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeHostedExamQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeHostedExamQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostedExamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"questionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}}}]}]}}]} as unknown as DocumentNode<RemoveHostedExamQuestionMutation, RemoveHostedExamQuestionMutationVariables>;
export const UpdateHostedExamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateHostedExam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatedHostedExamInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateHostedExam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostedExamInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"questions"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"passingScore"}}]}}]}}]} as unknown as DocumentNode<UpdateHostedExamMutation, UpdateHostedExamMutationVariables>;
export const UpdateHostedExamQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateHostedExamQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateHostedExamQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostedExamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"questionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionInput"}}}]}]}}]} as unknown as DocumentNode<UpdateHostedExamQuestionMutation, UpdateHostedExamQuestionMutationVariables>;
export const UpdateTrainingCriteriaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTrainingCriteria"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trainingCriteriaInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrainingCriteriaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTrainingCriteria"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostedExamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedExamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"trainingCriteriaInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trainingCriteriaInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"trainingCriteria"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minScore"}},{"kind":"Field","name":{"kind":"Name","value":"maxScore"}},{"kind":"Field","name":{"kind":"Name","value":"ruleType"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTrainingCriteriaMutation, UpdateTrainingCriteriaMutationVariables>;
export const CreateHostedScormDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateHostedScorm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedScormInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewHostedScormInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createHostedScorm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedScormInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scormFilename"}},{"kind":"Field","name":{"kind":"Name","value":"scormUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateHostedScormMutation, CreateHostedScormMutationVariables>;
export const FindHostedScormByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindHostedScormById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findHostedScormById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scormFilename"}},{"kind":"Field","name":{"kind":"Name","value":"scormUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<FindHostedScormByIdQuery, FindHostedScormByIdQueryVariables>;
export const PublishHostedScormDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PublishHostedScorm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishHostedScorm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scormFilename"}},{"kind":"Field","name":{"kind":"Name","value":"scormUrl"}}]}}]}}]} as unknown as DocumentNode<PublishHostedScormMutation, PublishHostedScormMutationVariables>;
export const UpdateHostedScormDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateHostedScorm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostedScormInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatedHostedScormInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateHostedScorm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostedScormInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scormFilename"}},{"kind":"Field","name":{"kind":"Name","value":"scormUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateHostedScormMutation, UpdateHostedScormMutationVariables>;
export const UploadHostedScormPackageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadHostedScormPackage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"packageInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HostedScormPackageInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadHostedScormPackage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"packageInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scormFilename"}},{"kind":"Field","name":{"kind":"Name","value":"scormUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UploadHostedScormPackageMutation, UploadHostedScormPackageMutationVariables>;
export const AddLabsToUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddLabsToUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"labIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addLabsToUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"labIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"labIds"}}}]}]}}]} as unknown as DocumentNode<AddLabsToUserMutation, AddLabsToUserMutationVariables>;
export const CreateLabDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLab"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewLabInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLab"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateLabMutation, CreateLabMutationVariables>;
export const DeleteLabDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteLab"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"labId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteLab"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"labId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"labId"}}}]}]}}]} as unknown as DocumentNode<DeleteLabMutation, DeleteLabMutationVariables>;
export const FindLabAndInfoByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindLabAndInfoById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"labId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findLabById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"labId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"labId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"previewImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coreConceptItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"itemType"}},{"kind":"Field","name":{"kind":"Name","value":"itemTitle"}},{"kind":"Field","name":{"kind":"Name","value":"itemVersion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"relevantLearningPaths"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"itemType"}},{"kind":"Field","name":{"kind":"Name","value":"itemTitle"}},{"kind":"Field","name":{"kind":"Name","value":"itemVersion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instructions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"videoFilename"}},{"kind":"Field","name":{"kind":"Name","value":"videoUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"launchConfig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fetchRelevantLabInformation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"labId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"labId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coreConcepts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"itemType"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"relevantLearningPaths"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"itemType"}},{"kind":"Field","name":{"kind":"Name","value":"schoolId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]}}]}}]} as unknown as DocumentNode<FindLabAndInfoByIdQuery, FindLabAndInfoByIdQueryVariables>;
export const FindLabByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindLabById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"labId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findLabById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"labId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"labId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"previewImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coreConceptItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"itemType"}},{"kind":"Field","name":{"kind":"Name","value":"itemTitle"}},{"kind":"Field","name":{"kind":"Name","value":"itemVersion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"relevantLearningPaths"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"itemType"}},{"kind":"Field","name":{"kind":"Name","value":"itemTitle"}},{"kind":"Field","name":{"kind":"Name","value":"itemVersion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instructions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"videoFilename"}},{"kind":"Field","name":{"kind":"Name","value":"videoUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"launchConfig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<FindLabByIdQuery, FindLabByIdQueryVariables>;
export const FindTranscriptLabsByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindTranscriptLabsByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findTranscriptLabsByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lab"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"previewImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"launchConfig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"labId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"markedCompletedAt"}}]}}]}}]}}]} as unknown as DocumentNode<FindTranscriptLabsByUserIdQuery, FindTranscriptLabsByUserIdQueryVariables>;
export const UpdateLabDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLab"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatedLabInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLab"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"previewImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coreConceptItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"itemType"}},{"kind":"Field","name":{"kind":"Name","value":"itemTitle"}},{"kind":"Field","name":{"kind":"Name","value":"itemVersion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"relevantLearningPaths"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"itemType"}},{"kind":"Field","name":{"kind":"Name","value":"itemTitle"}},{"kind":"Field","name":{"kind":"Name","value":"itemVersion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instructions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"videoFilename"}},{"kind":"Field","name":{"kind":"Name","value":"videoUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"launchConfig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateLabMutation, UpdateLabMutationVariables>;
export const UploadPreviewImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadPreviewImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"labId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadPreviewImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"labId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"labId"}}},{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"previewImageUrl"}}]}}]}}]} as unknown as DocumentNode<UploadPreviewImageMutation, UploadPreviewImageMutationVariables>;
export const UploadTextInstructionImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadTextInstructionImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"labId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadTextInstructionImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"labId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"labId"}}},{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<UploadTextInstructionImageMutation, UploadTextInstructionImageMutationVariables>;
export const UploadVideoInstructionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadVideoInstruction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"labId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"labInstructionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadVideoInstruction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"labId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"labId"}}},{"kind":"Argument","name":{"kind":"Name","value":"labInstructionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"labInstructionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UploadVideoInstructionMutation, UploadVideoInstructionMutationVariables>;
export const FindLearningPathByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindLearningPathById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findLearningPathById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"schoolId"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"valuePropositions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"about"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"learningPathSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eyebrowTitle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"valueText"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"caption"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"captionText"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"testimonial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"caption"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"captionText"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"opportunities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"locations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"prefix"}},{"kind":"Field","name":{"kind":"Name","value":"organization"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"skillTree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"callToAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FindLearningPathByIdQuery, FindLearningPathByIdQueryVariables>;
export const ApproveLicenseRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"approveLicenseRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approveLicenseRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"userLastName"}},{"kind":"Field","name":{"kind":"Name","value":"userEmail"}},{"kind":"Field","name":{"kind":"Name","value":"userOrganization"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"requestedAt"}},{"kind":"Field","name":{"kind":"Name","value":"approvedAt"}},{"kind":"Field","name":{"kind":"Name","value":"declinedAt"}}]}}]}}]} as unknown as DocumentNode<ApproveLicenseRequestMutation, ApproveLicenseRequestMutationVariables>;
export const DeclineLicenseRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"declineLicenseRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"declineLicenseRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"userLastName"}},{"kind":"Field","name":{"kind":"Name","value":"userEmail"}},{"kind":"Field","name":{"kind":"Name","value":"userOrganization"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"requestedAt"}},{"kind":"Field","name":{"kind":"Name","value":"approvedAt"}},{"kind":"Field","name":{"kind":"Name","value":"declinedAt"}}]}}]}}]} as unknown as DocumentNode<DeclineLicenseRequestMutation, DeclineLicenseRequestMutationVariables>;
export const ExportMissionPartnerLicenseRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ExportMissionPartnerLicenseRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branch"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exportMissionPartnerLicenseRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerName"}}},{"kind":"Argument","name":{"kind":"Name","value":"vendorName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorName"}}},{"kind":"Argument","name":{"kind":"Name","value":"branch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branch"}}}]}]}}]} as unknown as DocumentNode<ExportMissionPartnerLicenseRequestsMutation, ExportMissionPartnerLicenseRequestsMutationVariables>;
export const FindLicenseRequestByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findLicenseRequestById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findLicenseRequestById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"userLastName"}},{"kind":"Field","name":{"kind":"Name","value":"userEmail"}},{"kind":"Field","name":{"kind":"Name","value":"userOrganization"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"requestedAt"}},{"kind":"Field","name":{"kind":"Name","value":"approvedAt"}},{"kind":"Field","name":{"kind":"Name","value":"declinedAt"}}]}}]}}]} as unknown as DocumentNode<FindLicenseRequestByIdQuery, FindLicenseRequestByIdQueryVariables>;
export const FindOpenLicenseRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindOpenLicenseRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOpenLicenseRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerName"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"userLastName"}},{"kind":"Field","name":{"kind":"Name","value":"userEmail"}},{"kind":"Field","name":{"kind":"Name","value":"userOrganization"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"requestedAt"}},{"kind":"Field","name":{"kind":"Name","value":"approvedAt"}},{"kind":"Field","name":{"kind":"Name","value":"declinedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FindOpenLicenseRequestsQuery, FindOpenLicenseRequestsQueryVariables>;
export const FindOpenLicenseRequestsFilterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindOpenLicenseRequestsFilter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortField"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branch"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOpenLicenseRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortField"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortField"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"branch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branch"}}},{"kind":"Argument","name":{"kind":"Name","value":"vendorName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerName"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"userLastName"}},{"kind":"Field","name":{"kind":"Name","value":"userEmail"}},{"kind":"Field","name":{"kind":"Name","value":"userOrganization"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"requestedAt"}},{"kind":"Field","name":{"kind":"Name","value":"approvedAt"}},{"kind":"Field","name":{"kind":"Name","value":"declinedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FindOpenLicenseRequestsFilterQuery, FindOpenLicenseRequestsFilterQueryVariables>;
export const GetBranchesForOpenLicenseRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBranchesForOpenLicenseRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBranchesForOpenLicenseRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}]}]}}]} as unknown as DocumentNode<GetBranchesForOpenLicenseRequestsQuery, GetBranchesForOpenLicenseRequestsQueryVariables>;
export const GetVendorsForOpenLicenseRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVendorsForOpenLicenseRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVendorsForOpenLicenseRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}]}]}}]} as unknown as DocumentNode<GetVendorsForOpenLicenseRequestQuery, GetVendorsForOpenLicenseRequestQueryVariables>;
export const AssignLicenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"assignLicense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssignLicenseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignLicense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<AssignLicenseMutation, AssignLicenseMutationVariables>;
export const CountAssignedLicensesForMissionPartnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountAssignedLicensesForMissionPartner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countAssignedLicensesForMissionPartner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<CountAssignedLicensesForMissionPartnerQuery, CountAssignedLicensesForMissionPartnerQueryVariables>;
export const ExportLicensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ExportLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exportLicenses"}}]}}]} as unknown as DocumentNode<ExportLicensesMutation, ExportLicensesMutationVariables>;
export const ExportMissionPartnerLicensesForVendorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ExportMissionPartnerLicensesForVendor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exportMissionPartnerLicensesForVendor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerName"}}},{"kind":"Argument","name":{"kind":"Name","value":"vendorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"vendorName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorName"}}}]}]}}]} as unknown as DocumentNode<ExportMissionPartnerLicensesForVendorMutation, ExportMissionPartnerLicensesForVendorMutationVariables>;
export const FindLicensesByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindLicensesByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"licenses"},"name":{"kind":"Name","value":"findLicensesByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerName"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"licenseStatusCounts"},"name":{"kind":"Name","value":"findLicenseStatusCounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"inactive"}},{"kind":"Field","name":{"kind":"Name","value":"available"}},{"kind":"Field","name":{"kind":"Name","value":"provisioned"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}}]}}]}}]} as unknown as DocumentNode<FindLicensesByUserIdQuery, FindLicensesByUserIdQueryVariables>;
export const FindLicenseStatusCountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindLicenseStatusCounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findLicenseStatusCounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"inactive"}},{"kind":"Field","name":{"kind":"Name","value":"available"}},{"kind":"Field","name":{"kind":"Name","value":"provisioned"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}}]}}]}}]} as unknown as DocumentNode<FindLicenseStatusCountsQuery, FindLicenseStatusCountsQueryVariables>;
export const FindLicensesByMissionPartnerAndVendorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindLicensesByMissionPartnerAndVendor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortField"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findLicensesByMissionPartnerAndVendor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"vendorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortField"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortField"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"userLastName"}},{"kind":"Field","name":{"kind":"Name","value":"userEmail"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerName"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastUsedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FindLicensesByMissionPartnerAndVendorQuery, FindLicensesByMissionPartnerAndVendorQueryVariables>;
export const GetLicensesByVendorIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getLicensesByVendorId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branch"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLicensesByVendorId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vendorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerName"}}},{"kind":"Argument","name":{"kind":"Name","value":"branch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branch"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"userLastName"}},{"kind":"Field","name":{"kind":"Name","value":"userEmail"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerName"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastUsedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"branch"}},{"kind":"Field","name":{"kind":"Name","value":"trainingGroup"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<GetLicensesByVendorIdQuery, GetLicensesByVendorIdQueryVariables>;
export const RemoveLicensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeLicenses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveLicensesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeLicenses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<RemoveLicensesMutation, RemoveLicensesMutationVariables>;
export const ApproveMissionPartnerRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApproveMissionPartnerRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approveMissionPartnerRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerName"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"userLastName"}},{"kind":"Field","name":{"kind":"Name","value":"userEmail"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"requestedAt"}},{"kind":"Field","name":{"kind":"Name","value":"approvedAt"}},{"kind":"Field","name":{"kind":"Name","value":"declinedAt"}}]}}]}}]} as unknown as DocumentNode<ApproveMissionPartnerRequestMutation, ApproveMissionPartnerRequestMutationVariables>;
export const DeclineMissionPartnerRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeclineMissionPartnerRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"declineMissionPartnerRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerName"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"userLastName"}},{"kind":"Field","name":{"kind":"Name","value":"userEmail"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"requestedAt"}},{"kind":"Field","name":{"kind":"Name","value":"approvedAt"}},{"kind":"Field","name":{"kind":"Name","value":"declinedAt"}}]}}]}}]} as unknown as DocumentNode<DeclineMissionPartnerRequestMutation, DeclineMissionPartnerRequestMutationVariables>;
export const FindMissionPartnerRequestByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindMissionPartnerRequestById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findMissionPartnerRequestById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerName"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"userLastName"}},{"kind":"Field","name":{"kind":"Name","value":"userEmail"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"requestedAt"}},{"kind":"Field","name":{"kind":"Name","value":"approvedAt"}},{"kind":"Field","name":{"kind":"Name","value":"declinedAt"}}]}}]}}]} as unknown as DocumentNode<FindMissionPartnerRequestByIdQuery, FindMissionPartnerRequestByIdQueryVariables>;
export const FindOpenForMissionPartnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindOpenForMissionPartner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOpenForMissionPartner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerName"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"userLastName"}},{"kind":"Field","name":{"kind":"Name","value":"userEmail"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"requestedAt"}},{"kind":"Field","name":{"kind":"Name","value":"approvedAt"}},{"kind":"Field","name":{"kind":"Name","value":"declinedAt"}}]}}]}}]} as unknown as DocumentNode<FindOpenForMissionPartnerQuery, FindOpenForMissionPartnerQueryVariables>;
export const FindLearnersBySearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindLearnersBySearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onboardingComplete"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortKey"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortDirection"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findLearnersBySearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}},{"kind":"Argument","name":{"kind":"Name","value":"onboardingComplete"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onboardingComplete"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortKey"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"onboardingCompletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"keycloakUserCreatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"lastLoginAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FindLearnersBySearchQuery, FindLearnersBySearchQueryVariables>;
export const AddCollectionItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddCollectionItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"items"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CollectionItemInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCollectionItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}},{"kind":"Argument","name":{"kind":"Name","value":"items"},"value":{"kind":"Variable","name":{"kind":"Name","value":"items"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentId"}},{"kind":"Field","name":{"kind":"Name","value":"courseId"}},{"kind":"Field","name":{"kind":"Name","value":"dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"planType"}},{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"planVersion"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"vendors"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddCollectionItemsMutation, AddCollectionItemsMutationVariables>;
export const AddFeaturedTrainingItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddFeaturedTrainingItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMissionPartnerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addFeaturedTrainingItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"affiliateId"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"provisionedLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"provisioned"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredTraining"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"courseId"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentId"}},{"kind":"Field","name":{"kind":"Name","value":"labId"}},{"kind":"Field","name":{"kind":"Name","value":"planType"}},{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"planVersion"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"vendors"}},{"kind":"Field","name":{"kind":"Name","value":"dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"required"}}]}}]}}]}}]} as unknown as DocumentNode<AddFeaturedTrainingItemsMutation, AddFeaturedTrainingItemsMutationVariables>;
export const AggregateTranscriptTrainingPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AggregateTranscriptTrainingPlans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortField"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregateTranscriptTrainingPlans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"planType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planType"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortField"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortField"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planType"}},{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"planTitle"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"assigned"}},{"kind":"Field","name":{"kind":"Name","value":"started"}},{"kind":"Field","name":{"kind":"Name","value":"stopped"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<AggregateTranscriptTrainingPlansQuery, AggregateTranscriptTrainingPlansQueryVariables>;
export const AggregateTranscriptTrainingPlansForGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AggregateTranscriptTrainingPlansForGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregateTranscriptTrainingPlansForGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planType"}},{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"planTitle"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"assigned"}},{"kind":"Field","name":{"kind":"Name","value":"started"}},{"kind":"Field","name":{"kind":"Name","value":"stopped"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}}]}}]} as unknown as DocumentNode<AggregateTranscriptTrainingPlansForGroupQuery, AggregateTranscriptTrainingPlansForGroupQueryVariables>;
export const CreateCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCollectionMutation, CreateCollectionMutationVariables>;
export const CreateExportByTypeAndMissionPartnerIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateExportByTypeAndMissionPartnerId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"downloadType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExportByTypeAndMissionPartnerId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"downloadType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"downloadType"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"requestedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"parameters"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<CreateExportByTypeAndMissionPartnerIdMutation, CreateExportByTypeAndMissionPartnerIdMutationVariables>;
export const CreateMissionPartnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMissionPartner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMissionPartnerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMissionPartner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"affiliateId"}},{"kind":"Field","name":{"kind":"Name","value":"sectionType"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"provisionedLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"provisioned"}}]}}]}}]}}]} as unknown as DocumentNode<CreateMissionPartnerMutation, CreateMissionPartnerMutationVariables>;
export const DisableExportsByTypesForMissionPartnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DisableExportsByTypesForMissionPartner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"downloadTypes"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"disableExportsByTypesForMissionPartner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"downloadTypes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"downloadTypes"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"affiliateId"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"enabledReports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<DisableExportsByTypesForMissionPartnerMutation, DisableExportsByTypesForMissionPartnerMutationVariables>;
export const EnableExportsByTypesForMissionPartnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EnableExportsByTypesForMissionPartner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"downloadTypes"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enableExportsByTypesForMissionPartner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"downloadTypes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"downloadTypes"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"affiliateId"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"enabledReports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<EnableExportsByTypesForMissionPartnerMutation, EnableExportsByTypesForMissionPartnerMutationVariables>;
export const ExportCourseLevelMetricsForTrainingPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExportCourseLevelMetricsForTrainingPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planSourceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planVersion"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exportCourseLevelMetricsForTrainingPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"planSourceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planSourceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"planVersion"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planVersion"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ExportCourseLevelMetricsForTrainingPlanQuery, ExportCourseLevelMetricsForTrainingPlanQueryVariables>;
export const ExportIndividualLearnerActivityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExportIndividualLearnerActivity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exportIndividualLearnerActivity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"requestedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"parameters"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<ExportIndividualLearnerActivityQuery, ExportIndividualLearnerActivityQueryVariables>;
export const ExportLearnersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExportLearners"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exportLearners"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ExportLearnersQuery, ExportLearnersQueryVariables>;
export const ExportQuizExamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExportQuizExams"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizOrExamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizOrExamName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exportQuizExams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerName"}}},{"kind":"Argument","name":{"kind":"Name","value":"quizOrExamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizOrExamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"quizOrExamName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizOrExamName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ExportQuizExamsQuery, ExportQuizExamsQueryVariables>;
export const ExportSurveysDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExportSurveys"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"surveyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"surveyName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exportSurveys"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerName"}}},{"kind":"Argument","name":{"kind":"Name","value":"surveyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"surveyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"surveyName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"surveyName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ExportSurveysQuery, ExportSurveysQueryVariables>;
export const ExportTrainingPlanCoursesForMissionPartnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExportTrainingPlanCoursesForMissionPartner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exportTrainingPlanCoursesForMissionPartner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerName"}}},{"kind":"Argument","name":{"kind":"Name","value":"vendorName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorName"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ExportTrainingPlanCoursesForMissionPartnerQuery, ExportTrainingPlanCoursesForMissionPartnerQueryVariables>;
export const ExportTrainingPlanTranscriptsForGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExportTrainingPlanTranscriptsForGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exportTrainingPlanTranscriptsForGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ExportTrainingPlanTranscriptsForGroupQuery, ExportTrainingPlanTranscriptsForGroupQueryVariables>;
export const ExportTrainingPlanTranscriptsForMissionPartnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExportTrainingPlanTranscriptsForMissionPartner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exportTrainingPlanTranscriptsForMissionPartner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ExportTrainingPlanTranscriptsForMissionPartnerQuery, ExportTrainingPlanTranscriptsForMissionPartnerQueryVariables>;
export const FindAllMissionPartnersAdminPortalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllMissionPartnersAdminPortal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllMissionPartnersAdminPortal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"affiliateId"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"provisionedLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"provisioned"}}]}},{"kind":"Field","name":{"kind":"Name","value":"exams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"surveys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"enabledReports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<FindAllMissionPartnersAdminPortalQuery, FindAllMissionPartnersAdminPortalQueryVariables>;
export const FindAllMissionPartnersMinDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllMissionPartnersMinDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllMissionPartnersMinDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"affiliateId"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"accessCode"}},{"kind":"Field","name":{"kind":"Name","value":"customTrainingEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"trialEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"trialEndDate"}},{"kind":"Field","name":{"kind":"Name","value":"sectionType"}},{"kind":"Field","name":{"kind":"Name","value":"isMarketplaceEnabled"}}]}}]}}]} as unknown as DocumentNode<FindAllMissionPartnersMinDetailsQuery, FindAllMissionPartnersMinDetailsQueryVariables>;
export const FindCategorizedTimeSpentLearningDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCategorizedTimeSpentLearning"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryPercentileBreakpoints"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roundToHour"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCategorizedTimeSpentLearning"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryPercentileBreakpoints"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryPercentileBreakpoints"}}},{"kind":"Argument","name":{"kind":"Name","value":"roundToHour"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roundToHour"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryBreakpoints"}},{"kind":"Field","name":{"kind":"Name","value":"usersPerCategory"}}]}}]}}]} as unknown as DocumentNode<FindCategorizedTimeSpentLearningQuery, FindCategorizedTimeSpentLearningQueryVariables>;
export const FindFeaturedTrainingIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindFeaturedTrainingIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findMissionPartnerById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"featuredTraining"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"courseId"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentId"}},{"kind":"Field","name":{"kind":"Name","value":"labId"}},{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}}]}}]}}]}}]} as unknown as DocumentNode<FindFeaturedTrainingIdsQuery, FindFeaturedTrainingIdsQueryVariables>;
export const FindLearnersTotalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindLearnersTotal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findLearnersBySearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FindLearnersTotalQuery, FindLearnersTotalQueryVariables>;
export const FindMissionPartnerByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindMissionPartnerById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findMissionPartnerById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"accessCode"}},{"kind":"Field","name":{"kind":"Name","value":"affiliateId"}},{"kind":"Field","name":{"kind":"Name","value":"sectionType"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"customTrainingEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"isMarketplaceEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"enabledReports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"provisionedLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"provisioned"}},{"kind":"Field","name":{"kind":"Name","value":"autoAssignmentEnabled"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredTraining"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"courseId"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentId"}},{"kind":"Field","name":{"kind":"Name","value":"labId"}},{"kind":"Field","name":{"kind":"Name","value":"planType"}},{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"planVersion"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"vendors"}},{"kind":"Field","name":{"kind":"Name","value":"dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"required"}},{"kind":"Field","name":{"kind":"Name","value":"assigned"}},{"kind":"Field","name":{"kind":"Name","value":"started"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"stopped"}}]}},{"kind":"Field","name":{"kind":"Name","value":"exams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scorms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"surveys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"labs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"forceMultipliers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"enrolledLearners"}},{"kind":"Field","name":{"kind":"Name","value":"totalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"changeLog"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"_createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"_updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"courseId"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentId"}},{"kind":"Field","name":{"kind":"Name","value":"planType"}},{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"planVersion"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"vendors"}},{"kind":"Field","name":{"kind":"Name","value":"dateAdded"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"trialEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"trialStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"trialEndDate"}}]}}]}}]} as unknown as DocumentNode<FindMissionPartnerByIdQuery, FindMissionPartnerByIdQueryVariables>;
export const FindMissionPartnerMembersByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findMissionPartnerMembersByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findMissionPartnerMembersByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<FindMissionPartnerMembersByUserIdQuery, FindMissionPartnerMembersByUserIdQueryVariables>;
export const FindMissionPartnerMinDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindMissionPartnerMinDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findMissionPartnerMinDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"affiliateId"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"accessCode"}},{"kind":"Field","name":{"kind":"Name","value":"customTrainingEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"trialEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"trialStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"trialEndDate"}},{"kind":"Field","name":{"kind":"Name","value":"isMarketplaceEnabled"}}]}}]}}]} as unknown as DocumentNode<FindMissionPartnerMinDetailsQuery, FindMissionPartnerMinDetailsQueryVariables>;
export const FindQuizAndExamsBySearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindQuizAndExamsBySearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortKey"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortDirection"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findQuizAndExamsBySearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortKey"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"itemName"}},{"kind":"Field","name":{"kind":"Name","value":"itemType"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"started"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FindQuizAndExamsBySearchQuery, FindQuizAndExamsBySearchQueryVariables>;
export const FindSurveysBySearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindSurveysBySearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortKey"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortDirection"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findSurveysBySearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortKey"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"hostedSurveyId"}},{"kind":"Field","name":{"kind":"Name","value":"hostedSurveyName"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"started"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FindSurveysBySearchQuery, FindSurveysBySearchQueryVariables>;
export const FindUserMissionPartnerMembershipsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindUserMissionPartnerMemberships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUserMissionPartnerMemberships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerName"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"affiliateId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"trialEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"trialStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"trialEndDate"}},{"kind":"Field","name":{"kind":"Name","value":"featuredTraining"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"courseId"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentId"}},{"kind":"Field","name":{"kind":"Name","value":"labId"}},{"kind":"Field","name":{"kind":"Name","value":"planType"}},{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"planVersion"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"required"}}]}}]}}]}}]} as unknown as DocumentNode<FindUserMissionPartnerMembershipsQuery, FindUserMissionPartnerMembershipsQueryVariables>;
export const GetCoursesQuarterlyByMissionPartnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCoursesQuarterlyByMissionPartner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxNumberofQuarters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCoursesQuarterlyByMissionPartner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"maxNumberofQuarters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxNumberofQuarters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quarter"}},{"kind":"Field","name":{"kind":"Name","value":"started"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numberOfUsers"}},{"kind":"Field","name":{"kind":"Name","value":"percentageOfUsers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stopped"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numberOfUsers"}},{"kind":"Field","name":{"kind":"Name","value":"percentageOfUsers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"completed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numberOfUsers"}},{"kind":"Field","name":{"kind":"Name","value":"percentageOfUsers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<GetCoursesQuarterlyByMissionPartnerQuery, GetCoursesQuarterlyByMissionPartnerQueryVariables>;
export const GetMissionPartnerByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMissionPartnerById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findMissionPartnerById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetMissionPartnerByIdQuery, GetMissionPartnerByIdQueryVariables>;
export const GetPlansQuarterlyByMissionPartnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPlansQuarterlyByMissionPartner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxNumberofQuarters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPlansQuarterlyByMissionPartner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"maxNumberofQuarters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxNumberofQuarters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quarter"}},{"kind":"Field","name":{"kind":"Name","value":"assigned"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numberOfUsers"}},{"kind":"Field","name":{"kind":"Name","value":"percentageOfUsers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"started"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numberOfUsers"}},{"kind":"Field","name":{"kind":"Name","value":"percentageOfUsers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stopped"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numberOfUsers"}},{"kind":"Field","name":{"kind":"Name","value":"percentageOfUsers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"completed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numberOfUsers"}},{"kind":"Field","name":{"kind":"Name","value":"percentageOfUsers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<GetPlansQuarterlyByMissionPartnerQuery, GetPlansQuarterlyByMissionPartnerQueryVariables>;
export const GetPublicMissionPartnerExportsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicMissionPartnerExports"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPublicMissionPartnerExports"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetPublicMissionPartnerExportsQuery, GetPublicMissionPartnerExportsQueryVariables>;
export const RemoveCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"Id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"Id"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentId"}},{"kind":"Field","name":{"kind":"Name","value":"courseId"}},{"kind":"Field","name":{"kind":"Name","value":"dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"planType"}},{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"planVersion"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"vendors"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RemoveCollectionMutation, RemoveCollectionMutationVariables>;
export const RemoveCollectionItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveCollectionItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"items"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveCollectionItemInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeCollectionItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}},{"kind":"Argument","name":{"kind":"Name","value":"items"},"value":{"kind":"Variable","name":{"kind":"Name","value":"items"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentId"}},{"kind":"Field","name":{"kind":"Name","value":"courseId"}},{"kind":"Field","name":{"kind":"Name","value":"dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"planType"}},{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"planVersion"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"vendors"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RemoveCollectionItemsMutation, RemoveCollectionItemsMutationVariables>;
export const RemoveFeaturedTrainingItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFeaturedTrainingItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveFeaturedTrainingItemsInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFeaturedTrainingItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"featuredTraining"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"courseId"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentId"}},{"kind":"Field","name":{"kind":"Name","value":"labId"}},{"kind":"Field","name":{"kind":"Name","value":"planType"}},{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"planVersion"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveFeaturedTrainingItemsMutation, RemoveFeaturedTrainingItemsMutationVariables>;
export const SendReminderToNonOnboardedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SendReminderToNonOnboarded"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendReminderToNonOnboarded"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"successfulEmailsSent"}},{"kind":"Field","name":{"kind":"Name","value":"emailsNotSent"}}]}}]}}]} as unknown as DocumentNode<SendReminderToNonOnboardedQuery, SendReminderToNonOnboardedQueryVariables>;
export const ToggleMissionPartnerTrialDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ToggleMissionPartnerTrial"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"enable"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleMissionPartnerTrial"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"enable"},"value":{"kind":"Variable","name":{"kind":"Name","value":"enable"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trialEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"trialStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"trialEndDate"}}]}}]}}]} as unknown as DocumentNode<ToggleMissionPartnerTrialMutation, ToggleMissionPartnerTrialMutationVariables>;
export const ToggleRequiredFeaturedTrainingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ToggleRequiredFeaturedTraining"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"labId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planSourceId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planVersion"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleRequiredFeaturedTraining"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}},{"kind":"Argument","name":{"kind":"Name","value":"assessmentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"labId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"labId"}}},{"kind":"Argument","name":{"kind":"Name","value":"planType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planType"}}},{"kind":"Argument","name":{"kind":"Name","value":"planSourceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planSourceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"planVersion"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planVersion"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ToggleRequiredFeaturedTrainingMutation, ToggleRequiredFeaturedTrainingMutationVariables>;
export const UpdateCollectionItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCollectionItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"Id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"Id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCollectionItemsMutation, UpdateCollectionItemsMutationVariables>;
export const UpdateCustomTrainingEnabledDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCustomTrainingEnabled"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCustomTrainingEnabledInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCustomTrainingEnabled"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"customTrainingEnabled"}}]}}]}}]} as unknown as DocumentNode<UpdateCustomTrainingEnabledMutation, UpdateCustomTrainingEnabledMutationVariables>;
export const UpdateIsMarketplaceEnabledDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateIsMarketplaceEnabled"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateIsMarketplaceEnabledInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateIsMarketplaceEnabled"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isMarketplaceEnabled"}}]}}]}}]} as unknown as DocumentNode<UpdateIsMarketplaceEnabledMutation, UpdateIsMarketplaceEnabledMutationVariables>;
export const UpdateMissionPartnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMissionPartner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMissionPartnerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMissionPartner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"affiliateId"}},{"kind":"Field","name":{"kind":"Name","value":"sectionType"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"provisionedLicenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorName"}},{"kind":"Field","name":{"kind":"Name","value":"provisioned"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredTraining"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"courseId"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentId"}},{"kind":"Field","name":{"kind":"Name","value":"labId"}},{"kind":"Field","name":{"kind":"Name","value":"planType"}},{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"planVersion"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"required"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMissionPartnerMutation, UpdateMissionPartnerMutationVariables>;
export const UploadMissionPartnerLogoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadMissionPartnerLogo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadMissionPartnerLogo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<UploadMissionPartnerLogoMutation, UploadMissionPartnerLogoMutationVariables>;
export const CreateRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateRoleMutation, CreateRoleMutationVariables>;
export const DeleteRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RoleName"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}]}}]} as unknown as DocumentNode<DeleteRolesMutation, DeleteRolesMutationVariables>;
export const FindRolesByMissionPartnerIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindRolesByMissionPartnerId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findRolesByMissionPartnerId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"userEmail"}},{"kind":"Field","name":{"kind":"Name","value":"userDate"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<FindRolesByMissionPartnerIdQuery, FindRolesByMissionPartnerIdQueryVariables>;
export const GetUserForRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserForRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserForRolesQuery, GetUserForRolesQueryVariables>;
export const GetServiceHealthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetServiceHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getServiceHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"services"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<GetServiceHealthQuery, GetServiceHealthQueryVariables>;
export const DisableSettingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DisableSetting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"disableSetting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}}]}}]}}]} as unknown as DocumentNode<DisableSettingMutation, DisableSettingMutationVariables>;
export const EnableSettingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EnableSetting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enableSetting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}}]}}]}}]} as unknown as DocumentNode<EnableSettingMutation, EnableSettingMutationVariables>;
export const FindAllSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}}]}}]}}]} as unknown as DocumentNode<FindAllSettingsQuery, FindAllSettingsQueryVariables>;
export const FindSettingByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindSettingById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findSettingById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}}]}}]}}]} as unknown as DocumentNode<FindSettingByIdQuery, FindSettingByIdQueryVariables>;
export const FindSkillByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findSkillById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findSkillById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"learningPaths"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"schoolId"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"summary"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"valuePropositions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"about"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"skillTree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"callToAction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vendors"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"totalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"enrolledLearners"}}]}}]}}]} as unknown as DocumentNode<FindSkillByIdQuery, FindSkillByIdQueryVariables>;
export const CreateSurveyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSurvey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"surveyInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewSurveyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSurvey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"surveyInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"questions"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateSurveyMutation, CreateSurveyMutationVariables>;
export const FindSurveyByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindSurveyById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findSurveyById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"questions"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<FindSurveyByIdQuery, FindSurveyByIdQueryVariables>;
export const PublishSurveyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PublishSurvey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishSurvey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"questions"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<PublishSurveyMutation, PublishSurveyMutationVariables>;
export const UpdateSurveyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSurvey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatedSurveyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSurvey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"durationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"questions"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateSurveyMutation, UpdateSurveyMutationVariables>;
export const CountAllCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountAllCourses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countAllCourses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<CountAllCoursesQuery, CountAllCoursesQueryVariables>;
export const GetTrainingPlanMetricsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTrainingPlanMetrics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dayRange"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTrainingPlanMetrics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dayRange"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dayRange"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalPlans"}},{"kind":"Field","name":{"kind":"Name","value":"plansInProgress"}},{"kind":"Field","name":{"kind":"Name","value":"plansCompleted"}}]}}]}}]} as unknown as DocumentNode<GetTrainingPlanMetricsQuery, GetTrainingPlanMetricsQueryVariables>;
export const GetTranscriptCourseMetricsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTranscriptCourseMetrics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branch"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dayRange"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTranscriptCourseMetrics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"branch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branch"}}},{"kind":"Argument","name":{"kind":"Name","value":"dayRange"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dayRange"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCourses"}},{"kind":"Field","name":{"kind":"Name","value":"coursesInProgress"}},{"kind":"Field","name":{"kind":"Name","value":"coursesCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"coursesStopped"}},{"kind":"Field","name":{"kind":"Name","value":"coursesPendingReview"}},{"kind":"Field","name":{"kind":"Name","value":"totalHoursCompleted"}}]}}]}}]} as unknown as DocumentNode<GetTranscriptCourseMetricsQuery, GetTranscriptCourseMetricsQueryVariables>;
export const GetTrainingPlanMetricsAllDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTrainingPlanMetricsAll"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTrainingPlanMetrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalPlans"}},{"kind":"Field","name":{"kind":"Name","value":"plansInProgress"}},{"kind":"Field","name":{"kind":"Name","value":"plansCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"plansStopped"}},{"kind":"Field","name":{"kind":"Name","value":"plansAssigned"}}]}}]}}]} as unknown as DocumentNode<GetTrainingPlanMetricsAllQuery, GetTrainingPlanMetricsAllQueryVariables>;
export const GetTranscriptCourseMetricsExtraDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTranscriptCourseMetricsExtra"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branch"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trainingGroup"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fieldCommand"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spaceDelta"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"squadron"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organization"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTranscriptCourseMetrics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"branch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branch"}}},{"kind":"Argument","name":{"kind":"Name","value":"trainingGroup"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trainingGroup"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"fieldCommand"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fieldCommand"}}},{"kind":"Argument","name":{"kind":"Name","value":"spaceDelta"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spaceDelta"}}},{"kind":"Argument","name":{"kind":"Name","value":"squadron"},"value":{"kind":"Variable","name":{"kind":"Name","value":"squadron"}}},{"kind":"Argument","name":{"kind":"Name","value":"organization"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organization"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCourses"}},{"kind":"Field","name":{"kind":"Name","value":"coursesInProgress"}},{"kind":"Field","name":{"kind":"Name","value":"coursesCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"coursesStopped"}},{"kind":"Field","name":{"kind":"Name","value":"coursesPendingReview"}},{"kind":"Field","name":{"kind":"Name","value":"totalHoursCompleted"}}]}}]}}]} as unknown as DocumentNode<GetTranscriptCourseMetricsExtraQuery, GetTranscriptCourseMetricsExtraQueryVariables>;
export const GetTrainingPlansByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTrainingPlansByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTrainingPlansByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"planType"}},{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activityType"}},{"kind":"Field","name":{"kind":"Name","value":"masteryLevel"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorCourseId"}},{"kind":"Field","name":{"kind":"Name","value":"courseTitle"}},{"kind":"Field","name":{"kind":"Name","value":"courseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"courseDescription"}},{"kind":"Field","name":{"kind":"Name","value":"courseDuration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"markedCompletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"specialization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"completedPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextActivity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activityType"}},{"kind":"Field","name":{"kind":"Name","value":"masteryLevel"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorCourseId"}},{"kind":"Field","name":{"kind":"Name","value":"courseTitle"}},{"kind":"Field","name":{"kind":"Name","value":"courseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"courseDescription"}},{"kind":"Field","name":{"kind":"Name","value":"courseDuration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"markedCompletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"specialization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<GetTrainingPlansByUserIdQuery, GetTrainingPlansByUserIdQueryVariables>;
export const FindTranscriptTrainingPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindTranscriptTrainingPlans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planSourceId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortField"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findTranscriptTrainingPlans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"planType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planType"}}},{"kind":"Argument","name":{"kind":"Name","value":"planSourceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planSourceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortField"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortField"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"trainingPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"stoppedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"trainingPlan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planType"}},{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FindTranscriptTrainingPlansQuery, FindTranscriptTrainingPlansQueryVariables>;
export const GetAllTrainingPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllTrainingPlans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTrainingPlans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"planType"}},{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activityType"}},{"kind":"Field","name":{"kind":"Name","value":"masteryLevel"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorCourseId"}},{"kind":"Field","name":{"kind":"Name","value":"courseTitle"}},{"kind":"Field","name":{"kind":"Name","value":"courseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"courseDescription"}},{"kind":"Field","name":{"kind":"Name","value":"courseDuration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"markedCompletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"specialization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"completedPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextActivity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activityType"}},{"kind":"Field","name":{"kind":"Name","value":"masteryLevel"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"vendorCourseId"}},{"kind":"Field","name":{"kind":"Name","value":"courseTitle"}},{"kind":"Field","name":{"kind":"Name","value":"courseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"courseDescription"}},{"kind":"Field","name":{"kind":"Name","value":"courseDuration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"markedCompletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"specialization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllTrainingPlansQuery, GetAllTrainingPlansQueryVariables>;
export const LearnerTrainingPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LearnerTrainingPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTrainingPlansByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"planType"}},{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"stoppedAt"}}]}}]}}]} as unknown as DocumentNode<LearnerTrainingPlanQuery, LearnerTrainingPlanQueryVariables>;
export const GetTopCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTopCourses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTopCourses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetTopCoursesQuery, GetTopCoursesQueryVariables>;
export const GetTopPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTopPlans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTopPlans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"planType"}},{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<GetTopPlansQuery, GetTopPlansQueryVariables>;
export const GetUserUploadsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserUploads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserUploads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"requestedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"parameters"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<GetUserUploadsQuery, GetUserUploadsQueryVariables>;
export const DeleteUploadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUpload"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUpload"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteUploadMutation, DeleteUploadMutationVariables>;
export const AddAssessmentsToUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddAssessmentsToUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAssessmentsToUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"assessmentIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}]}]}}]} as unknown as DocumentNode<AddAssessmentsToUserMutation, AddAssessmentsToUserMutationVariables>;
export const AddCoursesToUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddCoursesToUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCoursesToUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"courseIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}]}]}}]} as unknown as DocumentNode<AddCoursesToUserMutation, AddCoursesToUserMutationVariables>;
export const AddGroupMembershipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addGroupMembership"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddGroupMembershipInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addGroupMembership"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"groupMemberships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupName"}}]}}]}}]}}]} as unknown as DocumentNode<AddGroupMembershipMutation, AddGroupMembershipMutationVariables>;
export const AddLicenseToUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddLicenseToUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addLicenseToUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"vendorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<AddLicenseToUsersMutation, AddLicenseToUsersMutationVariables>;
export const UpdateRecentMissionPartnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRecentMissionPartner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRecentMissionPartner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}]}]}}]} as unknown as DocumentNode<UpdateRecentMissionPartnerMutation, UpdateRecentMissionPartnerMutationVariables>;
export const CountAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountAllUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branch"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trainingGroup"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fieldCommand"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spaceDelta"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"squadron"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organization"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countAllUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"branch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branch"}}},{"kind":"Argument","name":{"kind":"Name","value":"trainingGroup"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trainingGroup"}}},{"kind":"Argument","name":{"kind":"Name","value":"fieldCommand"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fieldCommand"}}},{"kind":"Argument","name":{"kind":"Name","value":"spaceDelta"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spaceDelta"}}},{"kind":"Argument","name":{"kind":"Name","value":"squadron"},"value":{"kind":"Variable","name":{"kind":"Name","value":"squadron"}}},{"kind":"Argument","name":{"kind":"Name","value":"organization"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organization"}}}]}]}}]} as unknown as DocumentNode<CountAllUsersQuery, CountAllUsersQueryVariables>;
export const CountCacEnabledUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountCacEnabledUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branch"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countCacEnabledUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"branch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branch"}}}]}]}}]} as unknown as DocumentNode<CountCacEnabledUsersQuery, CountCacEnabledUsersQueryVariables>;
export const CountNewUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountNewUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branch"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dayRange"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countNewUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"branch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branch"}}},{"kind":"Argument","name":{"kind":"Name","value":"dayRange"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dayRange"}}}]}]}}]} as unknown as DocumentNode<CountNewUsersQuery, CountNewUsersQueryVariables>;
export const ExportUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ExportUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branch"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exportUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"branch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branch"}}}]}]}}]} as unknown as DocumentNode<ExportUsersMutation, ExportUsersMutationVariables>;
export const FindAwardedBadgesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAwardedBadges"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAwardedBadges"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"badgeId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"jsonUrl"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}}]}}]} as unknown as DocumentNode<FindAwardedBadgesQuery, FindAwardedBadgesQueryVariables>;
export const FindLearnerCohortsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findLearnerCohorts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserCohorts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<FindLearnerCohortsQuery, FindLearnerCohortsQueryVariables>;
export const FindUsersByGroupIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindUsersByGroupId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUsersByGroupId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<FindUsersByGroupIdQuery, FindUsersByGroupIdQueryVariables>;
export const FindUsersBySearchTextDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindUsersBySearchText"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branch"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SafeInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUsersBySearchText"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchText"}}},{"kind":"Argument","name":{"kind":"Name","value":"branch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branch"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"branch"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"grade"}},{"kind":"Field","name":{"kind":"Name","value":"occupationalCode"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"currentCareer"}},{"kind":"Field","name":{"kind":"Name","value":"onboardingCompletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"licenseOnboardingCompletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"showThirdPartySiteWarning"}},{"kind":"Field","name":{"kind":"Name","value":"badgeNotifications"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FindUsersBySearchTextQuery, FindUsersBySearchTextQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"branch"}},{"kind":"Field","name":{"kind":"Name","value":"grade"}},{"kind":"Field","name":{"kind":"Name","value":"occupationalCode"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"trainingGroup"}},{"kind":"Field","name":{"kind":"Name","value":"currentCareer"}},{"kind":"Field","name":{"kind":"Name","value":"onboardingCompletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"licenseOnboardingCompletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"showThirdPartySiteWarning"}},{"kind":"Field","name":{"kind":"Name","value":"badgeNotifications"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetRecentMissionPartnersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRecentMissionPartners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recentMissionPartners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"missionPartnerId"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartnerName"}},{"kind":"Field","name":{"kind":"Name","value":"visitedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetRecentMissionPartnersQuery, GetRecentMissionPartnersQueryVariables>;
export const ImportBulkUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ImportBulkUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bulkUploadFile"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"importBulkUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bulkUploadFile"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<ImportBulkUsersMutation, ImportBulkUsersMutationVariables>;
export const ImportSingleUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ImportSingleUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"importSingleUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ImportSingleUserMutation, ImportSingleUserMutationVariables>;
export const RemoveGroupMembershipsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeGroupMemberships"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeGroupMemberships"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}]}]}}]} as unknown as DocumentNode<RemoveGroupMembershipsMutation, RemoveGroupMembershipsMutationVariables>;
export const RemoveMissionPartnerMembershipsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeMissionPartnerMemberships"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeMissionPartnerMemberships"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}]}]}}]} as unknown as DocumentNode<RemoveMissionPartnerMembershipsMutation, RemoveMissionPartnerMembershipsMutationVariables>;
export const ToggleAllowContractorAccessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ToggleAllowContractorAccess"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allow"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleAllowContractorAccess"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"allow"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allow"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"canAccessFullDu"}}]}}]}}]} as unknown as DocumentNode<ToggleAllowContractorAccessMutation, ToggleAllowContractorAccessMutationVariables>;
export const AddTrainingPlansToUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddTrainingPlansToUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"plans"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddPlansInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTrainingPlansToUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"plans"},"value":{"kind":"Variable","name":{"kind":"Name","value":"plans"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"planType"}},{"kind":"Field","name":{"kind":"Name","value":"planSourceId"}}]}}]}}]} as unknown as DocumentNode<AddTrainingPlansToUserMutation, AddTrainingPlansToUserMutationVariables>;
export const CountActiveUsersByMissionPartnerIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountActiveUsersByMissionPartnerId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countActiveUsersByMissionPartnerId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}]}]}}]} as unknown as DocumentNode<CountActiveUsersByMissionPartnerIdQuery, CountActiveUsersByMissionPartnerIdQueryVariables>;
export const CountOnboardedUsersByMissionPartnerIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountOnboardedUsersByMissionPartnerId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countOnboardedUsersByMissionPartnerId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}]}]}}]} as unknown as DocumentNode<CountOnboardedUsersByMissionPartnerIdQuery, CountOnboardedUsersByMissionPartnerIdQueryVariables>;
export const CountUsersByMissionPartnerIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountUsersByMissionPartnerId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countUsersByMissionPartnerId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}]}]}}]} as unknown as DocumentNode<CountUsersByMissionPartnerIdQuery, CountUsersByMissionPartnerIdQueryVariables>;
export const FindFieldCommandsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindFieldCommands"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findFieldCommands"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<FindFieldCommandsQuery, FindFieldCommandsQueryVariables>;
export const FindOrganizationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findOrganizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOrganizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<FindOrganizationsQuery, FindOrganizationsQueryVariables>;
export const FindSpaceDeltasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindSpaceDeltas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findSpaceDeltas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<FindSpaceDeltasQuery, FindSpaceDeltasQueryVariables>;
export const FindSquadronsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findSquadrons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findSquadrons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<FindSquadronsQuery, FindSquadronsQueryVariables>;
export const FindUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUserById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"branch"}},{"kind":"Field","name":{"kind":"Name","value":"grade"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"testRecord"}},{"kind":"Field","name":{"kind":"Name","value":"canAccessFullDu"}},{"kind":"Field","name":{"kind":"Name","value":"occupationalCode"}},{"kind":"Field","name":{"kind":"Name","value":"groupMemberships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"groupId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"lastLoginAt"}},{"kind":"Field","name":{"kind":"Name","value":"keycloakUserCreatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalTimeTrained"}},{"kind":"Field","name":{"kind":"Name","value":"skills"}}]}}]}}]} as unknown as DocumentNode<FindUserByIdQuery, FindUserByIdQueryVariables>;
export const GetUserMissionPartnerTrialStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserMissionPartnerTrialStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserMissionPartnerTrialStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasExpiredTrial"}},{"kind":"Field","name":{"kind":"Name","value":"missionPartner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"trialStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"trialEndDate"}},{"kind":"Field","name":{"kind":"Name","value":"trialEnabled"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserMissionPartnerTrialStatusQuery, GetUserMissionPartnerTrialStatusQueryVariables>;
export const RemoveUsersFromMissionPartnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeUsersFromMissionPartner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeUsersFromMissionPartner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<RemoveUsersFromMissionPartnerMutation, RemoveUsersFromMissionPartnerMutationVariables>;
export const RevokeVendorLicensesForUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"revokeVendorLicensesForUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revokeVendorLicensesForUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}},{"kind":"Argument","name":{"kind":"Name","value":"missionPartnerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionPartnerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"vendorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<RevokeVendorLicensesForUsersMutation, RevokeVendorLicensesForUsersMutationVariables>;
export const CountAllVendorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"countAllVendors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countAllVendors"}}]}}]} as unknown as DocumentNode<CountAllVendorsQuery, CountAllVendorsQueryVariables>;
export const CountUniqueItemsAndVendorsBySourceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"countUniqueItemsAndVendorsBySource"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countUniqueItemsAndVendorsBySource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"}},{"kind":"Field","name":{"kind":"Name","value":"vendors"}}]}}]}}]} as unknown as DocumentNode<CountUniqueItemsAndVendorsBySourceQuery, CountUniqueItemsAndVendorsBySourceQueryVariables>;
export const CreateVendorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateVendor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateVendorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createVendor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isLicensed"}}]}}]}}]} as unknown as DocumentNode<CreateVendorMutation, CreateVendorMutationVariables>;
export const FindAllVendorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllVendors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllVendors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"provisioned"}},{"kind":"Field","name":{"kind":"Name","value":"assigned"}},{"kind":"Field","name":{"kind":"Name","value":"isLicensed"}}]}}]}}]} as unknown as DocumentNode<FindAllVendorsQuery, FindAllVendorsQueryVariables>;
export const FindLicensedVendorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindLicensedVendors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findLicensedVendors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"provisioned"}},{"kind":"Field","name":{"kind":"Name","value":"assigned"}},{"kind":"Field","name":{"kind":"Name","value":"isLicensed"}}]}}]}}]} as unknown as DocumentNode<FindLicensedVendorsQuery, FindLicensedVendorsQueryVariables>;
export const FindVendorByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findVendorById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findVendorById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"provisioned"}},{"kind":"Field","name":{"kind":"Name","value":"assigned"}}]}}]}}]} as unknown as DocumentNode<FindVendorByIdQuery, FindVendorByIdQueryVariables>;
export const UpdateVendorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateVendor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateVendorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateVendor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateVendorMutation, UpdateVendorMutationVariables>;