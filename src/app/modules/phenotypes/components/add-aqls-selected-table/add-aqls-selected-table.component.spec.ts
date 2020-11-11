import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { AddAqlsSelectedTableComponent } from './add-aqls-selected-table.component'

describe('AddAqlsSelectionTableComponent', () => {
  let component: AddAqlsSelectedTableComponent
  let fixture: ComponentFixture<AddAqlsSelectedTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAqlsSelectedTableComponent],
      imports: [MaterialModule, FontAwesomeTestingModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAqlsSelectedTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
