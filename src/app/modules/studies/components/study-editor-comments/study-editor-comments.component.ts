import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { IStudyComment } from 'src/app/shared/models/study/study-comment.interface'

@Component({
  selector: 'num-study-editor-comments',
  templateUrl: './study-editor-comments.component.html',
  styleUrls: ['./study-editor-comments.component.scss'],
})
export class StudyEditorCommentsComponent implements OnInit {
  constructor() {}

  @Input() isLoadingComplete: boolean
  @Input() comments: IStudyComment[]
  @Input() form: FormGroup
  @Output() postComment = new EventEmitter()

  commentLimit = true

  ngOnInit(): void {}

  toggleCommentLimit(): void {
    this.commentLimit = !this.commentLimit
  }
}
