import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { TranslateModule } from '@ngx-translate/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'

import { FilterTableComponent } from './filter-table.component'

describe('FilterTableComponent', () => {
  let component: FilterTableComponent
  let fixture: ComponentFixture<FilterTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterTableComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
