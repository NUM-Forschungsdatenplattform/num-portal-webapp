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
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ActivatedRoute, Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { Subject, of } from 'rxjs'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { OrganizationUiModel } from 'src/app/shared/models/organization/organization-ui.model'
import { IOrganization } from 'src/app/shared/models/organization/organization.interface'
import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'
import { IOrganizationResolved } from '../../models/organization-resolved.interface'
import {
  ADDING_DOMAIN_ERROR_GENERIC,
  ADDING_DOMAIN_ERROR_TAKEN,
  ADDING_DOMAIN_SUCCESS,
  CREATION_ERROR,
  CREATION_SUCCESS,
  DELETING_DOMAIN_ERROR,
  DELETING_DOMAIN_SUCCESS,
  UPDATING_ERROR,
  UPDATING_SUCCESS,
} from './constants'

import { OrganizationEditorComponent } from './organization-editor.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { mockUserProfile1 } from 'src/mocks/data-mocks/user-profile.mock'

describe('OrganizationEditorComponent', () => {
  let component: OrganizationEditorComponent
  let fixture: ComponentFixture<OrganizationEditorComponent>
  let router: Router

  const resolvedData: IOrganizationResolved = {
    organization: new OrganizationUiModel({
      id: 12345,
      name: 'Organization A',
      mailDomains: ['test.de'],
    }),
    error: null,
  }
  const route = {
    snapshot: {
      data: {
        resolvedData,
      },
    },
  } as unknown as ActivatedRoute

  const mockToastMessageService = {
    openToast: jest.fn(),
  } as unknown as ToastMessageService

  const mockOrganizationService = {
    create: jest.fn(),
    update: jest.fn(),
  } as unknown as OrganizationService

  const userProfileSubject$ = new Subject<IUserProfile>()
  const mockProfileService = {
    userProfileObservable$: userProfileSubject$.asObservable(),
    get: jest.fn(),
  } as unknown as ProfileService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationEditorComponent, ButtonComponent],
      imports: [
        FlexLayoutModule,
        MaterialModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: route,
        },
        { provide: ToastMessageService, useValue: mockToastMessageService },
        { provide: OrganizationService, useValue: mockOrganizationService },
        { provide: ProfileService, useValue: mockProfileService },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(OrganizationEditorComponent)
    component = fixture.componentInstance
    jest.spyOn(router, 'navigate').mockImplementation()
    jest.spyOn(mockProfileService, 'get').mockImplementation(() => of(mockUserProfile1))
    jest.clearAllMocks()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should register the form with given organization values on init', () => {
    const formValues = component.form.value
    expect(formValues.name).toEqual(resolvedData.organization.name)
    expect(formValues.newDomain).toEqual('')
    expect(formValues.mailDomains).toEqual(resolvedData.organization.mailDomains)
  })

  it('should trim and remove the @-sign in the mail-domain input', () => {
    const element = fixture.nativeElement.querySelector(
      `[data-test="organization-editor__add-domain-input"]`
    )

    element.value = ' @mail-domain.com '
    element.dispatchEvent(new Event('input'))
    const formValues = component.form.value
    expect(formValues.newDomain).toEqual('mail-domain.com')
  })

  it('should navigate back on the cancel button', () => {
    component.cancel()
    expect(router.navigate).toHaveBeenCalledWith(['organizations'])
  })

  describe('On the attempt to create an organization', () => {
    const callback = new Subject<any>()
    const organization: IOrganization = {
      id: null,
      mailDomains: [],
      name: 'test',
      active: true,
    }
    beforeEach(() => {
      jest
        .spyOn(mockOrganizationService, 'create')
        .mockImplementation(() => callback.asObservable())
      jest.clearAllMocks()
      component.organization.id = organization.id
      component.organization.mailDomains = organization.mailDomains
      component.form.get('name').setValue(organization.name)
      fixture.detectChanges()
    })
    it('should call the service to create a organization with the name provided', () => {
      component.create()
      expect(component.isLoading).toBeTruthy()
      expect(mockOrganizationService.create).toHaveBeenCalledWith(organization)
      callback.next(organization)
      expect(component.isLoading).toBeFalsy()
    })

    it('should navigate to the editor with the id as parameter', () => {
      component.create()
      const newOrg = {
        ...organization,
        id: 1,
      }
      callback.next(newOrg)
      expect(router.navigate).toHaveBeenCalledWith(['organizations', newOrg.id, 'editor'])
    })

    it('should set the received organization to the component as ui model', () => {
      component.create()
      const newOrg = {
        ...organization,
        id: 1,
      }
      callback.next(newOrg)
      expect(component.organization.id).toEqual(newOrg.id)
      expect(component.organization.name).toEqual(newOrg.name)
    })

    it('should display the success message', () => {
      component.create()
      const newOrg = {
        ...organization,
        id: 1,
      }

      const messageConfig: IToastMessageConfig = {
        ...CREATION_SUCCESS,
        messageParameters: {
          name: newOrg.name,
        },
      }
      callback.next(newOrg)
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(messageConfig)
    })

    it('should show the generic error message in case of an error', () => {
      component.create()
      expect(component.isLoading).toBeTruthy()
      expect(mockOrganizationService.create).toHaveBeenCalledWith(organization)
      callback.error(new Error('error'))
      expect(component.isLoading).toBeFalsy()
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(CREATION_ERROR)
    })
  })

  describe('On the attempt to update the name', () => {
    const callback = new Subject<any>()
    const name = 'testName'
    const updatedOrganization = {
      ...resolvedData.organization,
      name,
    }

    beforeEach(() => {
      jest
        .spyOn(mockOrganizationService, 'update')
        .mockImplementation(() => callback.asObservable())
      jest.clearAllMocks()
      component.form.get('name').setValue(name)
      fixture.detectChanges()
    })

    it('should post the organization with just the updated name', () => {
      component.updateOrganization()
      expect(mockOrganizationService.update).toHaveBeenCalledWith(
        updatedOrganization.id,
        updatedOrganization
      )
      expect(component.isLoading).toBeTruthy()
      callback.next(updatedOrganization)
      expect(component.isLoading).toBeFalsy()
    })

    it('should display the success message', () => {
      component.updateOrganization()
      callback.next(updatedOrganization)
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(UPDATING_SUCCESS)
    })

    it('should set the updated model to the component', () => {
      component.updateOrganization()
      callback.next(updatedOrganization)
      expect(component.organization.name).toEqual(name)
    })

    it('should display the error message in case of an error', () => {
      component.updateOrganization()
      expect(component.isLoading).toBeTruthy()
      callback.error(new Error('error'))
      expect(component.isLoading).toBeFalsy()
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(UPDATING_ERROR)
    })
  })

  describe('On the attempt to add a mail domain', () => {
    const callback = new Subject<any>()
    const newDomain = 'test.com'
    const mailDomains = ['test.de', newDomain]
    const updatedOrganization = {
      ...resolvedData.organization,
      mailDomains,
    }

    beforeEach(() => {
      jest
        .spyOn(mockOrganizationService, 'update')
        .mockImplementation(() => callback.asObservable())
      jest.clearAllMocks()
      component.form.get('newDomain').setValue(newDomain)
      fixture.detectChanges()
    })

    it('should post the the organization with the updated list of domains to the service', () => {
      component.addDomain()
      expect(component.isLoading).toBeTruthy()
      callback.next(updatedOrganization)
      expect(component.isLoading).toBeFalsy()
      expect(mockOrganizationService.update).toHaveBeenCalledWith(
        updatedOrganization.id,
        updatedOrganization
      )
    })

    it('should clear the domain input after success', () => {
      jest.useFakeTimers()
      component.addDomain()
      callback.next(updatedOrganization)
      jest.advanceTimersByTime(1)
      const domainValue = component.form.get('newDomain').value
      expect(domainValue).toEqual(undefined)
    })

    it('should add the new domain to the component', () => {
      jest.useFakeTimers()
      component.addDomain()
      callback.next(updatedOrganization)
      jest.advanceTimersByTime(1)
      const domainList = component.form.get('mailDomains').value
      expect(domainList.length).toEqual(2)
      expect(domainList[1]).toEqual(newDomain)
      expect(component.organization.mailDomains).toEqual(domainList)
    })

    it('should display the success message', () => {
      component.addDomain()
      callback.next(updatedOrganization)
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(ADDING_DOMAIN_SUCCESS)
    })

    it('should display the error message if the domain could not be added', () => {
      const errorCallback = new Subject<any>()
      jest
        .spyOn(mockOrganizationService, 'update')
        .mockImplementation(() => errorCallback.asObservable())
      component.addDomain()
      expect(component.isLoading).toBeTruthy()
      errorCallback.error(new Error('error'))
      expect(component.isLoading).toBeFalsy()
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(ADDING_DOMAIN_ERROR_GENERIC)
    })

    it('should display the error message if the domain could not be added because its already existing', () => {
      const errorCallback = new Subject<any>()
      jest
        .spyOn(mockOrganizationService, 'update')
        .mockImplementation(() => errorCallback.asObservable())
      component.addDomain()
      expect(component.isLoading).toBeTruthy()
      const error = {
        error: {
          errors: ['Organization mail domain already exists'],
        },
      }
      errorCallback.error(error)
      expect(component.isLoading).toBeFalsy()
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(ADDING_DOMAIN_ERROR_TAKEN)
    })

    it('should display the error message if the domain is already in the list', async () => {
      component.organization.mailDomains.push(newDomain)
      component.addDomain()
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(ADDING_DOMAIN_ERROR_TAKEN)
    })
  })

  describe('On the attempt to remove a mail domain', () => {
    const callback = new Subject<any>()
    const mailDomains = []
    const updatedOrganization = {
      ...resolvedData.organization,
      mailDomains,
    }

    beforeEach(() => {
      jest
        .spyOn(mockOrganizationService, 'update')
        .mockImplementation(() => callback.asObservable())
      jest.clearAllMocks()

      fixture.detectChanges()
    })

    it('should post the the organization with the updated list of domains to the service', () => {
      component.removeDomain(0)
      expect(component.isLoading).toBeTruthy()
      callback.next(updatedOrganization)
      expect(component.isLoading).toBeFalsy()
      expect(mockOrganizationService.update).toHaveBeenCalledWith(
        updatedOrganization.id,
        updatedOrganization
      )
    })
    //
    it('should add the new domain list to the component', () => {
      component.removeDomain(0)
      callback.next(updatedOrganization)
      const domainList = component.form.get('mailDomains').value
      expect(domainList.length).toEqual(0)
      expect(component.organization.mailDomains).toEqual(domainList)
    })

    it('should display the success message', () => {
      component.removeDomain(0)
      callback.next(updatedOrganization)
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(DELETING_DOMAIN_SUCCESS)
    })

    it('should display the error message if the domain could not be added', () => {
      component.removeDomain(0)
      expect(component.isLoading).toBeTruthy()
      callback.error(new Error('error'))
      expect(component.isLoading).toBeFalsy()
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(DELETING_DOMAIN_ERROR)
    })
  })
})
