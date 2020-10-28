import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Subject } from 'rxjs'
import { IAql } from 'src/app/core/models/aql.interface'
import { AqlService } from 'src/app/core/services/aql.service'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { AqlTableComponent } from './aql-table.component'

describe('AqlTableComponent', () => {
  let component: AqlTableComponent
  let fixture: ComponentFixture<AqlTableComponent>

  const aqlsSubject$ = new Subject<IAql[]>()
  const aqlService = {
    aqlsObservable$: aqlsSubject$.asObservable(),
    getAll: () => {},
  } as AqlService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlTableComponent],
      imports: [MaterialModule],
      providers: [
        {
          provide: AqlService,
          useValue: aqlService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
