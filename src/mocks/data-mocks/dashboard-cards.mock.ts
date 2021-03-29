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

import { IDashboardCard } from 'src/app/shared/models/content/dashboard-card.interface'

export const mockDashboardCards: IDashboardCard[] = [
  {
    imageId: 'CODEX',
    url: 'https://www.google.de/a-longer-link/test/this',
    de: {
      title: 'German Title 1',
      text:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    },
    en: {
      title: 'English Title 1',
      text:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    },
  },
  {
    imageId: 'INFORMATION',
    url: 'https://www.google.de',
    de: {
      title: 'German Title 2',
      text:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    },
    en: {
      title: 'English Title 2',
      text:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    },
  },
  {
    imageId: 'NEWS',
    url: 'https://www.google.de',
    de: {
      title: 'German Title 3',
      text:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    },
    en: {
      title: 'English Title 3',
      text:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    },
  },
]
