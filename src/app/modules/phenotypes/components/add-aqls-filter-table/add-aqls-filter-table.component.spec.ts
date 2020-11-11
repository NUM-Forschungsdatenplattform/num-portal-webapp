import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { of, Subject } from 'rxjs'
import { AqlService } from 'src/app/core/services/aql.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { IAql } from 'src/app/shared/models/aql/aql.interface'

import { AddAqlsFilterTableComponent } from './add-aqls-filter-table.component'

describe('AddAqlsFilterTableComponent', () => {
  let component: AddAqlsFilterTableComponent
  let fixture: ComponentFixture<AddAqlsFilterTableComponent>

  const filteredAqlsSubject$ = new Subject<IAql[]>()
  const aqlService = {
    filteredAqlsObservable$: filteredAqlsSubject$.asObservable(),
    getAll: () => of(),
  } as AqlService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAqlsFilterTableComponent],
      imports: [MaterialModule, FontAwesomeTestingModule],
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
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
