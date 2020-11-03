import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'num-phenotype-editor-general-info',
  templateUrl: './phenotype-editor-general-info.component.html',
  styleUrls: ['./phenotype-editor-general-info.component.scss'],
})
export class PhenotypeEditorGeneralInfoComponent implements OnInit {
  @Input() form: FormGroup
  constructor() {}

  ngOnInit(): void {}
}
