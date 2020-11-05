import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
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
    //console.log(JSON.stringify(this.resolvedData.phenotype.convertToApiInterface()))
    console.log(this.resolvedData.phenotype.convertToApiInterface())
  }
}
