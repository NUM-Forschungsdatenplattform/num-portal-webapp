import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  Input,
} from '@angular/core'
import { IDetermineHits } from './determineHits.interface'

@Component({
  selector: 'num-editor-determine-hits',
  templateUrl: './editor-determine-hits.component.html',
  styleUrls: ['./editor-determine-hits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorDetermineHitsComponent implements OnInit {
  @Input() determineHitsContent: IDetermineHits
  @Output() determineHitsClicked = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}

  determineHits(): void {
    this.determineHitsClicked.emit()
  }
}
