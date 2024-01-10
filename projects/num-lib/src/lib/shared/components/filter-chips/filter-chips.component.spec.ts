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
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'

import { MaterialModule } from 'src/app/layout/material/material.module'
import { AqlFilterChipId } from '../../models/aql/aql-filter-chip.enum'
import { IFilterItem } from '../../models/filter-chip.interface'

import { FilterChipsComponent } from './filter-chips.component'

describe('FilterChipsComponent', () => {
  let component: FilterChipsComponent
  let fixture: ComponentFixture<FilterChipsComponent>

  const filter1: IFilterItem<AqlFilterChipId> = {
    id: AqlFilterChipId.AllAql,
    title: 'test1',
    isSelected: false,
  }
  const filter2: IFilterItem<AqlFilterChipId> = {
    id: AqlFilterChipId.AllAql,
    title: 'test2',
    isSelected: true,
  }
  const filter3: IFilterItem<AqlFilterChipId> = {
    id: AqlFilterChipId.AllAql,
    title: 'test3',
    isSelected: false,
  }

  const filterChips: IFilterItem<AqlFilterChipId>[] = [filter1, filter2, filter3]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterChipsComponent],
      imports: [MaterialModule, FontAwesomeTestingModule, ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterChipsComponent)
    component = fixture.componentInstance
    component.filterChips = filterChips
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When a filterChip is clicked', () => {
    it('should toggle the selected state', () => {
      const nativeElement = fixture.debugElement.nativeElement
      const chip = nativeElement.querySelector('mat-chip')
      chip.click()
      expect(component.filterChips[0].isSelected).toEqual(true)
    })

    it('should emit the change event', () => {
      jest.spyOn(component.selectionChange, 'emit').mockImplementation()
      const nativeElement = fixture.debugElement.nativeElement
      const chip = nativeElement.querySelector('mat-chip')
      chip.click()
      expect(component.selectionChange.emit).toHaveBeenCalledWith(component.filterChips)
    })
  })
})
