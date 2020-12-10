import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Subject } from 'rxjs'
import { IAqlApi } from 'src/app/shared/models/aql/aql.interface'
import { AqlService } from 'src/app/core/services/aql.service'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { AqlTableComponent } from './aql-table.component'
import { TranslateModule } from '@ngx-translate/core'

describe('AqlTableComponent', () => {
  let component: AqlTableComponent
  let fixture: ComponentFixture<AqlTableComponent>

  const aqlsSubject$ = new Subject<IAqlApi[]>()
  const aqlService = {
    aqlsObservable$: aqlsSubject$.asObservable(),
    getAll: () => {},
  } as AqlService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlTableComponent],
      imports: [MaterialModule, TranslateModule.forRoot()],
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
