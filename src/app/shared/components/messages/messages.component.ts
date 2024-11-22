import { Component, OnInit } from '@angular/core'
import { MessageService } from 'src/app/core/services/message/message.service'

@Component({
  selector: 'num-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages = {
    data: [
      { text: 'Something happend!!', type: 'warning', id: '123' },
      { text: 'Something bad happend!!', type: 'error', id: '234' },
      { text: 'Something okay happend!!', type: 'info', id: '222' },
    ],
  }
  constructor(private messageService: MessageService) {
    // nothing to construct
  }

  onMessageClick(id) {
    // Removes a message with a specific ID from messages.data
    this.messages.data = this.messages.data.filter((message) => message.id !== id)
  }
  loadMessages(): void {
    this.messageService.getMessages().subscribe(
      (data) => {
        this.messages.data = data
      },
      (error) => {
        console.error('Failed to load messages:', error)
      }
    )
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // load messages from server
    //this.loadMessages()
  }
}
