import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export interface Message {
  title?: string
  text: string
  type: string
  id: string
  startDate?: Date
  endDate?: Date
  hidden?: boolean
}
export interface Messages {
  data: Message[]
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = 'http://localhost:9090/messages' // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl)
  }
  sendMessageClick(id: string) {
    // POST the ID to the backend
    return this.http.post('http://localhost:9090/messages', { id })
  }
}
