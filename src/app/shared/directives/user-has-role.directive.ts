import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/core/auth/auth.service'
import { IAuthUserInfo } from '../models/user/auth-user-info.interface'

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
