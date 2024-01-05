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

import { DialogAddTemplateComponent } from './dialog-add-template.component'
import { BehaviorSubject, of, Subject } from 'rxjs'
import { ITemplateMetaDataApi } from '../../../../shared/models/template/template-api.interface'
import { TemplateService } from '../../../../core/services/template/template.service'
import { ITemplateFilter } from '../../../../shared/models/template/template-filter.interface'
import { SearchComponent } from '../../../../shared/components/search/search.component'
import { AddTemplatesFilterTableComponent } from '../add-templates-filter-table/add-templates-filter-table.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '../../../../layout/material/material.module'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'

describe('DialogAddTemplateComponent', () => {
  let component: DialogAddTemplateComponent
  let fixture: ComponentFixture<DialogAddTemplateComponent>

  const filteredTemplatesSubject$ = new Subject<ITemplateMetaDataApi[]>()
  const filterConfigSubject$ = new BehaviorSubject<ITemplateFilter>({ searchText: '' })
  const templateService = {
    filteredTemplatesObservable$: filteredTemplatesSubject$.asObservable(),
    filterConfigObservable$: filterConfigSubject$.asObservable(),
    getAll: () => of(),
    setFilter: (_: any) => {},
  } as TemplateService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddTemplateComponent, SearchComponent, AddTemplatesFilterTableComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MaterialModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: TemplateService,
          useValue: templateService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddTemplateComponent)
    component = fixture.componentInstance
    jest.spyOn(templateService, 'setFilter')
    jest.spyOn(component.closeDialog, 'emit')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set the filter in the templateService on searchChange', () => {
    component.handleSearchChange()
    expect(templateService.setFilter).toHaveBeenCalledWith(component.filterConfig)
  })

  it('should emit the close event with current template on confirmation', () => {
    component.handleDialogConfirm()
    expect(component.closeDialog.emit).toHaveBeenCalledWith(component.dialogInput)
  })

  it('should emit the close event on dialog cancel', () => {
    component.handleDialogCancel()
    expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
  })
})
