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
import { CodeEditorModule } from '../code-editor/code-editor.module'
import { DialogAqlBuilderComponent } from './components/dialog-aql-builder/dialog-aql-builder.component'
import { AqlBuilderTemplatesComponent } from './components/aql-builder-templates/aql-builder-templates.component'
import { AqlBuilderSelectComponent } from './components/aql-builder-select/aql-builder-select.component'
import { AqlBuilderContainsComponent } from './components/aql-builder-contains/aql-builder-contains.component'
import { AqlBuilderWhereComponent } from './components/aql-builder-where/aql-builder-where.component'
import { AqlBuilderTemplateTreeComponent } from './components/aql-builder-template-tree/aql-builder-template-tree.component'
import { AqlBuilderContainsGroupComponent } from './components/aql-builder-contains-group/aql-builder-contains-group.component'
import { AqlBuilderContainsItemComponent } from './components/aql-builder-contains-item/aql-builder-contains-item.component'
import { AqlBuilderSelectItemComponent } from './components/aql-builder-select-item/aql-builder-select-item.component'

@NgModule({
  declarations: [
    AqlsComponent,
    AqlTableComponent,
    AqlEditorComponent,
    AqlEditorGeneralInfoComponent,
    AqlEditorCeatorComponent,
    DialogAqlBuilderComponent,
    AqlBuilderTemplatesComponent,
    AqlBuilderSelectComponent,
    AqlBuilderContainsComponent,
    AqlBuilderWhereComponent,
    AqlBuilderTemplateTreeComponent,
    AqlBuilderContainsGroupComponent,
    AqlBuilderContainsItemComponent,
    AqlBuilderSelectItemComponent,
  ],
  imports: [CommonModule, AqlsRoutingModule, SharedModule, LayoutModule, CodeEditorModule],
})
export class AqlsModule {}
