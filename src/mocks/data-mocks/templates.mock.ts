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

import { ITemplateMetaDataApi } from 'src/app/shared/models/template/template-api.interface'

export const mockTemplate1: ITemplateMetaDataApi = {
  templateId: '1',
  archetypeId: '1',
  createdOn: '2020-12-07T21:19:18.980Z',
  name: 'Template Mock 1',
}

export const mockTemplate2: ITemplateMetaDataApi = {
  templateId: '2',
  archetypeId: '2',
  createdOn: '2020-12-07T21:19:18.980Z',
  name: 'Template Mock 2',
}

export const mockTemplate3: ITemplateMetaDataApi = {
  templateId: '3',
  archetypeId: '3',
  createdOn: '2020-12-07T21:19:18.980Z',
  name: 'Template Mock 3',
}

export const mockTemplate4: ITemplateMetaDataApi = {
  templateId: '4',
  archetypeId: '4',
  createdOn: '2020-12-07T21:19:18.980Z',
  name: 'Template Mock 4',
}

export const mockTemplate5: ITemplateMetaDataApi = {
  templateId: '5',
  archetypeId: '5',
  createdOn: '2020-12-07T21:19:18.980Z',
  name: 'Template Mock 5',
}

export const mockTemplates = [
  mockTemplate1,
  mockTemplate2,
  mockTemplate3,
  mockTemplate4,
  mockTemplate5,
]
