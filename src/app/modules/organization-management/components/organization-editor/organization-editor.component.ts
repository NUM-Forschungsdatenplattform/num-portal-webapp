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
import { ActivatedRoute, Router } from '@angular/router'
import { cloneDeep } from 'lodash-es'
import { Observable, Subscription, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { OrganizationUiModel } from 'src/app/shared/models/organization/organization-ui.model'
import { IOrganization } from 'src/app/shared/models/organization/organization.interface'
import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'
import {
  ADDING_DOMAIN_ERROR_GENERIC,
  ADDING_DOMAIN_ERROR_TAKEN,
  ADDING_DOMAIN_SUCCESS,
  CREATION_ERROR,
  CREATION_SUCCESS,
  DELETING_DOMAIN_ERROR,
  DELETING_DOMAIN_SUCCESS,
  UPDATING_ERROR,
  UPDATING_SUCCESS,
} from './constants'
import { ProfileService } from 'src/app/core/services/profile/profile.service'

@Component({
  selector: 'num-organization-editor',
  templateUrl: './organization-editor.component.html',
  styleUrls: ['./organization-editor.component.scss'],
})
export class OrganizationEditorComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription()
  organization: OrganizationUiModel
  form: FormGroup
  isLoading: boolean
  displayedColumns = ['domain', 'icon']

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private organizationService: OrganizationService,
    private toastMessageService: ToastMessageService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.organization = cloneDeep(this.route.snapshot.data.resolvedData.organization)
    this.generateForm()
    this.registerSubscriptions()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  registerSubscriptions(): void {
    this.subscriptions.add(
      this.form
        .get('newDomain')
        .valueChanges.subscribe((value) => this.handleNewDomainChange(value))
    )
  }

  isUserPartOfOrg(): boolean {
    return true
  }

  generateForm(): void {
    const nonWhitespaceRegex = /[^\s.]+/
    const domainRegex = /[^\s.]+\.[^\s."()[\],:;<>@][^\s"()[\],:;<>@]+$/
    this.form = new FormGroup({
      name: new FormControl(this.organization.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(nonWhitespaceRegex),
      ]),
      newDomain: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(domainRegex),
      ]),
      mailDomains: new FormControl(this.organization.mailDomains),
      active: new FormControl(this.organization.active),
    })
    this.profileService.get().subscribe((profile) => {
      if (profile.organization.id === this.organization.id) {
        this.form.get('active').disable()
      }
    })
  }

  handleNewDomainChange(value: string): void {
    const newValue = value?.trim().replace('@', '')
    this.form.get('newDomain').setValue(newValue, { emitEvent: false })
  }

  cancel(): void {
    this.router.navigate(['organizations'])
  }

  create(): void {
    this.isLoading = true
    const name = this.form.get('name').value
    const organization = this.organization.convertToApi({ name })
    this.organizationService.create(organization).subscribe(
      (result) => {
        this.isLoading = false
        this.organization = new OrganizationUiModel(result)
        this.router.navigate(['organizations', this.organization.id, 'editor'])
        const messageConfig: IToastMessageConfig = {
          ...CREATION_SUCCESS,
          messageParameters: {
            name: result.name,
          },
        }
        this.toastMessageService.openToast(messageConfig)
      },
      () => {
        this.isLoading = false
        this.toastMessageService.openToast(CREATION_ERROR)
      }
    )
  }

  update(id: number, organization: IOrganization): Observable<IOrganization> {
    this.isLoading = true
    return this.organizationService.update(id, organization).pipe(
      tap((updatedOrganization) => {
        this.isLoading = false
        this.organization = new OrganizationUiModel(updatedOrganization)
      }),
      catchError((error) => {
        this.isLoading = false
        return throwError(error)
      })
    )
  }

  updateOrganization(): void {
    const name = this.form.get('name').value
    const active = this.form.get('active').value
    const organization = this.organization.convertToApi({ name, active })
    this.update(this.organization.id, organization).subscribe(
      (_updatedOrganization) => {
        this.toastMessageService.openToast(UPDATING_SUCCESS)
      },
      (_error) => {
        this.toastMessageService.openToast(UPDATING_ERROR)
      }
    )
  }

  addDomain(): void {
    const newDomain = this.form.get('newDomain').value
    if (this.organization.mailDomains.includes(newDomain)) {
      this.toastMessageService.openToast(ADDING_DOMAIN_ERROR_TAKEN)
    } else {
      const organization = this.organization.convertToApi({
        mailDomains: [...this.organization.mailDomains, newDomain],
      })

      this.update(this.organization.id, organization).subscribe(
        (updatedOrganization) => {
          this.toastMessageService.openToast(ADDING_DOMAIN_SUCCESS)
          this.form.patchValue({
            newDomain: '',
            mailDomains: updatedOrganization.mailDomains,
          })
          setTimeout(() => {
            this.form.get('newDomain').reset()
            this.form.get('newDomain').markAsUntouched()
          }, 0)
        },
        (error) => {
          const firstError = error.error?.errors[0]
          if (firstError?.includes('Organization mail domain already exists')) {
            this.toastMessageService.openToast(ADDING_DOMAIN_ERROR_TAKEN)
          } else {
            this.toastMessageService.openToast(ADDING_DOMAIN_ERROR_GENERIC)
          }
        }
      )
    }
  }

  removeDomain(index: number): void {
    const mailDomains = this.form.get('mailDomains').value
    mailDomains.splice(index, 1)
    const organization = this.organization.convertToApi({ mailDomains })

    this.update(this.organization.id, organization).subscribe(
      (updatedOrganization) => {
        this.toastMessageService.openToast(DELETING_DOMAIN_SUCCESS)
        this.form.patchValue({
          mailDomains: updatedOrganization.mailDomains,
        })
      },
      (_error) => {
        this.toastMessageService.openToast(DELETING_DOMAIN_ERROR)
      }
    )
  }
}
