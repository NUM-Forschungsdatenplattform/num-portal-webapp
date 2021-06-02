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
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { AqlCategoryService } from 'src/app/core/services/aql-category/aql-category.service'
import { IAqlCategoryApi } from 'src/app/shared/models/aql/category/aql-category.interface'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AqlCategoriesTableComponent } from './aql-categories-table.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { mockAqlCategories } from 'src/mocks/data-mocks/aql-categories.mock'
import { maxBy, minBy } from 'lodash-es'
import { MatTableHarness } from '@angular/material/table/testing'
import { MatSortHeaderHarness } from '@angular/material/sort/testing'

describe('AqlCategoriesTableComponent', () => {
  let component: AqlCategoriesTableComponent
  let fixture: ComponentFixture<AqlCategoriesTableComponent>

  const aqlCategoriesSubject$ = new Subject<IAqlCategoryApi[]>()

  const aqlCategoryService = ({
    getAll: () => of(),
    aqlCategoriesObservable$: aqlCategoriesSubject$.asObservable(),
  } as unknown) as AqlCategoryService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlCategoriesTableComponent],
      imports: [BrowserAnimationsModule, MaterialModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: AqlCategoryService,
          useValue: aqlCategoryService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    fixture = TestBed.createComponent(AqlCategoriesTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When sorting AQL categories table', () => {
    let loader: HarnessLoader

    beforeEach(() => {
      loader = TestbedHarnessEnvironment.loader(fixture)
      component.paginator.pageSize = 20
      aqlCategoriesSubject$.next(mockAqlCategories)
      fixture.detectChanges()
    })

    it('should sort by id descending as default', async () => {
      const maxIdCategory = maxBy(mockAqlCategories, 'id')
      const minIdCategory = minBy(mockAqlCategories, 'id')
      const table = await loader.getHarness(MatTableHarness)
      const rows = await table.getCellTextByColumnName()

      expect(rows.name.text).toHaveLength(mockAqlCategories.length)
      expect(rows.name.text[0]).toEqual(maxIdCategory.name.en)
      expect(rows.name.text[rows.name.text.length - 1]).toEqual(minIdCategory.name.en)
    })

    it('should be able to sort by name', async () => {
      const sortHeaderButton = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-name' })
      )
      const table = await loader.getHarness(MatTableHarness)
      // Sort ascending
      await sortHeaderButton.click()
      let rows = await table.getCellTextByColumnName()
      expect(await sortHeaderButton.getSortDirection()).toEqual('asc')
      expect(rows.name.text[0]).toEqual('Demographic')
      expect(rows.name.text[rows.name.text.length - 1]).toEqual('Social')
      // Sort descending
      await sortHeaderButton.click()
      rows = await table.getCellTextByColumnName()
      expect(await sortHeaderButton.getSortDirection()).toEqual('desc')
      expect(rows.name.text[0]).toEqual('Social')
      expect(rows.name.text[rows.name.text.length - 1]).toEqual('Demographic')
    })
  })
})
