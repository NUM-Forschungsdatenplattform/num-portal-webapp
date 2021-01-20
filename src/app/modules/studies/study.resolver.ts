import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { StudyService } from 'src/app/core/services/study/study.service'
import { StudyUiModel } from 'src/app/shared/models/study/study-ui.model'
import { IStudyResolved } from './study-resolved.interface'

@Injectable({
  providedIn: 'root',
})
export class StudyResolver implements Resolve<IStudyResolved> {
  constructor(private studyService: StudyService, private phenotypeService: PhenotypeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStudyResolved> {
    const id = route.paramMap.get('id')

    if (id === 'new') {
      return of({ study: new StudyUiModel(), error: null })
    }

    if (isNaN(+id)) {
      const message = `Id was not a number: ${id}`
      return of({ study: new StudyUiModel(), error: message })
    }

    return this.studyService.get(+id).pipe(
      map((study) => {
        const uiModel = new StudyUiModel(study, this.phenotypeService)
        return { study: uiModel, error: null }
      }),
      catchError((error) => {
        return of({ study: new StudyUiModel(), error })
      })
    )
  }
}
