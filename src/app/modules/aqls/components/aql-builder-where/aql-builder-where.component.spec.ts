import { Input } from '@angular/core'
import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { AqbUiModel } from '../../../../shared/models/aqb/aqb-ui.model'

import { AqlBuilderWhereComponent } from './aql-builder-where.component'

describe('AqlBuilderWhereComponent', () => {
  let component: AqlBuilderWhereComponent
  let fixture: ComponentFixture<AqlBuilderWhereComponent>

  @Component({ selector: 'num-aql-builder-where-group', template: '' })
  class WhereGroupStubComponent {
    @Input() parentGroupIndex: any
    @Input() group: any
    @Input() index: any
    @Input() dialogMode: any
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderWhereComponent, WhereGroupStubComponent],
      imports: [FontAwesomeTestingModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderWhereComponent)
    component = fixture.componentInstance
    component.aqbModel = new AqbUiModel()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
