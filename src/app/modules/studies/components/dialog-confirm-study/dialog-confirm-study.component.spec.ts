import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DialogConfirmStudyComponent } from './dialog-confirm-study.component'

describe('DialogConfirmStudyComponent', () => {
  let component: DialogConfirmStudyComponent
  let fixture: ComponentFixture<DialogConfirmStudyComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogConfirmStudyComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmStudyComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
