import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { IPhenotypeResolved } from '../../models/phenotype-resolved.interface'

@Component({
  selector: 'num-phenotype-editor',
  templateUrl: './phenotype-editor.component.html',
  styleUrls: ['./phenotype-editor.component.scss'],
})
export class PhenotypeEditorComponent implements OnInit {
  resolvedData: IPhenotypeResolved
  generalInfoForm: FormGroup

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.resolvedData = this.route.snapshot.data.resolvedData
    this.generalInfoForm = new FormGroup({
      title: new FormControl(this.resolvedData.phenotype?.name),
      description: new FormControl(this.resolvedData.phenotype?.description),
    })
  }

  saveForm(): void {
    console.log('Save')
  }
}
