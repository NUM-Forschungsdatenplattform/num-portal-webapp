import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { DialogConfig } from '../../../../shared/models/dialog/dialog-config.interface'
import { ADD_DIALOG_CONFIG } from './constants'
import { DialogService } from '../../../../core/services/dialog/dialog.service'
import { IProjectTemplateInfoApi } from 'src/app/shared/models/project/project-template-info-api.interface'
import { DialogAddTemplateComponent } from '../dialog-add-template/dialog-add-template.component'

@Component({
  selector: 'num-project-editor-templates',
  templateUrl: './project-editor-templates.component.html',
  styleUrls: ['./project-editor-templates.component.scss'],
})
export class ProjectEditorTemplatesComponent implements OnInit {
  constructor(private dialogService: DialogService) {}

  templatesValue: IProjectTemplateInfoApi[] = []
  @Output() templatesChange = new EventEmitter<IProjectTemplateInfoApi[]>()
  @Input() isDisabled: boolean
  @Input()
  get templates(): IProjectTemplateInfoApi[] {
    return this.templatesValue
  }
  set templates(templates: IProjectTemplateInfoApi[]) {
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

    dialogRef.afterClosed().subscribe((confirmResult: IProjectTemplateInfoApi | undefined) => {
      if (Array.isArray(confirmResult)) {
        this.templates = confirmResult
      }
    })
  }
}
