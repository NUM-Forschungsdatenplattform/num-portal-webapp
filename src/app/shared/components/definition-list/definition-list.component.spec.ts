import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DefinitionListComponent } from './definition-list.component'
import { TranslateModule } from '@ngx-translate/core'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'

describe('DifinationListComponent', () => {
  let component: DefinitionListComponent
  let fixture: ComponentFixture<DefinitionListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefinitionListComponent],
      imports: [TranslateModule.forRoot(), FontAwesomeTestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinitionListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
