import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormGroup } from '@angular/forms'
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
  @Input() form: UntypedFormGroup
  @Output() postComment = new EventEmitter()

  commentLimit = true

  toggleCommentLimit(): void {
    this.commentLimit = !this.commentLimit
  }
}
