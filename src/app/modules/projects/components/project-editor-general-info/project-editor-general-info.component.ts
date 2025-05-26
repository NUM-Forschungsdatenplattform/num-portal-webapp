import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'
import { DateAdapter } from '@angular/material/core'
import { TranslateService, TranslatePipe } from '@ngx-translate/core'
import { Subscription } from 'rxjs'
import { ProjectAttachmentUiModel } from 'src/app/shared/models/project/project-attachment-ui.model'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { MatExpansionPanel, MatExpansionPanelHeader } from '@angular/material/expansion'
import { FlexModule } from '@angular/flex-layout/flex'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { DefinitionListComponent } from '../../../../shared/components/definition-list/definition-list.component'
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { ProjectEditorGeneralInfoKeywordsInputComponent } from '../project-editor-general-info-keywords-input/project-editor-general-info-keywords-input.component'
import { ProjectEditorGeneralInfoCategoriesInputComponent } from '../project-editor-general-info-categories-input/project-editor-general-info-categories-input.component'
import {
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDatepicker,
} from '@angular/material/datepicker'
import { AttachmentsTableComponent } from '../../../../shared/components/attachments-table/attachments-table.component'
import { MatSlideToggle } from '@angular/material/slide-toggle'

@Component({
  selector: 'num-project-editor-general-info',
  templateUrl: './project-editor-general-info.component.html',
  styleUrls: ['./project-editor-general-info.component.scss'],
  imports: [
    MatExpansionPanel,
    MatExpansionPanelHeader,
    FlexModule,
    FaIconComponent,
    DefinitionListComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    ProjectEditorGeneralInfoKeywordsInputComponent,
    ProjectEditorGeneralInfoCategoriesInputComponent,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSuffix,
    MatDatepicker,
    AttachmentsTableComponent,
    MatSlideToggle,
    TranslatePipe,
  ],
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
