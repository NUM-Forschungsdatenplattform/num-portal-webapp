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

import { IOrganization } from './organization.interface'

export class OrganizationUiModel {
  id: number | null
  name?: string
  mailDomains: string[]
  active: boolean

  constructor(organizationApi?: IOrganization) {
    this.id = organizationApi?.id || null
    this.name = organizationApi?.name
    this.mailDomains = organizationApi?.mailDomains || []
    this.active = organizationApi?.active || true
  }

  convertToApi(fillIn?: Partial<IOrganization>): IOrganization {
    return {
      id: this.id,
      name: this.name,
      mailDomains: this.mailDomains,
      active: this.active,
      ...fillIn,
    }
  }
}
