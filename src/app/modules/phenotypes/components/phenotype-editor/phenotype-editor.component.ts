import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { PhenotypeService } from 'src/app/core/services/phenotype.service'
import { IPhenotypeApi } from 'src/app/shared/models/phenotype/phenotype-api.interface'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'
import { IPhenotypeResolved } from '../../models/phenotype-resolved.interface'

@Component({
  selector: 'num-phenotype-editor',
  templateUrl: './phenotype-editor.component.html',
  styleUrls: ['./phenotype-editor.component.scss'],
})
export class PhenotypeEditorComponent implements OnInit {
  resolvedData: IPhenotypeResolved
  phenotypeForm: FormGroup

  constructor(private route: ActivatedRoute, private phenotypeService: PhenotypeService) {}

  ngOnInit(): void {
    this.resolvedData = this.route.snapshot.data.resolvedData
    this.phenotypeForm = new FormGroup({
      title: new FormControl(this.resolvedData.phenotype?.name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl(this.resolvedData.phenotype?.description),
    })
  }

  saveForm(): void {
    const id = this.resolvedData.phenotype.id === 0 ? null : this.resolvedData.phenotype.id
    const formValues = this.phenotypeForm.value
    const apiQuery = this.resolvedData.phenotype.convertToApiInterface(
      id,
      formValues.title,
      formValues.description
    )

    this.phenotypeService.create(apiQuery).subscribe((result) => {
      // TODO display message to the user
    })
  }
}
