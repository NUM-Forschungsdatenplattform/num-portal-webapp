import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { AqlService } from 'src/app/core/services/aql.service'
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
