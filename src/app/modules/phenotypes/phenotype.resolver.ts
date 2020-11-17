import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { PhenotypeService } from 'src/app/core/services/phenotype.service'
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
