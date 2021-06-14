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

import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { Pipe, PipeTransform } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatSortHeaderHarness } from '@angular/material/sort/testing'
import { MatTableHarness } from '@angular/material/table/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { maxBy, minBy } from 'lodash-es'
import { Subject } from 'rxjs'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { IProjectApi } from 'src/app/shared/models/project/project-api.interface'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { mockProject3, mockProjectsForSort } from 'src/mocks/data-mocks/project.mock'

import { DataExplorerProjectsTableComponent } from './data-explorer-projects-table.component'

describe('DataExplorerProjectsTableComponent', () => {
  let component: DataExplorerProjectsTableComponent
  let fixture: ComponentFixture<DataExplorerProjectsTableComponent>
  let router: Router

  @Pipe({ name: 'localizedDate' })
  class MockLocalizedDatePipe implements PipeTransform {
    transform(value: number): number {
      return value
    }
  }

  const myPublishedProjectsSubject$ = new Subject<IProjectApi[]>()
  const projectService = ({
    myPublishedProjectsObservable$: myPublishedProjectsSubject$.asObservable(),
  } as unknown) as ProjectService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataExplorerProjectsTableComponent, MockLocalizedDatePipe],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        PipesModule,
        FontAwesomeTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {
          provide: ProjectService,
          useValue: projectService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(DataExplorerProjectsTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When myPublishedProjects get updated', () => {
    it('should set the projects, the user is assigned to as researcher and which are in published state, as table data source', () => {
      myPublishedProjectsSubject$.next([mockProject3])
      expect(component.dataSource.data).toEqual([mockProject3])
    })
  })

  describe('When a project is selected', () => {
    beforeEach(() => {
      jest.spyOn(router, 'navigate').mockImplementation()
    })
    it('should navigate to the data explorer project detail page', () => {
      const projectId = 1
      component.handleSelectClick(projectId)
      expect(router.navigate).toHaveBeenCalledWith(['data-explorer/projects', projectId])
    })
  })

  describe('When sorting table', () => {
    let loader: HarnessLoader
    let table: MatTableHarness

    beforeEach(async () => {
      loader = TestbedHarnessEnvironment.loader(fixture)
      component.pageSize = 40
      fixture.detectChanges()
      myPublishedProjectsSubject$.next(mockProjectsForSort)
      table = await loader.getHarness(MatTableHarness)
    })

    it('should sort by id descending as default', async () => {
      component.displayedColumns.push('id')
      const orgMinId = minBy(mockProjectsForSort, 'id')
      const orgMaxId = maxBy(mockProjectsForSort, 'id')

      const rows = await table.getCellTextByColumnName()

      expect(rows.id.text).toHaveLength(mockProjectsForSort.length)
      expect(rows.id.text[0]).toEqual(orgMaxId.id.toString())
      expect(rows.id.text[rows.id.text.length - 1]).toEqual(orgMinId.id.toString())
    })

    it('should be able to sort by name asc', async () => {
      const sortHeader = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-name' })
      )

      await sortHeader.click()
      const rows = await table.getCellTextByColumnName()

      expect(await sortHeader.getSortDirection()).toEqual('asc')
      expect(rows.name.text[0]).toEqual('')
      expect(rows.name.text[rows.name.text.length - 1]).toEqual('Test project ü')
    })

    it('should be able to sort by name desc', async () => {
      const sortHeader = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-name' })
      )

      // Default: "", first click: ASC, second click: DESC
      await sortHeader.click()
      await sortHeader.click()
      const rows = await table.getCellTextByColumnName()

      expect(await sortHeader.getSortDirection()).toEqual('desc')
      expect(rows.name.text[0]).toEqual('Test project ü')
      expect(rows.name.text[rows.name.text.length - 1]).toEqual('')
    })

    it('should be able to sort by createDate asc', async () => {
      component.displayedColumns.push('id')
      const sortHeader = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-createDate' })
      )

      await sortHeader.click()
      const rows = await table.getCellTextByColumnName()

      expect(await sortHeader.getSortDirection()).toEqual('asc')
      expect(parseInt(rows.id.text[0], 10)).toEqual(6)
      expect(parseInt(rows.id.text[rows.name.text.length - 1], 10)).toEqual(21)
    })

    it('should be able to sort by createDate desc', async () => {
      component.displayedColumns.push('id')
      const sortHeader = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-createDate' })
      )

      // Default: "", first click: ASC, second click: DESC
      await sortHeader.click()
      await sortHeader.click()
      const rows = await table.getCellTextByColumnName()

      expect(await sortHeader.getSortDirection()).toEqual('desc')
      expect(parseInt(rows.id.text[0], 10)).toEqual(21)
      expect(parseInt(rows.id.text[rows.name.text.length - 1], 10)).toEqual(6)
    })

    it('should sort by order empty -> special charactes -> numbers -> alphabetical', async () => {
      const sortHeader = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-name' })
      )

      await sortHeader.click()
      const rows = await table.getCellTextByColumnName()

      expect(rows.name.text[0]).toEqual('')
      expect(rows.name.text[1]).toEqual('%')
      expect(rows.name.text[2]).toEqual('1')
      expect(rows.name.text[3]).toEqual('a')
    })

    it('should sort equal entries by id in same direction as selected', async () => {
      component.displayedColumns.push('id')
      const sortHeader = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-author' })
      )

      await sortHeader.click()
      let rows = await table.getCellTextByColumnName()
      let firstIdx = rows.author.text.findIndex((txt) => 'Max Mustermann' === txt)

      expect(parseInt(rows.id.text[firstIdx], 10)).toBeLessThan(
        parseInt(rows.id.text[firstIdx + 1], 10)
      )

      await sortHeader.click()
      rows = await table.getCellTextByColumnName()
      firstIdx = rows.author.text.findIndex((txt) => 'Max Mustermann' === txt)

      expect(parseInt(rows.id.text[firstIdx], 10)).toBeGreaterThan(
        parseInt(rows.id.text[firstIdx + 1], 10)
      )
    })
  })
})
