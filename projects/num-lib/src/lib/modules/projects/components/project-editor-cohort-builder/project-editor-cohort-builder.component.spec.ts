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

import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'

import { BehaviorSubject, Subject } from 'rxjs'

import { ProjectEditorCohortBuilderComponent } from './project-editor-cohort-builder.component'
import { AqlService } from '../../../../core/services/aql/aql.service'
import { MaterialModule } from 'projects/num-lib/src/lib/layout/material/material.module'
import { SearchComponent } from '../../../../shared/components/search/search.component'
import { IAqlFilter } from '../../../../shared/models/aql/aql-filter.interface'
import { IAqlApi } from '../../../../shared/models/aql/aql.interface'
import { IFilterItem } from '../../../../shared/models/filter-chip.interface'
import { CohortGroupUiModel } from '../../../../shared/models/project/cohort-group-ui.model'

describe('ProjectEditorCohortBuilderComponent', () => {
  let component: ProjectEditorCohortBuilderComponent
  let fixture: ComponentFixture<ProjectEditorCohortBuilderComponent>

  const filteredAqlsSubject$ = new Subject<IAqlApi[]>()
  const filterConfigSubject$ = new BehaviorSubject<IAqlFilter>({ searchText: '', filterItem: [] })

  const mockAqlService = {
    setFilter: jest.fn(),
    filteredAqlsObservable$: filteredAqlsSubject$.asObservable(),
    filterConfigObservable$: filterConfigSubject$.asObservable(),
  } as unknown as AqlService

  @Component({ selector: 'num-cohort-builder', template: '' })
  class StubCohortBuilderComponent {
    @Input() cohortNode: CohortGroupUiModel
    @Input() isDisabled: boolean
    @Input() isLoadingComplete: boolean
    @Input() raised: boolean
  }

  @Component({ selector: 'num-editor-determine-hits', template: '' })
  class StubEditorDetermineHitsComponent {
    @Input() isButtonDisabled: boolean
    @Input() content: any
    @Output() clicked = new EventEmitter()
  }

  @Component({ selector: 'num-filter-chips', template: '' })
  class StubFilterChipsComponent {
    @Input() filterChips: IFilterItem<string | number>[]
    @Input() multiSelect: boolean
    @Output() selectionChange = new EventEmitter()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProjectEditorCohortBuilderComponent,
        StubCohortBuilderComponent,
        StubEditorDetermineHitsComponent,
        SearchComponent,
        StubFilterChipsComponent,
      ],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        ,
        FontAwesomeTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: AqlService,
          useValue: mockAqlService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.spyOn(mockAqlService, 'setFilter')
    fixture = TestBed.createComponent(ProjectEditorCohortBuilderComponent)
    component = fixture.componentInstance

    component.cohortNode = new CohortGroupUiModel()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When the user wants to filter and search aqls', () => {
    it('should set the filter in the aqlService on searchChange', () => {
      component.handleSearchChange()
      expect(mockAqlService.setFilter).toHaveBeenCalledWith(component.filterConfig)
    })

    it('should set the filter in the aqlService on filterChange', () => {
      component.handleFilterChange()
      expect(mockAqlService.setFilter).toHaveBeenCalledWith(component.filterConfig)
    })
  })
})
