import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { StudiesRoutingModule } from './studies-routing.module'
import { StudiesComponent } from './components/studies/studies.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { StudyEditorComponent } from './components/study-editor/study-editor.component'
import { StudyEditorGeneralInfoComponent } from './components/study-editor-general-info/study-editor-general-info.component'
import { LayoutModule } from 'src/app/layout/layout.module'

@NgModule({
  declarations: [StudiesComponent, StudyEditorComponent, StudyEditorGeneralInfoComponent],
  imports: [CommonModule, StudiesRoutingModule, SharedModule, LayoutModule],
})
export class StudiesModule {}
