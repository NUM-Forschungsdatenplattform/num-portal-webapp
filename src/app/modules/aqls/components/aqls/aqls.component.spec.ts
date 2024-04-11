import { ComponentFixture, TestBed } from '@angular/core/testing'
import { of, Subject } from 'rxjs'
import { IAqlApi } from 'src/app/shared/models/aql/aql.interface'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { AqlsComponent } from './aqls.component'
import { TranslateModule } from '@ngx-translate/core'
import { Component } from '@angular/core'
import { IAqlCategoryApi } from 'src/app/shared/models/aql/category/aql-category.interface'
import { AqlCategoryService } from 'src/app/core/services/aql-category/aql-category.service'

describe('AqlsComponent', () => {
  let component: AqlsComponent
  let fixture: ComponentFixture<AqlsComponent>

  const aqlsSubject$ = new Subject<IAqlApi[]>()
  const aqlService = {
    aqlsObservable$: aqlsSubject$.asObservable(),
    getAll: () => of(),
  } as unknown as AqlService

  const aqlCategoriesSubject$ = new Subject<IAqlCategoryApi[]>()
  const mockAqlCategoryService = {
    aqlCategoriesObservable$: aqlCategoriesSubject$.asObservable(),
    getAll: () => of(),
  }

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
        {
          provide: AqlCategoryService,
          useValue: mockAqlCategoryService,
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
