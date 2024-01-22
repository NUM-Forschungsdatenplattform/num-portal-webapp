import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { LayoutModule } from 'src/app/layout/layout.module'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { mockUserProfile1 } from 'src/mocks/data-mocks/user-profile.mock'
import { DISCARD_DIALOG_CONFIG, SAVE_DIALOG_CONFIG } from './constants'

import { ProfileComponent } from './profile.component'

describe('ProfileComponent', () => {
  let component: ProfileComponent
  let fixture: ComponentFixture<ProfileComponent>

  const mockProfileService = {
    changeUserName: jest.fn(),
    get: jest.fn(),
  } as unknown as ProfileService

  const afterClosedSubject$ = new Subject<boolean | undefined>()
  const mockDialogService = {
    openDialog: jest.fn().mockImplementation((_: any) => {
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown as DialogService

  const mockAppConfigService = {
    config: {
      auth: {
        baseUrl: 'localhost',
        clientId: 'test-app',
        realm: 'test-realm',
      },
    },
  } as unknown as AppConfigService

  const mockToastMessageService = {
    openToast: jest.fn(),
  } as unknown as ToastMessageService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent, ButtonComponent],
      imports: [
        LayoutModule,
        MaterialModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: ProfileService,
          useValue: mockProfileService,
        },
        {
          provide: DialogService,
          useValue: mockDialogService,
        },
        {
          provide: ToastMessageService,
          useValue: mockToastMessageService,
        },
        {
          provide: AppConfigService,
          useValue: mockAppConfigService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.spyOn(mockDialogService, 'openDialog')
    jest.spyOn(mockProfileService, 'get').mockImplementation(() => of(mockUserProfile1))
    jest.spyOn(mockProfileService, 'changeUserName').mockImplementation(() => of())
    fixture = TestBed.createComponent(ProfileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fill the inputs with the current user info on init', () => {
    const firstName = component.profileForm.get('firstName').value
    const lastName = component.profileForm.get('lastName').value
    expect(firstName).toEqual(mockUserProfile1.firstName)
    expect(lastName).toEqual(mockUserProfile1.lastName)
  })

  describe('When the name inputs are changed', () => {
    const newFirstName = 'New Test First Name'
    const newLastName = 'New Test Last Name'

    beforeEach(() => {
      component.profileForm.patchValue({ firstName: newFirstName, lastName: newLastName })
    })

    describe('and the discard action is triggered', () => {
      beforeEach(() => {
        component.discard()
      })

      it('should open the discard dialog and should discard on confirm', () => {
        expect(mockDialogService.openDialog).toHaveBeenCalledWith(DISCARD_DIALOG_CONFIG)
        afterClosedSubject$.next(true)

        const firstName = component.profileForm.get('firstName').value
        const lastName = component.profileForm.get('lastName').value

        expect(firstName).toEqual(mockUserProfile1.firstName)
        expect(lastName).toEqual(mockUserProfile1.lastName)
      })

      it('should open the discard dialog and should do nothing on cancel', () => {
        expect(mockDialogService.openDialog).toHaveBeenCalledWith(DISCARD_DIALOG_CONFIG)
        afterClosedSubject$.next(false)

        const firstName = component.profileForm.get('firstName').value
        const lastName = component.profileForm.get('lastName').value

        expect(firstName).toEqual(newFirstName)
        expect(lastName).toEqual(newLastName)
      })
    })

    describe('and the save action is triggered', () => {
      beforeEach(() => {
        component.save()
      })

      it('should open the save dialog and should call the api on confirm', () => {
        expect(mockDialogService.openDialog).toHaveBeenCalledWith(SAVE_DIALOG_CONFIG)
        afterClosedSubject$.next(true)

        expect(mockProfileService.changeUserName).toHaveBeenCalledWith(newFirstName, newLastName)
      })

      it('should open the save dialog and should do nothing on cancel', () => {
        expect(mockDialogService.openDialog).toHaveBeenCalledWith(SAVE_DIALOG_CONFIG)
        afterClosedSubject$.next(false)

        expect(mockProfileService.changeUserName).not.toHaveBeenCalled()
      })
    })

    describe('when update password action is triggered', () => {
      it('should set location to update password url', () => {
        const assignMock = jest.fn()
        delete window.location
        window.location = { assign: assignMock } as any
        component.updatePassword()
        assignMock.mockClear()
      })
    })
  })
})
