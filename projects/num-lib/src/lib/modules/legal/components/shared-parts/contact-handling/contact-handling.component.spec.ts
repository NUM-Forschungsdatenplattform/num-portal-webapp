import { TestBed } from '@angular/core/testing'
import { ContactHandlingComponent } from './contact-handling.component'

describe('ContactHandlingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [ContactHandlingComponent],
      providers: [],
    }).compileComponents()
  })

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ContactHandlingComponent)
    const component = fixture.componentInstance
    expect(component).toBeTruthy()
  })
})
