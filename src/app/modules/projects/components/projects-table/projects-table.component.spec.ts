import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
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
import { MatSort } from '@angular/material/sort'
import { IOrganization } from '../../../../shared/models/organization/organization.interface'

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
        NoopAnimationsModule,
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

  describe('When generate role', () => {
    it('should generate role', () => {
      jest.spyOn(projectService, 'getAllPag').mockReturnValue(of({}))
      component.generateMenuForRole()
    })
  })

  describe('When handling user role', () => {
    it('should generate role', () => {
      jest.spyOn(projectService, 'getAllPag').mockReturnValue(of({}))
      component.handleUserInfo({
        id: '999',
        username: 'test',
        firstName: 'test',
        lastName: 'test',
        email: 'test@test.com',
        createdTimestamp: null,
        approved: true,
        organization: undefined,
      })
    })
  })

  describe('When filter change', () => {
    it('filter change to all projects', () => {
      jest.spyOn(projectService, 'getAllPag').mockReturnValue(of({}))
      component.filterConfig['filterItem'] = [{ id: 'PROJECT.ALL_PROJECTS', isSelected: true }]
      component.handleFilterChange()
      expect(component.filters.type).toEqual(null)
    })

    it('filter change to my projects', () => {
      jest.spyOn(projectService, 'getAllPag').mockReturnValue(of({}))
      component.filterConfig['filterItem'] = [{ id: 'PROJECT.MY_PROJECTS', isSelected: true }]
      component.handleFilterChange()
      expect(component.filters.type).toEqual('OWNED')
    })

    it('filter change to organization projects', () => {
      jest.spyOn(projectService, 'getAllPag').mockReturnValue(of({}))
      component.filterConfig['filterItem'] = [
        { id: 'PROJECT.ORGANIZATION_PROJECTS', isSelected: true },
      ]
      component.handleFilterChange()
      expect(component.filters.type).toEqual('ORGANIZATION')
    })

    it('filter change to archived projects', () => {
      jest.spyOn(projectService, 'getAllPag').mockReturnValue(of({}))
      component.filterConfig['filterItem'] = [{ id: 'PROJECT.ARCHIVED_PROJECTS', isSelected: true }]
      component.handleFilterChange()
      expect(component.filters.type).toEqual('ARCHIVED')
    })
  })

  describe('When search is triggered', () => {
    it('should filter', () => {
      jest.spyOn(projectService, 'getAllPag').mockReturnValue(of({}))
      component.filterConfig.searchText = 'testSearch'
      component.handleSearchChange()
      expect(component.filters.search).toEqual('testSearch')
    })
  })

  describe('When pagination is triggered', () => {
    it('should fetch next page', () => {
      jest.spyOn(projectService, 'getAllPag').mockReturnValue(of({}))
      const params = {
        pageIndex: 1,
        pageSize: 10,
      }
      component.onPageChange(params)
    })
  })

  describe('When sorting is triggered', () => {
    it('should fetch sorting page', () => {
      jest.spyOn(projectService, 'getAllPag').mockReturnValue(of({}))
      const sort = new MatSort()
      sort.active = 'name'
      sort.direction = 'asc'
      component.handleSortChangeTable(sort)
    })
  })

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
