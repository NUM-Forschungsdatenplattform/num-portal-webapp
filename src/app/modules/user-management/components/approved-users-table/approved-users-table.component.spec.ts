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
import { Subject } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { ApprovedUsersTableComponent } from './approved-users-table.component'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { mockUsers, mockUser, mockUsersForSort } from 'src/mocks/data-mocks/admin.mock'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { ADD_DIALOG_CONFIG } from './constants'
import { DialogEditUserDetailsComponent } from '../dialog-edit-user-details/dialog-edit-user-details.component'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { AvailableRolesPipe } from 'src/app/shared/pipes/available-roles.pipe'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { mockUserProfile1, mockUserProfile3 } from 'src/mocks/data-mocks/user-profile.mock'
import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { MatSortHeaderHarness } from '@angular/material/sort/testing'
import { MatTableHarness } from '@angular/material/table/testing'
import { maxBy, minBy } from 'lodash-es'
import { Pipe, PipeTransform } from '@angular/core'

describe('ApprovedUsersTableComponent', () => {
  let component: ApprovedUsersTableComponent
  let fixture: ComponentFixture<ApprovedUsersTableComponent>

  const filteredApprovedUsersSubject$ = new Subject<IUser[]>()
  const adminService = {
    filteredApprovedUsersObservable$: filteredApprovedUsersSubject$.asObservable(),
  } as AdminService

  const afterClosedSubject$ = new Subject()
  const mockDialogService = {
    openDialog: jest.fn().mockImplementation((_: any) => {
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown as DialogService

  const userProfileSubject$ = new Subject<IUserProfile>()
  const profileService = {
    userProfileObservable$: userProfileSubject$.asObservable(),
  } as ProfileService

  @Pipe({
    name: 'localizedDate',
  })
  class MockLocalizedDatePipe implements PipeTransform {
    transform(value: number): number {
      return value
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovedUsersTableComponent, MockLocalizedDatePipe, AvailableRolesPipe],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: AdminService,
          useValue: adminService,
        },
        { provide: DialogService, useValue: mockDialogService },
        {
          provide: ProfileService,
          useValue: profileService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedUsersTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When approved users are received by the component and the user has role SuperAdmin', () => {
    beforeEach(() => {
      userProfileSubject$.next(mockUserProfile3)
      filteredApprovedUsersSubject$.next(mockUsers)
      fixture.detectChanges()
    })

    it('should set them into the datasource.data', () => {
      expect(component.dataSource.data).toBe(mockUsers)
    })
  })

  describe('When approved users are received by the component and the user does not have role SuperAdmin', () => {
    beforeEach(() => {
      filteredApprovedUsersSubject$.next(mockUsers)
      userProfileSubject$.next(mockUserProfile1)
      fixture.detectChanges()
    })

    it('should set them into the datasource.data', () => {
      expect(component.dataSource.data).toHaveLength(0)
    })
  })

  describe('When an icon in a row is clicked', () => {
    const dialogConfig: DialogConfig = {
      ...ADD_DIALOG_CONFIG,
      dialogContentComponent: DialogEditUserDetailsComponent,
      dialogContentPayload: { user: mockUser, isApproval: false },
    }
    beforeEach(() => {
      userProfileSubject$.next(mockUserProfile3)
      fixture.detectChanges()
    })
    it('should call the dialog service with the dialogConfig to open the edit dialog', () => {
      component.handleSelectClick(mockUser)
      expect(mockDialogService.openDialog).toHaveBeenCalledWith(dialogConfig)
    })
  })

  describe('When sorting table', () => {
    let loader: HarnessLoader

    beforeEach(() => {
      loader = TestbedHarnessEnvironment.loader(fixture)
      component.paginator.pageSize = 40
      userProfileSubject$.next(mockUserProfile3)
      filteredApprovedUsersSubject$.next(mockUsersForSort)
    })

    it('should sort by id desc as default', async () => {
      component.displayedColumns.push('id')
      const table = await loader.getHarness(MatTableHarness)
      const rows = await table.getCellTextByColumnName()
      const userMaxId = maxBy(mockUsersForSort, 'id')
      const userMinId = minBy(mockUsersForSort, 'id')
      expect(rows.id.text).toHaveLength(mockUsersForSort.length)
      expect(rows.id.text[0]).toEqual(userMaxId.id)
      expect(rows.id.text[rows.id.text.length - 1]).toEqual(userMinId.id)
    })

    it('should sort by first name', async () => {
      const sortHeaderButton = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-firstName' })
      )
      const table = await loader.getHarness(MatTableHarness)
      // Sort ascending
      await sortHeaderButton.click()
      expect(await sortHeaderButton.getSortDirection()).toEqual('asc')
      let rows = await table.getCellTextByColumnName()
      expect(rows.firstName.text[0]).toEqual('')
      expect(rows.firstName.text[rows.firstName.text.length - 1]).toEqual('Ö')
      await sortHeaderButton.click()
      expect(await sortHeaderButton.getSortDirection()).toEqual('desc')
      rows = await table.getCellTextByColumnName()
      expect(rows.firstName.text[0]).toEqual('Ö')
      expect(rows.firstName.text[rows.firstName.text.length - 1]).toEqual('')
    })

    it('should sort by last name', async () => {
      const sortHeaderButton = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-lastName' })
      )
      const table = await loader.getHarness(MatTableHarness)
      // Sort ascending
      await sortHeaderButton.click()
      expect(await sortHeaderButton.getSortDirection()).toEqual('asc')
      let rows = await table.getCellTextByColumnName()
      expect(rows.lastName.text[0]).toEqual('')
      expect(rows.lastName.text[rows.lastName.text.length - 1]).toEqual('Ü')
      // Sort descending
      await sortHeaderButton.click()
      expect(await sortHeaderButton.getSortDirection()).toEqual('desc')
      rows = await table.getCellTextByColumnName()
      expect(rows.lastName.text[0]).toEqual('Ü')
      expect(rows.lastName.text[rows.lastName.text.length - 1]).toEqual('')
    })

    it('should sort by organization', async () => {
      const sortHeaderButton = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-organization' })
      )
      const table = await loader.getHarness(MatTableHarness)
      // Sort ascending
      await sortHeaderButton.click()
      expect(await sortHeaderButton.getSortDirection()).toEqual('asc')
      let rows = await table.getCellTextByColumnName()
      expect(rows.organization.text[0]).toEqual('name1')
      expect(rows.organization.text[rows.organization.text.length - 1]).toEqual('name3')
      // Sort descending
      await sortHeaderButton.click()
      expect(await sortHeaderButton.getSortDirection()).toEqual('desc')
      rows = await table.getCellTextByColumnName()
      expect(rows.organization.text[0]).toEqual('name3')
      expect(rows.organization.text[rows.organization.text.length - 1]).toEqual('name1')
    })

    it('should sort by registration date', async () => {
      component.displayedColumns.push('id')
      const mockUserWithlatestDate = maxBy(mockUsersForSort, 'createdTimestamp')
      const mockUserWithFirstDate = minBy(mockUsersForSort, 'createdTimestamp')
      const sortHeaderButton = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-createdTimestamp' })
      )
      const table = await loader.getHarness(MatTableHarness)
      // Sort ascending
      await sortHeaderButton.click()
      expect(await sortHeaderButton.getSortDirection()).toEqual('asc')
      let rows = await table.getCellTextByColumnName()
      expect(rows.id.text[0]).toEqual(mockUserWithFirstDate.id)
      expect(rows.id.text[rows.id.text.length - 1]).toEqual(mockUserWithlatestDate.id)
      // Sort descending
      await sortHeaderButton.click()
      expect(await sortHeaderButton.getSortDirection()).toEqual('desc')
      rows = await table.getCellTextByColumnName()
      expect(rows.id.text[0]).toEqual(mockUserWithlatestDate.id)
      expect(rows.id.text[rows.id.text.length - 1]).toEqual(mockUserWithFirstDate.id)
    })

    it('should sort by id for equal elements', async () => {
      component.displayedColumns.push('id')
      const sortHeaderButton = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-organization' })
      )
      const table = await loader.getHarness(MatTableHarness)
      // Sort descending
      await sortHeaderButton.click()
      await sortHeaderButton.click()
      const rows = await table.getCellTextByColumnName()
      const firstIdx = rows.organization.text.findIndex((txt) => 'name2' === txt)
      expect(parseInt(rows.id.text[firstIdx], 10)).toBeGreaterThan(
        parseInt(rows.id.text[firstIdx + 1], 10)
      )
    })
  })
})
