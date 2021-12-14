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

import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { IProjectComment } from 'src/app/shared/models/project/project-comment.interface'

@Component({
  selector: 'num-project-editor-comments',
  templateUrl: './project-editor-comments.component.html',
  styleUrls: ['./project-editor-comments.component.scss'],
})
export class ProjectEditorCommentsComponent {
  constructor() {}

  @Input() isLoadingComplete: boolean
  @Input() comments: IProjectComment[]
  @Input() form: FormGroup
  @Output() postComment = new EventEmitter()

  commentLimit = true

  toggleCommentLimit(): void {
    this.commentLimit = !this.commentLimit
  }
}
