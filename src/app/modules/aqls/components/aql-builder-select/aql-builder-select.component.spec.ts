import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AqbSelectDestination } from '../../models/aqb/aqb-select-destination.enum'
import { AqbSelectItemUiModel } from '../../models/aqb/aqb-select-item-ui.model'
import { AqbUiModel } from '../../models/aqb/aqb-ui.model'

import { AqlBuilderSelectComponent } from './aql-builder-select.component'

describe('AqlBuilderSelectComponent', () => {
  let component: AqlBuilderSelectComponent
  let fixture: ComponentFixture<AqlBuilderSelectComponent>

  const aqbModel = new AqbUiModel()
  const selectItem1 = {} as AqbSelectItemUiModel
  const selectItem2 = {} as AqbSelectItemUiModel
  aqbModel.select = [selectItem1, selectItem2]

  const deleteItemEmitter = new EventEmitter()
  @Component({ selector: 'num-aql-builder-select-item', template: '' })
  class SelectItemStubComponent {
    @Input() item: any
    @Output() deleteItem = deleteItemEmitter
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderSelectComponent, SelectItemStubComponent],
      imports: [
        MaterialModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderSelectComponent)
    component = fixture.componentInstance
    component.aqbModel = aqbModel
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When an item is supposed to be deleted', () => {
    it('should remove the item from array of selected in the aqbModel', () => {
      component.deleteItem(0)
      expect(component.aqbModel.select.length).toEqual(1)
    })
  })

  describe('When the select clause is supposed to be the destination for select clicks', () => {
    it('should set the destination in the aqb model', () => {
      component.aqbModel.selectDestination = AqbSelectDestination.Where
      component.setDestination()
      expect(component.aqbModel.selectDestination).toEqual(AqbSelectDestination.Select)
    })
  })
})
