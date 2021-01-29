import { NgModule } from '@angular/core'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatTabsModule } from '@angular/material/tabs'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSelectModule } from '@angular/material/select'
import { MatDialogModule } from '@angular/material/dialog'
import { MatChipsModule } from '@angular/material/chips'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatTreeModule } from '@angular/material/tree'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatMenuModule } from '@angular/material/menu'
import { MatRadioModule } from '@angular/material/radio'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'

const MATERIAL_MODULES = [
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatCardModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatDialogModule,
  MatChipsModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatTreeModule,
  MatProgressBarModule,
  MatMenuModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
]

@NgModule({
  declarations: [],
  imports: [...MATERIAL_MODULES],
  exports: [...MATERIAL_MODULES],
  providers: [MatDatepickerModule],
})
export class MaterialModule {}
