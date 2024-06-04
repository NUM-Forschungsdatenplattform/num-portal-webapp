import { Injectable } from '@angular/core'
import { Resolve, Router } from '@angular/router'

import { EMPTY, Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'

@Injectable({
  providedIn: 'root',
})
export class DataFilterResolver implements Resolve<ProjectUiModel> {
  constructor(
    private router: Router,
    private patientFilterService: PatientFilterService
  ) {}

  resolve(): Observable<ProjectUiModel> {
    return this.patientFilterService.getCurrentProject().pipe(
      catchError(() => {
        this.router.navigate(['search'])
        return EMPTY
      })
    )
  }
}
