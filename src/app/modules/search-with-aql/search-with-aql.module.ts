import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module'
import { CohortBuilderModule } from '../cohort-builder/cohort-builder.module'
import { SharedProjectsModule } from '../projects/shared-projects.module'
import { CodeEditorModule } from '../code-editor/code-editor.module'
import { SearchComponent } from './components/search-aql/search.component'
import { SearchWithAqlRoutingModule } from './search-with-aql-routing.module'
import { AqlsModule } from '../aqls/aqls.module'

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CohortBuilderModule,
    CommonModule,
    LayoutModule,
    SharedModule,
    SharedProjectsModule,
    CodeEditorModule,
    SearchWithAqlRoutingModule,
    AqlsModule,
  ],
})
export class SearchWithAqlModule {}
