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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { EDIT_DIALOG_CONFIG } from './constants'
import { DialogService } from '../../../../core/services/dialog/dialog.service'
import { DASHBOARD_CARD_IMAGES, DEFAULT_DASHBOARD_CARD_IMAGE } from '../../../../shared/constants'
import { IDashboardCard } from '../../../../shared/models/content/dashboard-card.interface'
import { DialogConfig } from '../../../../shared/models/dialog/dialog-config.interface'

@Component({
  selector: 'num-welcome-page-item',
  templateUrl: './welcome-page-item.component.html',
  styleUrls: ['./welcome-page-item.component.scss'],
})
export class WelcomePageItemComponent implements OnInit {
  constructor(private dialogService: DialogService) {}

  @Input()
  index: number

  @Input()
  isLast: boolean

  @Input()
  form: FormGroup

  @Input()
  isLoading: boolean

  @Input()
  displayLang: 'de' | 'en'

  @Output()
  moveUp = new EventEmitter()

  @Output()
  moveDown = new EventEmitter()

  @Output()
  delete = new EventEmitter()

  images = DASHBOARD_CARD_IMAGES
  defaultImage = DEFAULT_DASHBOARD_CARD_IMAGE

  cardContent: IDashboardCard = {
    imageId: this.images[this.defaultImage],
    url: '',
    de: {
      title: '',
      text: '',
    },
    en: {
      title: '',
      text: '',
    },
  }

  ngOnInit(): void {
    this.mapFields()
  }

  mapFields(): void {
    const values = this.form.value

    this.cardContent.url = values.url || ''
    this.cardContent.imageId = values.imageId
      ? this.images[values.imageId]
      : this.images[this.defaultImage]

    this.cardContent.de.title = values.titleGerman || ''
    this.cardContent.de.text = values.bodyTextGerman || ''

    this.cardContent.en.title = values.titleEnglish || ''
    this.cardContent.en.text = values.bodyTextEnglish || ''
  }

  editItem(): void {
    const dialogConfig: DialogConfig = {
      ...EDIT_DIALOG_CONFIG,
      dialogContentPayload: this.form,
    }

    const dialogRef = this.dialogService.openDialog(dialogConfig)

    dialogRef.afterClosed().subscribe((confirmResult: FormGroup | undefined) => {
      if (confirmResult instanceof FormGroup) {
        this.form.setValue(confirmResult.value)
        this.mapFields()
      }
    })
  }
}
