/**
 * Copyright 2024 Vitagroup AG
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

export interface IProjectAttachmentApi {
  /**
   * Unique ID of this attachment
   */
  id: number
  /**
   * File name of the attachment
   */
  name: string
  /**
   * Optional description for the attachment
   */
  description?: string
  /**
   * Date of upload in full ISO 6801 format string, i.e. YYYY-MM-DDTHH.mm.ss.SSSZ
   */
  uploadDate: string
  /**
   * Review counter of the document providing the document has been reviewed and thus should no
   * longer be editable.
   */
  reviewCounter: number
}
