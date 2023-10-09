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
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { COPY_CLIPBOARD_SUCCESS_CONFIG, RESOLVE_ERROR_CONFIG } from './constants'
import { ManagerService } from 'projects/num-lib/src/lib/core/services/manager/manager.service'
import { ToastMessageService } from 'projects/num-lib/src/lib/core/services/toast-message/toast-message.service'

@Component({
  selector: 'num-pseudonym-resolver',
  templateUrl: './pseudonym-resolver.component.html',
  styleUrls: ['./pseudonym-resolver.component.scss'],
})
export class PseudonymResolverComponent implements OnInit, OnDestroy {
  private subsriptions = new Subscription()

  constructor(
    private managerService: ManagerService,
    private toastMessageService: ToastMessageService
  ) {}

  isLoading: boolean
  resolvedPseudonym: string
  form: FormGroup
  hasClipboardApi: boolean

  ngOnInit(): void {
    if (navigator.clipboard) {
      this.hasClipboardApi = true
    }

    this.form = new FormGroup({
      projectId: new FormControl(undefined, [Validators.required]),
      pseudonym: new FormControl(undefined, [Validators.required, Validators.minLength(8)]),
    })

    this.subsriptions.add(
      this.form.valueChanges.subscribe(() => {
        this.resolvedPseudonym = undefined
      })
    )
  }

  ngOnDestroy(): void {
    this.subsriptions.unsubscribe()
  }

  resolvePseudonym(): void {
    if (this.form.valid) {
      this.isLoading = true
      this.resolvedPseudonym = undefined
      this.managerService
        .resolvePseudonym(
          this.form.get('projectId').value.trim(),
          this.form.get('pseudonym').value.trim()
        )
        .subscribe(
          (resolvedPseudonym) => {
            this.isLoading = false
            this.resolvedPseudonym = resolvedPseudonym
          },
          (_) => {
            this.isLoading = false
            this.toastMessageService.openToast(RESOLVE_ERROR_CONFIG)
          }
        )
    }
  }

  async copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.resolvedPseudonym)
      this.toastMessageService.openToast(COPY_CLIPBOARD_SUCCESS_CONFIG)
    } catch (_) {
      this.hasClipboardApi = false
    }
  }
}
