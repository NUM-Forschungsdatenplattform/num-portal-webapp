import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export interface Message {
  text: string
  type: string
  id: string
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
}
