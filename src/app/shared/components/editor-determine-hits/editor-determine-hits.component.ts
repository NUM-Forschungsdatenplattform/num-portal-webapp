import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core'
import { IDetermineHits } from './determine-hits.interface'

@Component({
  selector: 'num-editor-determine-hits',
  templateUrl: './editor-determine-hits.component.html',
  styleUrls: ['./editor-determine-hits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
