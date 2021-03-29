import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { IProjectComment } from 'src/app/shared/models/project/project-comment.interface'

@Component({
  selector: 'num-project-editor-comments',
  templateUrl: './project-editor-comments.component.html',
  styleUrls: ['./project-editor-comments.component.scss'],
})
export class ProjectEditorCommentsComponent implements OnInit {
  constructor() {}

  @Input() isLoadingComplete: boolean
  @Input() comments: IProjectComment[]
  @Input() form: FormGroup
  @Output() postComment = new EventEmitter()

  commentLimit = true

  ngOnInit(): void {}

  toggleCommentLimit(): void {
    this.commentLimit = !this.commentLimit
  }
}
