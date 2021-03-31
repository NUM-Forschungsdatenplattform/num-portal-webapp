/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determine-hits.interface'
import { PhenotypeGroupUiModel } from 'src/app/shared/models/phenotype/phenotype-group-ui.model'
import { PhenotypeEditorConnectorComponent } from './phenotype-editor-connector.component'

describe('PhenotypeAqlConnectorComponent', () => {
  let component: PhenotypeEditorConnectorComponent
  let fixture: ComponentFixture<PhenotypeEditorConnectorComponent>

  @Component({ selector: 'num-phenotype-editor-connector-group', template: '' })
  class GroupStubComponent {
    @Input() phenotypeGroup: any
    @Input() parentGroupIndex: any
  }

  @Component({ selector: 'num-editor-determine-hits', template: '' })
  class EditorDetermineHitsComponent {
    @Input() isButtonDisabled: boolean
    @Input() content: IDetermineHits
    @Output() clicked = new EventEmitter()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PhenotypeEditorConnectorComponent,
        GroupStubComponent,
        EditorDetermineHitsComponent,
      ],
      imports: [MaterialModule, FontAwesomeTestingModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenotypeEditorConnectorComponent)
    component = fixture.componentInstance
    component.phenotypeQuery = new PhenotypeGroupUiModel()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
