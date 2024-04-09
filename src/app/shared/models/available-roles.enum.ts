// TODO we need to change the role from 'study' to 'project'
export enum AvailableRoles {
  Researcher = 'RESEARCHER',
  StudyCoordinator = 'STUDY_COORDINATOR',
  ContentAdmin = 'CONTENT_ADMIN',
  OrganizationAdmin = 'ORGANIZATION_ADMIN',
  SuperAdmin = 'SUPER_ADMIN',
  StudyApprover = 'STUDY_APPROVER',
  Manager = 'MANAGER',
  CriteriaEditor = 'CRITERIA_EDITOR',
}
export const allRoles = [
  AvailableRoles.Researcher,
  AvailableRoles.StudyCoordinator,
  AvailableRoles.ContentAdmin,
  AvailableRoles.OrganizationAdmin,
  AvailableRoles.SuperAdmin,
  AvailableRoles.StudyApprover,
  AvailableRoles.Manager,
  AvailableRoles.CriteriaEditor,
]
