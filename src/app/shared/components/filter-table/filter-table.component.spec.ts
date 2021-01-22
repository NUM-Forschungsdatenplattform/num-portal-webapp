import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { TranslateModule } from '@ngx-translate/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'

import { FilterTableComponent } from './filter-table.component'
import { MatTableDataSource } from '@angular/material/table'
import { mockUsers } from 'src/mocks/data-mocks/admin.mock'
import { PipesModule } from '../../pipes/pipes.module'

describe('FilterTableComponent', () => {
  let component: FilterTableComponent<any>
  let fixture: ComponentFixture<FilterTableComponent<any>>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterTableComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        PipesModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTableComponent)
    component = fixture.componentInstance

    component.dataSource = new MatTableDataSource(mockUsers)
    component.identifierName = 'id'
    component.columnKeys = ['firstName', 'lastName', 'info', 'isSelected']
    component.columnPaths = [['firstName'], ['lastName'], ['organization', 'name'], ['select']]
    component.selectedItems = []

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When select button for a row is clicked', () => {
    beforeEach(() => {
      jest.spyOn(component.selectedItemsChange, 'emit')
      const mockEvent = ({
        stopPropagation: jest.fn().mockImplementation,
      } as unknown) as Event
      component.handleSelectClick(mockEvent, mockUsers[0])
    })

    it('should item isSelected to true', () => {
      expect(component.selectedItemsChange.emit).toHaveBeenCalledWith([mockUsers[0]])
    })
  })
})
