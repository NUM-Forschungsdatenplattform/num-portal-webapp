import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { TranslateModule } from '@ngx-translate/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'

import { FilterTableComponent } from './filter-table.component'
import { mockFilterTableItem, mockFilterTableItem1 } from 'src/mocks/data-mocks/filtertable.mock'

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

  describe('When Items are received by the component', () => {
    it('should set them into the datasource.data', () => {
      fixture.detectChanges()
      expect(component.dataSource.data).toBe(component.items)
    })
  })

  describe('When select button for a row is clicked', () => {
    beforeEach(() => {
      component.items = [mockFilterTableItem, mockFilterTableItem1]
      fixture.detectChanges()
    })

    it('should item isSelected to true', () => {
      component.handleSelectClick(mockFilterTableItem)

      expect(component.items[0].isSelected).toEqual(true)
    })
  })
})
