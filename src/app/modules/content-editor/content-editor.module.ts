import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ContentEditorRoutingModule } from './content-editor-routing.module'
import { WelcomePageEditorComponent } from './components/welcome-page-editor/welcome-page-editor.component'
import { NavigationEditorComponent } from './components/navigation-editor/navigation-editor.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module'
import { NavigationEditorItemComponent } from './components/navigation-editor-item/navigation-editor-item.component'
import { WelcomePageItemComponent } from './components/welcome-page-item/welcome-page-item.component'
import { DialogEditWelcomeCardComponent } from './components/dialog-edit-welcome-card/dialog-edit-welcome-card.component'

@NgModule({
  declarations: [
    WelcomePageEditorComponent,
    NavigationEditorComponent,
    NavigationEditorItemComponent,
    WelcomePageItemComponent,
    DialogEditWelcomeCardComponent,
  ],
  imports: [CommonModule, ContentEditorRoutingModule, SharedModule, LayoutModule],
})
export class ContentEditorModule {}
