import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { TranslateModule } from '@ngx-translate/core'
import { PatientCountInfoComponent } from './patient-count-info.component'

describe('PatientCountInfoComponent', () => {
  let component: PatientCountInfoComponent
  let fixture: ComponentFixture<PatientCountInfoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientCountInfoComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCountInfoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render the text for the current dataset size', () => {
    component.patientCount = 1234
    const paragraphElement = fixture.debugElement.query(By.css('p'))
    expect((paragraphElement.nativeElement as HTMLParagraphElement).innerHTML.trim()).toEqual(
      'SEARCH.PATIENT_COUNT_INFO'
    )
  })
})
