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
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { TranslateModule } from '@ngx-translate/core'
import { PatientCountInfoComponent } from './patient-count-info.component'

describe('PatientCountInfoComponent', () => {
  let component: PatientCountInfoComponent
  let fixture: ComponentFixture<PatientCountInfoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientCountInfoComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCountInfoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render the text for the current dataset size', () => {
    component.patientCount = 1234
    const paragraphElement = fixture.debugElement.query(By.css('p'))
    expect((paragraphElement.nativeElement as HTMLParagraphElement).innerHTML.trim()).toEqual(
      'SEARCH.PATIENT_COUNT_INFO'
    )
  })
})
