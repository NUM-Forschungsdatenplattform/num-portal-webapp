/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'

import { FilterTableComponent } from './filter-table.component'
import { MatTableDataSource } from '@angular/material/table'
import { mockUsers } from 'src/mocks/data-mocks/admin.mock'
import { PipesModule } from '../../pipes/pipes.module'
import { SimpleChanges } from '@angular/core'

describe('FilterTableComponent', () => {
  let component: FilterTableComponent<any>
  let fixture: ComponentFixture<FilterTableComponent<any>>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterTableComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        ,
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

  it('should set the lookupSelectedItems map with the correct values', () => {
    const selectedItem1 = { id: 1, name: 'John Doe' }
    const selectedItem2 = { id: 2, name: 'Jane Smith' }
    component.selectedItems = [selectedItem1, selectedItem2]
    component.identifierName = 'id'
    component.lookupSelectedItems = new Map<number, boolean>()
    component.ngOnInit()
    expect(component.lookupSelectedItems).toEqual(
      new Map([
        [1, true],
        [2, true],
      ])
    )
  })

  describe('When select button for a row is clicked', () => {
    beforeEach(() => {
      jest.spyOn(component.selectedItemsChange, 'emit')
      const mockEvent = {
        stopPropagation: jest.fn().mockImplementation,
      } as unknown as Event
      component.handleSelectClick(mockEvent, mockUsers[0])
    })

    it('should item isSelected to true', () => {
      expect(component.selectedItemsChange.emit).toHaveBeenCalledWith([mockUsers[0]])
    })
  })

  describe('handleRowClick', () => {
    it('should emit the row data', () => {
      const row = { id: 1, name: 'John Doe' }
      component.rowClick.subscribe((rowData) => {
        expect(rowData).toEqual(row)
      })
      component.handleRowClick(row)
    })
  })

  describe('handleDeselectClick', () => {
    it('should emit the updated selected items list', () => {
      const row = { id: 1, name: 'John Doe' }
      component.selectedItems = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
      ]
      const event = new Event('click')
      component.selectedItems = component.handleDeselectClick(event, row)
      expect(component.selectedItems).toEqual([{ id: 2, name: 'Jane Smith' }])
    })
  })

  describe('ngOnChanges', () => {
    it('should update the lookupSelectedItems map', () => {
      const changes: SimpleChanges = {
        selectedItems: {
          currentValue: [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' },
          ],
          previousValue: '',
          firstChange: true,
          isFirstChange: () => {
            return true
          },
        },
      }
      component.ngOnChanges(changes)
      expect(component.lookupSelectedItems).toEqual(
        new Map([
          [1, true],
          [2, true],
        ])
      )
    })
  })
})
