import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NavigationEditorComponent } from './components/navigation-editor/navigation-editor.component'
import { WelcomePageEditorComponent } from './components/welcome-page-editor/welcome-page-editor.component'

const routes: Routes = [
  {
    path: 'navigation-items',
    component: NavigationEditorComponent,
    data: {
      tabNavId: 'navigation-items',
    },
  },
  {
    path: '',
    component: WelcomePageEditorComponent,
    data: {
      tabNavId: 'welcome-page',
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentEditorRoutingModule {}
