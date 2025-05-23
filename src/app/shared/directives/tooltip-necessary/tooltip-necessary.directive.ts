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
