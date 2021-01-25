import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { map, catchError, switchMap } from 'rxjs/operators'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { StudyService } from 'src/app/core/services/study/study.service'
import { PossibleStudyEditorMode } from 'src/app/shared/models/study/possible-study-editor-mode.enum'
import { IStudyApi } from 'src/app/shared/models/study/study-api.interface'
import { StudyStatus } from 'src/app/shared/models/study/study-status.enum'
import { StudyUiModel } from 'src/app/shared/models/study/study-ui.model'
import { IStudyResolved } from './models/study-resolved.interface'

@Injectable({
  providedIn: 'root',
})
export class StudyResolver implements Resolve<IStudyResolved> {
  constructor(
    private studyService: StudyService,
    private phenotypeService: PhenotypeService,
    private router: Router
  ) {}

  shouldChangeStatusToReview(mode: string, study: IStudyApi): boolean {
    return (
      mode === PossibleStudyEditorMode.REVIEW.toString() && study.status !== StudyStatus.Reviewing
    )
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStudyResolved> {
    const id = route.paramMap.get('id')
    const mode = route.queryParamMap.get('mode')?.toUpperCase()

    if (id === 'new') {
      return of({ study: new StudyUiModel(), error: null })
    }

    if (isNaN(+id)) {
      const message = `Id was not a number: ${id}`
      return of({ study: new StudyUiModel(), error: message })
    }

    return this.studyService.get(+id).pipe(
      switchMap((study) => {
        if (this.shouldChangeStatusToReview(mode, study)) {
          return this.studyService.updateStatusById(study.id, StudyStatus.Reviewing)
        } else {
          return of(study)
        }
      }),
      map((study) => {
        const uiModel = new StudyUiModel(study, this.phenotypeService)
        return { study: uiModel, error: null }
      }),
      catchError((error) => {
        this.router.navigate(['/studies'])
        // TODO: Display message to user
        return of(error)
      })
    )
  }
}
