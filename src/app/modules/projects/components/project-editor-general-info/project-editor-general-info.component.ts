import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { UntypedFormGroup } from '@angular/forms'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'
import { DateAdapter } from '@angular/material/core'
import { TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'
import { ProjectAttachmentUiModel } from 'src/app/shared/models/project/project-attachment-ui.model'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'

@Component({
  selector: 'num-project-editor-general-info',
  templateUrl: './project-editor-general-info.component.html',
  styleUrls: ['./project-editor-general-info.component.scss'],
})
export class ProjectEditorGeneralInfoComponent implements OnInit, OnDestroy {
  constructor(
    private dateAdapter: DateAdapter<any>,
    private translate: TranslateService
  ) {}

  @Input() attachments: ProjectAttachmentUiModel[] = []
  @Input() form: UntypedFormGroup
  @Input() isDisabled: boolean
  @Input() showAttachmentsSelect: boolean
  @Input() isInPreview: boolean
  @Input() generalInfoData: IDefinitionList[]
  @Input() project: ProjectUiModel

  private subscriptions = new Subscription()

  ngOnInit(): void {
    this.dateAdapter.setLocale(this.translate.currentLang ? this.translate.currentLang : 'de-DE')
    this.subscriptions.add(
      this.translate.onLangChange.subscribe((lang) => {
        this.dateAdapter.setLocale(lang.lang)
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
