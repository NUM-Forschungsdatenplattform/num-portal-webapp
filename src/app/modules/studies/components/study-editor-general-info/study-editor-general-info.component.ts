import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'num-study-editor-general-info',
  templateUrl: './study-editor-general-info.component.html',
  styleUrls: ['./study-editor-general-info.component.scss'],
})
export class StudyEditorGeneralInfoComponent implements OnInit {
  constructor() {}
  @Input() form: FormGroup
  ngOnInit(): void {}
}
