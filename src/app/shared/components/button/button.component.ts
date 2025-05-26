import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { NgTemplateOutlet } from '@angular/common'

@Component({
  selector: 'num-button',
  templateUrl: './button.component.html',
  imports: [MatButton, FaIconComponent, NgTemplateOutlet],
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
