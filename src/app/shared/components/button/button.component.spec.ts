import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { MaterialModule } from '../../../layout/material/material.module'

import { ButtonComponent } from './button.component'

describe('ButtonComponent', () => {
  let component: ButtonComponent
  let fixture: ComponentFixture<ButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
      imports: [MaterialModule, FontAwesomeTestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
