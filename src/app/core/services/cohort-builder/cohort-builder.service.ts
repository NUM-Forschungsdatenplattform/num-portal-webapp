import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'

@Injectable({
  providedIn: 'root',
})
export class CohortBuilderService {
  private itemEventSubject = new Subject<AqlUiModel>()
  public itemEventObservable$ = this.itemEventSubject.asObservable()

  private targetResetSubject = new Subject<never>()
  public targetResetObservable$ = this.targetResetSubject.asObservable()

  constructor() {}

  resetTargets(): void {
    this.targetResetSubject.next()
  }

  pushItemToTarget(aql: AqlUiModel): void {
    this.itemEventSubject.next(aql)
  }
}
