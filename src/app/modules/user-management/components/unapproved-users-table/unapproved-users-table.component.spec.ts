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
import { of, Subject } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { UnapprovedUsersTableComponent } from './unapproved-users-table.component'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { mockUser, mockUsers, mockUsersForSort } from 'src/mocks/data-mocks/admin.mock'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { ADD_DIALOG_CONFIG } from './constants'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { DialogEditUserDetailsComponent } from '../dialog-edit-user-details/dialog-edit-user-details.component'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { mockUserProfile1, mockUserProfile3 } from 'src/mocks/data-mocks/user-profile.mock'
import { HarnessLoader } from '@angular/cdk/testing'
import { MatTableHarness } from '@angular/material/table/testing'
import { MatSortHeaderHarness } from '@angular/material/sort/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { maxBy, minBy } from 'lodash-es'
import { Pipe, PipeTransform } from '@angular/core'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'

describe('UnapprovedUsersTableComponent', () => {
  let component: UnapprovedUsersTableComponent
  let fixture: ComponentFixture<UnapprovedUsersTableComponent>

  const unapprovedUsersSubject$ = new Subject<IUser[]>()
  const adminService = {
    unapprovedUsersObservable$: unapprovedUsersSubject$.asObservable(),
    getUnapprovedUsers: () => of(),
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
  class StubLocalizedDatePipe implements PipeTransform {
    transform(value: number): number {
      return value
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnapprovedUsersTableComponent, StubLocalizedDatePipe],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        PipesModule,
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
    fixture = TestBed.createComponent(UnapprovedUsersTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When unapproved users are received by the component and the user has role SuperAdmin', () => {
    beforeEach(() => {
      userProfileSubject$.next(mockUserProfile3)
      unapprovedUsersSubject$.next(mockUsers)
      fixture.detectChanges()
    })
    it('should set them into the datasource.data', () => {
      expect(component.dataSource.data).toBe(mockUsers)
    })
  })

  describe('When approved users are received by the component and the user does not have role SuperAdmin', () => {
    beforeEach(() => {
      userProfileSubject$.next(mockUserProfile1)
      unapprovedUsersSubject$.next(mockUsers)
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
      dialogContentPayload: { user: mockUser, isApproval: true },
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

  describe('When table gets sorted', () => {
    let loader: HarnessLoader

    beforeEach(() => {
      loader = TestbedHarnessEnvironment.loader(fixture)
      component.paginator.pageSize = 40
      userProfileSubject$.next(mockUserProfile3)
      unapprovedUsersSubject$.next(mockUsersForSort)
    })

    it('should sort by id by default', async () => {
      component.displayedColumns.push('id')
      const table = await loader.getHarness(MatTableHarness)
      const rows = await table.getCellTextByColumnName()
      expect(rows.id.text).toHaveLength(mockUsersForSort.length)
      const mockUserWithLatestId = maxBy(mockUsersForSort, 'id')
      const mockUserWithOldestId = minBy(mockUsersForSort, 'id')
      expect(rows.id.text[0]).toEqual(mockUserWithLatestId.id)
      expect(rows.id.text[rows.id.text.length - 1]).toEqual(mockUserWithOldestId.id)
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

    it('should sort by email', async () => {
      const sortHeaderButton = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-email' })
      )
      const table = await loader.getHarness(MatTableHarness)
      // Sort ascending
      await sortHeaderButton.click()
      expect(await sortHeaderButton.getSortDirection()).toEqual('asc')
      let rows = await table.getCellTextByColumnName()
      expect(rows.email.text[0]).toEqual('mockUser3@email.com')
      expect(rows.email.text[rows.email.text.length - 1]).toEqual('mockUser7@email.com')
      // Sort descending
      await sortHeaderButton.click()
      expect(await sortHeaderButton.getSortDirection()).toEqual('desc')
      rows = await table.getCellTextByColumnName()
      expect(rows.email.text[0]).toEqual('mockUser7@email.com')
      expect(rows.email.text[rows.email.text.length - 1]).toEqual('mockUser3@email.com')
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
        MatSortHeaderHarness.with({ selector: '.mat-column-email' })
      )
      const table = await loader.getHarness(MatTableHarness)
      // Sort descending
      await sortHeaderButton.click()
      await sortHeaderButton.click()
      const rows = await table.getCellTextByColumnName()
      const firstIdx = rows.email.text.findIndex((txt) => 'mockUser7@email.com' === txt)
      expect(parseInt(rows.id.text[firstIdx], 10)).toBeGreaterThan(
        parseInt(rows.id.text[firstIdx + 1], 10)
      )
    })
  })
})
