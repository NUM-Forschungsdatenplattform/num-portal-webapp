import { Component, OnDestroy } from '@angular/core'
import { AqlEditorCeatorComponent } from '../../../aqls/components/aql-editor-creator/aql-editor-creator.component'
import { DialogService } from '../../../../core/services/dialog/dialog.service'
import { AqlEditorService } from '../../../../core/services/aql-editor/aql-editor.service'
import { AqlService } from '../../../../core/services/aql/aql.service'
import { ToastMessageService } from '../../../../core/services/toast-message/toast-message.service'
import { QueryService } from '../../../../core/services/query/query.service'
import { RESULT_SET_LOADING_ERROR } from '../../../search/components/manager-data-explorer/constants'
import { IAqlExecutionResponse } from '../../../../shared/models/aql/execution/aql-execution-response.interface'
import { Subscription } from 'rxjs'
import { FlexModule } from '@angular/flex-layout/flex'
import { MatCard, MatCardContent } from '@angular/material/card'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { CodeEditorComponent } from '../../../code-editor/components/code-editor/code-editor.component'
import { EditorDetermineHitsComponent } from '../../../../shared/components/editor-determine-hits/editor-determine-hits.component'
import { ResultTableComponent } from '../../../../shared/components/result-table/result-table.component'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['../../../aqls/components/aql-editor-creator/aql-editor-creator.component.scss'],
  imports: [
    FlexModule,
    MatCard,
    MatCardContent,
    ButtonComponent,
    CodeEditorComponent,
    EditorDetermineHitsComponent,
    ResultTableComponent,
    MatProgressSpinner,
    TranslatePipe,
  ],
})
export class SearchComponent extends AqlEditorCeatorComponent implements OnDestroy {
  constructor(
    dialogService: DialogService,
    aqlEditorService: AqlEditorService,
    aqlService: AqlService,
    toastMessageService: ToastMessageService,
    private queryService: QueryService
  ) {
    super(dialogService, aqlEditorService, aqlService, toastMessageService)
  }
  private subscriptions = new Subscription()

  resultSet: IAqlExecutionResponse
  isDataSetLoading = false

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getData(): void {
    this.determineHits()
    this.isDataSetLoading = true
    this.queryService.setQuery(this.aqlQuery)
    this.subscriptions.add(
      this.queryService.getData().subscribe({
        next: (result) => {
          this.resultSet = result
          this.isDataSetLoading = false
        },
        error: () => {
          this.resultSet = null
          this.isDataSetLoading = false
          this.toastMessageService.openToast(RESULT_SET_LOADING_ERROR)
        },
      })
    )
  }
}
