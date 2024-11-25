import { Component, Input, OnInit } from '@angular/core'
import { Message } from 'src/app/core/services/message/message.service'

@Component({
  selector: 'num-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() id: string
  @Input() message: Message
  @Input() hidden: boolean

  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // nothing to do here
  }
  get dynamicClasses() {
    return {
      hidden: this.message.hidden,
      [this.message.type]: true,
    }
  }
}
