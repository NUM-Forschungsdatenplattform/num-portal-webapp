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
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of, Subject } from 'rxjs'
import { IPhenotypeApi } from 'src/app/shared/models/phenotype/phenotype-api.interface'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { mockPhenotype1, mockPhenotypes } from 'src/mocks/data-mocks/phenotypes.mock'

import { PhenotypeTableComponent } from './phenotype-table.component'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { SearchComponent } from 'src/app/shared/components/search/search.component'
import { IDefinitionList } from 'src/app/shared/models/definition-list.interface'
import { Component, Input } from '@angular/core'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { IPhenotypeFilter } from 'src/app/shared/models/phenotype/phenotype-filter.interface'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'

describe('PhenotypeTableComponent', () => {
  let component: PhenotypeTableComponent
  let fixture: ComponentFixture<PhenotypeTableComponent>
  let router: Router

  const filteredPhenotypesSubject$ = new Subject<IPhenotypeApi[]>()
  const filterConfigSubject$ = new BehaviorSubject<IPhenotypeFilter>({ searchText: '' })

  const phenotypesSubject$ = new Subject<IPhenotypeApi[]>()
  const phenotypeService = ({
    phenotypesObservable$: phenotypesSubject$.asObservable(),
    getAll: () => of(),
    setFilter: (_: any) => {},
    filteredPhenotypesObservable$: filteredPhenotypesSubject$.asObservable(),
    filterConfigObservable$: filterConfigSubject$.asObservable(),
  } as unknown) as PhenotypeService

  @Component({ selector: 'num-definition-list', template: '' })
  class DefinitionListStubComponent {
    @Input() dataSource: IDefinitionList[]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhenotypeTableComponent, SearchComponent, DefinitionListStubComponent],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        PipesModule,
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
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(PhenotypeTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(phenotypeService, 'setFilter')
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set the filter in the phenotypeService on searchChange', () => {
    component.handleSearchChange()
    expect(phenotypeService.setFilter).toHaveBeenCalledWith(component.filterConfig)
  })

  describe('When phenotypes are received by the component', () => {
    it('should set them into the datasource.data', () => {
      filteredPhenotypesSubject$.next(mockPhenotypes)
      fixture.detectChanges()
      expect(component.dataSource.data).toBe(mockPhenotypes)
    })
  })

  describe('When phenotype row is clicked', () => {
    it('should call the router to navigate to the editor with the id of the phenotype selected', () => {
      jest.spyOn(router, 'navigate').mockImplementation()
      component.handleRowClick(mockPhenotype1)
      expect(router.navigate).toHaveBeenCalledWith(['phenotypes', mockPhenotype1.id, 'editor'])
    })
  })
})
