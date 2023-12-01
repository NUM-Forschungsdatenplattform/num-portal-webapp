import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AttachmentsTableComponent } from './attachments-table.component'

describe('AttachmentsTableComponent', () => {
  let component: AttachmentsTableComponent
  let fixture: ComponentFixture<AttachmentsTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttachmentsTableComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
