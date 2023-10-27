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
import { mockOrganization1, mockOrganizations } from 'src/mocks/data-mocks/organizations.mock'
import { OrganizationsTableComponent } from './organizations-table.component'
import { MatSort } from '@angular/material/sort'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { OrganizationService } from '../../../../core/services/organization/organization.service'
import { ToastMessageService } from '../../../../core/services/toast-message/toast-message.service'
import { MaterialModule } from 'projects/num-lib/src/lib/layout/material/material.module'
import { OrganizationUserFilterChipId } from '../../../../shared/models/organization/organization-filter-chip.enum'
import { ToastMessageType } from '../../../../shared/models/toast-message-type.enum'
import { PipesModule } from '../../../../shared/pipes/pipes.module'

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
        BrowserAnimationsModule,
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
