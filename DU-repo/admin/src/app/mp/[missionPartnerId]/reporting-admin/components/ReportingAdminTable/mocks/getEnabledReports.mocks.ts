import { type MissionPartner } from '@/api/codegen/graphql';

export const MOCK_EMPTY_MISSION_PARTNER = {
  id: '55555555-5555-AAAA-BBBB-555555555555',
  name: 'MISSION PARTNER WITHOUT ENABLED REPORTS',
  enabledReports: []
} as MissionPartner;

export const MOCK_MISSION_PARTNER_WITH_INVALID_REPORT = {
  id: '55555555-5555-AAAA-BBBB-555555555555',
  name: 'MISSION PARTNER WITH INVALID REPORTS',
  enabledReports: [
    {
      id: 'INVALID_REPORT_ID'
    }
  ]
} as MissionPartner;

export const MOCK_MISSION_PARTNER_WITH_REPORT_A = {
  id: '46d71b90-fd8c-48a4-8709-0a505c033ba9',
  name: 'MISSION PARTNER WITH REPORTS - A',
  enabledReports: [
    {
      id: 'MISSION_PARTNER_LEARNER_ACTIVITY_EVENTS',
      name: 'Mission Partner: Learner Activity Events',
      description: 'Activity events for Mission Partner learners'
    }
  ]
} as MissionPartner;

export const MOCK_MISSION_PARTNER_WITH_REPORT_B = {
  id: '5156e693-1322-4472-b8da-be2b4849e3a4',
  name: 'MISSION PARTNER WITH REPORTS - B',
  enabledReports: [
    {
      id: 'MISSION_PARTNER_LEARNER_ACTIVITY_EVENTS',
      name: 'Mission Partner: Learner Activity Events',
      description: 'Activity events for Mission Partner learners'
    },
    {
      id: 'MIT_HORIZON_USER_LOGIN_EVENTS',
      name: 'MIT Horizon: User Login History',
      description: 'User login events for MIT Horizon learners'
    }
  ]
} as MissionPartner;

export const MOCK_MISSION_PARTNER_WITH_REPORT_C = {
  id: '5c0f32a9-d419-4f75-abc5-c876fd358277',
  name: 'MISSION PARTNER WITH REPORTS - C',
  enabledReports: [
    {
      id: 'MIT_HORIZON_USER_LOGIN_EVENTS',
      name: 'MIT Horizon: User Login History',
      description: 'User login events for MIT Horizon learners'
    }
  ]
} as MissionPartner;

export const MOCK_MISSION_PARTNERS = [
  MOCK_EMPTY_MISSION_PARTNER,
  MOCK_MISSION_PARTNER_WITH_REPORT_A,
  MOCK_EMPTY_MISSION_PARTNER,
  MOCK_EMPTY_MISSION_PARTNER,
  MOCK_EMPTY_MISSION_PARTNER,
  MOCK_MISSION_PARTNER_WITH_REPORT_B,
  MOCK_EMPTY_MISSION_PARTNER,
  MOCK_EMPTY_MISSION_PARTNER,
  MOCK_MISSION_PARTNER_WITH_REPORT_C,
  MOCK_EMPTY_MISSION_PARTNER,
  MOCK_EMPTY_MISSION_PARTNER
] as MissionPartner[];
