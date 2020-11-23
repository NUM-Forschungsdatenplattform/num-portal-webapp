import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DialogEditPhenotypeComponent } from './dialog-edit-phenotype.component'

describe('DialogEditPhenotypeComponent', () => {
  let component: DialogEditPhenotypeComponent
  let fixture: ComponentFixture<DialogEditPhenotypeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditPhenotypeComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditPhenotypeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
