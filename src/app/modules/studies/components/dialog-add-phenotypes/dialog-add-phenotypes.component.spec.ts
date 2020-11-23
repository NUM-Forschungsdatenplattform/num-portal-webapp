import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DialogAddPhenotypesComponent } from './dialog-add-phenotypes.component'

describe('DialogAddPhenotypesComponent', () => {
  let component: DialogAddPhenotypesComponent
  let fixture: ComponentFixture<DialogAddPhenotypesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddPhenotypesComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddPhenotypesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
