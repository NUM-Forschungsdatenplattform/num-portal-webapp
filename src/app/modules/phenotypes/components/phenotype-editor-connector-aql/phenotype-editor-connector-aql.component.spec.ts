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

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { PhenotypeEditorConnectorAqlComponent } from './phenotype-editor-connector-aql.component'
import { mockAql1 } from '../../../../../mocks/data-mocks/aqls.mock'
import { TranslateModule } from '@ngx-translate/core'

describe('PhenotypeEditorConnectorAqlComponent', () => {
  let component: PhenotypeEditorConnectorAqlComponent
  let fixture: ComponentFixture<PhenotypeEditorConnectorAqlComponent>

  const inputAql = new AqlUiModel(mockAql1, true)

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhenotypeEditorConnectorAqlComponent],
      imports: [FontAwesomeTestingModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenotypeEditorConnectorAqlComponent)
    component = fixture.componentInstance
    component.phenotypeAql = inputAql
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit the configure aql event when click handler is triggered', () => {
    jest.spyOn(component.configureAql, 'emit')
    component.handleClick()
    expect(component.configureAql.emit).toHaveBeenCalledTimes(1)
  })
})
