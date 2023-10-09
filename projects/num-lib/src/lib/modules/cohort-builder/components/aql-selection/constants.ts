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

import { DialogConfig } from 'projects/num-lib/src/lib/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'projects/num-lib/src/lib/shared/models/dialog/dialog-size.enum'
import { DialogAqlInfoComponent } from '../dialog-aql-info/dialog-aql-info.component'

export const INFO_DIALOG_CONFIG: DialogConfig = {
  title: 'QUERIES.INFO_DIALOG_TITLE',
  cancelButtonText: 'BUTTON.CANCEL',
  hasCloseIcon: true,
  dialogSize: DialogSize.Medium,

  dialogContentComponent: DialogAqlInfoComponent,
  dialogContentPayload: undefined,
}
