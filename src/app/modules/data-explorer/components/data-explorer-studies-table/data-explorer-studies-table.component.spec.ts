import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { StudyService } from 'src/app/core/services/study/study.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { IStudyApi } from 'src/app/shared/models/study/study-api.interface'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { mockStudy3 } from 'src/mocks/data-mocks/studies.mock'

import { DataExplorerStudiesTableComponent } from './data-explorer-studies-table.component'

describe('DataExplorerStudiesTableComponent', () => {
  let component: DataExplorerStudiesTableComponent
  let fixture: ComponentFixture<DataExplorerStudiesTableComponent>

  const myPublishedStudiesSubject$ = new Subject<IStudyApi[]>()
  const studyService = ({
    myPublishedStudiesObservable$: myPublishedStudiesSubject$.asObservable(),
  } as unknown) as StudyService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataExplorerStudiesTableComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        PipesModule,
        FontAwesomeTestingModule,
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
    jest.clearAllMocks()
    fixture = TestBed.createComponent(DataExplorerStudiesTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When myPublishedStudies get updated', () => {
    it('should set the studies, the user is assigned to as researcher and which are in published state, as table data source', () => {
      myPublishedStudiesSubject$.next([mockStudy3])
      expect(component.dataSource.data).toEqual([mockStudy3])
    })
  })
})
