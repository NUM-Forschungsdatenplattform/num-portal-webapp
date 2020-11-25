import { Component, Input, OnInit } from '@angular/core'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'

@Component({
  selector: 'num-add-phenotypes-preview',
  templateUrl: './add-phenotypes-preview.component.html',
  styleUrls: ['./add-phenotypes-preview.component.scss'],
})
export class AddPhenotypesPreviewComponent implements OnInit {
  constructor() {}
  @Input() previewInput: PhenotypeUiModel

  ngOnInit(): void {}
}
