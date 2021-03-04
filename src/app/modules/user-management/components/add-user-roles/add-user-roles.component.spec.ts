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
      userProfileSubject$.next(mockUserProfile1)

      jest.spyOn(component.selectedRolesChange, 'emit')
      component.handleSelectClick(mockRole)

      fixture.detectChanges()
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
      userProfileSubject$.next(mockUserProfile1)

      jest.spyOn(component.selectedRolesChange, 'emit')
      component.selectedRoles = [mockRole]
      component.handleDeselectClick(mockRole)

      fixture.detectChanges()
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
      userProfileSubject$.next(mockUserProfile1)

      fixture.detectChanges()
    })

    it('should not include the roles SuperAdmin and Content Admin as dataSource.data', () => {
      expect(component.dataSource.data).not.toContain('SUPER_ADMIN')
      expect(component.dataSource.data).not.toContain('CONTENT_ADMIN')
    })
  })

  describe('When the user does have the role SuperAdmin', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(AddUserRolesComponent)
      component = fixture.componentInstance
      component.selectedRoles = []
      userProfileSubject$.next(mockUserProfile3)

      fixture.detectChanges()
    })
    it('should include the roles SuperAdmin and Content Admin in dataSource.data', () => {
      userProfileSubject$.next(mockUserProfile3)
      expect(component.dataSource.data).toContain('SUPER_ADMIN')
      expect(component.dataSource.data).toContain('CONTENT_ADMIN')
    })
  })
})
