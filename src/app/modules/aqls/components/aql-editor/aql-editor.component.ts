import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { AqlService } from 'src/app/core/services/aql.service'
import { AqlBuilderUiModel } from 'src/app/shared/models/aql/aql-builder-ui.model'
import { IAqlResolved } from '../../models/aql-resolved.interface'

@Component({
  selector: 'num-aql-editor',
  templateUrl: './aql-editor.component.html',
  styleUrls: ['./aql-editor.component.scss'],
})
export class AqlEditorComponent implements OnInit {
  resolvedData: IAqlResolved
  get aql(): AqlBuilderUiModel {
    return this.resolvedData.aql
  }

  aqlForm: FormGroup

  constructor(private route: ActivatedRoute, private aqlService: AqlService) {}

  ngOnInit(): void {
    this.resolvedData = this.route.snapshot.data.resolvedData
    this.generateForm()
  }

  generateForm(): void {
    this.aqlForm = new FormGroup({
      title: new FormControl(this.aql?.name, [Validators.required, Validators.minLength(3)]),
      purpose: new FormControl(this.aql?.purpose, [Validators.required, Validators.minLength(3)]),
      use: new FormControl(this.aql?.purpose, [Validators.required, Validators.minLength(3)]),
      isPublic: new FormControl({ value: this.aql?.isPublic, disabled: this.aql.id === null }, [
        Validators.requiredTrue,
      ]),
    })
  }

  save(): void {
    console.log(this.aqlForm)
  }
}
