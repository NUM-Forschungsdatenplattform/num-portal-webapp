import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { AuthService } from 'src/app/core/auth/auth.service'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { StudyService } from 'src/app/core/services/study/study.service'
import { IStudyApi } from 'src/app/shared/models/study/study-api.interface'
import { StudyStatus } from 'src/app/shared/models/study/study-status.enum'
import { StudyUiModel } from 'src/app/shared/models/study/study-ui.model'
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'
import { IStudyResolved } from '../studies/models/study-resolved.interface'

@Injectable({
  providedIn: 'root',
})
export class DataExplorerResolver implements Resolve<IStudyResolved> {
  userInfo: IAuthUserInfo

  constructor(
    private studyService: StudyService,
    private phenotypeService: PhenotypeService,
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.userInfoObservable$.subscribe((userInfo) => (this.userInfo = userInfo))
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStudyResolved> {
    const id = route.paramMap.get('id')

    if (isNaN(+id)) {
      this.router.navigate(['data-explorer/studies'])
      return of()
    }

    return this.studyService.get(+id).pipe(
      map((study) => {
        if (this.isAllowed(study)) {
          const uiModel = new StudyUiModel(study, this.phenotypeService)
          return { study: uiModel, error: null }
        } else {
          this.router.navigate(['data-explorer/studies'])
          return undefined
        }
      }),
      catchError((error) => {
        this.router.navigate(['data-explorer/studies'])
        return of(error)
      })
    )
  }

  isAllowed(study: IStudyApi): boolean {
    if (study.status === StudyStatus.Published) {
      if (study.researchers.find((researcher) => this.userInfo.sub === researcher.userId)) {
        return true
      }
    }
    return false
  }
}
