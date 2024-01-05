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
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core'
import { MatTooltip } from '@angular/material/tooltip'

@Directive({
  selector: '[numTooltipNecessary]',
  providers: [MatTooltip],
})
export class TooltipNecessaryDirective {
  private htmlElement: HTMLElement
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private tooltip: MatTooltip
  ) {
    this.htmlElement = this.elementRef.nativeElement
  }

  @HostListener('mouseenter')
  mouseEnter(): void {
    if (this.htmlElement.offsetWidth < this.htmlElement.scrollWidth) {
      this.renderer.setAttribute(this.htmlElement, 'matTooltip', this.htmlElement.textContent)
      this.tooltip.message = this.htmlElement.textContent
      this.tooltip.show()
    }
  }

  @HostListener('mouseleave')
  mouseLeave(): void {
    this.tooltip.hide()
    this.renderer.removeAttribute(this.htmlElement, 'matTooltip')
  }
}
