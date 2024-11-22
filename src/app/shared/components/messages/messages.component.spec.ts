import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MessagesComponent } from './messages.component'
import { By } from '@angular/platform-browser'

describe('MessagesComponent', () => {
  let component: MessagesComponent
  let fixture: ComponentFixture<MessagesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagesComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(MessagesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display messages', () => {
    // Arrange
    component.messages.data = [
      { text: 'Test message 1', type: 'info', id: '1' },
      { text: 'Test message 2', type: 'error', id: '2' },
    ]
    fixture.detectChanges()

    // Act
    const messageElements = fixture.debugElement.queryAll(By.css('p'))

    // Assert
    expect(messageElements.length).toBe(2)
    expect(messageElements[0].nativeElement.textContent).toContain('Test message 1')
    expect(messageElements[1].nativeElement.textContent).toContain('Test message 2')
  })

  it('should add a new message dynamically', () => {
    // Arrange
    component.messages.data = []
    fixture.detectChanges()

    // Act
    component.messages.data.push({ text: 'New message', type: 'warning', id: '3' })
    fixture.detectChanges()

    const messageElements = fixture.debugElement.queryAll(By.css('p'))

    // Assert
    expect(messageElements.length).toBe(1)
    expect(messageElements[0].nativeElement.textContent).toContain('New message')
  })

  it('should remove a message when onMessageClick is called', () => {
    // Arrange
    component.messages.data = [
      { text: 'Test message 1', type: 'info', id: '1' },
      { text: 'Test message 2', type: 'error', id: '2' },
    ]
    fixture.detectChanges()

    // Act
    component.onMessageClick('1')
    fixture.detectChanges()

    const messageElements = fixture.debugElement.queryAll(By.css('p'))

    // Assert
    expect(messageElements.length).toBe(1)
    expect(messageElements[0].nativeElement.textContent).toContain('Test message 2')
  })

  it('should not remove any message if ID does not exist', () => {
    // Arrange
    component.messages.data = [
      { text: 'Test message 1', type: 'info', id: '1' },
      { text: 'Test message 2', type: 'error', id: '2' },
    ]
    fixture.detectChanges()

    // Act
    component.onMessageClick('non-existing-id')
    fixture.detectChanges()

    const messageElements = fixture.debugElement.queryAll(By.css('p'))

    // Assert
    expect(messageElements.length).toBe(2)
  })
})
