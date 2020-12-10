import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AqlsRoutingModule } from './aqls-routing.module'
import { AqlTableComponent } from './components/aql-table/aql-table.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module'
import { AqlEditorComponent } from './components/aql-editor/aql-editor.component'
import { AqlEditorGeneralInfoComponent } from './components/aql-editor-general-info/aql-editor-general-info.component'
import { AqlsComponent } from './components/aqls/aqls.component'
import { AqlEditorCeatorComponent } from './components/aql-editor-creator/aql-editor-creator.component'

@NgModule({
  declarations: [
    AqlsComponent,
    AqlTableComponent,
    AqlEditorComponent,
    AqlEditorGeneralInfoComponent,
    AqlEditorCeatorComponent,
  ],
  imports: [CommonModule, AqlsRoutingModule, SharedModule, LayoutModule],
})
export class AqlsModule {}
