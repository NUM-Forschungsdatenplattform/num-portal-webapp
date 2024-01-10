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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'

import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { IAqlExecutionResponse } from 'src/app/shared/models/aql/execution/aql-execution-response.interface'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { ResultTableComponent } from './result-table.component'

describe('ResultTableComponent', () => {
  let component: ResultTableComponent
  let fixture: ComponentFixture<ResultTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultTableComponent, ButtonComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        ,
        PipesModule,
        FontAwesomeTestingModule,
      ],
      providers: [],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    fixture = TestBed.createComponent(ResultTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When a non-empty resultSet arrives', () => {
    const mockResultSet: IAqlExecutionResponse = {
      q: 'some query',
      name: 'Table name',
      columns: [
        {
          name: 'some/path/to/col1',
          path: 'path to col1',
        },
        {
          name: 'col2',
          path: 'path to col2',
        },
      ],
      rows: [
        ['col1 result 1', 'col2 result 1'],
        ['col1 result 2', 'col2 result 2'],
      ],
    }

    beforeEach(() => {
      component.resultSet = mockResultSet
      component.isDataSetLoading = false
    })
    it('should set dataSource.data equal to resultSet.rows (+ row-index)', () => {
      expect(component.dataSource.data).toEqual([
        [1, ...mockResultSet.rows[0]],
        [2, ...mockResultSet.rows[1]],
      ])
    })
    it('should set displayedColumns equal to the column paths (+ empty first column for row-index )', () => {
      expect(component.displayedColumns).toEqual([' ', 'path to col1', 'path to col2'])
    })
    it('should set resultSetcolumns equal to resultSet.columns (+ first column for row-index)', () => {
      expect(component.displayedColumnNames).toEqual(['#', 'col1', 'col2'])
    })
  })

  describe('When an empty resultSet arrives', () => {
    const mockResultSet: IAqlExecutionResponse = {
      q: 'some query',
      name: 'Table name',
      columns: [
        {
          name: 'some/path/to/col1',
          path: 'path to col1',
        },
        {
          name: 'col2',
          path: 'path to col2',
        },
      ],
      rows: [],
    }

    beforeEach(() => {
      component.resultSet = mockResultSet
      component.isDataSetLoading = false
    })
    it('should not set dataSource.data', () => {
      expect(component.dataSource.data).toHaveLength(0)
    })
    it('should not set displayedColumns', () => {
      expect(component.displayedColumns).toHaveLength(0)
    })
    it('should not set resultSetcolumns', () => {
      expect(component.displayedColumnNames).toHaveLength(0)
    })
  })
})
