import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { Observable, of } from 'rxjs'
import { map, catchError, tap } from 'rxjs/operators'
import { PhenotypeService } from 'src/app/core/services/phenotype.service'
import { IPhenotypeResolved } from './models/phenotype-resolved.interface'

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
      return of({ phenotype: null, error: null })
    }

    if (isNaN(+id)) {
      const message = `Id was not a number: ${id}`
      return of({ phenotype: null, error: message })
    }

    return this.phenotypeService.get(+id).pipe(
      map((phenotype) => {
        return { phenotype, error: null }
      }),
      catchError((error) => {
        return of({ phenotype: null, error })
      })
    )
  }
}
