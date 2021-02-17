import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ContentEditorRoutingModule } from './content-editor-routing.module'
import { WelcomePageEditorComponent } from './components/welcome-page-editor/welcome-page-editor.component'
import { NavigationEditorComponent } from './components/navigation-editor/navigation-editor.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module'

@NgModule({
  declarations: [WelcomePageEditorComponent, NavigationEditorComponent],
  imports: [CommonModule, ContentEditorRoutingModule, SharedModule, LayoutModule],
})
export class ContentEditorModule {}
