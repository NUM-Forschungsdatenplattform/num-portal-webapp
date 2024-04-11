export enum ProjectStatus {
  Archived = 'ARCHIVED',
  Approved = 'APPROVED',
  ChangeRequest = 'CHANGE_REQUEST',
  Closed = 'CLOSED',
  Denied = 'DENIED',
  Draft = 'DRAFT',
  Pending = 'PENDING',
  Published = 'PUBLISHED',
  Reviewing = 'REVIEWING',

  /** Once the project gets deleted it's no longed existing.
   * This status is therefore not existing in the backend
   * and only for frontend use
   */
  ToBeDeleted = 'TO_BE_DELETED',
}
