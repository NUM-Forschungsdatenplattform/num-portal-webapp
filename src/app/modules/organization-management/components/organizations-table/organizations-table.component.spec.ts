import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { mockOrganization1, mockOrganizations } from 'src/mocks/data-mocks/organizations.mock'
import { OrganizationsTableComponent } from './organizations-table.component'
import { MatSort } from '@angular/material/sort'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { OrganizationUserFilterChipId } from 'src/app/shared/models/organization/organization-filter-chip.enum'

describe('OrganizationsTableComponent', () => {
  let component: OrganizationsTableComponent
  let fixture: ComponentFixture<OrganizationsTableComponent>
  let router: Router

  const organizationsSubject$ = new Subject<any>()
  const organizationService = {
    organizationsObservable$: organizationsSubject$.asObservable(),
    delete: jest.fn(),
    getAllPag: jest.fn(),
  } as unknown as OrganizationService
  const mockToast = {
    openToast: jest.fn(),
  } as unknown as ToastMessageService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationsTableComponent],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        PipesModule,
        FontAwesomeTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {
          provide: OrganizationService,
          useValue: organizationService,
        },
        {
          provide: ToastMessageService,
          useValue: mockToast,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(OrganizationsTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When the organizations get updated', () => {
    it('should set the organizations as table data source', () => {
      organizationsSubject$.next({
        content: mockOrganizations,
      })
      expect(component.dataSource.data).toEqual(mockOrganizations)
    })
  })

  describe('When an organization is selected', () => {
    beforeEach(() => {
      jest.spyOn(router, 'navigate').mockImplementation()
    })
    it('should navigate to the organization-editor', () => {
      component.handleSelectClick(mockOrganization1)
      expect(router.navigate).toHaveBeenCalledWith(['organizations', 1, 'editor'])
    })
  })

  describe('When pagination is triggered', () => {
    it('should fetch next page', () => {
      jest.spyOn(organizationService, 'getAllPag').mockReturnValue(of({}))
      const params = {
        pageIndex: 1,
        pageSize: 10,
      }
      component.onPageChange(params)
    })
  })

  describe('When sorting is triggered', () => {
    it('should fetch sorting page', () => {
      jest.spyOn(organizationService, 'getAllPag').mockReturnValue(of({}))
      const sort = new MatSort()
      sort.active = 'name'
      sort.direction = 'asc'
      component.handleSortChangeTable(sort)
    })
  })
  describe('When a filter is selected', () => {
    it('should call the backend', () => {
      jest.spyOn(organizationService, 'getAllPag').mockReturnValue(of({}))
      component.handleFilterChange(OrganizationUserFilterChipId.OrganizationAll)
      component.handleFilterChange(OrganizationUserFilterChipId.OrganizationActive)
      component.handleFilterChange(OrganizationUserFilterChipId.OrganizationInactive)
    })
  })

  describe('On the attempt to delete an organization', () => {
    beforeEach(() => {
      const mockAqlObservable = of(mockOrganization1)
      jest.spyOn(organizationService, 'delete').mockImplementation(() => mockAqlObservable)
    })
    it('should call the organization delete method', (done) => {
      const orgId = 1
      component.delete(orgId) /* .then(() => { */
      expect(organizationService.delete).toHaveBeenCalledTimes(1)
      expect(mockToast.openToast).toHaveBeenCalledWith({
        type: ToastMessageType.Success,
        message: 'ORGANIZATION_MANAGEMENT.DELETE_ORGANIZATION_SUCCESS_MESSAGE',
      })
      done()
    })
  })
})
