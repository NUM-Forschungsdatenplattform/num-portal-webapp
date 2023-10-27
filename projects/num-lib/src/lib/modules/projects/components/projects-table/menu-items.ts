/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AvailableRoles } from "../../../../shared/models/available-roles.enum"
import { IItemVisibility } from "../../../../shared/models/item-visibility.interface"
import { ProjectStatus } from "../../../../shared/models/project/project-status.enum"

export enum ProjectMenuKeys {
  Preview = 'PREVIEW',
  Edit = 'EDIT',
  Edit_researchers = 'EDIT_RESEARCHERS',
  Withdraw_approval = 'WITHDRAW_APPROVAL',
  Publish = 'PUBLISH',
  Close = 'CLOSE',
  Review = 'REVIEW',
  Archive = 'ARCHIVE',
  Delete = 'DELETE',
}

export const MENU_ITEM_PREVIEW: IItemVisibility = {
  id: ProjectMenuKeys.Preview,
  translationKey: 'BUTTON.PREVIEW',
  disabledUnless: [
    ProjectStatus.Approved,
    ProjectStatus.ChangeRequest,
    ProjectStatus.Closed,
    ProjectStatus.Denied,
    ProjectStatus.Draft,
    ProjectStatus.Pending,
    ProjectStatus.Published,
    ProjectStatus.Reviewing,
  ],
}

export const MENU_ITEM_EDIT: IItemVisibility = {
  id: ProjectMenuKeys.Edit,
  translationKey: 'BUTTON.EDIT',
  disabledUnless: [ProjectStatus.Draft, ProjectStatus.ChangeRequest],
  disableUnlessOwned: true,
  hiddenWhen: [
    ProjectStatus.Denied,
    ProjectStatus.Approved,
    ProjectStatus.Published,
    ProjectStatus.Closed,
  ],
}

export const MENU_ITEM_EDIT_RESEARCHERS: IItemVisibility = {
  id: ProjectMenuKeys.Edit_researchers,
  translationKey: 'BUTTON.EDIT_RESEARCHERS',
  disabledUnless: [ProjectStatus.Approved, ProjectStatus.Published],
  disableUnlessOwned: true,
  hiddenWhen: [
    ProjectStatus.Draft,
    ProjectStatus.ChangeRequest,
    ProjectStatus.Reviewing,
    ProjectStatus.Pending,
  ],
}

export const MENU_ITEM_WITHDRAW_APPROVAL: IItemVisibility = {
  translationKey: 'BUTTON.WITHDRAW_APPROVAL',
  id: ProjectMenuKeys.Withdraw_approval,
  disableUnlessOwned: true,
  disabledUnless: [ProjectStatus.Pending],
}

export const MENU_ITEM_PUBLISH: IItemVisibility = {
  translationKey: 'BUTTON.PUBLISH',
  id: ProjectMenuKeys.Publish,
  disableUnlessOwned: true,
  disabledUnless: [ProjectStatus.Approved],
}

export const MENU_ITEM_FINISH_PROJECT: IItemVisibility = {
  translationKey: 'BUTTON.FINISH_PROJECT',
  id: ProjectMenuKeys.Close,
  disableUnlessOwned: true,
  disabledUnless: [ProjectStatus.Approved, ProjectStatus.Published],
}

export const MENU_ITEM_REVIEW_PROJECT: IItemVisibility = {
  translationKey: 'BUTTON.REVIEW_PROJECT',
  id: ProjectMenuKeys.Review,
  disabledUnless: [ProjectStatus.Pending, ProjectStatus.Reviewing],
}

export const MENU_ITEM_ARCHIVE_PROJECT: IItemVisibility = {
  id: ProjectMenuKeys.Archive,
  translationKey: 'BUTTON.ARCHIVE',
  disabledUnless: [ProjectStatus.Closed, ProjectStatus.Denied],
  disableUnlessOwned: true,
  forceEnableByRole: [AvailableRoles.SuperAdmin],
  hiddenWhen: [
    ProjectStatus.Reviewing,
    ProjectStatus.Approved,
    ProjectStatus.Pending,
    ProjectStatus.Draft,
    ProjectStatus.ChangeRequest,
    ProjectStatus.Published,
  ],
}

export const MENU_ITEM_DELETE_PROJECT: IItemVisibility = {
  id: ProjectMenuKeys.Delete,
  translationKey: 'BUTTON.DELETE',
  disabledUnless: [ProjectStatus.Draft, ProjectStatus.ChangeRequest],
  disableUnlessOwned: true,
  forceEnableByRole: [AvailableRoles.SuperAdmin],
  hiddenWhen: [ProjectStatus.Denied, ProjectStatus.Closed, ProjectStatus.Archived],
}

/**
 * Possibile menu items for the project approver exclusivly (preview not included)
 */
export const APPROVER_MENU: IItemVisibility[] = [MENU_ITEM_REVIEW_PROJECT]

/**
 * Possibile menu items for the project coordinator exclusivly (preview not included)
 */
export const COORDINATOR_MENU: IItemVisibility[] = [
  MENU_ITEM_EDIT_RESEARCHERS,
  MENU_ITEM_EDIT,
  MENU_ITEM_PUBLISH,
  MENU_ITEM_WITHDRAW_APPROVAL,
  MENU_ITEM_FINISH_PROJECT,
  MENU_ITEM_ARCHIVE_PROJECT,
  MENU_ITEM_DELETE_PROJECT,
]
