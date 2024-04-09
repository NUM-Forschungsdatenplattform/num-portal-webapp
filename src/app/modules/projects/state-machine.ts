import { ProjectStatus } from 'src/app/shared/models/project/project-status.enum'

/**
 * returns true if isStatusSwitchable[currentStatus][newStatus] = true
 */
export const isStatusSwitchable = {
  [ProjectStatus.Approved]: {
    [ProjectStatus.Closed]: true,
    [ProjectStatus.Published]: true,
  },
  [ProjectStatus.ChangeRequest]: {
    [ProjectStatus.Draft]: true,
    [ProjectStatus.Pending]: true,
    [ProjectStatus.ToBeDeleted]: true,
  },
  [ProjectStatus.Closed]: {
    [ProjectStatus.Archived]: true,
  },
  [ProjectStatus.Denied]: {
    [ProjectStatus.Archived]: true,
  },
  [ProjectStatus.Draft]: {
    [ProjectStatus.Pending]: true,
    [ProjectStatus.ToBeDeleted]: true,
  },
  [ProjectStatus.Pending]: {
    [ProjectStatus.Reviewing]: true,
    [ProjectStatus.Draft]: true,
  },
  [ProjectStatus.Published]: {
    [ProjectStatus.Closed]: true,
  },
  [ProjectStatus.Reviewing]: {
    [ProjectStatus.Approved]: true,
    [ProjectStatus.ChangeRequest]: true,
    [ProjectStatus.Denied]: true,
    [ProjectStatus.Draft]: true,
  },
}
