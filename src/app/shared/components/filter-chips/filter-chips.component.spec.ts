import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { FilterChipsComponent } from './filter-chips.component'

describe('FilterChipsComponent', () => {
  let component: FilterChipsComponent
  let fixture: ComponentFixture<FilterChipsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterChipsComponent],
      imports: [MaterialModule, FontAwesomeTestingModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterChipsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
