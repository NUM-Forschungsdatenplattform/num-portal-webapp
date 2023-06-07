import { TestBed } from '@angular/core/testing'
import { ContactComponent } from './contact.component'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

describe('ContactComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ContactComponent],
      providers: [TranslateService],
    }).compileComponents()
  })

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ContactComponent)
    const component = fixture.componentInstance
    expect(component).toBeTruthy()
  })
})
