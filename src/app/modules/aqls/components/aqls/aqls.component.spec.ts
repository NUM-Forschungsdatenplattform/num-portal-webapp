import { ComponentFixture, TestBed } from '@angular/core/testing'
import { of, Subject } from 'rxjs'
import { IAqlApi } from 'src/app/shared/models/aql/aql.interface'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AqlTableComponent } from '../aql-table/aql-table.component'

import { AqlsComponent } from './aqls.component'
import { TranslateModule } from '@ngx-translate/core'
import { SearchComponent } from '../../../../shared/components/search/search.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ReactiveFormsModule } from '@angular/forms'
import { Component } from '@angular/core'

describe('AqlsComponent', () => {
  let component: AqlsComponent
  let fixture: ComponentFixture<AqlsComponent>

  const aqlsSubject$ = new Subject<IAqlApi[]>()
  const aqlService = {
    aqlsObservable$: aqlsSubject$.asObservable(),
    getAll: () => of(),
  } as AqlService

  @Component({ selector: 'num-aql-table', template: '' })
  class AqlTableStubComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlsComponent, AqlTableStubComponent],
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
    fixture = TestBed.createComponent(AqlsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
