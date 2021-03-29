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
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { IPhenotypeResolved } from './models/phenotype-resolved.interface'
import { PhenotypeUiModel } from '../../shared/models/phenotype/phenotype-ui.model'

@Injectable({
  providedIn: 'root',
})
export class PhenotypeResolver implements Resolve<IPhenotypeResolved> {
  constructor(private phenotypeService: PhenotypeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IPhenotypeResolved> {
    const id = route.paramMap.get('id')

    if (id === 'new') {
      return of({ phenotype: new PhenotypeUiModel(), error: null })
    }

    if (isNaN(+id)) {
      const message = `Id was not a number: ${id}`
      return of({ phenotype: new PhenotypeUiModel(), error: message })
    }

    return this.phenotypeService.get(+id).pipe(
      map((phenotype) => {
        const uiModel = new PhenotypeUiModel(phenotype)
        return { phenotype: uiModel, error: null }
      }),
      catchError((error) => {
        return of({ phenotype: new PhenotypeUiModel(), error })
      })
    )
  }
}
