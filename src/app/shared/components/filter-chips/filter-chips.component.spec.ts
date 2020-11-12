import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AqlFilterChipId } from '../../models/aql/aql-filter-chip.enum'
import { IFilterChip } from '../../models/filter-chip.interface'

import { FilterChipsComponent } from './filter-chips.component'

describe('FilterChipsComponent', () => {
  let component: FilterChipsComponent
  let fixture: ComponentFixture<FilterChipsComponent>

  const filter1: IFilterChip<AqlFilterChipId> = {
    id: AqlFilterChipId.AllAql,
    title: 'test1',
    isSelected: false,
  }
  const filter2: IFilterChip<AqlFilterChipId> = {
    id: AqlFilterChipId.AllAql,
    title: 'test2',
    isSelected: true,
  }
  const filter3: IFilterChip<AqlFilterChipId> = {
    id: AqlFilterChipId.AllAql,
    title: 'test3',
    isSelected: false,
  }

  const filterChips: IFilterChip<AqlFilterChipId>[] = [filter1, filter2, filter3]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterChipsComponent],
      imports: [MaterialModule, FontAwesomeTestingModule, TranslateModule.forRoot()],
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
