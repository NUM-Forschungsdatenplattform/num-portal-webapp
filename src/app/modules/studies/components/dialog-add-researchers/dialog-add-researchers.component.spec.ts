import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DialogAddResearchersComponent } from './dialog-add-researchers.component'

describe('DialogAddResearchersComponent', () => {
  let component: DialogAddResearchersComponent
  let fixture: ComponentFixture<DialogAddResearchersComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddResearchersComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddResearchersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
