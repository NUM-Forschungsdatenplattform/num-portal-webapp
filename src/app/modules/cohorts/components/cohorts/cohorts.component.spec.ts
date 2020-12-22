import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { of } from 'rxjs'
import { CohortService } from 'src/app/core/services/cohort.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { SharedModule } from 'src/app/shared/shared.module'

import { CohortsComponent } from './cohorts.component'

describe('CohortsComponent', () => {
  let component: CohortsComponent
  let fixture: ComponentFixture<CohortsComponent>

  const cohortService = {
    getCohortSize: (id: number) => of(),
  } as CohortService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CohortsComponent],
      imports: [BrowserAnimationsModule, MaterialModule, SharedModule],
      providers: [{ provide: CohortService, useValue: cohortService }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CohortsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
