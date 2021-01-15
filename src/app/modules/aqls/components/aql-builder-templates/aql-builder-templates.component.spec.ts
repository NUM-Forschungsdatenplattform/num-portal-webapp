import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { AqlBuilderTemplatesComponent } from './aql-builder-templates.component'

describe('AqlBuilderTemplatesComponent', () => {
  let component: AqlBuilderTemplatesComponent
  let fixture: ComponentFixture<AqlBuilderTemplatesComponent>

  @Component({ selector: 'num-aql-builder-template-tree', template: '' })
  class TemplatesStubComponent {
    @Input()
    template: any
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderTemplatesComponent, TemplatesStubComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderTemplatesComponent)
    component = fixture.componentInstance
    component.selectedTemplates = new FormControl()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
