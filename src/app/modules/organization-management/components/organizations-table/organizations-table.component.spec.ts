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
import { Subject } from 'rxjs'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { IOrganization } from 'src/app/shared/models/organization/organization.interface'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import {
  mockOrganization1,
  mockOrganizations,
  mockOrganizationsForSort,
} from 'src/mocks/data-mocks/organizations.mock'
import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { MatSortHeaderHarness } from '@angular/material/sort/testing'
import { MatTableHarness } from '@angular/material/table/testing'
import { maxBy, minBy } from 'lodash-es'

import { OrganizationsTableComponent } from './organizations-table.component'

describe('OrganizationsTableComponent', () => {
  let component: OrganizationsTableComponent
  let fixture: ComponentFixture<OrganizationsTableComponent>
  let router: Router

  const organizationsSubject$ = new Subject<IOrganization[]>()
  const organizationService = ({
    organizationsObservable$: organizationsSubject$.asObservable(),
  } as unknown) as OrganizationService

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
      organizationsSubject$.next(mockOrganizations)
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

  describe('When sorting table', () => {
    let loader: HarnessLoader
    let table: MatTableHarness

    beforeEach(async () => {
      loader = TestbedHarnessEnvironment.loader(fixture)
      // component.pageSize = 40
      organizationsSubject$.next(mockOrganizationsForSort)
      table = await loader.getHarness(MatTableHarness)
    })
    it('should sort by id descending as default', async () => {
      component.displayedColumns.push('id')
      const orgMinId = minBy(mockOrganizationsForSort, 'id')
      const orgMaxId = maxBy(mockOrganizationsForSort, 'id')
      const rows = await table.getCellTextByColumnName()
      expect(rows.id.text).toHaveLength(mockOrganizationsForSort.length)
      expect(rows.id.text[0]).toEqual(orgMaxId.id.toString())
      expect(rows.id.text[rows.id.text.length - 1]).toEqual(orgMinId.id.toString())
    })

    it('should be able to sort by name', async () => {
      const sortHeader = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-name' })
      )
      await sortHeader.click()
      let rows = await table.getCellTextByColumnName()
      expect(await sortHeader.getSortDirection()).toEqual('asc')
      expect(rows.name.text[0]).toEqual('')
      expect(rows.name.text[rows.name.text.length - 1]).toEqual('ö')
      await sortHeader.click()
      rows = await table.getCellTextByColumnName()
      expect(await sortHeader.getSortDirection()).toEqual('desc')
      expect(rows.name.text[0]).toEqual('ö')
      expect(rows.name.text[rows.name.text.length - 1]).toEqual('')
    })

    it('should sort by order empty -> special charactes -> numbers -> alphabetical', async () => {
      const sortHeader = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-name' })
      )
      await sortHeader.click()
      const rows = await table.getCellTextByColumnName()
      expect(rows.name.text[0]).toEqual('')
      expect(rows.name.text[1]).toEqual('$')
      expect(rows.name.text[2]).toEqual('1')
      expect(rows.name.text[3]).toEqual('A')
    })

    it('should sort equal entries by id in same direction as selected', async () => {
      component.displayedColumns.push('id')
      const sortHeader = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-name' })
      )
      await sortHeader.click()
      let rows = await table.getCellTextByColumnName()
      let firstIdx = rows.name.text.findIndex((txt) => 'A' === txt)
      expect(parseInt(rows.id.text[firstIdx], 10)).toBeLessThan(
        parseInt(rows.id.text[firstIdx + 1], 10)
      )
      await sortHeader.click()
      rows = await table.getCellTextByColumnName()
      firstIdx = rows.name.text.findIndex((txt) => 'A' === txt)
      expect(parseInt(rows.id.text[firstIdx], 10)).toBeGreaterThan(
        parseInt(rows.id.text[firstIdx + 1], 10)
      )
    })
  })
})
