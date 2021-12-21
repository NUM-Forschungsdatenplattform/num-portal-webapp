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
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { AqlEditorUiModel } from 'src/app/shared/models/aql/aql-editor-ui.model'
import { IAqlResolved } from '../../models/aql-resolved.interface'
import { IAqlApi } from '../../../../shared/models/aql/aql.interface'
import { take } from 'rxjs/operators'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { AqlEditorCeatorComponent } from '../aql-editor-creator/aql-editor-creator.component'
import { Subscription } from 'rxjs'
import { IAqlCategoryApi } from 'src/app/shared/models/aql/category/aql-category.interface'
import { AqlCategoryService } from 'src/app/core/services/aql-category/aql-category.service'

@Component({
  selector: 'num-aql-editor',
  templateUrl: './aql-editor.component.html',
  styleUrls: ['./aql-editor.component.scss'],
})
export class AqlEditorComponent implements OnDestroy, OnInit {
  resolvedData: IAqlResolved
  get aql(): AqlEditorUiModel {
    return this.resolvedData.aql
  }

  aqlForm: FormGroup
  availableCategories: IAqlCategoryApi[]

  isEditMode: boolean
  isCurrentUserOwner: boolean

  private subscriptions = new Subscription()

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private aqlCategoryService: AqlCategoryService,
    private aqlService: AqlService,
    private authService: AuthService,
    private toast: ToastMessageService
  ) {}

  @ViewChild('aqlCreator') aqlCreator: AqlEditorCeatorComponent

  ngOnInit(): void {
    this.resolvedData = this.route.snapshot.data.resolvedData

    this.generateForm()

    this.isEditMode = this.aql?.id !== null

    this.authService.userInfoObservable$
      .pipe(take(1))
      .subscribe((user) => (this.isCurrentUserOwner = this.aql?.owner?.id === user?.sub))

    this.subscriptions.add(
      this.aqlCategoryService.aqlCategoriesObservable$.subscribe((aqlCategories) => {
        this.availableCategories = aqlCategories
      })
    )

    this.aqlCategoryService.getAll().subscribe()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  generateForm(): void {
    this.aqlForm = new FormGroup({
      title: new FormControl(this.aql?.name, [Validators.required, Validators.minLength(3)]),
      titleTranslated: new FormControl(this.aql?.nameTranslated, [
        Validators.required,
        Validators.minLength(3),
      ]),
      purpose: new FormControl(this.aql?.purpose, [Validators.required, Validators.minLength(3)]),
      purposeTranslated: new FormControl(this.aql?.purposeTranslated, [
        Validators.required,
        Validators.minLength(3),
      ]),
      use: new FormControl(this.aql?.usage, [Validators.required, Validators.minLength(3)]),
      useTranslated: new FormControl(this.aql?.usageTranslated, [
        Validators.required,
        Validators.minLength(3),
      ]),
      isPublic: new FormControl(this.aql?.publicAql),
      category: new FormControl(this.aql?.categoryId || ''),
    })
  }

  getAqlForApi(): IAqlApi {
    const formValues = this.aqlForm.value

    return this.aql?.convertToApi({
      name: formValues.title,
      nameTranslated: formValues.titleTranslated,
      purpose: formValues.purpose,
      purposeTranslated: formValues.purposeTranslated,
      use: formValues.use,
      useTranslated: formValues.useTranslated,
      publicAql: formValues.isPublic,
      categoryId: formValues.category,
    })
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
        message: 'QUERIES.SAVE_SUCCESS_MESSAGE',
      })
    } catch (error) {
      this.toast.openToast({
        type: ToastMessageType.Error,
        message: 'QUERIES.SAVE_ERROR_MESSAGE',
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
        message: 'QUERIES.SAVE_SUCCESS_MESSAGE',
      })
    } catch (error) {
      this.toast.openToast({
        type: ToastMessageType.Error,
        message: 'QUERIES.SAVE_ERROR_MESSAGE',
      })
    }
  }
}
