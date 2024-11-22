import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MessageComponent } from './message.component'
import { By } from '@angular/platform-browser'

describe('MessageComponent', () => {
  let component: MessageComponent
  let fixture: ComponentFixture<MessageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(MessageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render the message text', () => {
    component.text = 'Test message'
    fixture.detectChanges()

    const messageElement = fixture.debugElement.query(By.css('p'))
    expect(messageElement.nativeElement.textContent).toContain('Test message')
  })

  it('should apply the correct CSS class for different message types', () => {
    const types = ['info', 'warning', 'error']

    types.forEach((type) => {
      component.type = type
      fixture.detectChanges()

      const messageElement = fixture.debugElement.query(By.css('div'))
      expect(messageElement.nativeElement.classList).toContain(type)
    })
  })

  it('should not render the wrapper div if text is null', () => {
    component.text = null
    fixture.detectChanges()

    const wrapperElement = fixture.debugElement.query(By.css('div'))
    expect(wrapperElement).toBeNull()
  })

  it('should not render the wrapper div if text is undefined', () => {
    component.text = undefined
    fixture.detectChanges()

    const wrapperElement = fixture.debugElement.query(By.css('div'))
    expect(wrapperElement).toBeNull()
  })

  it('should not render the wrapper div if text is an empty string', () => {
    component.text = ''
    fixture.detectChanges()

    const wrapperElement = fixture.debugElement.query(By.css('div'))
    expect(wrapperElement).toBeNull()
  })

  it('should not apply any CSS class if type is invalid or empty', () => {
    const invalidTypes = [null, undefined, '']

    invalidTypes.forEach((type) => {
      component.type = type
      fixture.detectChanges()

      const messageElement = fixture.debugElement.query(By.css('div'))
      expect(messageElement.nativeElement.className).toBe('')
    })
  })
})
