/**
 * Copyright 2024 Vitagroup AG
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
import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import { TooltipNecessaryDirective } from './tooltip-necessary.directive'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatTooltipModule } from '@angular/material/tooltip'
import { By } from '@angular/platform-browser'

describe('TooltipNecessaryDirective', () => {
  let fixture: ComponentFixture<TestTooltipNecessaryComponent>
  let component: TestTooltipNecessaryComponent
  @Component({
    template: `<p #testParagraph numTooltipNecessary>{{ textContent }}</p>`,
    styles: [
      `
        p {
          max-width: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `,
    ],
  })
  class TestTooltipNecessaryComponent {
    @Input() textContent = ''
    @ViewChild('testParagraph') testElement: ElementRef<HTMLParagraphElement>
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestTooltipNecessaryComponent, TooltipNecessaryDirective],
      imports: [MatTooltipModule],
    }).compileComponents()
    fixture = TestBed.createComponent(TestTooltipNecessaryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should not append a tooltip if text content fits into element', () => {
    component.textContent = 'short text'
    Object.defineProperty(component.testElement.nativeElement, 'offsetWidth', { value: 20 })
    Object.defineProperty(component.testElement.nativeElement, 'scrollWidth', {
      value: component.textContent.length,
    })
    fixture.detectChanges()
    const directiveElement = fixture.debugElement.query(By.directive(TooltipNecessaryDirective))
    directiveElement.triggerEventHandler('mouseenter', null)

    const tooltip = fixture.debugElement.query(By.css('.mat-tooltip-trigger'))
    expect(tooltip).toBeFalsy()
  })

  it('should append a tooltip if text content exceeds element width', () => {
    component.textContent =
      'This is a very long text that should exceed definitely the content max width'
    Object.defineProperty(component.testElement.nativeElement, 'offsetWidth', { value: 20 })
    Object.defineProperty(component.testElement.nativeElement, 'scrollWidth', {
      value: component.textContent.length,
    })
    fixture.detectChanges()
    const directiveElement = fixture.debugElement.query(By.directive(TooltipNecessaryDirective))
    directiveElement.triggerEventHandler('mouseenter', null)
    fixture.detectChanges()

    const toolTip = fixture.debugElement.query(By.css('[mattooltip]'))
    expect(toolTip).toBeTruthy()
    expect((toolTip.nativeElement as HTMLElement).textContent).toEqual(component.textContent)
  })

  it('should remove a tooltip if mouse leaves the element', () => {
    component.textContent =
      'This is a very long text that should exceed definitely the content max width'
    Object.defineProperty(component.testElement.nativeElement, 'offsetWidth', { value: 20 })
    Object.defineProperty(component.testElement.nativeElement, 'scrollWidth', {
      value: component.textContent.length,
    })
    fixture.detectChanges()
    const directiveElement = fixture.debugElement.query(By.directive(TooltipNecessaryDirective))
    directiveElement.triggerEventHandler('mouseenter', null)
    fixture.detectChanges()

    let toolTip = fixture.debugElement.query(By.css('[mattooltip]'))
    expect(toolTip).toBeTruthy()
    directiveElement.triggerEventHandler('mouseleave', null)
    fixture.detectChanges()
    toolTip = fixture.debugElement.query(By.css('[mattooltip]'))
    expect(toolTip).toBeFalsy()
  })
})
