import { TestBed } from '@angular/core/testing'
import { OperationAdministrationComponent } from './operation-administration.component'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

describe('OperationAdministrationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationAdministrationComponent, TranslateModule.forRoot()],
      providers: [TranslateService],
    }).compileComponents()
  })

  it('should create the component', () => {
    const fixture = TestBed.createComponent(OperationAdministrationComponent)
    const component = fixture.componentInstance
    expect(component).toBeTruthy()
  })
})
