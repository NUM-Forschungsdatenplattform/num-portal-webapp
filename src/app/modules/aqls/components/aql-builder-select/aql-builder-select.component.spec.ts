import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AqbUiModel } from '../../models/aqb/aqb-ui.model'

import { AqlBuilderSelectComponent } from './aql-builder-select.component'

describe('AqlBuilderSelectComponent', () => {
  let component: AqlBuilderSelectComponent
  let fixture: ComponentFixture<AqlBuilderSelectComponent>

  const aqbModel = new AqbUiModel()

  @Component({ selector: 'num-aql-builder-select-item', template: '' })
  class SelectItemStubComponent {
    @Input()
    item: any
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
})
