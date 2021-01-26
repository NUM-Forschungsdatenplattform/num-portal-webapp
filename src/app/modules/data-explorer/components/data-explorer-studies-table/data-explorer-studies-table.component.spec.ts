import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { AuthService } from 'src/app/core/auth/auth.service'
import { StudyService } from 'src/app/core/services/study/study.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { IStudyApi } from 'src/app/shared/models/study/study-api.interface'
import { StudyStatus } from 'src/app/shared/models/study/study-status.enum'
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { mockOAuthUser } from 'src/mocks/data-mocks/admin.mock'
import { mockStudies1, mockStudy3 } from 'src/mocks/data-mocks/studies.mock'

import { DataExplorerStudiesTableComponent } from './data-explorer-studies-table.component'

describe('DataExplorerStudiesTableComponent', () => {
  let component: DataExplorerStudiesTableComponent
  let fixture: ComponentFixture<DataExplorerStudiesTableComponent>

  const studyService = ({
    filterStudiesByStatusAndResearcher: () => of([mockStudy3]),
  } as unknown) as StudyService

  const userInfoSubject$ = new Subject<IAuthUserInfo>()
  const authService = {
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as AuthService

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
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    fixture = TestBed.createComponent(DataExplorerStudiesTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    jest.spyOn(studyService, 'filterStudiesByStatusAndResearcher')
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When userInfo is received on the observable', () => {
    it('should set the studies, the user is assigned to as researcher and which are in published state, as table data source', () => {
      userInfoSubject$.next(mockOAuthUser)

      expect(component.dataSource.data).toEqual([mockStudy3])
    })
  })
})
