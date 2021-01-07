import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'num-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  constructor() {}

  @Input() icon?: string
  @Input() type?: 'primary' | 'secondary' | 'basic' = 'primary'
  @Input() isDisabled?: boolean

  @Output() singleClick = new EventEmitter()
  @Output() doubleClick = new EventEmitter()

  buttonClicked(): void {
    this.singleClick.emit()
  }

  buttonDoubleClicked(): void {
    this.doubleClick.emit()
  }
}
