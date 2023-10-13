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
import { CanDeactivate } from '@angular/router'
import { PatientFilterService } from '../../core/services/patient-filter/patient-filter.service'

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