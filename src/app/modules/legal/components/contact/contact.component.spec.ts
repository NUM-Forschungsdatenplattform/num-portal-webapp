import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { ContactComponent } from './contact.component'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { ContactHandlingComponent } from '../shared-parts/contact-handling/contact-handling.component'
import { OperationAdministrationComponent } from '../shared-parts/operation-administration/operation-administration.component'

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
        ContactComponent,
        ContactHandlingStubComponent,
        OperationAdministrationStubComponent,
        TranslateModule.forRoot(),
      ],
      providers: [TranslateService],
    })
      .overrideComponent(ContactComponent, {
        remove: {
          imports: [OperationAdministrationComponent, ContactHandlingComponent],
        },
        add: {
          imports: [ContactHandlingStubComponent, OperationAdministrationStubComponent],
        },
      })
      .compileComponents()
  })

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ContactComponent)
    const component = fixture.componentInstance
    expect(component).toBeTruthy()
  })
})
