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
import { MaterialModule } from 'src/app/layout/material/material.module'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { AddUserRolesComponent } from './add-user-roles.component'
import { Subject } from 'rxjs'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { mockUserProfile1, mockUserProfile3 } from 'src/mocks/data-mocks/user-profile.mock'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'

describe('AddUserRolesComponent', () => {
  let component: AddUserRolesComponent
  let fixture: ComponentFixture<AddUserRolesComponent>

  const userProfileSubject$ = new Subject<IUserProfile>()
  const profileService = ({
    userProfileObservable$: userProfileSubject$.asObservable(),
  } as unknown) as ProfileService

  const mockRole = 'TEST'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserRolesComponent],
      imports: [MaterialModule, FontAwesomeTestingModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: ProfileService,
          useValue: profileService,
        },
      ],
    }).compileComponents()
  })

  describe('When the icon in the row is clicked to select a role', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(AddUserRolesComponent)
      component = fixture.componentInstance
      component.selectedRoles = []

      jest.spyOn(component.selectedRolesChange, 'emit')
      component.handleSelectClick(mockRole)

      fixture.detectChanges()
      userProfileSubject$.next(mockUserProfile1)
    })

    it('should emit the selectedRoles array', () => {
      expect(component.selectedRolesChange.emit).toHaveBeenCalledWith([mockRole])
    })

    it('should set the id key in the lookup to true', () => {
      expect(component.lookupSelectedRole[mockRole]).toEqual(true)
    })
  })

  describe('When the icon in the row is clicked to deselect a role', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(AddUserRolesComponent)
      component = fixture.componentInstance

      jest.spyOn(component.selectedRolesChange, 'emit')
      component.selectedRoles = [mockRole]
      component.handleDeselectClick(mockRole)

      fixture.detectChanges()
      userProfileSubject$.next(mockUserProfile1)
    })

    it('should emit the selectedRoles array', () => {
      expect(component.selectedRolesChange.emit).toHaveBeenCalledWith([])
    })

    it('should set the id key in the lookup to false', () => {
      expect(component.lookupSelectedRole[mockRole]).toEqual(false)
    })
  })

  describe('When the user does not have the role SuperAdmin', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(AddUserRolesComponent)
      component = fixture.componentInstance
      component.selectedRoles = []

      fixture.detectChanges()
      userProfileSubject$.next(mockUserProfile1)
    })

    it('should not include the roles Manager, SuperAdmin and Content Admin as dataSource.data', () => {
      expect(component.dataSource.data).not.toContain('SUPER_ADMIN')
      expect(component.dataSource.data).not.toContain('CONTENT_ADMIN')
      expect(component.dataSource.data).not.toContain('MANAGER')
    })
  })

  describe('When the user does have the role SuperAdmin', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(AddUserRolesComponent)
      component = fixture.componentInstance
      component.selectedRoles = []

      fixture.detectChanges()
      userProfileSubject$.next(mockUserProfile3)
    })
    it('should include the roles Manager, SuperAdmin and Content Admin in dataSource.data', () => {
      userProfileSubject$.next(mockUserProfile3)
      expect(component.dataSource.data).toContain('SUPER_ADMIN')
      expect(component.dataSource.data).toContain('CONTENT_ADMIN')
      expect(component.dataSource.data).toContain('MANAGER')
    })
  })
})
