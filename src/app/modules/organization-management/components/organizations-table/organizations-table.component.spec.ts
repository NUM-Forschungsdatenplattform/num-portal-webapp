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
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { mockOrganization1, mockOrganizations } from 'src/mocks/data-mocks/organizations.mock'

import { OrganizationsTableComponent } from './organizations-table.component'
import { MatSort, Sort } from '@angular/material/sort'

describe('OrganizationsTableComponent', () => {
  let component: OrganizationsTableComponent
  let fixture: ComponentFixture<OrganizationsTableComponent>
  let router: Router

  const organizationsSubject$ = new Subject<any>()
  const organizationService = {
    organizationsObservable$: organizationsSubject$.asObservable(),
    getAllPag: jest.fn(),
  } as unknown as OrganizationService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationsTableComponent],
      imports: [
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
})
