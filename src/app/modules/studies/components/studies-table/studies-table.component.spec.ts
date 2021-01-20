import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { AuthService } from 'src/app/core/auth/auth.service'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { StudyService } from 'src/app/core/services/study/study.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { IStudyApi } from 'src/app/shared/models/study/study-api.interface'
import { StudyStatus } from 'src/app/shared/models/study/study-status.enum'
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { mockStudy1 } from 'src/mocks/data-mocks/studies.mock'
import {
  CLOSE_STUDY_DIALOG_CONFIG,
  PUBLISH_STUDY_DIALOG_CONFIG,
  WITHDRAW_APPROVAL_DIALOG_CONFIG,
} from './constants'
import { APPROVER_MENU, COORDINATOR_MENU, MENU_ITEM_PREVIEW, StudyMenuKeys } from './menu-items'

import { StudiesTableComponent } from './studies-table.component'

describe('StudiesTableComponent', () => {
  let component: StudiesTableComponent
  let fixture: ComponentFixture<StudiesTableComponent>
  let router: Router

  const studiesSubject$ = new Subject<IStudyApi[]>()
  const studyService = ({
    studiesObservable$: studiesSubject$.asObservable(),
    getAll: () => of(),
    updateStatusById: jest.fn(),
  } as unknown) as StudyService

  const userInfoSubject$ = new Subject<IAuthUserInfo>()
  const authService = {
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as AuthService

  const afterClosedSubject$ = new Subject()
  const mockDialogService = ({
    openDialog: jest.fn().mockImplementation((_: any) => {
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown) as DialogService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudiesTableComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([]),
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
        {
          provide: DialogService,
          useValue: mockDialogService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(StudiesTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When new studies are received on the observable', () => {
    it('should set the studies as the tables data source', () => {
      studiesSubject$.next([mockStudy1])
      expect(component.dataSource.data).toEqual([mockStudy1])
    })
  })

  describe('When the userInfo gets updated', () => {
    const roles = [AvailableRoles.StudyCoordinator]
    const userInfo: IAuthUserInfo = {
      sub: '',
      groups: roles,
    }
    it('should set the roles to the component', () => {
      userInfoSubject$.next(userInfo)
      expect(component.roles).toEqual(roles)
    })

    it('should generate the menu based on the role for the study coordinator', () => {
      userInfoSubject$.next(userInfo)
      expect(component.menuItems).toEqual([MENU_ITEM_PREVIEW, ...COORDINATOR_MENU])
    })

    it('should generate the menu based on the role for the study approver', () => {
      userInfo.groups = [AvailableRoles.StudyApprover]
      userInfoSubject$.next(userInfo)
      expect(component.menuItems).toEqual([MENU_ITEM_PREVIEW, ...APPROVER_MENU])
    })

    it('should display the preview option to other roles', () => {
      userInfo.groups = [AvailableRoles.Researcher]
      userInfoSubject$.next(userInfo)
      expect(component.menuItems).toEqual([MENU_ITEM_PREVIEW])
    })
  })

  describe('When a menu Item is clicked', () => {
    beforeEach(() => {
      jest.spyOn(router, 'navigate').mockImplementation()
      jest.spyOn(studyService, 'updateStatusById').mockImplementation()
    })

    test.each([StudyMenuKeys.Edit, StudyMenuKeys.Preview, StudyMenuKeys.Review])(
      'should call the study editor with the menu item key clicked as queryParam',
      (menuKey: StudyMenuKeys) => {
        const studyId = 1
        component.handleMenuClick(menuKey, studyId)

        const queryParams = { mode: menuKey.toLocaleLowerCase() }
        expect(router.navigate).toHaveBeenCalledWith(['studies', studyId, 'editor'], {
          queryParams,
        })
      }
    )

    it('should call the study editor with the edit key if researchers are to be edited', () => {
      const studyId = 1
      component.handleMenuClick(StudyMenuKeys.Edit_researchers, studyId)

      const queryParams = { mode: StudyMenuKeys.Edit.toLocaleLowerCase() }
      expect(router.navigate).toHaveBeenCalledWith(['studies', studyId, 'editor'], {
        queryParams,
      })
    })

    const testCases = [
      {
        key: StudyMenuKeys.Withdraw_approval,
        dialog: WITHDRAW_APPROVAL_DIALOG_CONFIG,
        newStatus: StudyStatus.Draft,
        decision: true,
      },
      {
        key: StudyMenuKeys.Withdraw_approval,
        dialog: WITHDRAW_APPROVAL_DIALOG_CONFIG,
        newStatus: StudyStatus.Draft,
        decision: false,
      },
      {
        key: StudyMenuKeys.Close,
        dialog: CLOSE_STUDY_DIALOG_CONFIG,
        newStatus: StudyStatus.Closed,
        decision: true,
      },
      {
        key: StudyMenuKeys.Publish,
        dialog: PUBLISH_STUDY_DIALOG_CONFIG,
        newStatus: StudyStatus.Published,
        decision: true,
      },
    ]

    test.each(testCases)(
      'should open the correct decision dialog and update the study on confirmation',
      (testcase) => {
        const studyId = 1
        component.handleMenuClick(testcase.key, studyId)
        expect(mockDialogService.openDialog).toHaveBeenCalledWith(testcase.dialog)
        afterClosedSubject$.next(testcase.decision)
        if (testcase.decision === true) {
          expect(studyService.updateStatusById).toHaveBeenCalledWith(studyId, testcase.newStatus)
        } else {
          expect(studyService.updateStatusById).not.toHaveBeenCalledWith(
            studyId,
            testcase.newStatus
          )
        }
      }
    )
  })
})
