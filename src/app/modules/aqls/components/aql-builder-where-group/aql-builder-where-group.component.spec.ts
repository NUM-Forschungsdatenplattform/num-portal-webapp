import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { AqbWhereGroupUiModel } from '../../models/aqb/aqb-where-group-ui.model'

import { AqlBuilderWhereGroupComponent } from './aql-builder-where-group.component'

describe('AqlBuilderWhereGroupComponent', () => {
  let component: AqlBuilderWhereGroupComponent
  let fixture: ComponentFixture<AqlBuilderWhereGroupComponent>

  @Component({ selector: 'num-aql-builder-where-item', template: '' })
  class WhereItemStubComponent {
    @Input() item: any
    @Input() dialogMode: any
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderWhereGroupComponent, ButtonComponent, WhereItemStubComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        ReactiveFormsModule,
        PipesModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderWhereGroupComponent)
    component = fixture.componentInstance
    component.group = new AqbWhereGroupUiModel()
    component.parentGroupIndex = null
    component.index = 0

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
