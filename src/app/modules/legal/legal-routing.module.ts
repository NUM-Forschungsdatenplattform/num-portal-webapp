import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ContactComponent } from './components/contact/contact.component'
import { DataProtectionComponent } from './components/data-protection/data-protection.component'
import { ImprintComponent } from './components/imprint/imprint.component'

const routes: Routes = [
  { path: 'imprint', component: ImprintComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'data-protection', component: DataProtectionComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegalRoutingModule {}
