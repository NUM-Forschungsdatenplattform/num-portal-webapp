import { StudyStatus } from 'src/app/shared/models/study/study-status.enum'

/**
 * returns true if isStatusSwitchable[currentStatus][newStatus] = true
 */
export const isStatusSwitchable = {
  [StudyStatus.Approved]: {
    [StudyStatus.Closed]: true,
    [StudyStatus.Published]: true,
  },
  [StudyStatus.Change_request]: {
    [StudyStatus.Draft]: true,
    [StudyStatus.Pending]: true,
  },
  [StudyStatus.Closed]: {},
  [StudyStatus.Denied]: {},
  [StudyStatus.Draft]: {
    [StudyStatus.Pending]: true,
  },
  [StudyStatus.Pending]: {
    [StudyStatus.Reviewing]: true,
    [StudyStatus.Draft]: true,
  },
  [StudyStatus.Published]: {
    [StudyStatus.Closed]: true,
  },
  [StudyStatus.Reviewing]: {
    [StudyStatus.Approved]: true,
    [StudyStatus.Change_request]: true,
    [StudyStatus.Denied]: true,
  },
}
