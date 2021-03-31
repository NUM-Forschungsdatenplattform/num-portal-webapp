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

// TODO we need to change the role from 'study' to 'project'
export enum AvailableRoles {
  Researcher = 'RESEARCHER',
  StudyCoordinator = 'STUDY_COORDINATOR',
  ContentAdmin = 'CONTENT_ADMIN',
  OrganizationAdmin = 'ORGANIZATION_ADMIN',
  SuperAdmin = 'SUPER_ADMIN',
  StudyApprover = 'STUDY_APPROVER',
}
