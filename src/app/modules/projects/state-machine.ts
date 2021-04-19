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
