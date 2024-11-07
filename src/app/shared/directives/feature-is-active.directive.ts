import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'
import { Subscription } from 'rxjs'
import { FeatureService } from '../../core/services/feature/feature.service'
import { AvailableFeatures } from '../models/feature/available-features.enum'

@Directive({
  selector: '[featureIsActive]',
  standalone: true,
})
export class FeatureIsActiveDirective implements OnInit, OnDestroy {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private featureService: FeatureService
  ) {}

  private subscriptions = new Subscription()
  private requiredFeatures: AvailableFeatures[]

  ngOnInit(): void {
    this.subscriptions.add(
      this.featureService.getFeature().subscribe((feature) => this.handleFeatures(feature))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleFeatures(activeFeatures: AvailableFeatures[]): void {
    if (this.requiredFeatures?.length) {
      if (this.requiredFeatures.some((feature) => activeFeatures.indexOf(feature) >= 0)) {
        this.viewContainer.createEmbeddedView(this.templateRef)
      } else {
        this.viewContainer.clear()
      }
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef)
    }
  }

  @Input() set featureIsActive(requiredFeatures: AvailableFeatures[]) {
    this.requiredFeatures = requiredFeatures
  }
}
