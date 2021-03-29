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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { AuthService } from 'src/app/core/auth/auth.service'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { IProjectApi } from 'src/app/shared/models/project/project-api.interface'
import { ProjectStatus } from 'src/app/shared/models/project/project-status.enum'
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { mockProject1 } from 'src/mocks/data-mocks/project.mock'
import {
  CLOSE_PROJECT_DIALOG_CONFIG,
  PUBLISH_PROJECT_DIALOG_CONFIG,
  WITHDRAW_APPROVAL_DIALOG_CONFIG,
} from './constants'
import { APPROVER_MENU, COORDINATOR_MENU, MENU_ITEM_PREVIEW, ProjectMenuKeys } from './menu-items'

import { ProjectsTableComponent } from './projects-table.component'

describe('ProjectsTableComponent', () => {
  let component: ProjectsTableComponent
  let fixture: ComponentFixture<ProjectsTableComponent>
  let router: Router

  const projectsSubject$ = new Subject<IProjectApi[]>()
  const projectService = ({
    projectsObservable$: projectsSubject$.asObservable(),
    getAll: () => of(),
    updateStatusById: jest.fn(),
  } as unknown) as ProjectService

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
      declarations: [ProjectsTableComponent],
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
          provide: ProjectService,
          useValue: projectService,
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
    fixture = TestBed.createComponent(ProjectsTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When new projects are received on the observable', () => {
    it('should set the projects as the tables data source', () => {
      projectsSubject$.next([mockProject1])
      expect(component.dataSource.data).toEqual([mockProject1])
    })
  })

  describe('When the userInfo gets updated', () => {
    const roles = [AvailableRoles.ProjectCoordinator]
    const userInfo: IAuthUserInfo = {
      sub: '',
      groups: roles,
    }
    it('should set the roles to the component', () => {
      userInfoSubject$.next(userInfo)
      expect(component.roles).toEqual(roles)
    })

    it('should generate the menu based on the role for the project coordinator', () => {
      userInfoSubject$.next(userInfo)
      expect(component.menuItems).toEqual([MENU_ITEM_PREVIEW, ...COORDINATOR_MENU])
    })

    it('should generate the menu based on the role for the project approver', () => {
      userInfo.groups = [AvailableRoles.ProjectApprover]
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
      jest.spyOn(projectService, 'updateStatusById').mockImplementation()
    })

    test.each([ProjectMenuKeys.Edit, ProjectMenuKeys.Preview, ProjectMenuKeys.Review])(
      'should call the project editor with the menu item key clicked as queryParam',
      (menuKey: ProjectMenuKeys) => {
        const projectId = 1
        component.handleMenuClick(menuKey, projectId)

        const queryParams = { mode: menuKey.toLocaleLowerCase() }
        expect(router.navigate).toHaveBeenCalledWith(['projects', projectId, 'editor'], {
          queryParams,
        })
      }
    )

    it('should call the project editor with the edit key if researchers are to be edited', () => {
      const projectId = 1
      component.handleMenuClick(ProjectMenuKeys.Edit_researchers, projectId)

      const queryParams = { mode: ProjectMenuKeys.Edit.toLocaleLowerCase() }
      expect(router.navigate).toHaveBeenCalledWith(['projects', projectId, 'editor'], {
        queryParams,
      })
    })

    const testCases = [
      {
        key: ProjectMenuKeys.Withdraw_approval,
        dialog: WITHDRAW_APPROVAL_DIALOG_CONFIG,
        newStatus: ProjectStatus.Draft,
        decision: true,
      },
      {
        key: ProjectMenuKeys.Withdraw_approval,
        dialog: WITHDRAW_APPROVAL_DIALOG_CONFIG,
        newStatus: ProjectStatus.Draft,
        decision: false,
      },
      {
        key: ProjectMenuKeys.Close,
        dialog: CLOSE_PROJECT_DIALOG_CONFIG,
        newStatus: ProjectStatus.Closed,
        decision: true,
      },
      {
        key: ProjectMenuKeys.Publish,
        dialog: PUBLISH_PROJECT_DIALOG_CONFIG,
        newStatus: ProjectStatus.Published,
        decision: true,
      },
    ]

    test.each(testCases)(
      'should open the correct decision dialog and update the project on confirmation',
      (testcase) => {
        const projectId = 1
        component.handleMenuClick(testcase.key, projectId)
        expect(mockDialogService.openDialog).toHaveBeenCalledWith(testcase.dialog)
        afterClosedSubject$.next(testcase.decision)
        if (testcase.decision === true) {
          expect(projectService.updateStatusById).toHaveBeenCalledWith(
            projectId,
            testcase.newStatus
          )
        } else {
          expect(projectService.updateStatusById).not.toHaveBeenCalledWith(
            projectId,
            testcase.newStatus
          )
        }
      }
    )
  })
})
