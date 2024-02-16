import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DialogAddAttachmentsComponent } from './dialog-add-attachments.component'

describe('DialogAddAttachmentsComponent', () => {
  let component: DialogAddAttachmentsComponent
  let fixture: ComponentFixture<DialogAddAttachmentsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddAttachmentsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DialogAddAttachmentsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
