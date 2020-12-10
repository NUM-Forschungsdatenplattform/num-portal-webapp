import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of, Subject } from 'rxjs'
import { AqlService } from 'src/app/core/services/aql.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { FilterChipsComponent } from 'src/app/shared/components/filter-chips/filter-chips.component'
import { SearchComponent } from 'src/app/shared/components/search/search.component'
import { IAqlFilter } from 'src/app/shared/models/aql/aql-filter.interface'
import { IAqlApi } from 'src/app/shared/models/aql/aql.interface'
import { AddAqlsFilterTableComponent } from '../add-aqls-filter-table/add-aqls-filter-table.component'
import { AddAqlsSelectedTableComponent } from '../add-aqls-selected-table/add-aqls-selected-table.component'

import { DialogAddAqlsComponent } from './dialog-add-aqls.component'

describe('DialogAddAqlsComponent', () => {
  let component: DialogAddAqlsComponent
  let fixture: ComponentFixture<DialogAddAqlsComponent>
  const filteredAqlsSubject$ = new Subject<IAqlApi[]>()
  const filterConfigSubject$ = new BehaviorSubject<IAqlFilter>({ searchText: '', filterChips: [] })
  const aqlService = {
    filteredAqlsObservable$: filteredAqlsSubject$.asObservable(),
    filterConfigObservable$: filterConfigSubject$.asObservable(),
    getAll: () => of(),
    setFilter: (_: any) => {},
  } as AqlService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DialogAddAqlsComponent,
        AddAqlsFilterTableComponent,
        AddAqlsSelectedTableComponent,
        FilterChipsComponent,
        SearchComponent,
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
          provide: AqlService,
          useValue: aqlService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddAqlsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(aqlService, 'setFilter')
    jest.spyOn(component.closeDialog, 'emit')
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set the filter in the aqlService on searchChange', () => {
    component.handleSearchChange()
    expect(aqlService.setFilter).toHaveBeenCalledWith(component.filterConfig)
  })

  it('should set the filter in the aqlService on filterChange', () => {
    component.handleFilterChange()
    expect(aqlService.setFilter).toHaveBeenCalledWith(component.filterConfig)
  })

  it('should emit the close event with current aqls on confirmation', () => {
    component.handleDialogConfirm()
    expect(component.closeDialog.emit).toHaveBeenCalledWith(component.dialogInput)
  })

  it('should emit the close event on dialog cancel', () => {
    component.handleDialogCancel()
    expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
  })
})
