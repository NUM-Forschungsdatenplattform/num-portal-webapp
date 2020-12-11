import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { StudyService } from 'src/app/core/services/study.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { IStudyApi } from 'src/app/shared/models/study/study-api.interface'

import { StudiesTableComponent } from './studies-table.component'

describe('StudiesTableComponent', () => {
  let component: StudiesTableComponent
  let fixture: ComponentFixture<StudiesTableComponent>

  const studiesSubject$ = new Subject<IStudyApi[]>()
  const studyService = {
    studiesObservable$: studiesSubject$.asObservable(),
    getAll: () => of(),
  } as StudyService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudiesTableComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {
          provide: StudyService,
          useValue: studyService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StudiesTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
