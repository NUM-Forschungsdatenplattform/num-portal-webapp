import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { IStudyResolved } from '../../study-resolved.interface'

@Component({
  selector: 'num-study-editor',
  templateUrl: './study-editor.component.html',
  styleUrls: ['./study-editor.component.scss'],
})
export class StudyEditorComponent implements OnInit {
  resolvedData: IStudyResolved
  studyForm: FormGroup
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.resolvedData = this.route.snapshot.data.resolvedData
    this.studyForm = new FormGroup({
      title: new FormControl(this.resolvedData.study?.name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl(this.resolvedData.study?.description, [
        Validators.required,
        Validators.minLength(3),
      ]),
      primaryHypothesis: new FormControl(this.resolvedData.study?.firstHypotheses, [
        Validators.required,
        Validators.minLength(3),
      ]),
      secondaryHypothesis: new FormControl(this.resolvedData.study?.secondHypotheses),
    })
  }
}
