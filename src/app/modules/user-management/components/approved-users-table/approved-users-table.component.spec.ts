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
import { mockUsers, mockUser } from 'src/mocks/data-mocks/admin.mock'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { ADD_DIALOG_CONFIG } from './constants'
import { DialogEditUserDetailsComponent } from '../dialog-edit-user-details/dialog-edit-user-details.component'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { LocalizedDatePipe } from 'src/app/shared/pipes/localized-date.pipe'
import { AvailableRolesPipe } from 'src/app/shared/pipes/available-roles.pipe'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { mockUserProfile1, mockUserProfile3 } from 'src/mocks/data-mocks/user-profile.mock'

describe('ApprovedUsersTableComponent', () => {
  let component: ApprovedUsersTableComponent
  let fixture: ComponentFixture<ApprovedUsersTableComponent>

  const filteredApprovedUsersSubject$ = new Subject<IUser[]>()
  const adminService = {
    filteredApprovedUsersObservable$: filteredApprovedUsersSubject$.asObservable(),
  } as AdminService

  const afterClosedSubject$ = new Subject()
  const mockDialogService = ({
    openDialog: jest.fn().mockImplementation((_: any) => {
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown) as DialogService

  const userProfileSubject$ = new Subject<IUserProfile>()
  const profileService = {
    userProfileObservable$: userProfileSubject$.asObservable(),
  } as ProfileService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovedUsersTableComponent, LocalizedDatePipe, AvailableRolesPipe],
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
      filteredApprovedUsersSubject$.next(mockUsers)
      userProfileSubject$.next(mockUserProfile3)
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
})
