import { TestBed } from '@angular/core/testing'
import { ContactHandlingComponent } from './contact-handling.component'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

describe('ContactHandlingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [ContactHandlingComponent, TranslateService],
    }).compileComponents()
  })

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ContactHandlingComponent)
    const component = fixture.componentInstance
    expect(component).toBeTruthy()
  })
})
