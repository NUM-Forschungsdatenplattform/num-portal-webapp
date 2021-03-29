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

import { IDashboardProject } from 'src/app/shared/models/content/dashboard-project.interface'

export const mockDashboardProjects: IDashboardProject[] = [
  {
    createDate: '2021-03-21T15:35:07.995541+02:00',
    title: 'Title 1',
    organization: 'Organization A',
    coordinator: 'Coordinator 1',
  },
  {
    createDate: '2021-03-22T15:35:07.995541+02:00',
    title: 'Title 2',
    organization: 'Organization B',
    coordinator: 'Coordinator 2',
  },
  {
    createDate: '2021-03-23T15:35:07.995541+02:00',
    title: 'Title 3',
    organization: 'Organization C',
    coordinator: 'Coordinator 3',
  },
  {
    createDate: '2021-03-24T15:35:07.995541+02:00',
    title: 'Title 4',
    organization: 'Organization D',
    coordinator: 'Coordinator 4',
  },
  {
    createDate: '2021-03-25T15:35:07.995541+02:00',
    title: 'Title 5',
    organization: 'Organization E',
    coordinator: 'Coordinator 5',
  },
]
