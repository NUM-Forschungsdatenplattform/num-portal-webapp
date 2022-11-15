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

import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { maxBy, minBy } from 'lodash'
import { BehaviorSubject, of, Subject } from 'rxjs'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { SearchComponent } from 'src/app/shared/components/search/search.component'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { IFilterItem } from 'src/app/shared/models/filter-chip.interface'
import { IProjectApi } from 'src/app/shared/models/project/project-api.interface'
import { IProjectFilter } from 'src/app/shared/models/project/project-filter.interface'
import { ProjectStatus } from 'src/app/shared/models/project/project-status.enum'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { mockProject1, mockProjectsForSort } from 'src/mocks/data-mocks/project.mock'
import {
  ARCHIVE_PROJECT_DIALOG_CONFIG,
  CLOSE_PROJECT_DIALOG_CONFIG,
  DELETE_PROJECT_DIALOG_CONFIG,
  PUBLISH_PROJECT_DIALOG_CONFIG,
  WITHDRAW_APPROVAL_DIALOG_CONFIG,
} from './constants'
import { APPROVER_MENU, COORDINATOR_MENU, MENU_ITEM_PREVIEW, ProjectMenuKeys } from './menu-items'

import { ProjectsTableComponent } from './projects-table.component'

describe('ProjectsTableComponent', () => {
  let component: ProjectsTableComponent
  let fixture: ComponentFixture<ProjectsTableComponent>
  let router: Router
  @Component({ selector: 'num-filter-chips', template: '' })
  class StubFilterChipsComponent {
    @Input() filterChips: IFilterItem<string | number>[]
    @Input() multiSelect: boolean
    @Output() selectionChange = new EventEmitter()
  }

  const projectsSubject$ = new Subject<IProjectApi[]>()
  const filterConfigSubject$ = new BehaviorSubject<IProjectFilter>({
    searchText: '',
    filterItem: [],
  })

  const projectService = {
    filteredProjectsObservable$: projectsSubject$.asObservable(),
    filterConfigObservable$: filterConfigSubject$.asObservable(),
    getAll: () => of(),
    getAllPag: () => of(),
    updateStatusById: jest.fn(),
    setFilter: jest.fn(),
  } as unknown as ProjectService

  const userProfileSubject$ = new Subject<IUserProfile>()
  const profileService = {
    userProfileObservable$: userProfileSubject$.asObservable(),
  } as ProfileService

  const afterClosedSubject$ = new Subject()
  const mockDialogService = {
    openDialog: jest.fn().mockImplementation((_: any) => {
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown as DialogService

  const mockToastMessageService = {
    openToast: jest.fn(),
  } as unknown as ToastMessageService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsTableComponent, StubFilterChipsComponent, SearchComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
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
          provide: ProfileService,
          useValue: profileService,
        },
        {
          provide: DialogService,
          useValue: mockDialogService,
        },
        {
          provide: ToastMessageService,
          useValue: mockToastMessageService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.spyOn(projectService, 'setFilter')
    jest.clearAllMocks()
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(ProjectsTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  // it('should set the filter in the projectService on searchChange', () => {
  //   component.handleSearchChange()
  //   expect(projectService.setFilter).toHaveBeenCalledWith(component.filterConfig)
  // })
  //
  // it('should set the filter in the projectService on filterChange', () => {
  //   component.handleFilterChange()
  //   expect(projectService.setFilter).toHaveBeenCalledWith(component.filterConfig)
  // })

  // describe('When new projects are received on the observable', () => {
  //   it('should set the projects as the tables data source', () => {
  //     projectsSubject$.next([mockProject1])
  //     expect(component.dataSource.data).toEqual([mockProject1])
  //   })
  // })
  //
  // describe('When the userInfo gets updated', () => {
  //   const roles = [AvailableRoles.StudyCoordinator]
  //   const userInfo = {
  //     id: '',
  //     roles,
  //   } as IUserProfile
  //   it('should set the roles to the component', () => {
  //     userProfileSubject$.next(userInfo)
  //     expect(component.roles).toEqual(roles)
  //   })
  //
  //   it('should generate the menu based on the role for the project coordinator', () => {
  //     userProfileSubject$.next(userInfo)
  //     expect(component.menuItems).toEqual([MENU_ITEM_PREVIEW, ...COORDINATOR_MENU])
  //   })
  //
  //   it('should generate the menu based on the role for the project approver', () => {
  //     userInfo.roles = [AvailableRoles.StudyApprover]
  //     userProfileSubject$.next(userInfo)
  //     expect(component.menuItems).toEqual([MENU_ITEM_PREVIEW, ...APPROVER_MENU])
  //   })
  //
  //   it('should display the preview option to other roles', () => {
  //     userInfo.roles = [AvailableRoles.Researcher]
  //     userProfileSubject$.next(userInfo)
  //     expect(component.menuItems).toEqual([MENU_ITEM_PREVIEW])
  //   })
  // })
  //
  describe('When a menu Item is clicked', () => {
    beforeEach(() => {
      jest.spyOn(router, 'navigate').mockImplementation()
      jest.spyOn(projectService, 'updateStatusById').mockImplementation(() => of({}))
      jest.spyOn(mockToastMessageService, 'openToast').mockImplementation()
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
      {
        key: ProjectMenuKeys.Archive,
        dialog: ARCHIVE_PROJECT_DIALOG_CONFIG,
        newStatus: ProjectStatus.Archived,
        decision: true,
      },
      {
        key: ProjectMenuKeys.Delete,
        dialog: DELETE_PROJECT_DIALOG_CONFIG,
        newStatus: ProjectStatus.ToBeDeleted,
        decision: true,
      },
    ]

    test.each(testCases)(
      'should open the correct decision dialog and update the project on confirmation with success',
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
