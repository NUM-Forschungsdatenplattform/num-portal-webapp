import { TestBed } from '@angular/core/testing'
import { OperationAdministrationComponent } from './operation-administration.component'

describe('OperationAdministrationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [OperationAdministrationComponent],
      providers: [],
    }).compileComponents()
  })

  it('should create the component', () => {
    const fixture = TestBed.createComponent(OperationAdministrationComponent)
    const component = fixture.componentInstance
    expect(component).toBeTruthy()
  })
})
