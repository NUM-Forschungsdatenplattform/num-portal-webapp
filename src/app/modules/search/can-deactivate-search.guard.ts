import { Injectable } from '@angular/core'
import { CanDeactivate } from '@angular/router'
import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateSearchGuard implements CanDeactivate<any> {
  constructor(private patientFilterService: PatientFilterService) {}

  canDeactivate(_: any): boolean {
    this.patientFilterService.resetCurrentProject()
    return true
  }
}
