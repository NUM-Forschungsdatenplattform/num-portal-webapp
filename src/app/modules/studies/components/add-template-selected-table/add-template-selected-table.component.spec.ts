import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddTemplateSelectedTableComponent } from './add-template-selected-table.component'
import { SimpleChange } from '@angular/core'
import { ITemplateMetaDataApi } from '../../../../shared/models/template/template-api.interface'
import { IStudyTemplateInfoApi } from '../../../../shared/models/study/study-template-info-api.interface'
import { MaterialModule } from '../../../../layout/material/material.module'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'

describe('AddTemplateSelectedTableComponent', () => {
  let component: AddTemplateSelectedTableComponent
  let fixture: ComponentFixture<AddTemplateSelectedTableComponent>

  const templateRow: ITemplateMetaDataApi = {
    templateId: '123',
    archetypeId: '123',
    createdOn: '2020-12-07T21:19:18.980Z',
    name: 'Template test',
  }

  const studyTemplate: IStudyTemplateInfoApi = {
    id: templateRow.templateId,
    name: templateRow.name,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTemplateSelectedTableComponent],
      imports: [MaterialModule, FontAwesomeTestingModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTemplateSelectedTableComponent)
    component = fixture.componentInstance
    component.dataSource.data = []
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When the selected templates passed in are changed', () => {
    it('should set up the dataSource', () => {
      component.selectedTemplates = [studyTemplate]
      const change = new SimpleChange([], component.selectedTemplates, false)
      component.ngOnChanges({ selectedTemplates: change })
      fixture.detectChanges()
      expect(component.dataSource.data).toEqual([studyTemplate])
    })
  })
})
