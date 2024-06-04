import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { TimeInputComponent } from './time-input.component'

describe('TimeInputComponent', () => {
  let component: TimeInputComponent
  let fixture: ComponentFixture<TimeInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeInputComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeInputComponent)
    component = fixture.componentInstance
    component.date = new Date()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
