import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determineHits.interface'
import { IPhenotypeApi } from 'src/app/shared/models/phenotype/phenotype-api.interface'
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
  determineHitsContent: IDetermineHits

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
    this.determineHitsContent = {
      count: null,
      message: 'PHENOTYPE.HITS.MESSAGE_SET_ALL_PARAMETERS',
    }
  }

  getApiQuery(): IPhenotypeApi {
    const id = this.resolvedData.phenotype.id === 0 ? null : this.resolvedData.phenotype.id
    const formValues = this.phenotypeForm.value
    return this.resolvedData.phenotype.convertToApiInterface(
      id,
      formValues.title,
      formValues.description
    )
  }

  async determineHits(): Promise<void> {
    const apiQuery = this.getApiQuery()

    if (apiQuery.query) {
      try {
        await this.phenotypeService
          .execute(apiQuery)
          .toPromise()
          .then((result) => {
            this.determineHitsContent = {
              count: result.length,
              message: '',
            }
          })
      } catch (error) {
        if (error.status === 451) {
          // *** Error 451 means too few hits ***
          this.determineHitsContent = {
            count: null,
            message: 'PHENOTYPE.HITS.MESSAGE_ERROR_FEW_HITS',
          }
        } else {
          this.determineHitsContent = {
            count: null,
            message: 'PHENOTYPE.HITS.MESSAGE_ERROR_MESSAGE',
          }
        }

        console.log(error)
      }
    } else {
      this.determineHitsContent = {
        count: null,
        message: 'PHENOTYPE.HITS.MESSAGE_SET_ALL_PARAMETERS',
      }
    }
  }

  async saveForm(): Promise<void> {
    const apiQuery = this.getApiQuery()

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
