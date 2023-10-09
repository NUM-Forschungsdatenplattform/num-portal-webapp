/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ContentEditorRoutingModule } from './content-editor-routing.module'
import { WelcomePageEditorComponent } from './components/welcome-page-editor/welcome-page-editor.component'
import { NavigationEditorComponent } from './components/navigation-editor/navigation-editor.component'
import { NavigationEditorItemComponent } from './components/navigation-editor-item/navigation-editor-item.component'
import { WelcomePageItemComponent } from './components/welcome-page-item/welcome-page-item.component'
import { DialogEditWelcomeCardComponent } from './components/dialog-edit-welcome-card/dialog-edit-welcome-card.component'
import { LayoutModule } from '../../layout/layout.module'
import { SharedModule } from '../../shared/shared.module'

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
