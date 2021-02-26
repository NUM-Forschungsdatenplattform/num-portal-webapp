import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'num-aql-editor-general-info',
  templateUrl: './aql-editor-general-info.component.html',
  styleUrls: ['./aql-editor-general-info.component.scss'],
})
export class AqlEditorGeneralInfoComponent implements OnInit {
  @Input() form: FormGroup
  constructor() {}

  ngOnInit(): void {}
}
