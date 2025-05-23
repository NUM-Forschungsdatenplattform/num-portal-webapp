import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { IProjectComment } from 'src/app/shared/models/project/project-comment.interface'
import { MatCard } from '@angular/material/card'
import { FlexModule } from '@angular/flex-layout/flex'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { SlicePipe } from '@angular/common'
import { TranslatePipe } from '@ngx-translate/core'
import { LocalizedDatePipe } from '../../../../shared/pipes/localized-date.pipe'

@Component({
  selector: 'num-project-editor-comments',
  templateUrl: './project-editor-comments.component.html',
  styleUrls: ['./project-editor-comments.component.scss'],
  imports: [
    MatCard,
    FlexModule,
    FaIconComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    ButtonComponent,
    SlicePipe,
    TranslatePipe,
    LocalizedDatePipe,
  ],
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
