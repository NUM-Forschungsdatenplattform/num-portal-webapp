import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
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

  constructor(private route: ActivatedRoute) {}

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
    const now = new Date()
    const utcSeconds = (now.getTime() + now.getTimezoneOffset() * 60_000) / 1_000
    const formValues = this.phenotypeForm.value
    const apiQuery = this.resolvedData.phenotype.convertToApiInterface()
    apiQuery.description = formValues.description
    apiQuery.name = formValues.title
    apiQuery.id = utcSeconds
    console.log(apiQuery)
    //console.log(JSON.stringify(this.resolvedData.phenotype.convertToApiInterface()))
    //console.log(this.resolvedData.phenotype.convertToApiInterface())
  }
}
