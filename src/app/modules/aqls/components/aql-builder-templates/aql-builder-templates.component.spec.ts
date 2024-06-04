import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { AqlBuilderTemplatesComponent } from './aql-builder-templates.component'

describe('AqlBuilderTemplatesComponent', () => {
  let component: AqlBuilderTemplatesComponent
  let fixture: ComponentFixture<AqlBuilderTemplatesComponent>

  @Component({ selector: 'num-aql-builder-template-tree', template: '' })
  class TemplatesStubComponent {
    @Input() templateId: any

    @Input() mode: any
    @Input() selectDestination: any
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderTemplatesComponent, TemplatesStubComponent],
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    fixture = TestBed.createComponent(AqlBuilderTemplatesComponent)
    component = fixture.componentInstance
    component.selectedTemplates = new FormControl()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set the flag that the view is rendered after the view got initialized', async () => {
    await fixture.whenStable()
    expect(component.isViewRendered).toBeTruthy()
  })

  test.each([true, false])(
    'should not set the flag that the view is rendered after the view got initialized',
    async (isRendered) => {
      const callCatcher = jest.fn()

      Object.defineProperty(component, 'isViewRendered', {
        get(): boolean {
          return isRendered
        },
        set(_): void {
          callCatcher()
        },
      })

      await fixture.whenStable()
      jest.clearAllMocks()
      fixture.detectChanges()
      await fixture.whenStable()

      if (isRendered) {
        expect(callCatcher).not.toHaveBeenCalled()
      } else {
        expect(callCatcher).toHaveBeenCalled()
      }
    }
  )
})
