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

import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'
import { Subscription } from 'rxjs'
import { IAuthUserInfo } from '../models/user/auth-user-info.interface'
import { AuthService } from '../../core/auth/auth.service'

@Directive({
  selector: '[numUserHasRole]',
})
export class UserHasRoleDirective implements OnInit, OnDestroy {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  private subscriptions = new Subscription()
  private allowedRoles: string[]
  private userInfo: IAuthUserInfo

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.userInfoObservable$.subscribe((userInfo) => this.handleUserInfo(userInfo))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleUserInfo(userInfo: IAuthUserInfo): void {
    if (this.userInfo?.groups && this.userInfo.groups.join('') === userInfo.groups?.join('')) {
      return
    } else {
      this.userInfo = userInfo
      this.viewContainer.clear()
    }

    if (this.allowedRoles?.length) {
      if (this.allowedRoles.some((role) => userInfo.groups?.indexOf(role) >= 0)) {
        this.viewContainer.createEmbeddedView(this.templateRef)
      } else {
        this.viewContainer.clear()
      }
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef)
    }
  }

  @Input() set numUserHasRole(allowedRoles: string[]) {
    this.allowedRoles = allowedRoles
  }
}
