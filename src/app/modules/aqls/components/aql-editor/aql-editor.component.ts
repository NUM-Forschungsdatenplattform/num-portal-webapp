import { AuthService } from 'src/app/core/auth/auth.service'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { AqlEditorUiModel } from 'src/app/shared/models/aql/aql-editor-ui.model'
import { IAqlResolved } from '../../models/aql-resolved.interface'
import { IAqlApi } from '../../../../shared/models/aql/aql.interface'
import { take } from 'rxjs/operators'

@Component({
  selector: 'num-aql-editor',
  templateUrl: './aql-editor.component.html',
  styleUrls: ['./aql-editor.component.scss'],
})
export class AqlEditorComponent implements OnInit {
  resolvedData: IAqlResolved
  get aql(): AqlEditorUiModel {
    return this.resolvedData.aql
  }

  aqlForm: FormGroup
  isEditMode: boolean
  isCurrentUserOwner: boolean

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private aqlService: AqlService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.resolvedData = this.route.snapshot.data.resolvedData

    this.generateForm()

    this.isEditMode = this.aql?.id !== null

    this.authService.userInfoObservable$
      .pipe(take(1))
      .subscribe((user) => (this.isCurrentUserOwner = this.aql?.owner?.id === user?.sub))
  }

  generateForm(): void {
    this.aqlForm = new FormGroup({
      title: new FormControl(this.aql?.name, [Validators.required, Validators.minLength(3)]),
      purpose: new FormControl(this.aql?.purpose, [Validators.required, Validators.minLength(3)]),
      use: new FormControl(this.aql?.usage, [Validators.required, Validators.minLength(3)]),
      isPublic: new FormControl(this.aql?.publicAql),
    })
  }

  getAqlForApi(): IAqlApi {
    const formValues = this.aqlForm.value

    return this.aql?.convertToApi(
      formValues.title,
      formValues.purpose,
      formValues.use,
      formValues.isPublic
    )
  }

  async save(): Promise<void> {
    const aqlQuery = this.getAqlForApi()
    try {
      await this.aqlService.save(aqlQuery).toPromise()
      this.router.navigate(['aqls'], {})
      // TODO: Display message to user
    } catch (error) {
      console.log(error)
      // TODO: Display message to user
    }
  }

  async update(): Promise<void> {
    const aqlQuery = this.getAqlForApi()
    try {
      await this.aqlService.update(aqlQuery, this.aql?.id).toPromise()
      this.router.navigate(['aqls'], {})
      // TODO: Display message to user
    } catch (error) {
      console.log(error)
      // TODO: Display message to user
    }
  }
}
