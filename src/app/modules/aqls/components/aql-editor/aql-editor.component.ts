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

import { AuthService } from 'src/app/core/auth/auth.service'
import { Component, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { AqlEditorUiModel } from 'src/app/shared/models/aql/aql-editor-ui.model'
import { IAqlResolved } from '../../models/aql-resolved.interface'
import { IAqlApi } from '../../../../shared/models/aql/aql.interface'
import { take, tap } from 'rxjs/operators'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { AqlEditorCeatorComponent } from '../aql-editor-creator/aql-editor-creator.component'
import { TranslateService } from '@ngx-translate/core'
import { combineLatest } from 'rxjs'

@Component({
  selector: 'num-aql-editor',
  templateUrl: './aql-editor.component.html',
  styleUrls: ['./aql-editor.component.scss'],
})
export class AqlEditorComponent implements OnInit {
  resolvedData: IAqlResolved
  get aql(): AqlEditorUiModel {
    return this.resolvedData.aql
  }

  aqlForm: FormGroup
  // TODO fetch from backend
  availableCategories: { id: number | string; name: { de: string; en: string } }[] = [
    {
      id: 1,
      name: {
        de: 'Demografisch',
        en: 'Demographic',
      },
    },
    {
      id: 3,
      name: {
        de: 'Metabolisches Syndrom',
        en: 'Metabolic syndrom',
      },
    },
    {
      id: 4,
      name: {
        de: 'COVID-19 Symptome',
        en: 'COVID-19 Symptoms',
      },
    },
    {
      id: 2,
      name: {
        de: 'Soziologisch',
        en: 'Sociologic',
      },
    },
    {
      id: 5,
      name: {
        de: 'Reiseverhalten',
        en: 'Travel behaviour',
      },
    },
  ]

  isEditMode: boolean
  isCurrentUserOwner: boolean

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private aqlService: AqlService,
    private authService: AuthService,
    private toast: ToastMessageService,
    private translateService: TranslateService
  ) {}

  @ViewChild('aqlCreator') aqlCreator: AqlEditorCeatorComponent

  ngOnInit(): void {
    this.resolvedData = this.route.snapshot.data.resolvedData

    this.generateForm()

    this.isEditMode = this.aql?.id !== null

    this.authService.userInfoObservable$
      .pipe(take(1))
      .subscribe((user) => (this.isCurrentUserOwner = this.aql?.owner?.id === user?.sub))

    // This code has to be there unless we fetch the AQL categories from backend to prevent
    // the ExpressionChangedAfterItHasBeenCheckedError
    this.availableCategories.push({
      id: '',
      name: { de: 'Ohne Kategorie', en: 'Uncategorized' },
    })
  }

  generateForm(): void {
    this.aqlForm = new FormGroup({
      title: new FormControl(this.aql?.name, [Validators.required, Validators.minLength(3)]),
      purpose: new FormControl(this.aql?.purpose, [Validators.required, Validators.minLength(3)]),
      use: new FormControl(this.aql?.usage, [Validators.required, Validators.minLength(3)]),
      isPublic: new FormControl(this.aql?.publicAql),
      category: new FormControl(this.aql?.categoryId || ''),
    })
  }

  getAqlForApi(): IAqlApi {
    const formValues = this.aqlForm.value

    return this.aql?.convertToApi(
      formValues.title,
      formValues.purpose,
      formValues.use,
      formValues.isPublic,
      formValues.category
    )
  }

  async save(): Promise<void> {
    const validationResult = await this.aqlCreator.validate()
    if (!validationResult) {
      return
    }
    const aqlQuery = this.getAqlForApi()
    try {
      await this.aqlService.save(aqlQuery).toPromise()
      this.router.navigate(['aqls'], {})

      this.toast.openToast({
        type: ToastMessageType.Success,
        message: 'AQL.SAVE_SUCCESS_MESSAGE',
      })
    } catch (error) {
      this.toast.openToast({
        type: ToastMessageType.Error,
        message: 'AQL.SAVE_ERROR_MESSAGE',
      })
    }
  }

  cancel(): void {
    this.router.navigate(['aqls'], {})
  }

  async update(): Promise<void> {
    const validationResult = await this.aqlCreator.validate()
    if (!validationResult) {
      return
    }
    const aqlQuery = this.getAqlForApi()
    try {
      await this.aqlService.update(aqlQuery, this.aql?.id).toPromise()
      this.router.navigate(['aqls'], {})

      this.toast.openToast({
        type: ToastMessageType.Success,
        message: 'AQL.SAVE_SUCCESS_MESSAGE',
      })
    } catch (error) {
      this.toast.openToast({
        type: ToastMessageType.Error,
        message: 'AQL.SAVE_ERROR_MESSAGE',
      })
    }
  }
}
