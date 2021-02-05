import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { IPhenotypeResolved } from '../../models/phenotype-resolved.interface'

@Component({
  selector: 'num-phenotype-editor',
  templateUrl: './phenotype-editor.component.html',
  styleUrls: ['./phenotype-editor.component.scss'],
})
export class PhenotypeEditorComponent implements OnInit {
  resolvedData: IPhenotypeResolved
  phenotypeForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private phenotypeService: PhenotypeService,
    private router: Router,
    private toast: ToastMessageService
  ) {}

  ngOnInit(): void {
    this.resolvedData = this.route.snapshot.data.resolvedData
    this.phenotypeForm = new FormGroup({
      title: new FormControl(this.resolvedData.phenotype?.name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl(this.resolvedData.phenotype?.description, [
        Validators.required,
        Validators.minLength(3),
      ]),
    })
  }

  async saveForm(): Promise<void> {
    const id = this.resolvedData.phenotype.id === 0 ? null : this.resolvedData.phenotype.id
    const formValues = this.phenotypeForm.value
    const apiQuery = this.resolvedData.phenotype.convertToApiInterface(
      id,
      formValues.title,
      formValues.description
    )
    if (apiQuery.query) {
      try {
        await this.phenotypeService.create(apiQuery).toPromise()
        this.router.navigate(['phenotypes'], {})

        this.toast.openToast({
          type: ToastMessageType.Success,
          message: 'PHENOTYPE.SAVE_SUCCESS_MESSAGE',
        })
      } catch (error) {
        this.toast.openToast({
          type: ToastMessageType.Error,
          message: 'PHENOTYPE.SAVE_ERROR_MESSAGE',
        })
        console.log(error)
      }
    } else {
      // Only empty groups leads to null
      this.toast.openToast({
        type: ToastMessageType.Error,
        message: 'PHENOTYPE.SAVE_NO_AQL_ERROR_MESSAGE',
      })
    }
  }

  cancel(): void {
    this.router.navigate(['phenotypes'], {})
  }
}
