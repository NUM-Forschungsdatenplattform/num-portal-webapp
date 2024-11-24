import { Component, OnInit } from '@angular/core'
import { Messages, MessageService } from 'src/app/core/services/message/message.service'
import { Observer } from 'rxjs'

@Component({
  selector: 'num-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages: Messages = {
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
    const index = this.messages.data.findIndex((message) => message.id === id)
    this.messages.data[index].hidden = true
    setTimeout(
      () => (this.messages.data = this.messages.data.filter((message) => message.id !== id)),
      200
    )
    // Send the ID to the backend
    this.messageService.sendMessageClick(id).subscribe({
      next: () => console.log(`Message ID ${id} sent to backend`),
      error: (err) => console.error(`Error sending message ID ${id}`, err),
    })
  }
  loadMessages(): void {
    const messageObserver: Observer<any> = {
      next: (data) => {
        this.messages.data = data
      },
      error: (error) => {
        console.error('Failed to load messages:', error)
      },
      complete: () => {
        console.log('Message loading complete')
      },
    }

    this.messageService.getMessages().subscribe(messageObserver)
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // load messages from server
    //this.loadMessages()
  }
}
