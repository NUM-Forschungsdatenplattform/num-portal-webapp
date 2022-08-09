import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import {
  DISCARD_DIALOG_CONFIG,
  SAVE_DIALOG_CONFIG,
  SAVE_ERROR_CONFIG,
  SAVE_SUCCESS_CONFIG,
} from './constants'
import { AppConfigService } from 'src/app/config/app-config.service'

@Component({
  selector: 'num-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  subscriptions = new Subscription()
  constructor(
    private profileService: ProfileService,
    private dialogService: DialogService,
    private toastMessageService: ToastMessageService,
    private translate: TranslateService,
    private appConfig: AppConfigService
  ) {}

  isLoading: boolean
  profile: IUserProfile
  userRoles: string
  nonWhitespaceRegex = /[^\s.]+/
  profileForm = new FormGroup({
    firstName: new FormControl(undefined, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(this.nonWhitespaceRegex),
    ]),
    lastName: new FormControl(undefined, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(this.nonWhitespaceRegex),
    ]),
  })

  ngOnInit(): void {
    this.fetchData()
    this.subscriptions.add(this.translate.onLangChange.subscribe(() => this.resolveRoles()))
  }

  fetchData(): void {
    this.isLoading = true
    this.subscriptions.add(
      this.profileService.get().subscribe(
        (data) => {
          this.handleData(data)
          this.isLoading = false
        },
        () => {
          this.isLoading = false
        }
      )
    )
  }

  handleData(profile: IUserProfile): void {
    this.profile = profile
    this.resolveRoles()
    this.updateForm(profile)
  }

  resolveRoles() {
    this.userRoles = this.profile?.roles
      .filter((role) => Object.values(AvailableRoles).includes(role))
      .map((role) => this.translate.instant(`ROLE.${role}`))
      .join(', ')
  }

  updateForm(profile: IUserProfile): void {
    this.profileForm.patchValue({ firstName: profile.firstName, lastName: profile.lastName })
  }

  discard(): void {
    const dialogRef = this.dialogService.openDialog(DISCARD_DIALOG_CONFIG)
    this.subscriptions.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          this.updateForm(this.profile)
        }
      })
    )
  }

  save(): void {
    const dialogRef = this.dialogService.openDialog(SAVE_DIALOG_CONFIG)
    this.subscriptions.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          const firstName = this.profileForm.get('firstName').value
          const lastName = this.profileForm.get('lastName').value
          this.profileService.changeUserName(firstName, lastName).subscribe(
            () => {
              const newProfile = Object.assign(this.profile, { firstName, lastName })
              this.handleSaveSuccess(newProfile)
            },
            () => this.handleSaveError()
          )
        }
      })
    )
  }

  updatePassword(): void {
    const auth = this.appConfig.config.auth
    window.location.assign(
      auth.baseUrl + '/auth/realms/' + auth.realm + '/account/password?referrer=' + auth.clientId
    )
  }

  handleSaveSuccess(profile: IUserProfile): void {
    this.isLoading = false
    this.profile = profile
    this.updateForm(profile)
    this.toastMessageService.openToast(SAVE_SUCCESS_CONFIG)
  }

  handleSaveError(): void {
    this.isLoading = false
    this.toastMessageService.openToast(SAVE_ERROR_CONFIG)
  }
}
