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
import { DefinitionListComponent } from './definition-list.component'
import { TranslateModule } from '@ngx-translate/core'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { IDefinitionList } from '../../models/definition-list.interface'
import { DefinitionType } from '../../models/definition-type.enum'
import { By } from '@angular/platform-browser'

describe('DifinationListComponent', () => {
  let component: DefinitionListComponent
  let fixture: ComponentFixture<DefinitionListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefinitionListComponent],
      imports: [TranslateModule.forRoot(), FontAwesomeTestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinitionListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should show text yes and no to boolean elements', () => {
    const definitionList: IDefinitionList[] = [
      {
        description: true,
        title: 'Test true',
        type: DefinitionType.Boolean,
      },
      {
        description: false,
        title: 'Test false',
        type: DefinitionType.Boolean,
      },
    ]

    component.dataSource = definitionList
    fixture.detectChanges()

    const icons = fixture.debugElement.queryAll(
      By.css(`[data-test="definition_list__boolean__element__text"]`),
    )

    expect(icons).toHaveLength(2)
    expect((icons[0].nativeElement as HTMLParagraphElement).innerHTML.trim()).toEqual('FORM.YES')
    expect((icons[1].nativeElement as HTMLParagraphElement).innerHTML.trim()).toEqual('FORM.NO')
  })
})
