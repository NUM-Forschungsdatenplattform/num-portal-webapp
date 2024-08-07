import { Component, OnDestroy, OnInit } from '@angular/core'
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { ManagerService } from 'src/app/core/services/manager/manager.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { COPY_CLIPBOARD_SUCCESS_CONFIG, RESOLVE_ERROR_CONFIG } from './constants'

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
  form: UntypedFormGroup
  hasClipboardApi: boolean

  ngOnInit(): void {
    if (navigator.clipboard) {
      this.hasClipboardApi = true
    }

    this.form = new UntypedFormGroup({
      projectId: new UntypedFormControl(undefined, [Validators.required]),
      pseudonym: new UntypedFormControl(undefined, [Validators.required, Validators.minLength(8)]),
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
