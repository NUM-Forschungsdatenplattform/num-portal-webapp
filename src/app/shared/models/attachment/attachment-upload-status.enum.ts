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

/**
 * Status of upload request processing
 */
export enum AttachmentUploadStatus {
  /**
   * Upload is done and final steps will take some time to be completed
   */
  COMPLETING = 'completing',
  /**
   * Upload is done and has been acknowledged as finished
   */
  DONE = 'done',
  /**
   * Upload has failed
   */
  ERROR = 'error',
  /**
   * Currently no upload taking place and ready for next upload
   */
  IDLE = 'idle',
  /**
   * Upload in progress and reports progress events in regular intervals
   */
  IN_PROGRESS = 'in-progress',
}
