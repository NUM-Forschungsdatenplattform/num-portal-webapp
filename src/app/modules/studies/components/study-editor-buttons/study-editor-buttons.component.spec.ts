import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { PossibleStudyEditorMode } from 'src/app/shared/models/study/possible-study-editor-mode.enum'
import { StudyStatus } from 'src/app/shared/models/study/study-status.enum'

import { StudyEditorButtonsComponent } from './study-editor-buttons.component'

describe('StudyEditorButtonsComponent', () => {
  let component: StudyEditorButtonsComponent
  let fixture: ComponentFixture<StudyEditorButtonsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyEditorButtonsComponent, ButtonComponent],
      imports: [TranslateModule.forRoot(), MaterialModule, FontAwesomeTestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyEditorButtonsComponent)
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

  describe('When the study is in preview mode', () => {
    let backButton
    let editButton
    beforeEach(() => {
      component.editorMode = PossibleStudyEditorMode.PREVIEW
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
        status: StudyStatus.Draft,
        disabled: false,
        text: 'BUTTON.EDIT',
      },
      {
        status: StudyStatus.Change_request,
        disabled: false,
        text: 'BUTTON.EDIT',
      },
      {
        status: StudyStatus.Approved,
        disabled: false,
        text: 'BUTTON.EDIT_RESEARCHERS',
      },
      {
        status: StudyStatus.Closed,
        disabled: true,
        text: 'BUTTON.EDIT',
      },
      {
        status: StudyStatus.Denied,
        disabled: true,
        text: 'BUTTON.EDIT',
      },
      {
        status: StudyStatus.Pending,
        disabled: true,
        text: 'BUTTON.EDIT',
      },
      {
        status: StudyStatus.Published,
        disabled: true,
        text: 'BUTTON.EDIT',
      },
      {
        status: StudyStatus.Reviewing,
        disabled: true,
        text: 'BUTTON.EDIT',
      },
    ]

    test.each(previewCases)('shoud behave as expected', (testcase) => {
      component.studyStatus = testcase.status
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
