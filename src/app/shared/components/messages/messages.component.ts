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
      {
        text: "I don't have a <strong>title</strong>.<br>But I do speak <i style='color: red'>HTML</i>",
        type: 'warning',
        id: '123',
      },
      {
        title: 'Something bad happend!!',
        text: 'click me and i will go away',
        type: 'error',
        id: '234',
      },
      {
        title: 'Something okay happend!!',
        text: 'click me and i will go away',
        type: 'info',
        id: '222',
      },
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
