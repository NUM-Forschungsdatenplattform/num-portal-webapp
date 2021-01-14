import { IItemVisibility } from 'src/app/shared/models/item-visibility.interface'
import { StudyStatus } from 'src/app/shared/models/study/study-status.enum'

export enum StudyMenuKeys {
  Preview = 'PREVIEW',
  Edit = 'EDIT',
  Edit_researchers = 'EDIT_RESEARCHERS',
  Withdraw_approval = 'WITHDRAW_APPROVAL',
  Publish = 'PUBLISH',
  Close = 'CLOSE',
  Review = 'REVIEW',
}

export const MENU_ITEM_PREVIEW: IItemVisibility = {
  id: StudyMenuKeys.Preview,
  translationKey: 'BUTTON.PREVIEW',
  disabledUnless: [
    StudyStatus.Approved,
    StudyStatus.Change_request,
    StudyStatus.Closed,
    StudyStatus.Denied,
    StudyStatus.Draft,
    StudyStatus.Pending,
    StudyStatus.Published,
    StudyStatus.Reviewing,
  ],
}

export const MENU_ITEM_EDIT: IItemVisibility = {
  id: StudyMenuKeys.Edit,
  translationKey: 'BUTTON.EDIT',
  disabledUnless: [StudyStatus.Draft, StudyStatus.Change_request],
  hiddenWhen: [StudyStatus.Denied, StudyStatus.Approved, StudyStatus.Published, StudyStatus.Closed],
}

export const MENU_ITEM_EDIT_RESEARCHERS: IItemVisibility = {
  id: StudyMenuKeys.Edit_researchers,
  translationKey: 'BUTTON.EDIT_RESEARCHERS',
  disabledUnless: [
    StudyStatus.Denied,
    StudyStatus.Approved,
    StudyStatus.Published,
    StudyStatus.Closed,
  ],
  hiddenWhen: [
    StudyStatus.Draft,
    StudyStatus.Change_request,
    StudyStatus.Reviewing,
    StudyStatus.Pending,
  ],
}

export const MENU_ITEM_WITHDRAW_APPROVAL: IItemVisibility = {
  translationKey: 'BUTTON.WITHDRAW_APPROVAL',
  id: StudyMenuKeys.Withdraw_approval,
  disabledUnless: [StudyStatus.Pending],
}

export const MENU_ITEM_PUBLISH: IItemVisibility = {
  translationKey: 'BUTTON.PUBLISH',
  id: StudyMenuKeys.Publish,
  disabledUnless: [StudyStatus.Approved],
}

export const MENU_ITEM_CLOSE_STUDY: IItemVisibility = {
  translationKey: 'BUTTON.CLOSE_STUDY',
  id: StudyMenuKeys.Close,
  disabledUnless: [StudyStatus.Approved, StudyStatus.Published],
}

export const MENU_ITEM_REVIEW_STUDY: IItemVisibility = {
  translationKey: 'BUTTON.REVIEW_STUDY',
  id: StudyMenuKeys.Review,
  disabledUnless: [StudyStatus.Approved, StudyStatus.Published],
}

/**
 * Possibile menu items for the study approver exclusivly (preview not included)
 */
export const APPROVER_MENU: IItemVisibility[] = [MENU_ITEM_REVIEW_STUDY]

/**
 * Possibile menu items for the study coordinator exclusivly (preview not included)
 */
export const COORDINATOR_MENU: IItemVisibility[] = [
  MENU_ITEM_EDIT_RESEARCHERS,
  MENU_ITEM_EDIT,
  MENU_ITEM_PUBLISH,
  MENU_ITEM_WITHDRAW_APPROVAL,
  MENU_ITEM_CLOSE_STUDY,
]
