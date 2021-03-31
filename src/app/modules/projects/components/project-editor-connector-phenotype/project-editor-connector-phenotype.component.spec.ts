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
import { MaterialModule } from 'src/app/layout/material/material.module'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'
import { mockPhenotype1 } from 'src/mocks/data-mocks/phenotypes.mock'
import { ProjectEditorConnectorPhenotypeComponent } from './project-editor-connector-phenotype.component'

describe('ProjectEditorConnectorPhenotypeComponent', () => {
  let component: ProjectEditorConnectorPhenotypeComponent
  let fixture: ComponentFixture<ProjectEditorConnectorPhenotypeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectEditorConnectorPhenotypeComponent],
      imports: [FontAwesomeTestingModule, MaterialModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditorConnectorPhenotypeComponent)
    component = fixture.componentInstance
    component.phenotype = new PhenotypeUiModel(mockPhenotype1)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit the configure phenotype event when click handler is triggered', () => {
    jest.spyOn(component.configurePhenotype, 'emit')
    component.handleClick()
    expect(component.configurePhenotype.emit).toHaveBeenCalledTimes(1)
  })
})
