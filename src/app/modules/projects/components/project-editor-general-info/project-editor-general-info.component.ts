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

import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { UntypedFormGroup } from '@angular/forms'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'
import { DateAdapter } from '@angular/material/core'
import { TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'
import { ProjectAttachmentUiModel } from 'src/app/shared/models/project/project-attachment-ui.model'

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
  @Input() showAttachmentSelects: boolean
  @Input() generalInfoData: IDefinitionList[]

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
