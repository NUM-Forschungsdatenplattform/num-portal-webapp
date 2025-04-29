import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { ContactComponent } from './contact.component'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

describe('ContactComponent', () => {
  @Component({
    selector: 'num-operation-administration',
    template: '',
  })
  class OperationAdministrationStubComponent {}

  @Component({
    selector: 'num-contact-handling',
    template: '',
  })
  class ContactHandlingStubComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactHandlingStubComponent,
        OperationAdministrationStubComponent,
        TranslateModule.forRoot(),
      ],
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
