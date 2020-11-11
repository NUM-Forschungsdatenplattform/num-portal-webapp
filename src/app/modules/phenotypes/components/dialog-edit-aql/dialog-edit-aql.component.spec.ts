import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { IAql } from 'src/app/shared/models/aql/aql.interface'

import { DialogEditAqlComponent } from './dialog-edit-aql.component'

describe('DialogEditAqlComponent', () => {
  let component: DialogEditAqlComponent
  let fixture: ComponentFixture<DialogEditAqlComponent>
  const inputApiAql: IAql = {
    id: 1,
    name: 'Test',
    query: '',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditAqlComponent],
      imports: [MaterialModule, FormsModule, ReactiveFormsModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditAqlComponent)
    component = fixture.componentInstance
    component.dialogInput = new AqlUiModel(inputApiAql)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
