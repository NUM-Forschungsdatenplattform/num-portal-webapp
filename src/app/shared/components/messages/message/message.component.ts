import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'num-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() text: string
  @Input() type: string
  @Input() id: string

  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // nothing to do here
  }
}
