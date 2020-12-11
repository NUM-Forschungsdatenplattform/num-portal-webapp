import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { StudyService } from 'src/app/core/services/study.service'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { StudiesComponent } from './studies.component'

describe('StudiesComponent', () => {
  let component: StudiesComponent
  let fixture: ComponentFixture<StudiesComponent>

  @Component({ selector: 'num-studies-table', template: '' })
  class StudiesTableStubComponent {}

  const studyService = ({
    getAll: () => of(),
  } as unknown) as StudyService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudiesComponent, StudiesTableStubComponent],
      imports: [MaterialModule, BrowserAnimationsModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: StudyService,
          useValue: studyService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StudiesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
