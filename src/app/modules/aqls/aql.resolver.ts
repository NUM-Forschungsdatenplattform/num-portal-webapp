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

import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { IAqlResolved } from './models/aql-resolved.interface'
import { AqlEditorUiModel } from '../../shared/models/aql/aql-editor-ui.model'

@Injectable({
  providedIn: 'root',
})
export class AqlResolver implements Resolve<IAqlResolved> {
  constructor(private aqlService: AqlService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAqlResolved> {
    const id = route.paramMap.get('id')

    if (id === 'new') {
      return of({ aql: new AqlEditorUiModel(), error: null })
    }

    if (isNaN(+id)) {
      const message = `Id was not a number: ${id}`
      return of({ aql: new AqlEditorUiModel(), error: message })
    }

    return this.aqlService.get(+id).pipe(
      map((aql) => {
        const uiModel = new AqlEditorUiModel(aql)
        return { aql: uiModel, error: null }
      }),
      catchError((error) => {
        return of({ aql: new AqlEditorUiModel(), error })
      })
    )
  }
}
