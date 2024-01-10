import { TestBed } from '@angular/core/testing'
import { ContactComponent } from './contact.component'

describe('ContactComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [ContactComponent],
      providers: [],
    }).compileComponents()
  })

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ContactComponent)
    const component = fixture.componentInstance
    expect(component).toBeTruthy()
  })
})
