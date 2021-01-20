import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { DialogConfig } from '../../../../shared/models/dialog/dialog-config.interface'
import { ADD_DIALOG_CONFIG } from './constants'
import { DialogService } from '../../../../core/services/dialog/dialog.service'
import { IStudyTemplateInfoApi } from 'src/app/shared/models/study/study-template-info-api.interface'
import { DialogAddTemplateComponent } from '../dialog-add-template/dialog-add-template.component'

@Component({
  selector: 'num-study-editor-templates',
  templateUrl: './study-editor-templates.component.html',
  styleUrls: ['./study-editor-templates.component.scss'],
})
export class StudyEditorTemplatesComponent implements OnInit {
  constructor(private dialogService: DialogService) {}

  templatesValue: IStudyTemplateInfoApi[] = []
  @Output() templatesChange = new EventEmitter<IStudyTemplateInfoApi[]>()
  @Input() isDisabled: boolean
  @Input()
  get templates(): IStudyTemplateInfoApi[] {
    return this.templatesValue
  }
  set templates(templates: IStudyTemplateInfoApi[]) {
    this.templatesValue = templates
    this.templatesChange.emit(templates)
  }

  ngOnInit(): void {}

  addTemplate(): void {
    const dialogContentPayload = this.templates
    const dialogConfig: DialogConfig = {
      ...ADD_DIALOG_CONFIG,
      dialogContentComponent: DialogAddTemplateComponent,
      dialogContentPayload,
    }

    const dialogRef = this.dialogService.openDialog(dialogConfig)

    dialogRef.afterClosed().subscribe((confirmResult: IStudyTemplateInfoApi | undefined) => {
      if (Array.isArray(confirmResult)) {
        this.templates = confirmResult
      }
    })
  }
}
