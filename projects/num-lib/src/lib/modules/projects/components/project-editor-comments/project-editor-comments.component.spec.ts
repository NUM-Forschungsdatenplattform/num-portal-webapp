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

import { DatePipe } from '@angular/common'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { projectCommentMocks } from 'src/mocks/data-mocks/project-comments.mock'

import { ProjectEditorCommentsComponent } from './project-editor-comments.component'
import { MaterialModule } from 'projects/num-lib/src/lib/layout/material/material.module'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { LocalizedDatePipe } from '../../../../shared/pipes/localized-date.pipe'

describe('ProjectEditorCommentsComponent', () => {
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
