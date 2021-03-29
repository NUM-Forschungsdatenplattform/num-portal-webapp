import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { PossibleProjectEditorMode } from 'src/app/shared/models/project/possible-project-editor-mode.enum'
import { ProjectStatus } from 'src/app/shared/models/project/project-status.enum'

import { ProjectEditorButtonsComponent } from './project-editor-buttons.component'

describe('ProjectEditorButtonsComponent', () => {
  let component: ProjectEditorButtonsComponent
  let fixture: ComponentFixture<ProjectEditorButtonsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectEditorButtonsComponent, ButtonComponent],
      imports: [TranslateModule.forRoot(), MaterialModule, FontAwesomeTestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditorButtonsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    jest.spyOn(component.saveAll, 'emit')
    jest.spyOn(component.saveResearchers, 'emit')
    jest.spyOn(component.saveAsApprovalRequest, 'emit')
    jest.spyOn(component.saveAsApprovalReply, 'emit')
    jest.spyOn(component.startEdit, 'emit')
    jest.spyOn(component.cancel, 'emit')
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
})
