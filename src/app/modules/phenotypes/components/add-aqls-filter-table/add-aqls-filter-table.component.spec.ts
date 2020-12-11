import { SimpleChange } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { AqlService } from 'src/app/core/services/aql.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { IAqlApi } from 'src/app/shared/models/aql/aql.interface'
import { mockAql1 } from 'src/mocks/data-mocks/aqls.mock'

import { AddAqlsFilterTableComponent } from './add-aqls-filter-table.component'

describe('AddAqlsFilterTableComponent', () => {
  let component: AddAqlsFilterTableComponent
  let fixture: ComponentFixture<AddAqlsFilterTableComponent>

  const filteredAqlsSubject$ = new Subject<IAqlApi[]>()
  const aqlService = {
    filteredAqlsObservable$: filteredAqlsSubject$.asObservable(),
    getAll: () => of(),
  } as AqlService

  const aqlRow: IAqlApi = {
    id: 123,
    name: 'test',
    query: 'query test string',
  }
  const aql = new AqlUiModel(aqlRow)

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAqlsFilterTableComponent],
      imports: [MaterialModule, FontAwesomeTestingModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: AqlService,
          useValue: aqlService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAqlsFilterTableComponent)
    component = fixture.componentInstance
    component.selectedAqls = []
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When new filtered aqls are received', () => {
    it('should set them as data in the dataSource', () => {
      filteredAqlsSubject$.next([mockAql1])
      expect(component.dataSource.data).toEqual([mockAql1])
    })
  })

  describe('When a row is clicked to select an aql', () => {
    beforeEach(() => {
      jest.spyOn(component.selectedAqlsChange, 'emit')
      component.handleRowClick(aqlRow)
    })

    it('should emit the selectedAqls array', () => {
      expect(component.selectedAqlsChange.emit).toHaveBeenCalledWith([aql])
    })

    it('should set the id key in the lookup to true', () => {
      expect(component.lookupSelectedAql[123]).toEqual(true)
    })
  })

  describe('When the selectedAqls passed in are changed', () => {
    it('should set up the selected aqls lookup', () => {
      component.selectedAqls = [aql]
      const change = new SimpleChange([], component.selectedAqls, false)
      component.ngOnChanges({ selectedAqls: change })
      fixture.detectChanges()
      expect(component.lookupSelectedAql[123]).toEqual(true)
    })
  })
})
