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
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, throwError } from 'rxjs'
import { ManagerService } from 'src/app/core/services/manager/manager.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { RESOLVE_ERROR_CONFIG } from './constants'

import { PseudonymResolverComponent } from './pseudonym-resolver.component'

describe('PseudonymResolverComponent', () => {
  let component: PseudonymResolverComponent
  let fixture: ComponentFixture<PseudonymResolverComponent>

  const mockToastMessageService = ({
    openToast: jest.fn(),
  } as unknown) as ToastMessageService

  const mockManagerService = ({
    resolvePseudonym: jest.fn(),
  } as unknown) as ManagerService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PseudonymResolverComponent, ButtonComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
      ],
      providers: [
        {
          provide: ToastMessageService,
          useValue: mockToastMessageService,
        },
        {
          provide: ManagerService,
          useValue: mockManagerService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    fixture = TestBed.createComponent(PseudonymResolverComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When the user enters the project id and pseudonym to resolve them to a patient id', () => {
    const pseudonym = '64-Chars-Long-Pseudonym-String-That-Will-Resolve-To-A-Patient-Id'
    const projectId = '1'
    beforeEach(() => {
      const projectIdInput = fixture.nativeElement.querySelector(
        `[data-test="manager-tools__resolve-pseudonym__projectid-input"]`
      )
      const pseudonymInput = fixture.nativeElement.querySelector(
        `[data-test="manager-tools__resolve-pseudonym__pseudonym-input"]`
      )
      projectIdInput.value = projectId
      projectIdInput.dispatchEvent(new Event('input'))

      pseudonymInput.value = pseudonym
      pseudonymInput.dispatchEvent(new Event('input'))
    })

    it('should call the service to resolve and display the returned value', () => {
      jest.spyOn(mockManagerService, 'resolvePseudonym').mockImplementation(() => of('resolved'))
      component.resolvePseudonym()
      fixture.detectChanges()
      expect(mockManagerService.resolvePseudonym).toHaveBeenCalledWith(projectId, pseudonym)

      const value = fixture.nativeElement.querySelector(
        `[data-test="manager-tools__resolve-pseudonym__pseudonym-value"]`
      )

      expect(value.innerHTML.trim()).toEqual('resolved')
    })

    it('should display the error message if the service fails to resolve', () => {
      jest
        .spyOn(mockManagerService, 'resolvePseudonym')
        .mockImplementation(() => throwError('Error'))
      component.resolvePseudonym()
      expect(mockManagerService.resolvePseudonym).toHaveBeenCalledWith(projectId, pseudonym)
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(RESOLVE_ERROR_CONFIG)
    })
  })
})
