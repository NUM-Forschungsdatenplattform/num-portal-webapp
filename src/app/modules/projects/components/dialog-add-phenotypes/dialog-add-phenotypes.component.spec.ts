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
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of, Subject } from 'rxjs'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { FilterChipsComponent } from 'src/app/shared/components/filter-chips/filter-chips.component'
import { SearchComponent } from 'src/app/shared/components/search/search.component'
import { IPhenotypeFilter } from 'src/app/shared/models/phenotype/phenotype-filter.interface'

import { DialogAddPhenotypesComponent } from './dialog-add-phenotypes.component'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { IUser } from '../../../../shared/models/user/user.interface'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'
import { IPhenotypeApi } from 'src/app/shared/models/phenotype/phenotype-api.interface'
import {
  mockPhenotype1,
  mockPhenotype2,
  mockPhenotype4,
  mockPhenotypes,
} from 'src/mocks/data-mocks/phenotypes.mock'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'

describe('DialogAddPhenotypesComponent', () => {
  let component: DialogAddPhenotypesComponent
  let fixture: ComponentFixture<DialogAddPhenotypesComponent>
  const filteredPhenotypesSubject$ = new Subject<IPhenotypeApi[]>()
  const filterConfigSubject$ = new BehaviorSubject<IPhenotypeFilter>({
    searchText: '',
  })
  const phenotypeService = {
    filteredPhenotypesObservable$: filteredPhenotypesSubject$.asObservable(),
    filterConfigObservable$: filterConfigSubject$.asObservable(),
    getAll: () => of(),
    setFilter: (_: any) => {},
  } as PhenotypeService

  const selectedItemsChangeEmitter = new EventEmitter<IUser[]>()

  @Component({ selector: 'num-filter-table', template: '' })
  class FilterTableStubComponent {
    @Input() dataSource: MatTableDataSource<IUser>
    @Input() identifierName: string
    @Input() columnKeys: string[]
    @Input() columnPaths: string[][]
    @Input() selectedItems: IUser[]
    @Output() selectedItemsChange = selectedItemsChangeEmitter
    @Input() idOfHighlightedRow: string | number
  }

  @Component({ selector: 'num-definition-list', template: '' })
  class DefinitionListStubComponent {
    @Input() dataSource: IDefinitionList[]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DialogAddPhenotypesComponent,
        FilterChipsComponent,
        SearchComponent,
        FilterTableStubComponent,
        DefinitionListStubComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: PhenotypeService,
          useValue: phenotypeService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddPhenotypesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(phenotypeService, 'setFilter')
    jest.spyOn(component.closeDialog, 'emit')
    jest.spyOn(component, 'generatePreviewData')
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set the filter in the phenotypeService on searchChange', () => {
    component.handleSearchChange()
    expect(phenotypeService.setFilter).toHaveBeenCalledWith(component.filterConfig)
  })

  it('should emit the close event with current phenotypes on confirmation', () => {
    component.selectedPhenotypes = [new PhenotypeUiModel(mockPhenotype2), mockPhenotype4]
    component.handleDialogConfirm()

    expect(JSON.stringify(component.selectedPhenotypes)).toEqual(
      JSON.stringify([new PhenotypeUiModel(mockPhenotype2), new PhenotypeUiModel(mockPhenotype4)])
    )
    expect(component.closeDialog.emit).toHaveBeenCalledWith(component.selectedPhenotypes)
  })

  it('should emit the close event on dialog cancel', () => {
    component.handleDialogCancel()
    expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
  })

  it('should call generatePreviewData on Row click', () => {
    component.handlePreviewClick(mockPhenotype1)
    expect(component.generatePreviewData).toHaveBeenCalledWith(mockPhenotype1)
  })

  describe('set data', () => {
    it('should set data with array of AQLs', () => {
      component.handleFilteredData(mockPhenotypes)

      expect(component.generatePreviewData).toHaveBeenCalledWith(mockPhenotype1)
      expect(component.idOfHighlightedRow).toEqual(mockPhenotype1.id)
      expect(component.preview).toEqual([
        {
          title: 'FORM.TITLE',
          description: mockPhenotype1.name,
        },
        {
          title: 'FORM.AUTHOR',
          description: mockPhenotype1.owner?.lastName
            ? mockPhenotype1.owner?.firstName + ' ' + mockPhenotype1.owner?.lastName
            : '-',
        },
        { title: 'FORM.DESCRIPTION', description: mockPhenotype1.description },
      ])

      expect(component.dataSource.data).toEqual(mockPhenotypes)
    })

    it('should set data with an empty array, if no AQLs', () => {
      component.handleFilteredData([])

      expect(component.generatePreviewData).toHaveBeenCalledWith(null)
      expect(component.idOfHighlightedRow).toEqual(null)
      expect(component.preview).toEqual([])

      expect(component.dataSource.data).toEqual([])
    })
  })
})
