import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { MessageService, Message } from './message.service'

describe('MessageService', () => {
  let service: MessageService
  let httpMock: HttpTestingController

  const mockMessages: Message[] = [
    { text: 'Test message 1', type: 'info', id: '1' },
    { text: 'Test message 2', type: 'error', id: '2' },
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MessageService],
    })

    service = TestBed.inject(MessageService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify() // Ensures no outstanding HTTP requests
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('getMessages', () => {
    it('should fetch messages from the API', () => {
      service.getMessages().subscribe((messages) => {
        expect(messages).toEqual(mockMessages)
        expect(messages.length).toBe(2)
      })

      const req = httpMock.expectOne('https://api.example.com/messages')
      expect(req.request.method).toBe('GET')

      // Simulate a successful response with mock data
      req.flush(mockMessages)
    })

    it('should handle an empty message list', () => {
      service.getMessages().subscribe((messages) => {
        expect(messages).toEqual([])
        expect(messages.length).toBe(0)
      })

      const req = httpMock.expectOne('https://api.example.com/messages')
      expect(req.request.method).toBe('GET')

      // Simulate a response with an empty array
      req.flush([])
    })

    it('should handle an HTTP error gracefully', () => {
      const mockErrorMessage = 'Failed to load messages'

      service.getMessages().subscribe({
        next: () => fail('Expected an error, not messages'),
        error: (error) => {
          expect(error).toBeTruthy()
          expect(error.status).toBe(500)
        },
      })

      const req = httpMock.expectOne('https://api.example.com/messages')
      expect(req.request.method).toBe('GET')

      // Simulate an HTTP error response
      req.flush(mockErrorMessage, { status: 500, statusText: 'Internal Server Error' })
    })
  })

  describe('sendMessageClick', () => {
    it('should send the clicked message ID to the API', () => {
      const mockMessageId = '1'

      service.sendMessageClick(mockMessageId).subscribe((response) => {
        expect(response).toBeNull() // Assuming the API responds with a 204 No Content
      })

      const req = httpMock.expectOne('https://api.example.com/messages/click')
      expect(req.request.method).toBe('POST')
      expect(req.request.body).toEqual({ id: mockMessageId })

      // Simulate a successful response
      req.flush(null)
    })

    it('should handle an HTTP error when sending a message ID', () => {
      const mockMessageId = '1'
      const mockErrorMessage = 'Failed to send message click'

      service.sendMessageClick(mockMessageId).subscribe({
        next: () => fail('Expected an error, not success'),
        error: (error) => {
          expect(error).toBeTruthy()
          expect(error.status).toBe(500)
        },
      })

      const req = httpMock.expectOne('https://api.example.com/messages/click')
      expect(req.request.method).toBe('POST')
      expect(req.request.body).toEqual({ id: mockMessageId })

      // Simulate an HTTP error response
      req.flush(mockErrorMessage, { status: 500, statusText: 'Internal Server Error' })
    })
  })
})
