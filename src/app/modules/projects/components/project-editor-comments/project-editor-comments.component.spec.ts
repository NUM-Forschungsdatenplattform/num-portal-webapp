import { DatePipe } from '@angular/common'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { LocalizedDatePipe } from 'src/app/shared/pipes/localized-date.pipe'
import { projectCommentMocks } from 'src/mocks/data-mocks/project-comments.mock'

import { ProjectEditorCommentsComponent } from './project-editor-comments.component'

describe('StudyEditorCommentsComponent', () => {
  let component: ProjectEditorCommentsComponent
  let fixture: ComponentFixture<ProjectEditorCommentsComponent>
  const form = new FormGroup({
    text: new FormControl('Hello World'),
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectEditorCommentsComponent, ButtonComponent, LocalizedDatePipe],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [DatePipe],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditorCommentsComponent)
    component = fixture.componentInstance
    component.comments = projectCommentMocks
    component.form = form
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When there are more then 2 comments', () => {
    it('should toggle the commentLimit on button click', () => {
      component.comments = [...projectCommentMocks, ...projectCommentMocks]
      fixture.detectChanges()
      const nativeElement = fixture.debugElement.nativeElement
      const button = nativeElement.querySelector('#older-comments-toggle')
      button.click()
      expect(component.commentLimit).toBeFalsy()
      button.click()
      expect(component.commentLimit).toBeTruthy()
    })
  })

  describe('When a comment is written and the button to post is clicked', () => {
    it('should emit the postComment emitter event', () => {
      jest.spyOn(component.postComment, 'emit')
      const nativeElement = fixture.debugElement.nativeElement
      const button = nativeElement.querySelector('button')
      button.click()
      expect(component.postComment.emit).toHaveBeenCalledTimes(1)
    })
  })
})
