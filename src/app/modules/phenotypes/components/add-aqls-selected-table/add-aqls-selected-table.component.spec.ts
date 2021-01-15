import { SimpleChange } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { AddAqlsSelectedTableComponent } from './add-aqls-selected-table.component'
import { mockAql1 } from '../../../../../mocks/data-mocks/aqls.mock'

describe('AddAqlsSelectionTableComponent', () => {
  let component: AddAqlsSelectedTableComponent
  let fixture: ComponentFixture<AddAqlsSelectedTableComponent>

  const aql = new AqlUiModel(mockAql1)

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAqlsSelectedTableComponent],
      imports: [MaterialModule, FontAwesomeTestingModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAqlsSelectedTableComponent)
    component = fixture.componentInstance
    component.dataSource.data = []
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When a row is clicked', () => {
    it('should emit the clicked aql', () => {
      component.dataSource.data = [aql]
      jest.spyOn(component.selectedAqlsChange, 'emit')
      component.handleRowClick(aql)
      expect(component.selectedAqlsChange.emit).toHaveBeenCalledWith([])
    })
  })

  describe('When the selectedAqls passed in are changed', () => {
    it('should set up the dataSource', () => {
      component.selectedAqls = [aql]
      const change = new SimpleChange([], component.selectedAqls, false)
      component.ngOnChanges({ selectedAqls: change })
      fixture.detectChanges()
      expect(component.dataSource.data).toEqual([aql])
    })
  })
})
