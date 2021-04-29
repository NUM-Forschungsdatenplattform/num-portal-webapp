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

import { IAqlApi } from './aql.interface'
import { IUser } from '../user/user.interface'

export class AqlEditorUiModel {
  id: number
  name: string
  query: string
  purpose: string
  usage: string
  createDate: string
  modifiedDate: string
  organizationId: number
  owner: IUser
  publicAql: boolean

  constructor(aql?: IAqlApi) {
    this.id = aql?.id || null
    this.name = aql?.name || undefined
    this.query = aql?.query || ''
    this.purpose = aql?.purpose || undefined
    this.usage = aql?.use || undefined
    this.createDate = aql?.createDate || undefined
    this.modifiedDate = aql?.modifiedDate || undefined
    this.organizationId = aql?.owner.organization?.id || undefined
    this.owner = aql?.owner || undefined
    this.publicAql = aql ? aql.publicAql : true
  }

  public convertToApi(name: string, purpose: string, use: string, publicAql: boolean): IAqlApi {
    return {
      id: this.id,
      name,
      query: this.query,
      purpose,
      use,
      publicAql,
    }
  }
}
