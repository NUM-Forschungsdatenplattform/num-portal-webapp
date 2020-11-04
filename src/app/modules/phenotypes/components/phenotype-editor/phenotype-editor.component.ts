import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { DialogSize } from 'src/app/core/models/dialog-size.enum'
import { DialogService } from 'src/app/core/services/dialog.service'
import { IPhenotypeResolved } from '../../models/phenotype-resolved.interface'
import { DialogAddAqlsComponent } from '../dialog-add-aqls/dialog-add-aqls.component'

@Component({
  selector: 'num-phenotype-editor',
  templateUrl: './phenotype-editor.component.html',
  styleUrls: ['./phenotype-editor.component.scss'],
})
export class PhenotypeEditorComponent implements OnInit {
  resolvedData: IPhenotypeResolved
  phenotypeForm: FormGroup

  constructor(private route: ActivatedRoute, private dialogService: DialogService) {}

  ngOnInit(): void {
    this.resolvedData = this.route.snapshot.data.resolvedData
    this.phenotypeForm = new FormGroup({
      title: new FormControl(this.resolvedData.phenotype?.name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl(this.resolvedData.phenotype?.description),
    })
    this.openDialog()
  }

  openDialog(): void {
    const dialogRef = this.dialogService.openDialog(
      DialogAddAqlsComponent,
      { title: 'This is the Title' },
      DialogSize.Medium
    )
  }

  saveForm(): void {
    //console.log(JSON.stringify(this.resolvedData.phenotype.convertToApiInterface()))
    console.log(this.resolvedData.phenotype.convertToApiInterface())
  }
}
