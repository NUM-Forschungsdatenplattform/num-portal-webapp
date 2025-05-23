import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core'
import { IDetermineHits } from './determine-hits.interface'
import { FlexModule } from '@angular/flex-layout/flex'
import { ButtonComponent } from '../button/button.component'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { MatHint } from '@angular/material/form-field'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-editor-determine-hits',
  templateUrl: './editor-determine-hits.component.html',
  styleUrls: ['./editor-determine-hits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlexModule,
    ButtonComponent,
    MatProgressSpinner,
    MatHint,
    FaIconComponent,
    TranslatePipe,
  ],
})
export class EditorDetermineHitsComponent {
  @Input() isButtonDisabled: boolean
  @Input() content: IDetermineHits
  @Input() isCohortValid: any
  @Output() clicked = new EventEmitter()

  constructor() {}

  determineHits(): void {
    this.clicked.emit()
  }
}
