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

import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { PossibleProjectEditorMode } from 'src/app/shared/models/project/possible-project-editor-mode.enum'
import { ProjectStatus } from 'src/app/shared/models/project/project-status.enum'
import { MatButtonHarness } from '@angular/material/button/testing'
import { Subject } from 'rxjs'
import { AuthService } from 'src/app/core/auth/auth.service'

import { ProjectEditorButtonsComponent } from './project-editor-buttons.component'
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { UserHasRoleDirective } from 'src/app/shared/directives/user-has-role.directive'

describe('ProjectEditorButtonsComponent', () => {
  let component: ProjectEditorButtonsComponent
  let fixture: ComponentFixture<ProjectEditorButtonsComponent>
  let loader: HarnessLoader

  const userInfoSubject$ = new Subject<IAuthUserInfo>()
  const authService = {
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as unknown as AuthService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectEditorButtonsComponent, ButtonComponent, UserHasRoleDirective],
      imports: [TranslateModule.forRoot(), MaterialModule, FontAwesomeTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditorButtonsComponent)
    component = fixture.componentInstance
    loader = TestbedHarnessEnvironment.loader(fixture)
    fixture.detectChanges()

    jest.spyOn(component.saveAll, 'emit')
    jest.spyOn(component.saveResearchers, 'emit')
    jest.spyOn(component.saveAsApprovalRequest, 'emit')
    jest.spyOn(component.saveAsApprovalReply, 'emit')
    jest.spyOn(component.startEdit, 'emit')
    jest.spyOn(component.cancel, 'emit')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When the project is in preview mode', () => {
    let backButton
    let editButton
    beforeEach(() => {
      component.editorMode = PossibleProjectEditorMode.PREVIEW
      fixture.detectChanges()
      userInfoSubject$.next({
        sub: '',
        groups: [AvailableRoles.StudyCoordinator],
      })
      fixture.detectChanges()
      const nativeElement = fixture.debugElement.nativeElement
      backButton = nativeElement.querySelector('#back-button')
      editButton = nativeElement.querySelector('#primary-start-edit')
    })

    it('should have the back button named correct', () => {
      expect(backButton.textContent).toEqual('BUTTON.BACK')
    })

    it('it should emit the cancel event on back button click', () => {
      backButton.querySelector('button').click()
      fixture.detectChanges()
      expect(component.cancel.emit).toHaveBeenCalledTimes(1)
    })

    const previewCases = [
      {
        status: ProjectStatus.Draft,
        disabled: false,
        text: 'BUTTON.EDIT',
      },
      {
        status: ProjectStatus.ChangeRequest,
        disabled: false,
        text: 'BUTTON.EDIT',
      },
      {
        status: ProjectStatus.Approved,
        disabled: false,
        text: 'BUTTON.EDIT_RESEARCHERS',
      },
      {
        status: ProjectStatus.Closed,
        disabled: true,
        text: 'BUTTON.EDIT',
      },
      {
        status: ProjectStatus.Denied,
        disabled: true,
        text: 'BUTTON.EDIT',
      },
      {
        status: ProjectStatus.Pending,
        disabled: true,
        text: 'BUTTON.EDIT',
      },
      {
        status: ProjectStatus.Published,
        disabled: true,
        text: 'BUTTON.EDIT',
      },
      {
        status: ProjectStatus.Reviewing,
        disabled: true,
        text: 'BUTTON.EDIT',
      },
    ]

    test.each(previewCases)('shoud behave as expected', (testcase) => {
      component.projectStatus = testcase.status
      fixture.detectChanges()
      const nativeButton = editButton.querySelector('button')
      expect(nativeButton.disabled).toEqual(testcase.disabled)
      expect(nativeButton.textContent).toEqual(testcase.text)
      if (testcase.disabled !== true) {
        nativeButton.click()
        expect(component.startEdit.emit).toHaveBeenCalledTimes(1)
      }
    })
  })

  describe('Save button', () => {
    let saveButton: MatButtonHarness

    beforeEach(async () => {
      component.editorMode = PossibleProjectEditorMode.EDIT
      saveButton = await loader.getHarness(MatButtonHarness.with({ text: 'BUTTON.SAVE' }))
    })

    it('should be disabled initially', async () => {
      expect(await saveButton.isDisabled()).toBe(true)
    })

    it('should be enabled if partial data has been entered', async () => {
      component.projectStatus = ProjectStatus.Draft
      component.isCohortDefined = true
      component.isFormValid = true
      expect(await saveButton.isDisabled()).toBe(false)
    })
  })

  describe('Request approval button', () => {
    let requestApprovalButton: MatButtonHarness

    beforeEach(async () => {
      component.editorMode = PossibleProjectEditorMode.EDIT
      requestApprovalButton = await loader.getHarness(
        MatButtonHarness.with({ text: 'BUTTON.REQUEST_APPROVAL' })
      )
    })

    it('should be disabled initially', async () => {
      expect(await requestApprovalButton.isDisabled()).toBe(true)
    })

    it('should be disabled if partial data has been entered', async () => {
      component.projectStatus = ProjectStatus.Draft
      component.isCohortDefined = true
      component.isFormValid = true
      expect(await requestApprovalButton.isDisabled()).toBe(true)
    })

    it('should be enabled if all data has been entered', async () => {
      component.projectStatus = ProjectStatus.Draft
      component.isCohortDefined = true
      component.isFormValid = true
      component.isResearchersDefined = true
      component.isTemplatesDefined = true
      expect(await requestApprovalButton.isDisabled()).toBe(false)
    })
  })

  describe.skip('Export button', () => {
    let exportButton: MatButtonHarness

    beforeEach(async () => {
      component.editorMode = PossibleProjectEditorMode.EDIT
      exportButton = await loader.getHarness(MatButtonHarness.with({ text: 'BUTTON.EXPORT' }))
    })

    it('should be disabled initially', async () => {
      expect(await exportButton.isDisabled()).toBe(true)
    })

    it('should be disabled if export is loading', async () => {
      component.isExportLoading = true
      component.isSavedProject = true
      expect(await exportButton.isDisabled()).toBe(true)
    })

    it('should be disabled if the project has no id', async () => {
      component.isExportLoading = false
      component.isSavedProject = false
      expect(await exportButton.isDisabled()).toBe(true)
    })

    it('should be enabled if the export is not loading and the project has an id', async () => {
      component.isExportLoading = false
      component.isSavedProject = true
      expect(await exportButton.isDisabled()).toBe(false)
    })
  })
})
